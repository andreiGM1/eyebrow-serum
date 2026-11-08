# DOCUMENTAȚIE TEHNICĂ ȘI COMERCIALĂ A PROIECTULUI
## MAG LABORATORIES BUCHAREST • EVERGROW LASH & BROW CARE
### Magazin Online B2C de Produse Cosmetice de Lux & Modul de Diagnostic Personalizat

---

## 1. Tip de Comerț Electronic: B2C (Business-to-Consumer)

### Justificarea Modelului B2C
Proiectul **EVERGROW by MAG Laboratories** adoptă modelul de comerț electronic **B2C (Business-to-Consumer)** din considerente economice, dermatologice și de experiență a utilizatorului:
1. **D2C (Direct-to-Consumer) fără intermediari:** Permite laboratorului din București să livreze formule proaspăt compuse (micro-batch) direct consumatorului final, eliminând adaosurile comerciale ale rețelelor tradiționale de retail/farmacii (care adaugă între 40% și 70% la prețul final).
2. **Experiență personalizată și educație dermato-cosmetică:** Îngrijirea sprâncenelor și genelor necesită consiliere specifică privind fazele biologice (anagen, catagen, telogen). Modelul B2C permite integrarea directă a simulatorului interactiv de diagnostic și a calculatorului de dozaj.
3. **Fidelizare și recurență:** Ciclul de utilizare a unui flacon de 3 ml este de 90 de zile. Modelul B2C digital permite notificarea clienților pentru reînnoirea curei sau trecerea la pachete semestriale (*Duo Pack 6 Luni*).

---

## 2. Produse Comercializate & Rationale de Nișă

### Nișa Cosmetică a Serurilor de Sprâncene (Eyebrow & Lash Growth)
Sprâncenele au un impact arhitectural fundamental asupra simetriei faciale. Piața produselor pentru densificarea sprâncenelor a înregistrat o creștere anuală de peste 8.5% (CAGR), alimentată de tendința machiajului minimalist ("clean girl aesthetic") și de efectele pe termen lung ale pensatului excesiv din trecut sau ale laminărilor chimice repetate.

### Compoziție & Inovație Curată (Clean Chemistry)
Spre deosebire de serurile de masă bazate pe analogi hormonali de prostaglandine (cum ar fi *Bimatoprost* sau *Isopropyl Cloprostenate*, asociate medical cu hiperpigmentarea pleoapelor, atrofia grăsimii periorbitale și modificarea culorii irisului), linia **MAG EVERGROW** folosește o **Matrice Bioactivă 100% Lipidic Activă (Zero Apă, Zero Diluanți)**:
- **Ricinus Communis Seed Oil (Ulei Virgin de Ricin - prima presare la rece):** Bogat în 85-90% acid ricinoleic, sigilează cuticula și hrănește teaca rădăcinii.
- **Rosmarinus Officinalis Leaf Oil (Ulei de Rozmarin mediteranean):** Stimulează microcirculația capilară din jurul papilei dermice, stimulând trezirea foliculilor dorminzi.
- **Simmondsia Chinensis Seed Oil (Ulei Pur de Jojoba):** Esteri biomimetici de ceară ce dizolvă sebumul întărit și deblochează orificiile foliculare.
- **Tocopherol (Vitamina E Activă):** Scut antioxidant împotriva degradării keratinei tinere.

### Publicul Țintă (Buyer Persona)
- **Femei și bărbați între 20 și 55 de ani** care se confruntă cu sprâncene rare, goluri vizibile cauzate de pensat agresiv, subțiere asociată cu stresul sau degradare post-laminare.
- **Consumatori de Clean Beauty & Cosmetice de Lux:** Persoane atente la listele INCI, care refuză hormoni sintetici și apreciază produsele artizanale fabricate local în București, respectând Directiva Europeană (CE) 1223/2009.

---

## 3. Site Model: Studiu Comparativ după Branduri Consacrate

Pentru proiectarea arhitecturii și UX/UI, au fost analizate cele mai relevante branduri internaționale:

| Brand Analizat | Puncte Forte | Puncte Slabe / Vulnerabilități | Soluția Implementată în EVERGROW |
| :--- | :--- | :--- | :--- |
| **The Ordinary** (*Multi-Peptide Lash and Brow*) | Preț accesibil, transparență la nivel de ingrediente. | Formulă apoasă cu absorbție rapidă, dar eficiență scăzută pe goluri cronice; lipsa unui simulator vizual. | Formulă 100% lipidică concentrată presată la rece + Simulator interactiv pe săptămâni. |
| **Grande Cosmetics** (*GrandeBROW*) | Notorietate ridicată, rezultate rapide. | Utilizează derivați sintetici de prostaglandine; numeroase plângeri de iritații și cearcăne întunecate. | **Zero Prostaglandine**: formulă sigură oftalmologic, tolerată chiar și de ochi foarte sensibili. |
| **RapidBrow** (*Eyebrow Enhancing Serum*) | Aplicator comod cu periuță. | Lipsa transparenței privind procentele active; experiență e-commerce statică, fără recomandare dinamică. | Quiz de diagnostic în 3 pași + Algoritm de calcul dozaj și longevitate flacon în funcție de sensibilitate. |

---

## 4. Platformă Software Utilizată: Analiză Freeware/Open-Source vs. Comercială

### De ce Next.js 15 + Supabase vs. Shopify / WooCommerce?

| Criteriu de Evaluare | Soluție Comercială (Shopify) | Soluție Tradițională (WooCommerce / WP) | Stack-ul Nostru Custom (Next.js 15 + Supabase) |
| :--- | :--- | :--- | :--- |
| **Costuri Licențiere** | \$39 - \$399 / lună + comision 2% tranzacție | Gratuit de bază, dar plugin-urile bune costă \$200-\$500/an | **100% Open-Source / Generos Free Tier** (Zero comisioane pe platformă) |
| **Performanță & PageSpeed** | 50 - 75 pe mobil din cauza scripturilor terțe | 40 - 65 pe mobil din cauza bazei monolitice PHP | **95 - 100 PageSpeed**: Server Components, streaming, imagini AVIF/WebP |
| **Personalizare Originală** | Limitată la Liquid / Theme Engine rigid | Posibilă, dar creează conflicte de plugin-uri | **Libertate Totală**: Algoritm de simulator vizual React + Slider interactiv SVG |
| **Securitate Date** | Găzduit de terți | Vulnerabilități frecvente SQL Injection/Plugins | **Row Level Security (RLS)** nativă în PostgreSQL Supabase la nivel de rând |
| **Emitere Facturi Fiscale** | Necesită aplicații plătite suplimentare | Necesită plugin PDF Invoice configurat manual | **Modul Nativ Integrat**: Facturare fiscală românească automată (TVA 19%, serie/număr, print A4/PDF) |

---

## 5. Tehnologii & Limbaje Folosite

- **Limbaj Principal:** TypeScript (strict type safety, zero `any` la runtime).
- **Runtime & Build Engine:** Node.js v24 LTS.
- **Frontend Framework:** Next.js 15 (App Router, React 19 Server Components, Client Components optimizate).
- **Stilizare & Design System:** Tailwind CSS cu paletă cromatică de lux și suport complet bivalent **Dual Theme (Light Mode - Fildeș Cald `#FAF8F5` / Dark Mode - Obsidian `#0B0E0D`)**, accente de aur de atelier (`#C5A03C`) și verde botanic (`#25332C`).
- **Iconografie & Animații:** Lucide React Icons cu micro-interacțiuni animate, comutator rotativ temă Soare/Lună, Framer Motion, Canvas Confetti.
- **Bază de Date & Backend:** Supabase (PostgreSQL, Row Level Security, Triggers SQL pentru decrementare automată stoc, Supabase Auth).
- **Procesare Plăți Electronice:** Stripe SDK & Elements (mod Sandbox Test cu card `4242 4242 4242 4242`).
- **Generare Documente Fiscale:** Modul dedicat HTML-to-Print / PDF print-engine conform Legii nr. 227/2015 privind Codul Fiscal.

---

## 6. Baza de Date: Diagramă Relațională și Schema Tabelelor

Baza de date este structurată în PostgreSQL (Supabase) și cuprinde 7 entități relaționale:

```mermaid
erDiagram
    PROFILES ||--o{ ORDERS : places
    CATEGORIES ||--o{ PRODUCTS : contains
    PRODUCTS ||--o{ ORDER_ITEMS : ordered_in
    PRODUCTS ||--o{ REVIEWS : receives
    ORDERS ||--|{ ORDER_ITEMS : contains
    COUPONS ||--o{ ORDERS : applied_to

    PROFILES {
        uuid id PK
        string email
        string full_name
        string phone
        string role
        timestamp created_at
    }

    CATEGORIES {
        uuid id PK
        string slug UK
        string name
        string description
        int display_order
        string image_url
    }

    PRODUCTS {
        uuid id PK
        string slug UK
        uuid category_id FK
        string name
        string subtitle
        text description
        text short_description
        decimal price
        decimal compare_at_price
        int stock
        string sku UK
        string volume
        text[] images
        jsonb active_ingredients
        text full_inci
        text[] usage_instructions
        text[] benefits
        decimal rating
        int review_count
        boolean is_featured
        string badge
    }

    ORDERS {
        uuid id PK
        string order_number UK
        string invoice_series
        int invoice_number
        uuid user_id FK
        string status
        string payment_status
        string payment_intent_id
        string customer_name
        string customer_email
        string customer_phone
        jsonb shipping_address
        jsonb billing_address
        decimal subtotal
        decimal discount_amount
        decimal shipping_cost
        decimal tax_amount
        decimal total
        string coupon_code
        timestamp created_at
    }

    ORDER_ITEMS {
        uuid id PK
        uuid order_id FK
        uuid product_id FK
        string product_name
        decimal unit_price
        int quantity
        decimal total_price
    }

    COUPONS {
        uuid id PK
        string code UK
        int discount_percent
        decimal discount_amount
        decimal min_order_amount
        boolean is_active
        timestamp expires_at
    }

    REVIEWS {
        uuid id PK
        uuid product_id FK
        string user_name
        int rating
        text comment
        boolean verified_purchase
        timestamp created_at
    }
```

### Reguli de Securitate RLS (Row Level Security):
- Tabela `products` și `categories` permit citirea publică (`SELECT true`), iar modificarea (`INSERT`, `UPDATE`, `DELETE`) este permisă exclusiv utilizatorilor cu rol de administrator (`is_admin() = true`).
- Tabela `orders` permite clienților să-și vizualizeze exclusiv propriile comenzi (`auth.uid() = user_id`), în timp ce adminul are acces global.
- Trigger SQL automat `trg_decrement_stock_on_paid`: La schimbarea stării plății în `paid`, stocul fiecărui produs este redus instant cu cantitatea comandată (`p.stock - oi.quantity`).

---

## 7. Ghid de Publicare (Deployment pe Vercel + Supabase)

### Pasul 1: Configurare Supabase Cloud (Conectat & Populat)
1. **Project ID:** `bywgvtsmcdvbknhtsblx` (Regiunea `eu-west-2` - London/Europa)
2. **Project URL:** `https://bywgvtsmcdvbknhtsblx.supabase.co`
3. Baza de date este complet populată cu cele 7 tabele (`profiles`, `categories`, `products`, `orders`, `order_items`, `coupons`, `reviews`), politicile RLS active și trigger-ele de stoc și facturare configurate.

### Pasul 2: Configurare Stripe Test Mode
1. Accesați [https://dashboard.stripe.com/](https://dashboard.stripe.com/) și activați **Test Mode**.
2. Din secțiunea **Developers -> API keys**, copiați:
   - `Publishable key` (`pk_test_...`) -> `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
   - `Secret key` (`sk_test_...`) -> `STRIPE_SECRET_KEY`

### Pasul 3: Deployment pe Vercel (Configurat & Activ)
1. Repository conectat: [https://github.com/andreiGM1/eyebrow-serum](https://github.com/andreiGM1/eyebrow-serum)
2. **URL Producție Live:** [https://eyebrow-serum.vercel.app](https://eyebrow-serum.vercel.app)
3. Variabilele de mediu configurate și active în Vercel:
   ```env
   NEXT_PUBLIC_SITE_URL=https://eyebrow-serum.vercel.app
   NEXT_PUBLIC_SUPABASE_URL=https://bywgvtsmcdvbknhtsblx.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ5d2d2dHNtY2R2YmtuaHRzYmx4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTQwODQzMDMsImV4cCI6MjEwOTY2MDMwM30.JJgRxGGWAt9N72T_YUfC8W8A-lerh2npEx4afRLnX30
   SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   ADMIN_EMAIL=admin@maglaboratories.com
   ```
   SUPABASE_SERVICE_ROLE_KEY=eyJhbGci...
   STRIPE_SECRET_KEY=sk_test_...
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
   ADMIN_EMAIL=admin@maglaboratories.com
   ```
4. Build-ul a fost compilat cu succes pe arhitectura Next.js 15 cu Node.js 24.x, având status **READY**.

---

## 8. Galerie de Capturi de Ecran & Funcționalități Implementate

Următoarele secțiuni prezintă fiecare funcționalitate implementată în magazinul online EVERGROW, însoțită de capturi de ecran din mediul de producție live:

### 8.1. Pagina Principală (Homepage) & Colecții Exclusive
**Rută:** `/`  
Prezintă propunerea unică de valoare, formula 100% curată fără prostaglandine, flaconul auriu de 3ml, colecțiile botanice și accesul rapid la diagnostic.
![Homepage](docs_screenshots/01_homepage.png)

### 8.2. Căutare Live Predictivă (Debounce AJAX)
**Rută:** Modal activabil pe orice pagină  
Permite căutarea instantanee în timp real după nume, descriere sau ingrediente INCI (ex: căutarea "ricin" filtrează automat produsele relevante).
![Live Search Modal](docs_screenshots/02_search_modal.png)

### 8.3. Catalog de Produse & Filtrare Multi-Criterială
**Rută:** `/catalog`  
Prezintă toate cele 8 produse unice cu propriile imagini distincte, filtrare pe 4 categorii botanice, slider de preț dinamic (0-500 RON) și sortare.
![Catalog Produse](docs_screenshots/03_catalog.png)

### 8.4. Fișa Tehnică a Produsului & Galerie Foto
**Rută:** `/product/mag-evergrow-lash-brow-serum-3ml`  
Conține galeria cu zoom, compoziția chimică INCI, procentele ingredientelor active, modul de aplicare și recenzii verificate.
![Fișă Produs](docs_screenshots/04_product_detail.png)

### 8.5. Coș de Cumpărături Slide-Over & Sistem de Cupoane
**Rută:** Drawer lateral pe orice pagină  
Gestionarea cantităților în timp real, calcul automat TVA 19%, bară de progres pentru transport gratuit și aplicare cupoane (ex: `BROWVIP15`).
![Coș de Cumpărături](docs_screenshots/05_cart_drawer.png)

### 8.6. Modulul Inovativ Original: BrowGrowth Diagnostic & Timeline Simulator
**Rută:** `/simulator`  
Chestionar dermatologic în 3 pași cu recomandare personalizată de rutină și slider interactiv SVG pe săptămâni (W2, W4, W8, W12) pentru simularea densității.
![Simulator & Diagnostic](docs_screenshots/06_simulator.png)

### 8.7. Finalizare Comandă (Checkout B2C) & Plată Securizată Stripe
**Rută:** `/checkout`  
Formular de livrare complet, suport pentru Persoană Fizică / Juridică (cu validare CUI) și integrare Stripe SDK pentru plăți cu cardul în sandbox test.
![Checkout](docs_screenshots/07_checkout.png)

### 8.8. Confirmare Comandă & Experiență Post-Achiziție
**Rută:** `/checkout/success`  
Afișează numărul de comandă generat automat, sumarul articolelor achiziționate, confirmarea stocului actualizat și descărcare factură.
![Confirmare Comandă](docs_screenshots/08_order_success.png)

### 8.9. Modul Nativ de Facturare Fiscală (Format A4 Tipăribil / PDF)
**Rută:** `/invoice/[id]`  
Factură fiscală românească conformă Codului Fiscal (Legea 227/2015) cu serie/număr, TVA 19% defalcat separat și format gata de tipar sau export PDF.
![Factură Fiscală](docs_screenshots/09_invoice.png)

### 8.10. Panou de Administrare CRUD Produse & Comenzi
**Rută:** `/admin` (Securizat pentru contul demo evaluator)  
Dashboard complet cu indicatori financiari agregați, gestiune prețuri și stocuri în timp real și actualizare stare comenzi.
![Panou Admin](docs_screenshots/10_admin_dashboard.png)

### 8.11. Modul de Autentificare & Cont Demo Evaluator 1-Click
**Rută:** `/auth/login`  
Sistem de autentificare securizat prin Supabase Auth cu card dedicat pentru comisia de evaluare (autentificare printr-un singur click fără tastare manuală).
![Autentificare Evaluator](docs_screenshots/11_login_evaluator.png)

---

## 9. Raport Oficial Google PageSpeed Insights (>90 Scor)

Raportul oficial generat de Google PageSpeed Insights pe profilul **Mobile** confirmă performanța de nivel enterprise a arhitecturii Next.js 15:

![Google PageSpeed Insights Mobile](docs_screenshots/12_pagespeed_insights.png)

### Rezultate Măsurate:
- **Performance:** **98 / 100**
- **Accessibility:** **95 / 100**
- **Best Practices:** **100 / 100**
- **SEO:** **100 / 100**
- **Agentic Browsing:** **2 / 2**

### Factorii Tehnici ai Performanței:
1. **Next.js 15 Server Components:** Randare server-side cu transfer minim de JavaScript către client (~103 kB First Load JS comun).
2. **Optimizare Imagini (`next/image`):** Conversie automată în formatele AVIF și WebP la dimensiunile optime ale ecranului.
3. **Zero Layout Shift (CLS = 0):** Încărcare fonturi cu `next/font/google` și fallback metric proporționat.
4. **CSS Atomic cu Tailwind:** Stiluri purjate automat la build, eliminând orice overhead CSS neutilizat.
5. **Validare Core Web Vitals:** LCP (Largest Contentful Paint) < 1.2s, FID < 50ms, CLS < 0.01.

---
*Proiect realizat conform standardelor de excelență software de către echipa MAG Laboratories Bucharest.*

