import { Category, Product, Coupon, Review, Order } from './types';

export const INITIAL_CATEGORIES: Category[] = [
  {
    id: 'c1111111-1111-1111-1111-111111111111',
    slug: 'seruri-active',
    name: 'Seruri Active pentru Sprâncene',
    description: 'Formule concentrate botanice și lipidice pentru activarea foliculilor și densitate maximă.',
    display_order: 1,
    image_url: '/images/mag-evergrow-bottle.png',
  },
  {
    id: 'c2222222-2222-2222-2222-222222222222',
    slug: 'aplicatoare-accesorii',
    name: 'Aplicatoare & Accesorii',
    description: 'Instrumente ergonomice de laborator, micro-needling și aplicatoare sterile de precizie.',
    display_order: 2,
    image_url: '/images/category-accessories.jpg',
  },
  {
    id: 'c3333333-3333-3333-3333-333333333333',
    slug: 'pachete-tratament',
    name: 'Pachete Tratament & Promoționale',
    description: 'Cure intensive de 3-6 luni și seturi complete de regenerare cu reduceri avantajoase.',
    display_order: 3,
    image_url: '/images/category-bundles.jpg',
  },
  {
    id: 'c4444444-4444-4444-4444-444444444444',
    slug: 'demachiere-ingrijire',
    name: 'Demachiere & Îngrijire Delicată',
    description: 'Demachiere neiritantă fără sulfați sau alcool, concepută pentru a proteja foliculul.',
    display_order: 4,
    image_url: '/images/category-cleansing.jpg',
  },
];

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'p1111111-1111-1111-1111-111111111111',
    slug: 'mag-evergrow-lash-brow-serum-3ml',
    category_id: 'c1111111-1111-1111-1111-111111111111',
    name: 'MAG EVERGROW Lash & Brow Growth Serum (3 ml)',
    subtitle: 'Complex Lipidic Bioactiv 100% Natural • Fără Prostaglandine • Atelier București',
    description:
      'Formulat în micro-laboratorul nostru din inima Bucureștiului, MAG EVERGROW este un elixir concentrat de botanice pure presate la rece și vitamine protectoare celulare. Conceput special pentru persoanele care refuză compromisurile legate de sănătatea ochilor, acest ser auriu creează micro-mediul ideal pentru regenerarea arcurilor rare și întărirea rezistenței mecanice a firului de păr.\n\nFiecare micro-picătură pătrunde direct în teaca rădăcinii foliculare, refăcând sebumul natural și sigilând solzii cuticulei fragile. Prin aplicare nocturnă consecventă, sprâncenele rare își recapătă plinătatea arhitecturală, iar linia genelor devine fortificată împotriva ruperii cauzate de machiaj sau extensii.',
    short_description:
      'Ser 100% natural, prostaglandin-free, cu ulei virgin de ricin presat la rece, rozmarin mediteranean și vitamina E. Ciclu complet de 90 de zile.',
    price: 195.0,
    compare_at_price: 245.0,
    stock: 45,
    sku: 'MAG-EVG-003',
    volume: '3 ml / 0.10 fl. oz. (90 de zile)',
    images: ['/images/mag-evergrow-bottle.png'],
    active_ingredients: [
      {
        name: 'Ricinus Communis Seed Oil (Ulei Virgin de Ricin)',
        pct: 'Concentrație optimă 85-90% acid ricinoleic',
        role: 'Penetrează teaca foliculară, sigilează cuticula și creează un scut lipidic dens care previne pierderea apei trans-foliculare.',
      },
      {
        name: 'Rosmarinus Officinalis Leaf Oil (Ulei de Rozmarin)',
        pct: 'Distilat cu abur',
        role: 'Stimulează microcirculația capilară la nivelul rădăcinii și trezește foliculii dorminzi.',
      },
      {
        name: 'Simmondsia Chinensis Seed Oil (Ulei Pur de Jojoba)',
        pct: 'Presat la rece nerafinat',
        role: 'Mimică esterii sebumului uman, deblochează orificiile foliculare și conferă elasticitate.',
      },
      {
        name: 'Tocopherol (Vitamina E Pură)',
        pct: 'Antioxidant vegetal activ',
        role: 'Protejează fibrele de keratină împotriva stresului oxidativ și a razelor UV.',
      },
    ],
    full_inci:
      'Ricinus Communis (Castor) Seed Oil, Simmondsia Chinensis (Jojoba) Seed Oil, Rosmarinus Officinalis (Rosemary) Leaf Oil, Tocopherol (Vitamin E).',
    usage_instructions: [
      'Curăță tenul și zona ochilor asigurându-te că nu există urme de machiaj sau grăsime.',
      'Înmoaie aplicatorul de precizie în flacon și șterge excesul de buza recipientului de 3 ml.',
      'Aplică o peliculă fină la rădăcina sprâncenelor și pe conturul genelor superioare.',
      'Masează ușor cu periuța prin mișcări ascendente în zonele cu goluri.',
      'Lasă să acționeze peste noapte. Clătește dimineața cu apă călduță.',
    ],
    benefits: [
      'Activează foliculii inactivi prin stimularea microcirculației',
      'Reduce căderea prematură a firelor cu până la 78%',
      'Fără prostaglandine: zero risc de hiperpigmentare a pleoapelor sau schimbare a culorii irisului',
      'Formulă 100% activă: zero apă adăugată, zero conservanți sintetici',
      'Flacon de 3 ml pentru o cură completă de 90 de zile',
    ],
    rating: 4.96,
    review_count: 142,
    is_featured: true,
    badge: 'BESTSELLER',
  },
  {
    id: 'p2222222-2222-2222-2222-222222222222',
    slug: 'mag-evergrow-night-intensive-elixir-5ml',
    category_id: 'c1111111-1111-1111-1111-111111111111',
    name: 'MAG EVERGROW Night Intensive Follicle Elixir (5 ml)',
    subtitle: 'Formulă Nocturnă Avansată cu Tri-Peptide Botanice și Cafeină Bio',
    description:
      'Versiunea nocturnă de intensitate triplă este destinată sprâncenelor agresate de pensat excesiv, microblading nereușit sau laminări repetate. Îmbogățită cu peptide de cupru vegetale și cafeină bioactivă, infuzează foliculul pe durata fazei anagene de somn adânc.',
    short_description:
      'Tratament intensiv de noapte pentru goluri pronunțate și sprâncene subțiate cronic.',
    price: 249.0,
    compare_at_price: 299.0,
    stock: 28,
    sku: 'MAG-EVG-NIT-005',
    volume: '5 ml (120 de zile)',
    images: ['/images/night-elixir.jpg'],
    active_ingredients: [
      {
        name: 'Tripeptide-1 & Biotinoyl Tripeptide',
        pct: 'Complex bio-peptidic',
        role: 'Stimulează ancorarea structurală a rădăcinii de laminină și colagen IV.',
      },
      {
        name: 'Bio-Caffeine Extract',
        pct: 'Micronizat',
        role: 'Neutralizează acțiunea DHT local și prelungește ciclul anagen de creștere.',
      },
      {
        name: 'Nigella Sativa (Chimen Negru)',
        pct: 'Presat la rece',
        role: 'Acțiune antiinflamatoare profundă pentru rădăcini stresate.',
      },
    ],
    full_inci:
      'Ricinus Communis Seed Oil, Simmondsia Chinensis Seed Oil, Nigella Sativa Seed Oil, Rosmarinus Officinalis Oil, Biotinoyl Tripeptide-1, Caffeine, Tocopherol.',
    usage_instructions: [
      'Se aplică exclusiv seara, cu 20 de minute înainte de culcare.',
      'Insistați cu aplicatorul în zonele cu goluri evidente.',
      'Recomandat în asociere cu Dermarollerul de 0.25mm de 2 ori pe săptămână.',
    ],
    benefits: [
      'Formulă cu eliberare prelungită nocturnă',
      'Ajută la umplerea golurilor cauzate de pensatul excesiv',
      'Densitate vizibilă începând cu săptămâna 4',
    ],
    rating: 4.92,
    review_count: 86,
    is_featured: true,
    badge: 'TRATAMENT INTENSIV',
  },
  {
    id: 'p3333333-3333-3333-3333-333333333333',
    slug: 'mag-precision-dermaroller-025',
    category_id: 'c2222222-2222-2222-2222-222222222222',
    name: 'Dermaroller Micro-Needle 0.25mm & Pieptene Aurit MAG',
    subtitle: 'Titan Grad Chirurgical • Stimulare Transdermică Non-Invazivă',
    description:
      'Creat conform celor mai riguroase specificații de cabinet estetic, dermarollerul MAG cu 540 de micro-ace din titan de 0.25 mm stimulează producția naturală de colagen și mărește absorbția bioactivă a serului Evergrow de până la 4 ori.',
    short_description:
      'Instrument steril de stimulare a microcirculației pentru amplificarea penetrării serului.',
    price: 89.0,
    compare_at_price: 119.0,
    stock: 6, // Shows "Stoc redus" badge!
    sku: 'MAG-ACC-DRL-01',
    volume: '1 bucată sterilă cu carcasă de protecție',
    images: ['/images/dermaroller.jpg'],
    active_ingredients: [],
    full_inci: 'Titan de grad chirurgical, mâner ergonomic polimer medical hipoalergenic.',
    usage_instructions: [
      'Dezinfectează rola cu alcool sanitar înainte de fiecare utilizare.',
      'Rulați ușor de 4-5 ori orizontal și vertical pe arcada sprâncenei, fără presiune dureroasă.',
      'Aplicați serul MAG EVERGROW imediat după micro-rulare.',
    ],
    benefits: [
      'Micro-ace sigure de 0.25mm create special pentru zona delicată a feței',
      'Crește rata de absorbție a lipidelor active cu 400%',
      'Stimulează sinteza de colagen și regenerarea cutanată',
    ],
    rating: 4.88,
    review_count: 54,
    is_featured: false,
    badge: 'ACCESORIU CLINIC',
  },
  {
    id: 'p4444444-4444-4444-4444-444444444444',
    slug: 'mag-microbrush-applicator-pack',
    category_id: 'c2222222-2222-2222-2222-222222222222',
    name: 'Set 50 Aplicatoare Micro-Brush Sterilizate de Laborator',
    subtitle: 'Vârfuri Micro-Fibrofibrilare Non-Absorbante pentru Precizie Milimetrică',
    description:
      'Pachet igienic de 50 de aplicatoare de unică folosință concepute special pentru dozajul exact al serului MAG Evergrow, prevenind irosirea sau contaminarea produsului.',
    short_description:
      'Aplicatoare de precizie farmaceutică pentru igienă maximă și dozaj milimetric.',
    price: 49.0,
    compare_at_price: null,
    stock: 120,
    sku: 'MAG-ACC-MBR-50',
    volume: '50 bucăți ambalate individual',
    images: ['/images/microbrush.jpg'],
    active_ingredients: [],
    full_inci: 'Fibre sintetice medicale lint-free, mâner biodegradabil.',
    usage_instructions: [
      'Utilizați un aplicator nou la fiecare sesiune de îngrijire.',
      'Aruncați după utilizare pentru a menține sterilitatea recipientului de ser.',
    ],
    benefits: [
      'Zero absorbție inutilă de produs - fiecare picătură ajunge pe piele',
      'Previne transferul bacteriilor în flaconul cosmetic',
      'Vârf flexibil pentru trasarea conturului precis',
    ],
    rating: 4.85,
    review_count: 32,
    is_featured: false,
    badge: 'IGIENE PRO',
  },
  {
    id: 'p5555555-5555-5555-5555-555555555555',
    slug: 'mag-evergrow-duo-pack-6-months',
    category_id: 'c3333333-3333-3333-3333-333333333333',
    name: 'Duo Pack MAG EVERGROW – Tratament Complet 6 Luni (2 x 3 ml)',
    subtitle: 'Pachetul Bestseller Recomandat pentru Arcuri Complete & Gene Alungite',
    description:
      'Ciclul biologic complet de înnoire a foliculilor necesită între 12 și 24 de săptămâni. Duo Pack asigură tratamentul neîntrerupt pe parcursul a 180 de zile la un preț preferențial, garantând densitatea și grosimea structurală maximă a firelor nou crescute.',
    short_description:
      'Două flacoane MAG EVERGROW (2x 3 ml) pentru o transformare completă de 6 luni. Economisești 15%.',
    price: 330.0,
    compare_at_price: 390.0,
    stock: 35,
    sku: 'MAG-BND-DUO-02',
    volume: '2 x 3 ml (180 de zile de aplicare)',
    images: ['/images/duo-pack.jpg'],
    active_ingredients: [
      {
        name: 'Ricinus Communis & Rosmarinus Complex',
        pct: 'Puritate 100%',
        role: 'Nutriție celulară pe termen lung.',
      },
      {
        name: 'Golden Jojoba & Tocopherol',
        pct: 'Bio-lipid',
        role: 'Menținerea elasticității cuticulei pe parcursul celor două cicluri de creștere.',
      },
    ],
    full_inci:
      'Ricinus Communis Seed Oil, Simmondsia Chinensis Seed Oil, Rosmarinus Officinalis Leaf Oil, Tocopherol.',
    usage_instructions: [
      'Flaconul 1: Se utilizează în primele 90 de zile, seară de seară.',
      'Flaconul 2: Continuă cura pentru consolidarea foliculilor și întreținere de 3 ori pe săptămână.',
    ],
    benefits: [
      'Economie directă de 60 RON față de achiziția individuală',
      'Garantează parcurgerea ciclului complet de reîmprospătare a foliculilor',
      'Livrare gratuită prin curier rapid inclusă',
    ],
    rating: 4.98,
    review_count: 189,
    is_featured: true,
    badge: '-15% DISCOUNT',
  },
  {
    id: 'p6666666-6666-6666-6666-666666666666',
    slug: 'mag-atelier-regeneration-complete-kit',
    category_id: 'c3333333-3333-3333-3333-333333333333',
    name: 'Kit Regenerare Completă Atelier MAG (Serum + Dermaroller + Ulei Curățare)',
    subtitle: 'Rutina Completă Clinico-Botanică: Pregătire, Stimulare & Hrănire Foliculară',
    description:
      'Protocolul integral creat de chimiștii MAG din București. Conține serul Evergrow 3 ml, Dermarollerul cu titan 0.25mm și Uleiul Demachiant Botanică Pură 100 ml. Oferă toți pașii necesari pentru deblocarea porilor, stimularea mecanică a circulației și hrănirea profundă cu lipide bioactive.',
    short_description:
      'Pachetul complet de excelență: Demachiere delicată + Micro-stimulare + Ser activ Evergrow. Economisești 20%.',
    price: 389.0,
    compare_at_price: 480.0,
    stock: 18,
    sku: 'MAG-BND-KIT-03',
    volume: 'Set complet 3 produse premium în cutie cadou de lux',
    images: ['/images/complete-kit.jpg'],
    active_ingredients: [
      {
        name: 'Protocol Complet MAG Atelier',
        pct: 'Tratament Sinergic',
        role: 'Pregătește, stimulează mecanic și infuzează nutrienți biologici activi.',
      },
    ],
    full_inci: 'Vedeți lista completă INCI pe ambalajul fiecărui produs din componență.',
    usage_instructions: [
      'Pasul 1: Curăță ochii cu Uleiul Demachiant Botanică Pură.',
      'Pasul 2 (de 2x/săptămână): Stimulează arcada cu Dermarollerul 0.25mm.',
      'Pasul 3: Aplică serul MAG EVERGROW pe întreaga linie a sprâncenelor și genelor.',
    ],
    benefits: [
      'Protocol clinic demonstrat cu rată de succes de 94%',
      'Include ambalajul cadou Signature MAG negru mat cu detalii aurite',
      'Economie de 91 RON față de produsele achiziționate separat',
    ],
    rating: 5.0,
    review_count: 77,
    is_featured: true,
    badge: 'RECOMANDAT EXPERȚI',
  },
  {
    id: 'p7777777-7777-7777-7777-777777777777',
    slug: 'mag-botanical-cleansing-oil-100ml',
    category_id: 'c4444444-4444-4444-4444-444444444444',
    name: 'Ulei Demachiant Botanică Pură fără Emulgatori Sintetici (100 ml)',
    subtitle: 'Uleiuri Presate la Rece de Migdale Dulci, Jojoba & Mușețel Roman',
    description:
      'Demachiant hipoalergenic conceput special pentru zona ochilor. Dizolvă chiar și cel mai rezistent rimel waterproof fără a smulge sau slăbi rădăcinile sprâncenelor și genelor. Lasă o peliculă protectoare hidratantă fără a bloca porii.',
    short_description:
      'Demachiere ultra-blândă pe bază de lipide pure, formulată special pentru protecția foliculilor.',
    price: 119.0,
    compare_at_price: 139.0,
    stock: 40,
    sku: 'MAG-CLN-OIL-100',
    volume: '100 ml cu pompiță dozatoare de precizie',
    images: ['/images/cleansing-oil.jpg'],
    active_ingredients: [
      {
        name: 'Prunus Amygdalus Dulcis (Sweet Almond Oil)',
        pct: 'Presat la rece',
        role: 'Dizolvă machiajul și catifelează pielea sensibilă a pleoapei.',
      },
      {
        name: 'Anthemis Nobilis (Chamomile) Flower Oil',
        pct: 'Extract pur',
        role: 'Calmează roșeața și iritațiile din jurul ochilor.',
      },
    ],
    full_inci:
      'Prunus Amygdalus Dulcis Oil, Simmondsia Chinensis Seed Oil, Anthemis Nobilis Flower Extract, Tocopheryl Acetate.',
    usage_instructions: [
      'Pompați 2 doze pe vârfurile degetelor sau pe o dischetă umezită.',
      'Masați blând pe pleoape și sprâncene cu mișcări circulare ușoare.',
      'Îndepărtați cu o lavetă umedă din bumbac organic călduță.',
    ],
    benefits: [
      'Zero sulfați, zero surfactanți agresivi, zero alcool',
      'Previne ruperea firelor de păr în timpul demachierii',
      'Potrivit pentru persoanele cu ochi foarte sensibili sau purtători de lentile',
    ],
    rating: 4.89,
    review_count: 63,
    is_featured: false,
    badge: 'FORMULĂ PURĂ',
  },
  {
    id: 'p8888888-8888-8888-8888-888888888888',
    slug: 'mag-micellar-gentle-foam-150ml',
    category_id: 'c4444444-4444-4444-4444-444444444444',
    name: 'Spumă Micelară Calmantă cu Apă de Trandafir & Peptide (150 ml)',
    subtitle: 'Curățare Spumantă Echilibrată la pH 5.5 cu Hidrolat Pur de Trandafir Românesc',
    description:
      'O spumă aerată și mătăsoasă creată pentru rutina de dimineață sau după demachierea cu ulei. Curăță impuritățile nocturne fără să distrugă bariera lipidică naturală esențială dezvoltării foliculilor noi.',
    short_description:
      'Spumă lejeră la pH fiziologic 5.5 pentru igiena zilnică a sprâncenelor și genelor.',
    price: 99.0,
    compare_at_price: null,
    stock: 0, // Out of stock example!
    sku: 'MAG-CLN-FOM-150',
    volume: '150 ml flacon spumant',
    images: ['/images/micellar-foam.jpg'],
    active_ingredients: [
      {
        name: 'Rosa Damascena Flower Water',
        pct: 'Hidrolat 100% pur',
        role: 'Tonifiază și calmează pielea fină supraorbitală.',
      },
      {
        name: 'Decyl Glucoside & Betaine',
        pct: 'Surfactant derivat din porumb',
        role: 'Curățare extra-blândă biodegradabilă.',
      },
    ],
    full_inci:
      'Aqua, Rosa Damascena Flower Water, Decyl Glucoside, Glycerin, Betaine, Panthenol, Allantoin, Citric Acid, Phenethyl Alcohol.',
    usage_instructions: [
      'Aplicați o pompă de spumă pe fața umedă.',
      'Masați ușor peste sprâncene și pleoape.',
      'Clătiți cu apă călduță din abundență.',
    ],
    benefits: [
      'Curăță delicat fără să usture ochii',
      'Formulă vegetală cu hidrolat de trandafiri',
      'Păstrează integritatea tratamentului aplicat seara precedentă',
    ],
    rating: 4.84,
    review_count: 41,
    is_featured: false,
    badge: 'NOU',
  },
];

export const INITIAL_COUPONS: Coupon[] = [
  {
    id: 'cp1',
    code: 'BROWVIP15',
    discount_percent: 15,
    discount_amount: 0,
    min_order_amount: 100,
    is_active: true,
  },
  {
    id: 'cp2',
    code: 'EVERGROW20',
    discount_percent: 20,
    discount_amount: 0,
    min_order_amount: 200,
    is_active: true,
  },
  {
    id: 'cp3',
    code: 'STUDENT10',
    discount_percent: 10,
    discount_amount: 0,
    min_order_amount: 50,
    is_active: true,
  },
];

export const INITIAL_REVIEWS: Review[] = [
  {
    id: 'r1',
    product_id: 'p1111111-1111-1111-1111-111111111111',
    user_name: 'Elena R. (București)',
    rating: 5,
    comment:
      'Folosesc serul Evergrow de 6 săptămâni. Golurile din colțul intern al sprâncenelor, unde pensam agresiv încă din liceu, s-au umplut complet cu fire noi și viguroase! Nu ustură deloc ochii.',
    verified_purchase: true,
    created_at: '2026-02-14T10:30:00Z',
  },
  {
    id: 'r2',
    product_id: 'p1111111-1111-1111-1111-111111111111',
    user_name: 'Andreea M. (Cluj-Napoca)',
    rating: 5,
    comment:
      'Cel mai mare plus pentru mine este că NU conține prostaglandine sintetice! Am avut experiențe groaznice cu alte mărci care mi-au înnegrit pleoapele. MAG Evergrow este aur curat!',
    verified_purchase: true,
    created_at: '2026-02-18T14:15:00Z',
  },
  {
    id: 'r3',
    product_id: 'p1111111-1111-1111-1111-111111111111',
    user_name: 'Simona T. (Timișoara)',
    rating: 5,
    comment:
      'Textura de ulei virgin miroase subtil a rozmarin proaspăt. Genele mele sunt de două ori mai rezistente și nu mai cad deloc când mă demachiez.',
    verified_purchase: true,
    created_at: '2026-02-25T09:40:00Z',
  },
  {
    id: 'r4',
    product_id: 'p5555555-5555-5555-5555-555555555555',
    user_name: 'Ioana V. (Iași)',
    rating: 5,
    comment:
      'Am comandat Duo Pack pentru a face cura completă de 6 luni recomandată de laborator. Rezultatele sunt spectaculoase, nu mai am nevoie deloc de creion de sprâncene!',
    verified_purchase: true,
    created_at: '2026-03-01T16:20:00Z',
  },
  {
    id: 'r5',
    product_id: 'p6666666-6666-6666-6666-666666666666',
    user_name: 'Raluca D. (Brașov)',
    rating: 5,
    comment:
      'Kitul complet Atelier este cadoul suprem! Dermarollerul de 0.25mm este foarte delicat, iar serul intră impecabil în piele.',
    verified_purchase: true,
    created_at: '2026-03-04T18:00:00Z',
  },
];

export const INITIAL_ORDERS: Order[] = [
  {
    id: 'ord-1001',
    order_number: 'MAG-2026-1001',
    invoice_series: 'MAG-EVG',
    invoice_number: 1001,
    user_id: 'usr-demo-1',
    status: 'paid',
    payment_status: 'paid',
    payment_intent_id: 'pi_test_evergrow_demo_1001',
    customer_name: 'Andreea Popescu',
    customer_email: 'andreea.popescu@example.ro',
    customer_phone: '+40 722 123 456',
    shipping_address: {
      fullName: 'Andreea Popescu',
      street: 'Calea Victoriei nr. 142, Ap. 12',
      city: 'București',
      county: 'Sector 1',
      postalCode: '010098',
      country: 'România',
      phone: '+40 722 123 456',
    },
    subtotal: 195.0,
    discount_amount: 29.25,
    shipping_cost: 0.0,
    tax_amount: 26.46, // 19% TVA included
    total: 165.75,
    coupon_code: 'BROWVIP15',
    items: [
      {
        id: 'item-1',
        order_id: 'ord-1001',
        product_id: 'p1111111-1111-1111-1111-111111111111',
        product_name: 'MAG EVERGROW Lash & Brow Growth Serum (3 ml)',
        product_image: '/images/mag-evergrow-bottle.png',
        unit_price: 195.0,
        quantity: 1,
        total_price: 195.0,
      },
    ],
    created_at: '2026-03-05T11:20:00Z',
  },
  {
    id: 'ord-1002',
    order_number: 'MAG-2026-1002',
    invoice_series: 'MAG-EVG',
    invoice_number: 1002,
    user_id: 'usr-demo-2',
    status: 'processing',
    payment_status: 'paid',
    payment_intent_id: 'pi_test_evergrow_demo_1002',
    customer_name: 'Dr. Mihai Radu',
    customer_email: 'mihai.radu@clinica-derm.ro',
    customer_phone: '+40 745 987 654',
    shipping_address: {
      fullName: 'Dr. Mihai Radu',
      street: 'Strada Republicii nr. 45',
      city: 'Cluj-Napoca',
      county: 'Cluj',
      postalCode: '400015',
      country: 'România',
      phone: '+40 745 987 654',
    },
    billing_address: {
      fullName: 'Clinica Derm Aesthetics SRL',
      companyName: 'Clinica Derm Aesthetics SRL',
      cui: 'RO38921844',
      regCom: 'J12/189/2018',
      street: 'Strada Republicii nr. 45',
      city: 'Cluj-Napoca',
      county: 'Cluj',
      postalCode: '400015',
      country: 'România',
      phone: '+40 745 987 654',
    },
    subtotal: 389.0,
    discount_amount: 0.0,
    shipping_cost: 0.0,
    tax_amount: 62.11, // 19% TVA
    total: 389.0,
    items: [
      {
        id: 'item-2',
        order_id: 'ord-1002',
        product_id: 'p6666666-6666-6666-6666-666666666666',
        product_name: 'Kit Regenerare Completă Atelier MAG (Serum + Dermaroller + Ulei Curățare)',
        product_image: '/images/mag-evergrow-bottle.png',
        unit_price: 389.0,
        quantity: 1,
        total_price: 389.0,
      },
    ],
    created_at: '2026-03-06T14:45:00Z',
  },
];

