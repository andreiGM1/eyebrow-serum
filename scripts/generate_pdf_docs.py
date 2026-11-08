import os
import base64
import subprocess

def get_base64_img(rel_path):
    abs_path = os.path.abspath(rel_path)
    if not os.path.exists(abs_path):
        return ""
    with open(abs_path, "rb") as f:
        data = f.read()
    return f"data:image/png;base64,{base64.b64encode(data).decode('utf-8')}"

screenshots = {
    'home': get_base64_img('docs_screenshots/01_homepage.png'),
    'search': get_base64_img('docs_screenshots/02_search_modal.png'),
    'catalog': get_base64_img('docs_screenshots/03_catalog.png'),
    'product': get_base64_img('docs_screenshots/04_product_detail.png'),
    'cart': get_base64_img('docs_screenshots/05_cart_drawer.png'),
    'simulator': get_base64_img('docs_screenshots/06_simulator.png'),
    'checkout': get_base64_img('docs_screenshots/07_checkout.png'),
    'success': get_base64_img('docs_screenshots/08_order_success.png'),
    'invoice': get_base64_img('docs_screenshots/09_invoice.png'),
    'admin': get_base64_img('docs_screenshots/10_admin_dashboard.png'),
    'login': get_base64_img('docs_screenshots/11_login_evaluator.png'),
    'pagespeed': get_base64_img('docs_screenshots/12_pagespeed_insights.png'),
}

html_content = f"""<!DOCTYPE html>
<html lang="ro">
<head>
<meta charset="UTF-8">
<title>Documentație Tehnică și Comercială - MAG Laboratories EVERGROW</title>
<style>
  @page {{
    size: A4;
    margin: 15mm 15mm 15mm 15mm;
  }}
  @page :left {{
    @bottom-left {{
      content: "MAG Laboratories • EVERGROW";
      font-size: 8pt;
      color: #777;
    }}
  }}
  
  body {{
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
    color: #1A1F1D;
    line-height: 1.55;
    font-size: 10pt;
    margin: 0;
    padding: 0;
    background-color: #ffffff;
  }}

  h1, h2, h3, h4 {{
    font-family: "Georgia", "Times New Roman", serif;
    color: #0E1412;
    margin-top: 1.2em;
    margin-bottom: 0.4em;
    font-weight: 700;
  }}

  h1 {{ font-size: 20pt; border-bottom: 2px solid #C5A03C; padding-bottom: 6px; }}
  h2 {{ font-size: 14pt; color: #1B2621; border-bottom: 1px solid #E5E0D8; padding-bottom: 4px; margin-top: 1.4em; }}
  h3 {{ font-size: 11pt; color: #9A7B2C; margin-top: 1em; }}
  h4 {{ font-size: 10pt; color: #2A3B32; }}

  p, li {{
    text-align: justify;
  }}

  ul, ol {{
    margin-top: 0.3em;
    margin-bottom: 0.6em;
    padding-left: 20px;
  }}

  li {{
    margin-bottom: 4px;
  }}

  code {{
    font-family: "Consolas", "Courier New", monospace;
    font-size: 8.5pt;
    background: #F4F1EA;
    padding: 2px 5px;
    border-radius: 4px;
    border: 1px solid #E2DCCF;
    color: #7A5C1B;
  }}

  pre {{
    font-family: "Consolas", "Courier New", monospace;
    font-size: 8pt;
    background: #0E1412;
    color: #E2ECE6;
    padding: 10px 14px;
    border-radius: 8px;
    overflow-x: auto;
    border-left: 4px solid #C5A03C;
    line-height: 1.4;
  }}

  table {{
    width: 100%;
    border-collapse: collapse;
    margin: 12px 0 16px 0;
    font-size: 8.5pt;
  }}

  th, td {{
    border: 1px solid #D8D2C5;
    padding: 7px 10px;
    text-align: left;
    vertical-align: top;
  }}

  th {{
    background-color: #F6F3EC;
    color: #141B18;
    font-weight: 700;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  }}

  tr:nth-child(even) {{
    background-color: #FAF8F5;
  }}

  .cover-page {{
    height: 100%;
    min-height: 250mm;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    page-break-after: always;
    border: 3px double #C5A03C;
    padding: 35px 30px;
    box-sizing: border-box;
    background: radial-gradient(circle at 80% 20%, rgba(197, 160, 60, 0.08), transparent 60%);
  }}

  .cover-header {{
    border-bottom: 1.5px solid #C5A03C;
    padding-bottom: 15px;
  }}

  .cover-brand {{
    font-size: 26pt;
    font-family: "Georgia", serif;
    letter-spacing: 4px;
    font-weight: bold;
    color: #0E1412;
    margin: 0;
  }}

  .cover-tagline {{
    font-size: 9pt;
    letter-spacing: 2px;
    color: #9A7B2C;
    text-transform: uppercase;
    font-weight: 600;
    margin-top: 4px;
  }}

  .cover-body {{
    margin: auto 0;
    padding: 30px 0;
  }}

  .cover-title {{
    font-size: 24pt;
    font-family: "Georgia", serif;
    font-weight: 700;
    color: #0E1412;
    line-height: 1.25;
    margin-bottom: 15px;
  }}

  .cover-subtitle {{
    font-size: 13pt;
    color: #3C4A42;
    font-weight: 400;
    line-height: 1.45;
    margin-bottom: 25px;
  }}

  .badge-grid {{
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 10px;
    margin-top: 25px;
  }}

  .badge-card {{
    background: #FAF8F5;
    border: 1px solid #D8D2C5;
    border-radius: 8px;
    padding: 10px;
    text-align: center;
  }}

  .badge-value {{
    font-size: 16pt;
    font-weight: bold;
    color: #15803D;
    font-family: "Consolas", monospace;
  }}

  .badge-label {{
    font-size: 7.5pt;
    text-transform: uppercase;
    color: #666;
    letter-spacing: 0.5px;
    margin-top: 2px;
  }}

  .cover-footer {{
    border-top: 1px solid #E5E0D8;
    padding-top: 15px;
    font-size: 9pt;
    color: #555;
    display: flex;
    justify-content: space-between;
  }}

  .page-break {{
    page-break-before: always;
  }}

  .avoid-break {{
    page-break-inside: avoid;
  }}

  .feature-box {{
    border: 1px solid #E2DCCF;
    border-radius: 8px;
    padding: 12px;
    margin-bottom: 20px;
    background: #FAF8F5;
    page-break-inside: avoid;
  }}

  .feature-title {{
    font-size: 11pt;
    font-weight: bold;
    color: #0E1412;
    margin: 0 0 4px 0;
    font-family: "Georgia", serif;
  }}

  .feature-route {{
    font-family: "Consolas", monospace;
    font-size: 8pt;
    color: #9A7B2C;
    background: #EFE9DF;
    display: inline-block;
    padding: 2px 6px;
    border-radius: 4px;
    margin-bottom: 6px;
  }}

  .feature-desc {{
    font-size: 8.5pt;
    color: #333;
    margin-bottom: 8px;
    line-height: 1.45;
  }}

  .feature-img {{
    width: 100%;
    border-radius: 6px;
    border: 1px solid #C8C2B5;
    box-shadow: 0 2px 6px rgba(0,0,0,0.06);
    display: block;
  }}

  .callout {{
    background: #F4EFE6;
    border-left: 3px solid #C5A03C;
    padding: 10px 14px;
    border-radius: 0 6px 6px 0;
    margin: 12px 0;
    font-size: 9pt;
  }}

  .footer-note {{
    font-size: 8pt;
    color: #777;
    text-align: center;
    margin-top: 30px;
    border-top: 1px solid #E5E0D8;
    padding-top: 10px;
  }}
</style>
</head>
<body>

<!-- 1. COVER PAGE -->
<div class="cover-page">
  <div class="cover-header">
    <div class="cover-brand">MAG LABORATORIES</div>
    <div class="cover-tagline">ATELIER BOTANIQUE • BUCHAREST • EST. 2026</div>
  </div>

  <div class="cover-body">
    <div class="cover-title">DOCUMENTAȚIE TEHNICĂ ȘI COMERCIALĂ</div>
    <div class="cover-subtitle">
      Arhitectura Software, Modelul de Afaceri B2C, Matricea Lipidelor Active & Modulul Inovativ de Diagnosticare Foliculară Interactivă
    </div>

    <div style="font-size: 9.5pt; line-height: 1.6; color: #2B3830; background: #FAF8F5; border: 1px solid #E0DACD; border-radius: 8px; padding: 14px 18px; margin-bottom: 20px;">
      <div><strong>Proiect:</strong> EVERGROW by MAG Laboratories (Magazin Online B2C de Lux)</div>
      <div><strong>URL Producție Live:</strong> <a href="https://eyebrow-serum.vercel.app" style="color: #9A7B2C; text-decoration: none;">https://eyebrow-serum.vercel.app</a></div>
      <div><strong>Repository GitHub:</strong> <a href="https://github.com/andreiGM1/eyebrow-serum" style="color: #9A7B2C; text-decoration: none;">github.com/andreiGM1/eyebrow-serum</a></div>
      <div><strong>Stack Tehnologic:</strong> Next.js 15 (App Router), TypeScript, Tailwind CSS, Supabase PostgreSQL, Stripe Sandbox</div>
      <div><strong>Data Publicării:</strong> Noiembrie 2026 • Versiunea 1.0.0 Producție</div>
    </div>

    <div class="badge-grid">
      <div class="badge-card">
        <div class="badge-value">98</div>
        <div class="badge-label">PageSpeed Mobile</div>
      </div>
      <div class="badge-card">
        <div class="badge-value">95</div>
        <div class="badge-label">Accessibility</div>
      </div>
      <div class="badge-card">
        <div class="badge-value">100</div>
        <div class="badge-label">Best Practices</div>
      </div>
      <div class="badge-card">
        <div class="badge-value">100</div>
        <div class="badge-label">SEO & OpenGraph</div>
      </div>
    </div>
  </div>

  <div class="cover-footer">
    <div>Elaborat pentru evaluarea universitară / academică a proiectului de comerț electronic.</div>
    <div>București, România</div>
  </div>
</div>

<!-- 2. CUPRINS & REZUMAT EXECUTIV -->
<div class="page-break"></div>

<h2>Cuprinsul Documentației</h2>
<ol style="line-height: 1.8; font-size: 9.5pt;">
  <li><strong>Tip de Comerț Electronic: B2C (Business-to-Consumer)</strong> — Justificarea modelului direct-to-consumer și eliminarea intermediarilor.</li>
  <li><strong>Produse Comercializate & Rationale de Nișă</strong> — Clean Chemistry, diferențierea prostaglandin-free și profilul buyer persona.</li>
  <li><strong>Site Model: Studiu Comparativ după Branduri Consacrate</strong> — Analiză The Ordinary, Grande Cosmetics și RapidBrow.</li>
  <li><strong>Platformă Software Utilizată: Custom Next.js 15 vs. Shopify vs. WooCommerce</strong> — Justificare tehnică și economică.</li>
  <li><strong>Tehnologii & Limbaje Folosite</strong> — Stack complet, securitate TypeScript și sistemul bivalent Dual-Theme.</li>
  <li><strong>Baza de Date: Diagramă Relațională și Schema Tabelelor</strong> — Cele 7 tabele Supabase PostgreSQL, chei străine și politici RLS.</li>
  <li><strong>Ghid de Publicare & Configurare Cloud</strong> — Setup Vercel, Supabase Cloud și Stripe Sandbox.</li>
  <li><strong>Galerie de Capturi de Ecran & Funcționalități Detaliate</strong> — Cele 11 componente și fluxuri cheie ale aplicației.</li>
  <li><strong>Audit Oficial Google PageSpeed Insights (>90 Scor)</strong> — Validare Core Web Vitals și optimizări de performanță.</li>
</ol>

<hr style="border: none; border-top: 1px solid #E5E0D8; margin: 25px 0;">

<h2>1. Tip de Comerț Electronic: B2C (Business-to-Consumer)</h2>
<p>
Proiectul <strong>EVERGROW by MAG Laboratories</strong> adoptă modelul de comerț electronic <strong>B2C (Business-to-Consumer)</strong> din considerente economice, dermatologice și de experiență a utilizatorului:
</p>
<ul>
  <li><strong>D2C (Direct-to-Consumer) fără intermediari:</strong> Permite laboratorului din București să livreze formule proaspăt compuse (micro-batch) direct consumatorului final, eliminând adaosurile comerciale ale rețelelor tradiționale de retail/farmacii (care adaugă între 40% și 70% la prețul final de vânzare).</li>
  <li><strong>Experiență personalizată și educație dermato-cosmetică:</strong> Îngrijirea sprâncenelor și genelor necesită consiliere specifică privind fazele biologice (anagen, catagen, telogen). Modelul B2C permite integrarea directă a simulatorului interactiv de diagnostic și a calculatorului de dozaj.</li>
  <li><strong>Fidelizare și recurență:</strong> Ciclul de utilizare a unui flacon de 3 ml este de 90 de zile. Modelul B2C digital permite notificarea clienților pentru reînnoirea curei sau trecerea la pachete semestriale (<em>Duo Pack 6 Luni</em>).</li>
</ul>

<div class="callout">
  <strong>Avantaj Cheie B2C:</strong> Datele despre profilul dermatologic al clienților sunt colectate direct prin quiz-ul integrat, permițând optimizarea formulărilor viitoare fără pierderi de semnal prin distribuitori terți.
</div>

<h2>2. Produse Comercializate & Rationale de Nișă</h2>
<h3>Nișa Cosmetică a Serurilor de Sprâncene (Eyebrow & Lash Growth)</h3>
<p>
Sprâncenele au un impact arhitectural fundamental asupra simetriei faciale. Piața produselor pentru densificarea sprâncenelor a înregistrat o creștere anuală de peste 8.5% (CAGR), alimentată de tendința machiajului minimalist ("clean girl aesthetic") și de efectele pe termen lung ale pensatului excesiv din trecut sau ale laminărilor chimice repetate.
</p>

<h3>Compoziție & Inovație Curată (Clean Chemistry)</h3>
<p>
Spre deosebire de serurile de masă bazate pe analogi hormonali de prostaglandine (cum ar fi <em>Bimatoprost</em> sau <em>Isopropyl Cloprostenate</em>, asociate medical cu hiperpigmentarea pleoapelor, atrofia grăsimii periorbitale și modificarea culorii irisului), linia <strong>MAG EVERGROW</strong> folosește o <strong>Matrice Bioactivă 100% Lipidic Activă (Zero Apă, Zero Diluanți)</strong>:
</p>
<ul>
  <li><strong>Ricinus Communis Seed Oil (Ulei Virgin de Ricin presat la rece):</strong> Bogat în 85-90% acid ricinoleic, sigilează cuticula și hrănește teaca rădăcinii foliculare.</li>
  <li><strong>Rosmarinus Officinalis Leaf Oil (Ulei de Rozmarin mediteranean):</strong> Stimulează microcirculația capilară din jurul papilei dermice, stimulând trezirea foliculilor dorminzi.</li>
  <li><strong>Simmondsia Chinensis Seed Oil (Ulei Pur de Jojoba):</strong> Esteri biomimetici de ceară ce dizolvă dopurile de sebum întărit și deblochează porii.</li>
  <li><strong>Tocopherol (Vitamina E Activă):</strong> Scut antioxidant împotriva degradării keratinei tinere cauzate de razele UV.</li>
</ul>

<!-- 3. STUDIU COMPARATIV & ANALIZA SOFTWARE -->
<div class="page-break"></div>

<h2>3. Site Model: Studiu Comparativ după Branduri Consacrate</h2>
<p>
Pentru proiectarea arhitecturii și a experienței utilizatorului (UX/UI), au fost analizate trei dintre cele mai reprezentative mărci internaționale din nișa îngrijirii foliculare:
</p>

<table>
  <thead>
    <tr>
      <th style="width: 20%;">Brand Analizat</th>
      <th style="width: 25%;">Puncte Forte</th>
      <th style="width: 25%;">Puncte Slabe / Vulnerabilități</th>
      <th style="width: 30%;">Soluția Implementată în EVERGROW</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>The Ordinary</strong><br><em>Multi-Peptide Lash and Brow</em></td>
      <td>Preț accesibil, transparență la nivel de ingrediente, notorietate globală.</td>
      <td>Formulă apoasă cu absorbție rapidă, dar eficiență scăzută pe goluri cronice; lipsa unui simulator vizual de tratament.</td>
      <td><strong>Formulă 100% lipidică concentrată</strong> presată la rece + <strong>Simulator interactiv pe săptămâni</strong> cu calculator de dozaj.</td>
    </tr>
    <tr>
      <td><strong>Grande Cosmetics</strong><br><em>GrandeBROW</em></td>
      <td>Notorietate ridicată, rezultate rapide prin stimulare puternică.</td>
      <td>Utilizează derivați sintetici de prostaglandine; numeroase plângeri de iritații oculare, cearcăne întunecate și pierdere de țesut adipos.</td>
      <td><strong>Zero Prostaglandine:</strong> formulă sigură oftalmologic, tolerată chiar și de ochi foarte sensibili sau purtători de lentile de contact.</td>
    </tr>
    <tr>
      <td><strong>RapidBrow</strong><br><em>Eyebrow Enhancing Serum</em></td>
      <td>Aplicator comod cu periuță, prezență solidă în retail.</td>
      <td>Lipsa transparenței privind procentele active; experiență e-commerce statică, fără recomandare dinamică de rutină.</td>
      <td><strong>Quiz de diagnostic în 3 pași</strong> + Algoritm de calcul dozaj și longevitate flacon în funcție de sensibilitate și grad de degradare.</td>
    </tr>
  </tbody>
</table>

<h2>4. Platformă Software Utilizată: Analiză Custom vs. Soluții Comerciale</h2>
<p>
Alegerea arhitecturii tehnologice a fost dictată de cerințele stricte de performanță, personalizare și autonomie comercială:
</p>

<table>
  <thead>
    <tr>
      <th style="width: 22%;">Criteriu de Evaluare</th>
      <th style="width: 26%;">Shopify (Comercial SaaS)</th>
      <th style="width: 26%;">WooCommerce (WordPress)</th>
      <th style="width: 26%;">Stack-ul Custom (Next.js 15 + Supabase)</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Costuri Licențiere</strong></td>
      <td>$39 - $399 / lună + comision 2% tranzacție</td>
      <td>Gratuit de bază, dar plugin-urile de calitate costă $200-$500/an</td>
      <td><strong>100% Open-Source / Generos Free Tier</strong> (Zero comisioane pe platformă)</td>
    </tr>
    <tr>
      <td><strong>Performanță & PageSpeed</strong></td>
      <td>50 - 75 pe mobil din cauza scripturilor terțe</td>
      <td>40 - 65 pe mobil din cauza bazei monolitice PHP</td>
      <td><strong>95 - 100 PageSpeed:</strong> Server Components, streaming, imagini AVIF/WebP</td>
    </tr>
    <tr>
      <td><strong>Personalizare Originală</strong></td>
      <td>Limitată la Liquid / Theme Engine rigid</td>
      <td>Posibilă, dar creează conflicte frecvente de plugin-uri</td>
      <td><strong>Libertate Totală:</strong> Algoritm de simulator vizual React + Slider interactiv SVG</td>
    </tr>
    <tr>
      <td><strong>Securitate Date</strong></td>
      <td>Găzduit de terți (vendor lock-in)</td>
      <td>Vulnerabilități frecvente SQL Injection/Plugins neactualizate</td>
      <td><strong>Row Level Security (RLS)</strong> nativă în PostgreSQL Supabase la nivel de rând</td>
    </tr>
    <tr>
      <td><strong>Facturare Fiscală Românească</strong></td>
      <td>Necesită aplicații plătite suplimentare</td>
      <td>Necesită plugin PDF Invoice configurat manual</td>
      <td><strong>Modul Nativ Integrat:</strong> Facturare fiscală automată conform Legii 227/2015 (TVA 19%, serie/număr, print A4/PDF)</td>
    </tr>
  </tbody>
</table>

<!-- 4. TEHNOLOGII & BAZA DE DATE -->
<div class="page-break"></div>

<h2>5. Tehnologii & Limbaje Folosite</h2>
<ul>
  <li><strong>Limbaj Principal:</strong> TypeScript (strict type safety, zero <code>any</code> necontrolat la runtime).</li>
  <li><strong>Runtime & Build Engine:</strong> Node.js v24 LTS.</li>
  <li><strong>Frontend Framework:</strong> Next.js 15 (App Router, React 19 Server Components, Client Components optimizate).</li>
  <li><strong>Stilizare & Design System:</strong> Tailwind CSS cu paletă cromatică de lux și suport complet bivalent <strong>Dual Theme (Light Mode - Fildeș Cald <code>#FAF8F5</code> / Dark Mode - Obsidian <code>#0B0E0D</code>)</strong>, accente de aur de atelier (<code>#C5A03C</code>) și verde botanic (<code>#25332C</code>).</li>
  <li><strong>Iconografie & Animații:</strong> Lucide React Icons cu micro-interacțiuni animate, comutator rotativ temă Soare/Lună, Canvas Confetti la finalizarea comenzii.</li>
  <li><strong>Bază de Date & Backend:</strong> Supabase (PostgreSQL, Row Level Security, Triggers SQL pentru decrementare automată stoc, Supabase Auth).</li>
  <li><strong>Procesare Plăți Electronice:</strong> Stripe SDK & Elements (mod Sandbox Test cu card universal <code>4242 4242 4242 4242</code>).</li>
  <li><strong>Generare Documente Fiscale:</strong> Modul dedicat HTML-to-Print / PDF print-engine conform Legii nr. 227/2015 privind Codul Fiscal.</li>
</ul>

<h2>6. Baza de Date: Diagramă Relațională și Schema Tabelelor</h2>
<p>
Baza de date relațională este găzduită în PostgreSQL pe Supabase Cloud și cuprinde 7 tabele principale:
</p>

<pre>
   +-------------------+        +--------------------+
   |     PROFILES      |        |     CATEGORIES     |
   +-------------------+        +--------------------+
   | id (PK, uuid)     |        | id (PK, uuid)      |
   | email             |        | slug (UK)          |
   | full_name         |        | name               |
   | phone             |        | description        |
   | role (user/admin) |        | display_order      |
   | created_at        |        | image_url          |
   +--------+----------+        +---------+----------+
            | 1                           | 1
            |                             |
            | N                           | N
   +--------v----------+        +---------v----------+
   |      ORDERS       |        |      PRODUCTS      |
   +-------------------+        +--------------------+
   | id (PK, uuid)     |        | id (PK, uuid)      |
   | order_number (UK) |        | slug (UK)          |
   | invoice_series    |        | category_id (FK)   |
   | invoice_number    |        | name, subtitle     |
   | user_id (FK)      |        | price, compare_at  |
   | status, payment   |        | stock, sku         |
   | customer_name     |        | images (text[])    |
   | shipping_address  |        | ingredients (jsonb)|
   | billing_address   |        | benefits, inci     |
   | subtotal, total   |        | is_featured, badge |
   | tax_amount (19%)  |        +---------+----------+
   +--------+----------+                  | 1
            | 1                           |
            |                             |
            | N                           | N
   +--------v-----------------------------v----------+
   |                   ORDER_ITEMS                   |
   +-------------------------------------------------+
   | id (PK, uuid), order_id (FK), product_id (FK)   |
   | product_name, unit_price, quantity, total_price |
   +-------------------------------------------------+
</pre>

<h3>Reguli de Securitate RLS (Row Level Security)</h3>
<ul>
  <li><code>products</code> și <code>categories</code>: Citire publică liberă (<code>SELECT true</code>); modificarea (<code>INSERT</code>, <code>UPDATE</code>, <code>DELETE</code>) este permisă exclusiv utilizatorilor cu rol de administrator.</li>
  <li><code>orders</code>: Clienții își pot vizualiza exclusiv comenzile proprii (<code>auth.uid() = user_id</code>), în timp ce administratorul beneficiază de acces global.</li>
  <li><strong>Trigger SQL Automat:</strong> La marcarea unei comenzi ca fiind plătită (<code>status = 'paid'</code>), triggerul <code>trg_decrement_stock_on_paid</code> scade instant cantitatea din stocul fiecărui produs comandat.</li>
</ul>

<!-- 7. GHID DE PUBLICARE -->
<div class="page-break"></div>

<h2>7. Ghid de Publicare (Deployment pe Vercel + Supabase)</h2>

<h3>Pasul 1: Conectare Supabase Cloud (Activ & Verificat)</h3>
<ul>
  <li><strong>Project ID:</strong> <code>bywgvtsmcdvbknhtsblx</code> (Regiunea <code>eu-west-2</code> - London / Europa)</li>
  <li><strong>Project URL:</strong> <code>https://bywgvtsmcdvbknhtsblx.supabase.co</code></li>
  <li>Tabele create și populate prin scripturile <code>schema.sql</code> și <code>seed.sql</code>, incluzând politicile RLS și trigger-ul de sincronizare a stocului.</li>
</ul>

<h3>Pasul 2: Procesator Plăți Stripe Test Mode</h3>
<ul>
  <li>Contul Stripe configurat în <strong>Sandbox Test Mode</strong>.</li>
  <li>Plățile se testează în mod complet cu cardul de test <code>4242 4242 4242 4242</code>, orice dată viitoare de expirare și orice CVC (ex: <code>123</code>).</li>
  <li>Webhook-ul Stripe sincronizează starea tranzacției cu baza de date Supabase.</li>
</ul>

<h3>Pasul 3: Deployment pe Vercel (Production Live)</h3>
<ul>
  <li><strong>Repository Git:</strong> <code>https://github.com/andreiGM1/eyebrow-serum</code></li>
  <li><strong>Domeniu Public Live:</strong> <a href="https://eyebrow-serum.vercel.app" style="color: #9A7B2C;">https://eyebrow-serum.vercel.app</a></li>
  <li><strong>Variabile de mediu configurate în producție:</strong>
    <pre>
NEXT_PUBLIC_SITE_URL=https://eyebrow-serum.vercel.app
NEXT_PUBLIC_SUPABASE_URL=https://bywgvtsmcdvbknhtsblx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
ADMIN_EMAIL=evaluator@maglaboratories.com
    </pre>
  </li>
  <li>Build-ul este compilat optimizat pe arhitectura Next.js 15 cu Node.js 24 LTS, având status <strong>READY</strong>.</li>
</ul>

<hr style="border: none; border-top: 1px solid #E5E0D8; margin: 25px 0;">

<h2>8. Galerie de Capturi de Ecran & Funcționalități Detaliate</h2>
<p>
Următoarele secțiuni prezintă fiecare funcționalitate implementată în magazinul online EVERGROW, însoțită de capturi de ecran din mediul de producție live:
</p>

<!-- 8.1 HOMEPAGE -->
<div class="feature-box">
  <div class="feature-title">8.1. Pagina Principală (Homepage) & Hero de Atelier</div>
  <div class="feature-route">Ruta: /</div>
  <div class="feature-desc">
    Secțiunea Hero conține brandingul artizanal MAG Laboratories București, titlul principal "Botanică de Precizie. Fără Prostaglandine", bara promoțională superioară cu prag de transport gratuit, flaconul auriu 3ml cu badge de autenticitate și acces direct la Mega-Meniul de categorii.
  </div>
  <img class="feature-img" src="{screenshots['home']}" alt="Homepage">
</div>

<!-- 8.2 CAUTARE LIVE -->
<div class="feature-box">
  <div class="feature-title">8.2. Căutare Live Instantanee (Debounce AJAX Search Modal)</div>
  <div class="feature-route">Ruta: Activabil prin butonul de căutare / scurtătură tastatură</div>
  <div class="feature-desc">
    Modal dedicat de căutare predictivă cu debounce de 250ms. Filtrează simultan prin denumirea produsului, descrierea scurtă și lista de ingrediente INCI (ex: căutare după "ricin" găsește serurile și uleiul demachiant), afișând imagini, preț și badge de stoc.
  </div>
  <img class="feature-img" src="{screenshots['search']}" alt="Search Modal">
</div>

<!-- 8.3 CATALOG -->
<div class="feature-box page-break">
  <div class="feature-title">8.3. Catalog de Produse cu Filtrare Multi-Criterială & Sortare</div>
  <div class="feature-route">Ruta: /catalog</div>
  <div class="feature-desc">
    Grid responsive cu cele 8 produse unice, fiecare având propria fotografie de studio. Include filtrare pe cele 4 categorii botanice, slider de preț dinamic (0-500 RON), sortare după cele mai populare / preț / rating și sincronizare bidirecțională cu parametrii URL (<code>?category=...</code>).
  </div>
  <img class="feature-img" src="{screenshots['catalog']}" alt="Catalog">
</div>

<!-- 8.4 PRODUS -->
<div class="feature-box">
  <div class="feature-title">8.4. Fișa Tehnică a Produsului & Galerie Interactivă</div>
  <div class="feature-route">Ruta: /product/mag-evergrow-lash-brow-serum-3ml</div>
  <div class="feature-desc">
    Pagină de prezentare clinică ce include galeria foto cu zoom, selector de cantitate, badge-ul dinamic de stoc (verde "În stoc" sau portocaliu "Stoc redus"), descompunerea procentuală a ingredientelor active, ghid pas cu pas de utilizare și recenzii verificate ale clienților.
  </div>
  <img class="feature-img" src="{screenshots['product']}" alt="Product Detail">
</div>

<!-- 8.5 COS DE CUMPARATURI -->
<div class="feature-box page-break">
  <div class="feature-title">8.5. Coșul de Cumpărături Slide-Over (Cart Drawer) & Cupoane</div>
  <div class="feature-route">Ruta: Activabil din header pe orice pagină</div>
  <div class="feature-desc">
    Panou lateral animat cu gestionarea cantităților în timp real, calcul transparent al TVA-ului de 19%, bară progresivă pentru livrare gratuită la comenzi de peste 200 RON și sistem de cupoane de reducere (ex: <code>BROWVIP15</code> pentru 15% discount instant).
  </div>
  <img class="feature-img" src="{screenshots['cart']}" alt="Cart Drawer">
</div>

<!-- 8.6 SIMULATOR -->
<div class="feature-box">
  <div class="feature-title">8.6. Modul Inovativ Original: BrowGrowth Diagnostic & Timeline Simulator</div>
  <div class="feature-route">Ruta: /simulator</div>
  <div class="feature-desc">
    Elementul de originalitate tehnică cerut de barem: un quiz de diagnostic dermatologic în 3 pași care evaluează tipul sprâncenei, gradul de subțiere și sensibilitatea oculară. Include un slider interactiv SVG pe săptămâni (Săptămâna 2, 4, 8, 12) ce simulează densificarea arcului și adaugă rutina recomandată în coș printr-un singur click cu discount promoțional.
  </div>
  <img class="feature-img" src="{screenshots['simulator']}" alt="Simulator">
</div>

<!-- 8.7 CHECKOUT -->
<div class="feature-box page-break">
  <div class="feature-title">8.7. Finalizare Comandă (Checkout B2C) & Plată Securizată Stripe</div>
  <div class="feature-route">Ruta: /checkout</div>
  <div class="feature-desc">
    Formular complet de comandă cu validare live a datelor de livrare, comutator între Persoană Fizică și Persoană Juridică (cu câmpuri dedicate pentru CUI și Registrul Comerțului) și integrare directă cu Stripe SDK pentru plăți securizate cu cardul în mediu de test.
  </div>
  <img class="feature-img" src="{screenshots['checkout']}" alt="Checkout">
</div>

<!-- 8.8 SUCCES -->
<div class="feature-box">
  <div class="feature-title">8.8. Confirmare Comandă & Animație de Celebrare</div>
  <div class="feature-route">Ruta: /checkout/success</div>
  <div class="feature-desc">
    Ecran de succes generat automat la finalizarea tranzacției. Declanșează animația de confetti pe ecran, afișează numărul unic de comandă (ex: <code>MAG-2026-1003</code>), sumarul articolelor achiziționate, adresa de expediere și buton direct de descărcare a facturii fiscale în format A4.
  </div>
  <img class="feature-img" src="{screenshots['success']}" alt="Order Success">
</div>

<!-- 8.9 FACTURA FISCALA -->
<div class="feature-box page-break">
  <div class="feature-title">8.9. Modul Nativ de Facturare Fiscală (Format A4 Tipăribil)</div>
  <div class="feature-route">Ruta: /invoice/[id]</div>
  <div class="feature-desc">
    Document fiscal conform Legii nr. 227/2015 privind Codul Fiscal. Cuprinde antetul complet al furnizorului (MAG Laboratories SRL, CUI, sediu social București), datele de facturare ale cumpărătorului, defalcarea cotei de TVA 19%, serie/număr unic și buton integrat de tipărire directă în PDF.
  </div>
  <img class="feature-img" src="{screenshots['invoice']}" alt="Invoice">
</div>

<!-- 8.10 ADMIN -->
<div class="feature-box">
  <div class="feature-title">8.10. Panou de Administrare & Management CRUD</div>
  <div class="feature-route">Ruta: /admin (Securizat exclusiv pentru contul demo evaluator)</div>
  <div class="feature-desc">
    Dashboard administrativ protejat cu metrici de business agregate (Venituri totale, Număr comenzi, Coș mediu), tabel complet CRUD pentru editarea prețurilor și stocurilor de produse, selector de schimbare a statusului comenzilor (în procesare, expediat, livrat) și tabel al clienților înregistrați.
  </div>
  <img class="feature-img" src="{screenshots['admin']}" alt="Admin Dashboard">
</div>

<!-- 8.11 LOGIN -->
<div class="feature-box page-break">
  <div class="feature-title">8.11. Autentificare Securizată & Card Demo Evaluator 1-Click</div>
  <div class="feature-route">Ruta: /auth/login</div>
  <div class="feature-desc">
    Modul de autentificare bazat pe Supabase Auth. Pentru a facilita evaluarea academică a comisiei, include un card special "Cont Demo Evaluator" cu butonul galben "Autentificare 1-Click", care populează instant credențialele oficiale și autentifică utilizatorul fără pași manuali suplimentari.
  </div>
  <img class="feature-img" src="{screenshots['login']}" alt="Login Evaluator">
</div>

<!-- 9. PAGESPEED INSIGHTS -->
<div class="feature-box">
  <div class="feature-title">9. Raport Oficial Google PageSpeed Insights (>90 Scor)</div>
  <div class="feature-route">Raport Google PageSpeed Mobile (8 Nov 2026, 21:54:59)</div>
  <div class="feature-desc">
    Captura de ecran oficială generată de instrumentul Google PageSpeed Insights pe profilul Mobile pentru site-ul live <code>https://eyebrow-serum.vercel.app/</code>, demonstrând performanța de nivel enterprise:
    <strong>Performance: 98/100</strong>, <strong>Accessibility: 95/100</strong>, <strong>Best Practices: 100/100</strong>, <strong>SEO: 100/100</strong> și <strong>Agentic Browsing: 2/2</strong>.
  </div>
  <img class="feature-img" src="{screenshots['pagespeed']}" alt="Google PageSpeed Insights Mobile 98 Score">
</div>

<div class="callout avoid-break">
  <strong>Factorii Tehnici ai Scorului de 98%:</strong>
  <ul style="margin: 4px 0 0 0; padding-left: 18px; font-size: 8.5pt;">
    <li><strong>Next.js 15 Server Components:</strong> HTML generat la compilare (SSG/ISR) cu hidratare minimală pe client.</li>
    <li><strong>Format Imagini AVIF/WebP:</strong> Redimensionate automat pe baza viewport-ului prin componenta <code>next/image</code>.</li>
    <li><strong>Zero Layout Shift (CLS = 0):</strong> Fonturi optimizate local prin <code>next/font/google</code> cu parametri metrici de fallback.</li>
    <li><strong>CSS Atomic cu Tailwind:</strong> Bundle CSS comprimat de sub 15 kB, fără clase neutilizate la runtime.</li>
  </ul>
</div>

<div class="footer-note">
  DOCUMENTAȚIE TEHNICĂ ȘI COMERCIALĂ • MAG LABORATORIES BUCHAREST • PROIECT EVERGROW 2026
</div>

</body>
</html>
"""

with open("DOCUMENTATIE_PROIECT.html", "w", encoding="utf-8") as f:
    f.write(html_content)

print(f"Generated DOCUMENTATIE_PROIECT.html (size: {os.path.getsize('DOCUMENTATIE_PROIECT.html')} bytes)")

# Compile to PDF using headless Chrome
chrome = r"C:\Program Files\Google\Chrome\Application\chrome.exe"
html_path = os.path.abspath("DOCUMENTATIE_PROIECT.html")
pdf_path = os.path.abspath("DOCUMENTATIE_PROIECT.pdf")

print("Compiling to PDF with Google Chrome Headless...")
res = subprocess.run([
    chrome,
    "--headless=new",
    "--disable-gpu",
    "--no-pdf-header-footer",
    f"--print-to-pdf={pdf_path}",
    html_path
], capture_output=True, text=True)

if os.path.exists(pdf_path):
    print(f"SUCCESS: DOCUMENTATIE_PROIECT.pdf created! Size: {os.path.getsize(pdf_path)} bytes")
else:
    print("ERROR generating PDF:", res.stderr)
