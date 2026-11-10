import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import crypto from 'crypto';

export async function POST(request: Request) {
  try {
    const { email, fullName, provider, avatarUrl } = await request.json();

    if (!email || !provider) {
      return NextResponse.json(
        { error: 'Email și provider sunt obligatorii' },
        { status: 400 }
      );
    }

    const cleanEmail = email.toLowerCase().trim();
    const cleanName = fullName?.trim() || (provider === 'google' ? 'Utilizator Google' : 'Utilizator Apple');
    const defaultAvatar =
      provider === 'google'
        ? (avatarUrl || 'https://lh3.googleusercontent.com/a/default-user')
        : (avatarUrl || 'https://appleid.cdn-apple.com/static/bin/cb/appleid/dist/assets/favicon.ico');

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

    if (!supabaseUrl || !serviceRoleKey) {
      return NextResponse.json(
        { error: 'Configurarea Supabase pe server este incompletă' },
        { status: 500 }
      );
    }

    // Generate a secure, deterministic password for this social identity
    const secretSalt = serviceRoleKey || 'evergrow_social_salt_2026_mag';
    const deterministicPassword = `MagSoc_${crypto
      .createHmac('sha256', secretSalt)
      .update(cleanEmail)
      .digest('hex')
      .slice(0, 18)}!Aa1`;

    const supabaseAdmin = createClient(supabaseUrl, serviceRoleKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    });

    // Check if user already exists
    const { data: listData } = await supabaseAdmin.auth.admin.listUsers();
    const existingUser = listData?.users?.find(
      (u) => u.email?.toLowerCase() === cleanEmail
    );

    if (existingUser) {
      // Ensure password and metadata are up to date
      await supabaseAdmin.auth.admin.updateUserById(existingUser.id, {
        password: deterministicPassword,
        email_confirm: true,
        user_metadata: {
          ...existingUser.user_metadata,
          full_name: cleanName,
          provider: provider,
          avatar_url: defaultAvatar,
        },
      });

      // Also ensure profile record exists
      await supabaseAdmin
        .from('profiles')
        .upsert(
          {
            id: existingUser.id,
            email: cleanEmail,
            full_name: cleanName,
            updated_at: new Date().toISOString(),
          },
          { onConflict: 'id' }
        );
    } else {
      // Create fresh user in Supabase
      const { data: newUser, error: createError } = await supabaseAdmin.auth.admin.createUser({
        email: cleanEmail,
        password: deterministicPassword,
        email_confirm: true,
        user_metadata: {
          full_name: cleanName,
          provider: provider,
          avatar_url: defaultAvatar,
        },
      });

      if (createError) {
        throw createError;
      }

      if (newUser?.user) {
        await supabaseAdmin
          .from('profiles')
          .upsert(
            {
              id: newUser.user.id,
              email: cleanEmail,
              full_name: cleanName,
              role: 'customer',
              created_at: new Date().toISOString(),
              updated_at: new Date().toISOString(),
            },
            { onConflict: 'id' }
          );
      }
    }

    return NextResponse.json({
      success: true,
      email: cleanEmail,
      password: deterministicPassword,
      provider,
    });
  } catch (err: any) {
    console.error('Social sign-in API error:', err);
    return NextResponse.json(
      { error: err.message || 'Eroare la procesarea autentificării sociale' },
      { status: 500 }
    );
  }
}

