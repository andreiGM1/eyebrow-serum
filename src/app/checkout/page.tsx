'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import {
  CreditCard,
  Lock,
  ShieldCheck,
  Building,
  User,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  AlertCircle,
  Sparkles,
} from 'lucide-react';
import { useCart } from '@/lib/store/cart-context';
import { addOrderToStore } from '@/lib/store/products-store';
import { Order, OrderItem } from '@/lib/types';

export default function CheckoutPage() {
  const router = useRouter();
  const {
    items,
    subtotal,
    discountAmount,
    shippingCost,
    taxAmount,
    total,
    appliedCoupon,
    clearCart,
  } = useCart();

  // Form states
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    street: '',
    city: '',
    county: 'București',
    postalCode: '',
    country: 'România',
    isCompany: false,
    companyName: '',
    cui: '',
    regCom: '',
    notes: '',
  });

  // Stripe Test Card inputs
  const [cardNumber, setCardNumber] = useState('4242 4242 4242 4242');
  const [cardExpiry, setCardExpiry] = useState('12/28');
  const [cardCvc, setCardCvc] = useState('123');
  const [cardName, setCardName] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-[#FAF8F5] dark:bg-obsidian-950 text-stone-900 dark:text-foreground py-20 px-4 text-center transition-colors">
        <div className="max-w-md mx-auto bg-white dark:bg-obsidian-900 border border-stone-200 dark:border-zinc-800 rounded-3xl p-8 shadow-xl">
          <h2 className="font-serif text-xl font-bold text-stone-950 dark:text-white mb-2">Coșul tău este gol</h2>
          <p className="text-xs text-stone-600 dark:text-zinc-400 mb-6">
            Adaugă produse în coș înainte de a accesa pagina de finalizare a comenzii.
          </p>
          <Link
            href="/catalog"
            className="px-6 py-2.5 rounded-full bg-gold-500 hover:bg-gold-400 text-obsidian-950 font-bold text-xs uppercase shadow-md shadow-gold-500/20 active:scale-95 transition-all"
          >
            Vezi Catalogul
          </Link>
        </div>
      </div>
    );
  }

  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!formData.fullName || !formData.email || !formData.phone || !formData.street || !formData.city) {
      setErrorMsg('Vă rugăm să completați toate câmpurile obligatorii de livrare.');
      return;
    }

    if (formData.isCompany && (!formData.companyName || !formData.cui)) {
      setErrorMsg('Vă rugăm să completați datele firmei pentru factura fiscală PJ.');
      return;
    }

    // Validate Stripe test card format
    const cleanCard = cardNumber.replace(/\s+/g, '');
    if (cleanCard.length < 16) {
      setErrorMsg('Număr card de test invalid. Folosiți 4242 4242 4242 4242.');
      return;
    }

    setIsProcessing(true);

    try {
      // Simulate Stripe payment intent processing (1.5 seconds)
      await new Promise((resolve) => setTimeout(resolve, 1500));

      const orderNumberSeq = Math.floor(1000 + Math.random() * 9000);
      const orderId = `ord-${Date.now()}`;
      const invoiceNumber = 2000 + orderNumberSeq;

      const orderItems: OrderItem[] = items.map((item, idx) => ({
        id: `item-${Date.now()}-${idx}`,
        order_id: orderId,
        product_id: item.product.id,
        product_name: item.product.name,
        product_image: item.product.images[0] || '/images/mag-evergrow-bottle.png',
        unit_price: item.product.price,
        quantity: item.quantity,
        total_price: item.product.price * item.quantity,
      }));

      const newOrder: Order = {
        id: orderId,
        order_number: `MAG-2026-${orderNumberSeq}`,
        invoice_series: 'MAG-EVG',
        invoice_number: invoiceNumber,
        user_id: 'usr-guest-' + Date.now(),
        status: 'paid', // Marked paid immediately upon card processing
        payment_status: 'paid',
        payment_intent_id: `pi_test_${Date.now()}_stripe_sandbox`,
        customer_name: formData.fullName,
        customer_email: formData.email,
        customer_phone: formData.phone,
        shipping_address: {
          fullName: formData.fullName,
          street: formData.street,
          city: formData.city,
          county: formData.county,
          postalCode: formData.postalCode,
          country: formData.country,
          phone: formData.phone,
        },
        billing_address: formData.isCompany
          ? {
              fullName: formData.fullName,
              companyName: formData.companyName,
              cui: formData.cui,
              regCom: formData.regCom,
              street: formData.street,
              city: formData.city,
              county: formData.county,
              postalCode: formData.postalCode,
              country: formData.country,
              phone: formData.phone,
            }
          : undefined,
        subtotal,
        discount_amount: discountAmount,
        shipping_cost: shippingCost,
        tax_amount: taxAmount,
        total,
        coupon_code: appliedCoupon ? appliedCoupon.code : undefined,
        notes: formData.notes,
        items: orderItems,
        created_at: new Date().toISOString(),
      };

      // Save order to store and decrement stocks automatically
      addOrderToStore(newOrder);

      // Save last created order in session for instant receipt
      sessionStorage.setItem('evergrow_last_order', JSON.stringify(newOrder));

      // Clear cart
      clearCart();

      // Redirect to success page
      router.push(`/checkout/success?order_id=${newOrder.id}`);
    } catch {
      setErrorMsg('A apărut o problemă la autorizarea plății. Vă rugăm să reîncercați.');
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] dark:bg-obsidian-950 text-stone-900 dark:text-foreground py-12 px-4 sm:px-6 lg:px-8 transition-colors">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Breadcrumb Navigation */}
        <div className="flex items-center justify-between">
          <Link
            href="/cart"
            className="inline-flex items-center gap-2 text-xs font-mono text-stone-500 dark:text-zinc-400 hover:text-gold-600 dark:hover:text-gold-400 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Înapoi la Coș</span>
          </Link>
          <div className="flex items-center gap-2 text-xs font-mono text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-500/20 px-3 py-1 rounded-full font-semibold">
            <Lock className="w-3.5 h-3.5" />
            <span>Stripe 256-Bit SSL Encrypted (Sandbox Mode)</span>
          </div>
        </div>

        <h1 className="font-serif text-3xl font-bold text-stone-950 dark:text-white">Finalizare Comandă & Factură Fiscală</h1>

        {errorMsg && (
          <div className="p-4 rounded-xl bg-red-50 dark:bg-red-950/80 border border-red-200 dark:border-red-500/40 text-xs text-red-800 dark:text-red-200 flex items-center gap-3">
            <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        <form onSubmit={handleSubmitOrder} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column: Customer & Delivery Details */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Step 1: Customer Contact */}
            <div className="bg-white dark:bg-obsidian-900 border border-stone-200 dark:border-zinc-800 rounded-2xl p-4 sm:p-6 shadow-sm dark:shadow-xl space-y-4">
              <h2 className="font-serif font-bold text-lg text-stone-950 dark:text-white flex items-center gap-2 pb-3 border-b border-stone-200 dark:border-zinc-800">
                <User className="w-5 h-5 text-gold-600 dark:text-gold-400" />
                <span>1. Date Client & Contact</span>
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-mono text-stone-600 dark:text-zinc-400 block mb-1 font-semibold">
                    Nume și Prenume *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Elena Ionescu"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full bg-stone-50 dark:bg-obsidian-950 border border-stone-300 dark:border-zinc-700 rounded-xl px-3.5 py-2.5 text-base sm:text-xs text-stone-900 dark:text-white placeholder-stone-400 dark:placeholder-zinc-500 focus:outline-none focus:border-gold-500"
                  />
                </div>

                <div>
                  <label className="text-xs font-mono text-stone-600 dark:text-zinc-400 block mb-1 font-semibold">
                    Telefon Mobil *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="0722 000 000"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-stone-50 dark:bg-obsidian-950 border border-stone-300 dark:border-zinc-700 rounded-xl px-3.5 py-2.5 text-base sm:text-xs text-stone-900 dark:text-white placeholder-stone-400 dark:placeholder-zinc-500 focus:outline-none focus:border-gold-500"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="text-xs font-mono text-stone-600 dark:text-zinc-400 block mb-1 font-semibold">
                    Adresă Email (Pentru primirea facturii fiscale PDF) *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="elena.ionescu@exemplu.ro"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-stone-50 dark:bg-obsidian-950 border border-stone-300 dark:border-zinc-700 rounded-xl px-3.5 py-2.5 text-base sm:text-xs text-stone-900 dark:text-white placeholder-stone-400 dark:placeholder-zinc-500 focus:outline-none focus:border-gold-500"
                  />
                </div>
              </div>
            </div>

            {/* Step 2: Shipping Address */}
            <div className="bg-white dark:bg-obsidian-900 border border-stone-200 dark:border-zinc-800 rounded-2xl p-4 sm:p-6 shadow-sm dark:shadow-xl space-y-4">
              <h2 className="font-serif font-bold text-lg text-stone-950 dark:text-white flex items-center gap-2 pb-3 border-b border-stone-200 dark:border-zinc-800">
                <ShieldCheck className="w-5 h-5 text-gold-600 dark:text-gold-400" />
                <span>2. Adresă de Livrare (Curier Rapid)</span>
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className="text-xs font-mono text-stone-600 dark:text-zinc-400 block mb-1 font-semibold">
                    Stradă, Număr, Bloc, Scară, Apartament *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Calea Victoriei nr. 120, Bloc A, Ap. 4"
                    value={formData.street}
                    onChange={(e) => setFormData({ ...formData, street: e.target.value })}
                    className="w-full bg-stone-50 dark:bg-obsidian-950 border border-stone-300 dark:border-zinc-700 rounded-xl px-3.5 py-2.5 text-base sm:text-xs text-stone-900 dark:text-white placeholder-stone-400 dark:placeholder-zinc-500 focus:outline-none focus:border-gold-500"
                  />
                </div>

                <div>
                  <label className="text-xs font-mono text-stone-600 dark:text-zinc-400 block mb-1 font-semibold">
                    Oraș / Localitate *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="București"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full bg-stone-50 dark:bg-obsidian-950 border border-stone-300 dark:border-zinc-700 rounded-xl px-3.5 py-2.5 text-base sm:text-xs text-stone-900 dark:text-white placeholder-stone-400 dark:placeholder-zinc-500 focus:outline-none focus:border-gold-500"
                  />
                </div>

                <div>
                  <label className="text-xs font-mono text-stone-600 dark:text-zinc-400 block mb-1 font-semibold">
                    Județ / Sector *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Sector 1"
                    value={formData.county}
                    onChange={(e) => setFormData({ ...formData, county: e.target.value })}
                    className="w-full bg-stone-50 dark:bg-obsidian-950 border border-stone-300 dark:border-zinc-700 rounded-xl px-3.5 py-2.5 text-base sm:text-xs text-stone-900 dark:text-white placeholder-stone-400 dark:placeholder-zinc-500 focus:outline-none focus:border-gold-500"
                  />
                </div>

                <div>
                  <label className="text-xs font-mono text-stone-600 dark:text-zinc-400 block mb-1 font-semibold">
                    Cod Poștal
                  </label>
                  <input
                    type="text"
                    placeholder="010098"
                    value={formData.postalCode}
                    onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                    className="w-full bg-stone-50 dark:bg-obsidian-950 border border-stone-300 dark:border-zinc-700 rounded-xl px-3.5 py-2.5 text-xs text-stone-900 dark:text-white placeholder-stone-400 dark:placeholder-zinc-500 focus:outline-none focus:border-gold-500"
                  />
                </div>

                <div>
                  <label className="text-xs font-mono text-stone-600 dark:text-zinc-400 block mb-1 font-semibold">
                    Țară
                  </label>
                  <input
                    type="text"
                    disabled
                    value={formData.country}
                    className="w-full bg-stone-100 dark:bg-zinc-900 border border-stone-200 dark:border-zinc-800 rounded-xl px-3.5 py-2.5 text-xs text-stone-500 dark:text-zinc-400 cursor-not-allowed"
                  />
                </div>
              </div>

              {/* Billing: Company Toggle */}
              <div className="pt-4 border-t border-stone-200 dark:border-zinc-800/80">
                <label className="flex items-center gap-2 cursor-pointer text-xs text-stone-700 dark:text-zinc-300 font-medium">
                  <input
                    type="checkbox"
                    checked={formData.isCompany}
                    onChange={(e) => setFormData({ ...formData, isCompany: e.target.checked })}
                    className="rounded bg-stone-50 dark:bg-obsidian-950 border-stone-300 dark:border-zinc-700 text-gold-500 focus:ring-gold-500"
                  />
                  <span>Doresc factură pe persoană juridică (Firmă / SRL)</span>
                </label>

                {formData.isCompany && (
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4 pt-3 border-t border-stone-200 dark:border-zinc-800 animate-in fade-in duration-200">
                    <div className="sm:col-span-2">
                      <label className="text-[11px] font-mono text-stone-600 dark:text-zinc-400 block mb-1 font-semibold">
                        Denumire Firmă *
                      </label>
                      <input
                        type="text"
                        placeholder="Ex: MAG Aesthetic Clinic SRL"
                        value={formData.companyName}
                        onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                        className="w-full bg-stone-50 dark:bg-obsidian-950 border border-stone-300 dark:border-zinc-700 rounded-xl px-3 py-2 text-xs text-stone-900 dark:text-white focus:outline-none focus:border-gold-500"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-mono text-stone-600 dark:text-zinc-400 block mb-1 font-semibold">
                        Cod Fiscal (CUI) *
                      </label>
                      <input
                        type="text"
                        placeholder="RO12345678"
                        value={formData.cui}
                        onChange={(e) => setFormData({ ...formData, cui: e.target.value })}
                        className="w-full bg-stone-50 dark:bg-obsidian-950 border border-stone-300 dark:border-zinc-700 rounded-xl px-3 py-2 text-xs text-stone-900 dark:text-white focus:outline-none focus:border-gold-500"
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Step 3: Stripe Payment Element (Sandbox Mode) */}
            <div className="bg-white dark:bg-obsidian-900 border border-stone-200 dark:border-gold-500/40 rounded-2xl p-4 sm:p-6 shadow-sm dark:shadow-xl space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-stone-200 dark:border-zinc-800">
                <h2 className="font-serif font-bold text-lg text-stone-950 dark:text-white flex items-center gap-2">
                  <CreditCard className="w-5 h-5 text-gold-600 dark:text-gold-400" />
                  <span>3. Plată Electronică Securizată (Stripe)</span>
                </h2>
                <span className="text-[11px] font-mono uppercase bg-gold-500/10 text-gold-700 dark:text-gold-300 border border-gold-500/30 px-2.5 py-0.5 rounded-full font-bold">
                  Card Test Stripe
                </span>
              </div>

              {/* Stripe Test Notice */}
              <div className="p-3.5 rounded-xl bg-gold-50/70 dark:bg-botanical-950 border border-gold-500/30 text-xs text-stone-800 dark:text-zinc-300 flex items-start gap-3">
                <Sparkles className="w-4 h-4 text-gold-600 dark:text-gold-400 flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="text-gold-800 dark:text-gold-300 font-bold">Mediu Sandbox de Testare:</strong> Se utilizează cardul de test Stripe precompletat:{' '}
                  <code className="text-stone-900 dark:text-white font-mono bg-white dark:bg-zinc-900 border border-stone-200 dark:border-zinc-800 px-1 py-0.5 rounded font-bold">4242 4242 4242 4242</code>. Nicio sumă reală nu va fi debitată.
                </div>
              </div>

              {/* Card visual mockup form */}
              <div className="space-y-4 pt-2">
                <div>
                  <label className="text-xs font-mono text-stone-600 dark:text-zinc-400 block mb-1 font-semibold">
                    Număr Card (Stripe Test)
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      required
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      className="w-full bg-stone-50 dark:bg-obsidian-950 border border-stone-300 dark:border-zinc-700 rounded-xl px-3.5 py-2.5 text-base sm:text-xs text-stone-900 dark:text-white font-mono focus:outline-none focus:border-gold-500 pl-10"
                    />
                    <CreditCard className="w-4 h-4 text-stone-400 dark:text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-mono text-stone-600 dark:text-zinc-400 block mb-1 font-semibold">
                      Data Expirării (MM/YY)
                    </label>
                    <input
                      type="text"
                      required
                      value={cardExpiry}
                      onChange={(e) => setCardExpiry(e.target.value)}
                      className="w-full bg-stone-50 dark:bg-obsidian-950 border border-stone-300 dark:border-zinc-700 rounded-xl px-3.5 py-2.5 text-base sm:text-xs text-stone-900 dark:text-white font-mono focus:outline-none focus:border-gold-500"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-mono text-stone-600 dark:text-zinc-400 block mb-1 font-semibold">
                      CVC / CVV
                    </label>
                    <input
                      type="text"
                      required
                      value={cardCvc}
                      onChange={(e) => setCardCvc(e.target.value)}
                      className="w-full bg-stone-50 dark:bg-obsidian-950 border border-stone-300 dark:border-zinc-700 rounded-xl px-3.5 py-2.5 text-base sm:text-xs text-stone-900 dark:text-white font-mono focus:outline-none focus:border-gold-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-mono text-stone-600 dark:text-zinc-400 block mb-1 font-semibold">
                    Nume Deținător Card
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="ELENA IONESCU"
                    value={cardName || formData.fullName}
                    onChange={(e) => setCardName(e.target.value)}
                    className="w-full bg-stone-50 dark:bg-obsidian-950 border border-stone-300 dark:border-zinc-700 rounded-xl px-3.5 py-2.5 text-base sm:text-xs text-stone-900 dark:text-white uppercase focus:outline-none focus:border-gold-500"
                  />
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Order Review & Final Payment Button */}
          <div className="space-y-6">
            <div className="bg-white dark:bg-obsidian-900 border border-stone-200 dark:border-gold-500/30 rounded-2xl p-6 shadow-sm dark:shadow-xl space-y-6 sticky top-28">
              <h2 className="font-serif font-bold text-lg text-stone-950 dark:text-white pb-3 border-b border-stone-200 dark:border-zinc-800">
                Produse Comandate ({items.length})
              </h2>

              {/* Items mini list */}
              <div className="space-y-3 max-h-60 overflow-y-auto divide-y divide-stone-200 dark:divide-zinc-800/60 pr-1">
                {items.map(({ product, quantity }) => (
                  <div key={product.id} className="pt-3 first:pt-0 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 relative rounded-lg overflow-hidden bg-stone-100 dark:bg-zinc-950 flex-shrink-0 border border-stone-200 dark:border-zinc-800">
                        <Image
                          src={product.images[0] || '/images/mag-evergrow-bottle.png'}
                          alt={product.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <div className="text-xs font-serif font-semibold text-stone-900 dark:text-white line-clamp-1">
                          {product.name}
                        </div>
                        <div className="text-[10px] text-stone-500 dark:text-zinc-400 font-mono">
                          Cantitate: {quantity} buc.
                        </div>
                      </div>
                    </div>
                    <div className="text-right text-xs font-serif font-bold text-gold-700 dark:text-gold-400">
                      {(product.price * quantity).toFixed(2)} RON
                    </div>
                  </div>
                ))}
              </div>

              {/* Price Calculation breakdown */}
              <div className="space-y-2 text-xs border-t border-stone-200 dark:border-zinc-800 pt-4">
                <div className="flex justify-between text-stone-600 dark:text-zinc-400">
                  <span>Subtotal:</span>
                  <span className="font-mono text-stone-900 dark:text-zinc-200 font-semibold">{subtotal.toFixed(2)} RON</span>
                </div>

                {discountAmount > 0 && (
                  <div className="flex justify-between text-gold-700 dark:text-gold-400 font-semibold">
                    <span>Discount cupon ({appliedCoupon?.code}):</span>
                    <span className="font-mono">-{discountAmount.toFixed(2)} RON</span>
                  </div>
                )}

                <div className="flex justify-between text-stone-600 dark:text-zinc-400">
                  <span>Livrare:</span>
                  <span className="font-mono text-stone-900 dark:text-zinc-200 font-semibold">
                    {shippingCost === 0 ? 'GRATUIT' : `${shippingCost.toFixed(2)} RON`}
                  </span>
                </div>

                <div className="flex justify-between text-stone-500 dark:text-zinc-500 text-[11px]">
                  <span>TVA (19% inclusă):</span>
                  <span className="font-mono">{taxAmount.toFixed(2)} RON</span>
                </div>

                <div className="flex justify-between text-lg font-serif font-bold text-stone-950 dark:text-white pt-3 border-t border-stone-200 dark:border-zinc-800">
                  <span>Total Debit:</span>
                  <span className="text-2xl text-gold-700 dark:text-gold-400 font-mono">{total.toFixed(2)} RON</span>
                </div>
              </div>

              {/* Pay Button */}
              <button
                type="submit"
                disabled={isProcessing}
                className="w-full bg-gold-500 hover:bg-gold-400 disabled:opacity-50 text-obsidian-950 font-bold py-4 px-6 rounded-xl text-xs uppercase tracking-wider transition-all shadow-xl shadow-gold-500/20 flex items-center justify-center gap-2 group active:scale-95"
              >
                {isProcessing ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-obsidian-950 border-t-transparent rounded-full animate-spin" />
                    <span>Se autorizează plata Stripe...</span>
                  </div>
                ) : (
                  <>
                    <Lock className="w-4 h-4" />
                    <span>Plătește {total.toFixed(2)} RON cu Card de Test</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>

              <div className="text-center text-[10px] text-stone-500 dark:text-zinc-500 space-y-1 font-mono">
                <p>Plată securizată 3D Secure / Stripe Test Environment</p>
                <p>Factura fiscală va fi generată instant cu descărcare PDF</p>
              </div>
            </div>
          </div>

        </form>

      </div>
    </div>
  );
}

