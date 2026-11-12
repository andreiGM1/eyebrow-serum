import type { Metadata } from 'next';
import './globals.css';
import { CartProvider } from '@/lib/store/cart-context';
import { ThemeProvider } from '@/lib/store/theme-context';
import { AuthProvider } from '@/lib/store/auth-context';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import CartDrawer from '@/components/layout/CartDrawer';

export const metadata: Metadata = {
  title: 'EVERGREEN & ISLE | Natural Skincare & Botanical Brow Care',
  description:
    'EVERGREEN & ISLE • Natural Skincare. Tratamente bioactive 100% naturale, fără prostaglandine, formulate cu lipide presate la rece, rozmarin mediteranean și vitamina E pură.',
  keywords: [
    'EVERGREEN & ISLE',
    'natural skincare',
    'ser crestere sprancene',
    'eyebrow growth serum',
    'cosmetice curate',
    'ser sprancene fara prostaglandine',
    'ulei ricin rozmarin sprancene',
  ],
  authors: [{ name: 'EVERGREEN & ISLE Natural Skincare' }],
  metadataBase: new URL('https://eyebrow-serum.vercel.app'),
  openGraph: {
    title: 'EVERGREEN & ISLE | Natural Skincare & Lash & Brow Care',
    description:
      'Tratament lipidic bioactiv de lux pentru sprâncene și gene pline. Fără hormoni sintetici. 100% natural.',
    images: ['/images/mag-evergrow-bottle.png'],
    type: 'website',
  },
};

const jsonLdData = {
  '@context': 'https://schema.org/',
  '@type': 'Product',
  name: 'EVERGREEN & ISLE Lash & Brow Growth Serum (3 ml)',
  image: ['https://eyebrow-serum.vercel.app/images/mag-evergrow-bottle.png'],
  description:
    'A luxury 100% natural, cold-pressed lash and brow growth serum by EVERGREEN & ISLE Natural Skincare. Formulated without synthetic prostaglandins, parabens, or artificial fillers.',
  sku: 'EVI-SRM-003',
  mpn: 'EVI003RO',
  brand: {
    '@type': 'Brand',
    name: 'EVERGREEN & ISLE',
  },
  manufacturer: {
    '@type': 'Organization',
    name: 'EVERGREEN & ISLE Natural Skincare',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Bucharest',
      addressCountry: 'RO',
    },
  },
  offers: {
    '@type': 'Offer',
    url: 'https://eyebrow-serum.vercel.app/catalog',
    priceCurrency: 'RON',
    price: '195.00',
    itemCondition: 'https://schema.org/NewCondition',
    availability: 'https://schema.org/InStock',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ro" className="dark scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdData) }}
        />
      </head>
      <body className="min-h-screen flex flex-col font-sans antialiased">
        <ThemeProvider>
          <CartProvider>
            <AuthProvider>
              <Navbar />
              <main className="flex-1">{children}</main>
              <CartDrawer />
              <Footer />
            </AuthProvider>
          </CartProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
