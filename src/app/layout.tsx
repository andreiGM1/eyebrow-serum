import type { Metadata } from 'next';
import './globals.css';
import { CartProvider } from '@/lib/store/cart-context';
import { ThemeProvider } from '@/lib/store/theme-context';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import CartDrawer from '@/components/layout/CartDrawer';

export const metadata: Metadata = {
  title: 'MAG EVERGROW | Seruri Regenerare & Creștere Sprâncene | Atelier București',
  description:
    'Formulat la Laboratoarele MAG din București. Descoperă EVERGROW: ser de lux 100% natural, prostaglandin-free, cu ulei virgin de ricin, rozmarin și vitamina E.',
  keywords: [
    'ser crestere sprancene',
    'MAG evergrow',
    'eyebrow growth serum',
    'cosmetice curate bucuresti',
    'ser sprancene fara prostaglandine',
    'ulei ricin rozmarin sprancene',
  ],
  authors: [{ name: 'MAG Laboratories Bucharest' }],
  metadataBase: new URL('https://maglaboratories.com'),
  openGraph: {
    title: 'MAG EVERGROW Lash & Brow Growth Serum (3 ml)',
    description:
      'Tratament lipidic bioactiv de lux pentru sprâncene și gene pline. Fără hormoni sintetici. Made in Romania.',
    images: ['/images/mag-evergrow-bottle.png'],
    type: 'website',
  },
};

const jsonLdData = {
  '@context': 'https://schema.org/',
  '@type': 'Product',
  name: 'MAG EVERGROW Lash & Brow Growth Serum (3 ml)',
  image: ['https://maglaboratories.com/images/mag-evergrow-bottle.png'],
  description:
    'A luxury 100% natural, cold-pressed lash and brow growth serum compounded in Bucharest, Romania. Formulated without synthetic prostaglandins, parabens, or artificial fillers.',
  sku: 'MAG-EVG-003',
  mpn: 'MAG003RO',
  brand: {
    '@type': 'Brand',
    name: 'MAG Laboratories',
  },
  manufacturer: {
    '@type': 'Organization',
    name: 'MAG Laboratories Bucharest',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Bucharest',
      addressCountry: 'RO',
    },
  },
  offers: {
    '@type': 'Offer',
    url: 'https://maglaboratories.com/catalog',
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
            <Navbar />
            <main className="flex-1">{children}</main>
            <CartDrawer />
            <Footer />
          </CartProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
