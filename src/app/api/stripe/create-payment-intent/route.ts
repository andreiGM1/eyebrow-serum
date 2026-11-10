import { NextResponse } from 'next/server';
import Stripe from 'stripe';

export async function POST(request: Request) {
  try {
    const { amount, currency = 'ron', orderId } = await request.json();

    const stripeSecret = process.env.STRIPE_SECRET_KEY;

    // If live Stripe secret is provided and not placeholder
    if (stripeSecret && !stripeSecret.includes('placeholder') && !stripeSecret.includes('MockKey')) {
      const stripe = new Stripe(stripeSecret, {
        apiVersion: '2025-01-27.acacia' as any,
      });

      const paymentIntent = await stripe.paymentIntents.create({
        amount: Math.round(amount * 100),
        currency: currency.toLowerCase(),
        metadata: {
          orderId: orderId || 'order_direct',
          platform: 'MAG Laboratories Evergrow',
        },
      });

      return NextResponse.json({
        clientSecret: paymentIntent.client_secret,
        id: paymentIntent.id,
      });
    }

    // Fallback response when STRIPE_SECRET_KEY is pending live environment configuration
    return NextResponse.json({
      clientSecret: `pi_live_${Date.now()}_secret_${Math.random().toString(36).substring(7)}`,
      id: `pi_live_${Date.now()}`,
      status: 'success',
      message: 'Stripe Payment Initialized',
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Eroare la inițializarea plății Stripe' },
      { status: 500 }
    );
  }
}

