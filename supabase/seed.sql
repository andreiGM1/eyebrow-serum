-- ==============================================================================
-- MAG LABORATORIES BUCHAREST - EVERGROW SEED DATA
-- Categories, Products, Coupons and Verified Reviews
-- ==============================================================================

-- 1. INSERT CATEGORIES
INSERT INTO public.categories (id, slug, name, description, display_order, image_url)
VALUES
    ('c1111111-1111-1111-1111-111111111111', 'seruri-active', 'Seruri Active pentru Sprâncene', 'Formule concentrate botanice și lipidice pentru activarea foliculilor și densitate maximă.', 1, '/images/category-serums.jpg'),
    ('c2222222-2222-2222-2222-222222222222', 'aplicatoare-accesorii', 'Aplicatoare & Accesorii', 'Instrumente ergonomice de laborator, micro-needling și aplicatoare sterile de precizie.', 2, '/images/category-accessories.jpg'),
    ('c3333333-3333-3333-3333-333333333333', 'pachete-tratament', 'Pachete Tratament & Promoționale', 'Cure intensive de 3-6 luni și seturi complete de regenerare cu reduceri avantajoase.', 3, '/images/category-bundles.jpg'),
    ('c4444444-4444-4444-4444-444444444444', 'demachiere-ingrijire', 'Demachiere & Îngrijire Delicată', 'Demachiere neiritantă fără sulfați sau alcool, concepută pentru a proteja foliculul.', 4, '/images/category-cleansing.jpg')
ON CONFLICT (slug) DO UPDATE
SET name = EXCLUDED.name, description = EXCLUDED.description;

-- 2. INSERT PRODUCTS
INSERT INTO public.products (
    id, slug, category_id, name, subtitle, description, short_description,
    price, compare_at_price, stock, sku, volume, images,
    active_ingredients, full_inci, usage_instructions, benefits,
    rating, review_count, is_featured, badge
)
VALUES
    (
        'p1111111-1111-1111-1111-111111111111',
        'mag-evergrow-lash-brow-serum-3ml',
        'c1111111-1111-1111-1111-111111111111',
        'MAG EVERGROW Lash & Brow Growth Serum (3 ml)',
        'Complex Lipidic Bioactiv 100% Natural • Fără Prostaglandine • Atelier București',
        'Formulat în micro-laboratorul nostru din inima Bucureștiului, MAG EVERGROW este un elixir concentrat de botanice pure presate la rece și vitamine protectoare celulare. Conceput special pentru persoanele care refuză compromisurile legate de sănătatea ochilor, acest ser auriu creează micro-mediul ideal pentru regenerarea arcurilor rare și întărirea rezistenței mecanice a firului de păr.',
        'Ser 100% natural, prostaglandin-free, cu ulei virgin de ricin presat la rece, rozmarin mediteranean și vitamina E. Ciclu complet de 90 de zile.',
        195.00,
        245.00,
        45,
        'MAG-EVG-003',
        '3 ml / 0.10 fl. oz. (90 de zile)',
        ARRAY['/images/mag-evergrow-bottle.png', '/images/serum-texture.jpg'],
        '[
            {"name": "Ricinus Communis Seed Oil (Ulei Virgin de Ricin)", "pct": "Concentrație optimă 85-90% acid ricinoleic", "role": "Penetrează teaca foliculară, sigilează cuticula și previne pierderea apei trans-foliculare."},
            {"name": "Rosmarinus Officinalis Leaf Oil (Ulei de Rozmarin)", "pct": "Distilat cu abur", "role": "Stimulează microcirculația capilară la nivelul rădăcinii și trezește foliculii dorminzi."},
            {"name": "Simmondsia Chinensis Seed Oil (Ulei Pur de Jojoba)", "pct": "Presat la rece nerafinat", "role": "Mimică esterii sebumului uman, deblochează orificiile foliculare și conferă elasticitate."},
            {"name": "Tocopherol (Vitamina E Pura)", "pct": "Antioxidant vegetal activ", "role": "Protejează fibrele de keratină împotriva stresului oxidativ și a razelor UV."}
        ]'::jsonb,
        'Ricinus Communis (Castor) Seed Oil, Simmondsia Chinensis (Jojoba) Seed Oil, Rosmarinus Officinalis (Rosemary) Leaf Oil, Tocopherol (Vitamin E).',
        ARRAY[
            'Curăță tenul și zona ochilor asigurându-te că nu există urme de machiaj sau grăsime.',
            'Înmoaie aplicatorul de precizie în flacon și șterge excesul de buza recipientului de 3 ml.',
            'Aplică o peliculă fină la rădăcina sprâncenelor și pe conturul genelor superioare.',
            'Masează ușor cu periuța prin mișcări ascendente în zonele cu goluri.',
            'Lasă să acționeze peste noapte. Clătește dimineața cu apă călduță.'
        ],
        ARRAY[
            'Activează foliculii inactivi prin stimularea microcirculației',
            'Reduce căderea prematură a firelor cu până la 78%',
            'Fără prostaglandine: zero risc de hiperpigmentare a pleoapelor sau schimbare a culorii irisului',
            'Formulă 100% activă: zero apă adăugată, zero conservanți sintetici',
            'Flacon de 3 ml pentru o cură completă de 90 de zile'
        ],
        4.96,
        142,
        true,
        'BESTSELLER'
    ),
    (
        'p2222222-2222-2222-2222-222222222222',
        'mag-evergrow-night-intensive-elixir-5ml',
        'c1111111-1111-1111-1111-111111111111',
        'MAG EVERGROW Night Intensive Follicle Elixir (5 ml)',
        'Formulă Nocturnă Avansată cu Tri-Peptide Botanice și Extract de Cafeină Bio',
        'Versiunea nocturnă de intensitate triplă este destinată sprâncenelor agresate de pensat excesiv, microblading nereușit sau laminări repetate. Îmbogățită cu peptide de cupru vegetale și cafeină bioactivă, infuzează foliculul pe durata fazei anagene de somn adânc.',
        'Tratament intensiv de noapte pentru goluri pronunțate și sprâncene subțiate cronic.',
        249.00,
        299.00,
        28,
        'MAG-EVG-NIT-005',
        '5 ml (120 de zile)',
        ARRAY['/images/night-elixir.jpg', '/images/mag-evergrow-bottle.png'],
        '[
            {"name": "Tripeptide-1 & Biotinoyl Tripeptide", "pct": "Complex bio-peptidic", "role": "Stimulează ancorarea structurală a rădăcinii de laminină."},
            {"name": "Bio-Caffeine Extract", "pct": "Micronizat", "role": "Neutralizează efectul local al DHT și stimulează prelungirea fazei de creștere."},
            {"name": "Nigella Sativa (Black Cumin) Seed Oil", "pct": "Presat la rece", "role": "Proprietăți antiinflamatoare excepționale pentru pielea sensibilizată."}
        ]'::jsonb,
        'Ricinus Communis Seed Oil, Simmondsia Chinensis Seed Oil, Nigella Sativa Seed Oil, Rosmarinus Officinalis Oil, Biotinoyl Tripeptide-1, Caffeine, Tocopherol.',
        ARRAY[
            'Se aplică exclusiv seara, cu 20 de minute înainte de culcare.',
            'Insistați cu aplicatorul în zonele cu goluri evidente.',
            'Recomandat în asociere cu Dermarollerul de 0.25mm de 2 ori pe săptămână.'
        ],
        ARRAY[
            'Formulă cu eliberare prelungită nocturnă',
            'Ajută la umplerea golurilor cauzate de pensatul excesiv',
            'Densitate vizibilă începând cu săptămâna 4'
        ],
        4.92,
        86,
        true,
        'TRATAMENT INTENSIV'
    ),
    (
        'p3333333-3333-3333-3333-333333333333',
        'mag-precision-dermaroller-025',
        'c2222222-2222-2222-2222-222222222222',
        'Dermaroller Micro-Needle 0.25mm & Pieptene Aurit MAG',
        'Oțel Chirurgical Placat cu Titan • Stimulare Transdermică Non-Invazivă',
        'Creat conform celor mai riguroase specificații de cabinet estetic, dermarollerul MAG cu 540 de micro-ace din titan de 0.25 mm stimulează producția naturală de colagen și mărește absorbția bioactivă a serului Evergrow de până la 4 ori.',
        'Instrument steril de stimulare a microcirculației pentru amplificarea penetrării serului.',
        89.00,
        119.00,
        60,
        'MAG-ACC-DRL-01',
        '1 bucată sterilă cu carcasă de protecție',
        ARRAY['/images/dermaroller.jpg'],
        '[]'::jsonb,
        'Titan de grad chirurgical, mâner ergonomic polimer medical hipoalergenic.',
        ARRAY[
            'Dezinfectează rola cu alcool sanitar înainte de fiecare utilizare.',
            'Rulați ușor de 4-5 ori orizontal și vertical pe arcada sprâncenei, fără presiune dureroasă.',
            'Aplicați serul MAG EVERGROW imediat după micro-rulare.'
        ],
        ARRAY[
            'Micro-ace sigure de 0.25mm create special pentru zona delicată a feței',
            'Crește rata de absorbție a lipidelor active cu 400%',
            'Stimulează sinteza de colagen și regenerarea cutanată'
        ],
        4.88,
        54,
        false,
        'ACCESORIU CLINIC'
    ),
    (
        'p4444444-4444-4444-4444-444444444444',
        'mag-microbrush-applicator-pack',
        'c2222222-2222-2222-2222-222222222222',
        'Set 50 Aplicatoare Micro-Brush Sterilizate de Laborator',
        'Vârfuri Micro-Fibrofibrilare Non-Absorbante pentru Precizie Milimetrică',
        'Pachet igienic de 50 de aplicatoare de unică folosință concepute special pentru dozajul exact al serului MAG Evergrow, prevenind irosirea sau contaminarea produsului.',
        'Aplicatoare de precizie farmaceutică pentru igienă maximă și dozaj milimetric.',
        49.00,
        NULL,
        120,
        'MAG-ACC-MBR-50',
        '50 bucăți ambalate individual',
        ARRAY['/images/microbrush.jpg'],
        '[]'::jsonb,
        'Fibre sintetice medicale lint-free, mâner biodegradabil.',
        ARRAY[
            'Utilizați un aplicator nou la fiecare sesiune de îngrijire.',
            'Aruncați după utilizare pentru a menține sterilitatea recipientului de ser.'
        ],
        ARRAY[
            'Zero absorbție inutilă de produs - fiecare picătură ajunge pe piele',
            'Previne transferul bacteriilor în flaconul cosmetic',
            'Vârf flexibil pentru trasarea conturului precis'
        ],
        4.85,
        32,
        false,
        'IGIENE PRO'
    ),
    (
        'p5555555-5555-5555-5555-555555555555',
        'mag-evergrow-duo-pack-6-months',
        'c3333333-3333-3333-3333-333333333333',
        'Duo Pack MAG EVERGROW – Tratament Complet 6 Luni (2 x 3 ml)',
        'Pachetul Bestseller Recomandat pentru Arcuri Complete & Gene Alungite',
        'Ciclul biologic complet de înnoire a foliculilor necesită între 12 și 24 de săptămâni. Duo Pack asigură tratamentul neîntrerupt pe parcursul a 180 de zile la un preț preferențial, garantând densitatea și grosimea structurală maximă a firelor nou crescute.',
        'Două flacoane MAG EVERGROW (2x 3 ml) pentru o transformare completă de 6 luni. Economisești 15%.',
        330.00,
        390.00,
        35,
        'MAG-BND-DUO-02',
        '2 x 3 ml (180 de zile de aplicare)',
        ARRAY['/images/duo-pack.jpg', '/images/mag-evergrow-bottle.png'],
        '[
            {"name": "Ricinus Communis & Rosmarinus Complex", "pct": "Puritate 100%", "role": "Nutriție celulară pe termen lung."},
            {"name": "Golden Jojoba & Tocopherol", "pct": "Bio-lipid", "role": "Menținerea elasticității cuticulei pe parcursul celor două cicluri de creștere."}
        ]'::jsonb,
        'Ricinus Communis Seed Oil, Simmondsia Chinensis Seed Oil, Rosmarinus Officinalis Leaf Oil, Tocopherol.',
        ARRAY[
            'Flaconul 1: Se utilizează în primele 90 de zile, seară de seară.',
            'Flaconul 2: Continuă cura pentru consolidarea foliculilor și întreținere de 3 ori pe săptămână.'
        ],
        ARRAY[
            'Economie directă de 60 RON față de achiziția individuală',
            'Garantează parcurgerea ciclului complet de reîmprospătare a foliculilor',
            'Livrare gratuită prin curier rapid inclusă'
        ],
        4.98,
        189,
        true,
        '-15% DISCOUNT'
    ),
    (
        'p6666666-6666-6666-6666-666666666666',
        'mag-atelier-regeneration-complete-kit',
        'c3333333-3333-3333-3333-333333333333',
        'Kit Regenerare Completă Atelier MAG (Serum + Dermaroller + Ulei Curățare)',
        'Rutina Completă Clinico-Botanică: Pregătire, Stimulare & Hrănire Foliculară',
        'Protocolul integral creat de chimiștii MAG din București. Conține serul Evergrow 3 ml, Dermarollerul cu titan 0.25mm și Uleiul Demachiant Botanică Pură 100 ml. Oferă toți pașii necesari pentru deblocarea porilor, stimularea mecanică a circulației și hrănirea profundă cu lipide bioactive.',
        'Pachetul complet de excelență: Demachiere delicată + Micro-stimulare + Ser activ Evergrow. Economisești 20%.',
        389.00,
        480.00,
        18,
        'MAG-BND-KIT-03',
        'Set complet 3 produse premium în cutie cadou de lux',
        ARRAY['/images/complete-kit.jpg', '/images/mag-evergrow-bottle.png'],
        '[
            {"name": "Protocol Complet MAG Atelier", "pct": "Tratament Sinergic", "role": "Pregătește, stimulează mecanic și infuzează nutrienți biologici activi."}
        ]'::jsonb,
        'Vedeți lista completă INCI pe ambalajul fiecărui produs din componență.',
        ARRAY[
            'Pasul 1: Curăță ochii cu Uleiul Demachiant Botanică Pură.',
            'Pasul 2 (de 2x/săptămână): Stimulează arcada cu Dermarollerul 0.25mm.',
            'Pasul 3: Aplică serul MAG EVERGROW pe întreaga linie a sprâncenelor și genelor.'
        ],
        ARRAY[
            'Protocol clinic demonstrat cu rată de succes de 94%',
            'Include ambalajul cadou Signature MAG negru mat cu detalii aurite',
            'Economie de 91 RON față de produsele achiziționate separat'
        ],
        5.00,
        77,
        true,
        'RECOMANDAT EXPERȚI'
    ),
    (
        'p7777777-7777-7777-7777-777777777777',
        'mag-botanical-cleansing-oil-100ml',
        'c4444444-4444-4444-4444-444444444444',
        'Ulei Demachiant Botanică Pură fără Emulgatori Sintetici (100 ml)',
        'Uleiuri Presate la Rece de Migdale Dulci, Jojoba & Mușețel Roman',
        'Demachiant hipoalergenic conceput special pentru zona ochilor. Dizolvă chiar și cel mai rezistent rimel waterproof fără a smulge sau slăbi rădăcinile sprâncenelor și genelor. Lasă o peliculă protectoare hidratantă fără a bloca porii.',
        'Demachiere ultra-blândă pe bază de lipide pure, formulată special pentru protecția foliculilor.',
        119.00,
        139.00,
        40,
        'MAG-CLN-OIL-100',
        '100 ml cu pompiță dozatoare de precizie',
        ARRAY['/images/cleansing-oil.jpg'],
        '[
            {"name": "Prunus Amygdalus Dulcis (Sweet Almond Oil)", "pct": "Presat la rece", "role": "Dizolvă machiajul și catifelează pielea sensibilă a pleoapei."},
            {"name": "Anthemis Nobilis (Chamomile) Flower Oil", "pct": "Extract pur", "role": "Calmează roșeața și iritațiile din jurul ochilor."}
        ]'::jsonb,
        'Prunus Amygdalus Dulcis Oil, Simmondsia Chinensis Seed Oil, Anthemis Nobilis Flower Extract, Tocopheryl Acetate.',
        ARRAY[
            'Pompați 2 doze pe vârfurile degetelor sau pe o dischetă umezită.',
            'Masați blând pe pleoape și sprâncene cu mișcări circulare ușoare.',
            'Îndepărtați cu o lavetă umedă din bumbac organic călduță.'
        ],
        ARRAY[
            'Zero sulfați, zero surfactanți agresivi, zero alcool',
            'Previne ruperea firelor de păr în timpul demachierii',
            'Potrivit pentru persoanele cu ochi foarte sensibili sau purtători de lentile'
        ],
        4.89,
        63,
        false,
        'FORMULĂ PURĂ'
    ),
    (
        'p8888888-8888-8888-8888-888888888888',
        'mag-micellar-gentle-foam-150ml',
        'c4444444-4444-4444-4444-444444444444',
        'Spumă Micelară Calmantă cu Apă de Trandafir & Peptide (150 ml)',
        'Curățare Spumantă Echilibrată la pH 5.5 cu Hidrolat Pur de Trandafir Românesc',
        'O spumă aerată și mătăsoasă creată pentru rutina de dimineață sau după demachierea cu ulei. Curăță impuritățile nocturne fără să distrugă bariera lipidică naturală esențială dezvoltării foliculilor noi.',
        'Spumă lejeră la pH fiziologic 5.5 pentru igiena zilnică a sprâncenelor și genelor.',
        99.00,
        NULL,
        50,
        'MAG-CLN-F协M-150',
        '150 ml flacon spumant',
        ARRAY['/images/micellar-foam.jpg'],
        '[
            {"name": "Rosa Damascena Flower Water", "pct": "Hidrolat 100% pur", "role": "Tonifiază și calmează pielea fină supraorbitală."},
            {"name": "Decyl Glucoside & Betaine", "pct": "Surfactant derivat din porumb", "role": "Curățare extra-blândă biodegradabilă."}
        ]'::jsonb,
        'Aqua, Rosa Damascena Flower Water, Decyl Glucoside, Glycerin, Betaine, Panthenol, Allantoin, Citric Acid, Phenethyl Alcohol (preservative vegetal).',
        ARRAY[
            'Aplicați o pompă de spumă pe fața umedă.',
            'Masați ușor peste sprâncene și pleoape.',
            'Clătiți cu apă călduță din abundență.'
        ],
        ARRAY[
            'Curăță delicat fără să usture ochii',
            'Formulă vegetală cu hidrolat de trandafiri',
            'Păstrează integritatea tratamentului aplicat seara precedentă'
        ],
        4.84,
        41,
        false,
        'NOU'
    )
ON CONFLICT (slug) DO UPDATE
SET price = EXCLUDED.price, stock = EXCLUDED.stock, name = EXCLUDED.name;

-- 3. INSERT COUPONS
INSERT INTO public.coupons (code, discount_percent, discount_amount, min_order_amount, is_active, expires_at)
VALUES
    ('BROWVIP15', 15, 0.00, 100.00, true, '2027-12-31 23:59:59+00'),
    ('EVERGROW20', 20, 0.00, 200.00, true, '2027-12-31 23:59:59+00'),
    ('STUDENT10', 10, 0.00, 50.00, true, '2027-12-31 23:59:59+00'),
    ('MAGWELCOME', 10, 0.00, 0.00, true, '2027-12-31 23:59:59+00')
ON CONFLICT (code) DO UPDATE
SET discount_percent = EXCLUDED.discount_percent, is_active = true;

-- 4. INSERT VERIFIED REVIEWS
INSERT INTO public.reviews (product_id, user_name, rating, comment, verified_purchase)
VALUES
    ('p1111111-1111-1111-1111-111111111111', 'Elena R. (București)', 5, 'Folosesc serul Evergrow de 6 săptămâni. Golurile din colțul intern al sprâncenelor, unde pensam agresiv încă din liceu, s-au umplut complet cu fire noi și viguroase! Nu ustură deloc ochii.', true),
    ('p1111111-1111-1111-1111-111111111111', 'Andreea M. (Cluj-Napoca)', 5, 'Cel mai mare plus pentru mine este că NU conține prostaglandine sintetice! Am avut experiențe groaznice cu alte mărci care mi-au înnegrit pleoapele. MAG Evergrow este aur curat!', true),
    ('p1111111-1111-1111-1111-111111111111', 'Simona T. (Timișoara)', 5, 'Textura de ulei virgin miroase subtil a rozmarin proaspăt. Genele mele sunt de două ori mai rezistente și nu mai cad deloc când mă demachiez.', true),
    ('p5555555-5555-5555-5555-555555555555', 'Ioana V. (Iași)', 5, 'Am comandat Duo Pack pentru a face cura completă de 6 luni recomandată de laborator. Rezultatele sunt spectaculoase, nu mai am nevoie deloc de creion de sprâncene!', true),
    ('p6666666-6666-6666-6666-666666666666', 'Raluca D. (Brașov)', 5, 'Kitul complet Atelier este cadoul suprem! Dermarollerul de 0.25mm este foarte delicat, iar serul intră impecabil în piele.', true);

