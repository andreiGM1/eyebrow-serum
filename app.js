/**
 * BrowLash — Eyebrow Serum Checkout, Before/After Slider, Diagnostic Quiz & Sameday Easybox
 */

// Sameday Easybox Mock Dataset across Major Romanian Cities
const EASYBOX_LOCATIONS = [
  // București & Ilfov
  { id: "EB-BUC-001", name: "Easybox Kaufland Barbu Văcărescu", city: "București", address: "Str. Barbu Văcărescu 120, Sector 2" },
  { id: "EB-BUC-002", name: "Easybox AFI Cotroceni (Parcare Etaj)", city: "București", address: "Bd. Vasile Milea 4, Sector 6" },
  { id: "EB-BUC-003", name: "Easybox Promenada Mall Floreasca", city: "București", address: "Calea Floreasca 246B, Sector 1" },
  { id: "EB-BUC-004", name: "Easybox Mega Mall Pantelimon", city: "București", address: "Bd. Pierre de Coubertin 3-5, Sector 2" },
  { id: "EB-BUC-005", name: "Easybox Piața Unirii (Metrou Magazin Unirea)", city: "București", address: "Piața Unirii 1, Sector 3" },
  { id: "EB-BUC-006", name: "Easybox ParkLake Titan", city: "București", address: "Str. Liviu Rebreanu 4, Sector 3" },
  { id: "EB-BUC-007", name: "Easybox OMV Pipera", city: "București", address: "Bd. Pipera 1/B, Voluntari" },

  // Cluj-Napoca
  { id: "EB-CJ-010", name: "Easybox Iulius Mall Cluj (Intrare Vest)", city: "Cluj-Napoca", address: "Str. Alexandru Vaida Voevod 53-55" },
  { id: "EB-CJ-011", name: "Easybox Vivo! Mall Florești", city: "Cluj-Napoca", address: "Str. Avram Iancu 492-500, Florești" },
  { id: "EB-CJ-012", name: "Easybox Kaufland Mărăști", city: "Cluj-Napoca", address: "Str. Fabricii 12, Cartier Mărăști" },
  { id: "EB-CJ-013", name: "Easybox Petrom Zorilor", city: "Cluj-Napoca", address: "Str. Observatorului 1" },

  // Timișoara
  { id: "EB-TM-020", name: "Easybox Iulius Town Timișoara", city: "Timișoara", address: "Piața Consiliul Europei 2" },
  { id: "EB-TM-021", name: "Easybox Vox Technology Park", city: "Timișoara", address: "Calea Torontalului 69" },
  { id: "EB-TM-022", name: "Easybox Shopping City Timișoara", city: "Timișoara", address: "Calea Șagului 100" },

  // Iași
  { id: "EB-IS-030", name: "Easybox Palas Mall Iași (Parcare Palat)", city: "Iași", address: "Str. Palas 7A" },
  { id: "EB-IS-031", name: "Easybox Moldova Mall Centru", city: "Iași", address: "Str. Palat 1" },
  { id: "EB-IS-032", name: "Easybox Iulius Mall Tudor Vladimirescu", city: "Iași", address: "Bd. Tudor Vladimirescu" },

  // Brașov
  { id: "EB-BV-040", name: "Easybox Coresi Shopping Resort", city: "Brașov", address: "Str. Zaharia Stancu 1" },
  { id: "EB-BV-041", name: "Easybox Livada Poștei (Centru)", city: "Brașov", address: "Str. Mureșenilor 1" },
  { id: "EB-BV-042", name: "Easybox Kaufland Calea București", city: "Brașov", address: "Calea București 112" },

  // Constanța
  { id: "EB-CT-050", name: "Easybox City Park Mall Constanța", city: "Constanța", address: "Bd. Alexandru Lăpușneanu 116C" },
  { id: "EB-CT-051", name: "Easybox Tomis Mall (Piața Ovidiu)", city: "Constanța", address: "Str. Ștefan cel Mare 36-40" },
  { id: "EB-CT-052", name: "Easybox Vivo! Mall Constanța", city: "Constanța", address: "Bd. Aurel Vlaicu 220" },

  // Craiova & Sibiu
  { id: "EB-DJ-060", name: "Easybox Electroputere Parc Craiova", city: "Craiova", address: "Calea București 80" },
  { id: "EB-SB-070", name: "Easybox Promenada Mall Sibiu", city: "Sibiu", address: "Str. Lector 1-3" }
];

document.addEventListener('DOMContentLoaded', () => {
  initBeforeAfterSlider();
  initDiagnosticQuiz();
  initEasyboxAndCheckout();
});

// -------------------------------------------------------------
// 1. Before / After 28-Day Split Slider Logic
// -------------------------------------------------------------
function initBeforeAfterSlider() {
  const container = document.getElementById('baSliderContainer');
  const beforeLayer = document.getElementById('baBeforeLayer');
  const handle = document.getElementById('baHandle');

  if (!container || !beforeLayer || !handle) return;

  let isDragging = false;

  function updateSliderPosition(clientX) {
    const rect = container.getBoundingClientRect();
    const offsetX = clientX - rect.left;
    let percent = (offsetX / rect.width) * 100;

    // Constrain boundaries between 4% and 96%
    if (percent < 4) percent = 4;
    if (percent > 96) percent = 96;

    beforeLayer.style.width = `${percent}%`;
    handle.style.left = `${percent}%`;

    // Keep internal image width aligned with container for 1:1 overlay
    const beforeImg = beforeLayer.querySelector('.ba-img');
    if (beforeImg) {
      beforeImg.style.width = `${rect.width}px`;
    }
  }

  // Pointer event listeners (handles both touch & mouse seamlessly)
  container.addEventListener('pointerdown', (e) => {
    isDragging = true;
    container.setPointerCapture(e.pointerId);
    updateSliderPosition(e.clientX);
  });

  container.addEventListener('pointermove', (e) => {
    if (!isDragging) return;
    updateSliderPosition(e.clientX);
  });

  const stopDragging = (e) => {
    if (isDragging) {
      isDragging = false;
      try { container.releasePointerCapture(e.pointerId); } catch (_) {}
    }
  };

  container.addEventListener('pointerup', stopDragging);
  container.addEventListener('pointercancel', stopDragging);

  // Resize listener to sync image dimensions
  window.addEventListener('resize', () => {
    const rect = container.getBoundingClientRect();
    const beforeImg = beforeLayer.querySelector('.ba-img');
    if (beforeImg) {
      beforeImg.style.width = `${rect.width}px`;
    }
  });

  // Initial alignment
  setTimeout(() => {
    const rect = container.getBoundingClientRect();
    const beforeImg = beforeLayer.querySelector('.ba-img');
    if (beforeImg) {
      beforeImg.style.width = `${rect.width}px`;
    }
  }, 100);
}

// -------------------------------------------------------------
// 2. Interactive Brow Diagnostic Quiz State Machine
// -------------------------------------------------------------
function initDiagnosticQuiz() {
  const step1 = document.getElementById('quizStep1');
  const step2 = document.getElementById('quizStep2');
  const step3 = document.getElementById('quizStep3');
  const resultBox = document.getElementById('quizResultBox');

  const ind1 = document.getElementById('qStepInd1');
  const ind2 = document.getElementById('qStepInd2');
  const ind3 = document.getElementById('qStepInd3');

  const resultTitle = document.getElementById('quizResultTitle');
  const resultExp = document.getElementById('quizResultExplanation');
  const applyBtn = document.getElementById('applyQuizRecommendationBtn');
  const restartBtn = document.getElementById('restartQuizBtn');

  if (!step1 || !step2 || !step3 || !resultBox) return;

  const quizAnswers = {
    step1: null,
    step2: null,
    step3: null,
    score: 0
  };

  const optionBtns = document.querySelectorAll('.quiz-option-btn');
  optionBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const step = parseInt(btn.dataset.step, 10);
      const val = btn.dataset.value;
      const score = parseInt(btn.dataset.score || '1', 10);

      if (step === 1) {
        quizAnswers.step1 = val;
        quizAnswers.score += score;
        step1.style.display = 'none';
        step2.style.display = 'block';
        ind1.classList.remove('active');
        ind1.classList.add('completed');
        ind2.classList.add('active');
      } else if (step === 2) {
        quizAnswers.step2 = val;
        quizAnswers.score += score;
        step2.style.display = 'none';
        step3.style.display = 'block';
        ind2.classList.remove('active');
        ind2.classList.add('completed');
        ind3.classList.add('active');
      } else if (step === 3) {
        quizAnswers.step3 = val;
        quizAnswers.score += score;
        step3.style.display = 'none';
        resultBox.style.display = 'block';
        ind3.classList.remove('active');
        ind3.classList.add('completed');

        // Evaluate diagnostic recommendation
        evaluateRecommendation();
      }
    });
  });

  function evaluateRecommendation() {
    // If overplucking / hormonal / high score -> recommend 2 bottles (4 months)
    if (quizAnswers.score >= 4 || quizAnswers.step1 === 'pensare' || quizAnswers.step1 === 'hormoni') {
      resultTitle.textContent = "Pachet Recomandat: 2x Flacoane BrowLash (Tratament 4 Luni - Bestseller)";
      resultExp.textContent = "Pentru revitalizarea foliculilor adormiți după pensare excesivă sau rărire, este necesară stimularea pe parcursul a 2 cicluri anagene (12-16 săptămâni). Acest pachet include Cadou Penseta de Precizie și reducere 40%.";
      if (applyBtn) {
        applyBtn.innerHTML = `👉 Aplică Recomandarea la Comandă (199 RON)`;
        applyBtn.dataset.targetPack = 'p2';
      }
    } else {
      resultTitle.textContent = "Pachet Recomandat: 1x Flacon BrowLash (Tratament Start 2 Luni)";
      resultExp.textContent = "Pentru fire subțiri genetic și hidratare disciplinată, formula BrowLash va oferi densitate vizibilă și luciu sănătos în primele 4-6 săptămâni.";
      if (applyBtn) {
        applyBtn.innerHTML = `👉 Aplică Recomandarea la Comandă (129 RON)`;
        applyBtn.dataset.targetPack = 'p1';
      }
    }
  }

  // 1-Click Apply Recommendation to Order Form
  if (applyBtn) {
    applyBtn.addEventListener('click', () => {
      const targetPackId = applyBtn.dataset.targetPack || 'p2';
      const radio = document.getElementById(targetPackId);
      if (radio) {
        radio.checked = true;
        radio.dispatchEvent(new Event('change', { bubbles: true }));
        const parentOpt = radio.closest('.package-option');
        if (parentOpt) parentOpt.click();
      }

      // Smooth scroll to checkout card
      const checkoutSection = document.getElementById('comanda');
      if (checkoutSection) {
        checkoutSection.scrollIntoView({ behavior: 'smooth' });
        // Highlight chosen card with a gold flash
        const chosenCard = document.querySelector('.package-option.popular');
        if (chosenCard) {
          chosenCard.style.boxShadow = '0 0 25px rgba(183, 136, 96, 0.6)';
          setTimeout(() => chosenCard.style.boxShadow = '', 1800);
        }
      }
    });
  }

  // Restart Quiz
  if (restartBtn) {
    restartBtn.addEventListener('click', () => {
      quizAnswers.step1 = null;
      quizAnswers.step2 = null;
      quizAnswers.step3 = null;
      quizAnswers.score = 0;

      resultBox.style.display = 'none';
      step1.style.display = 'block';
      step2.style.display = 'none';
      step3.style.display = 'none';

      ind1.className = 'quiz-step-indicator active';
      ind2.className = 'quiz-step-indicator';
      ind3.className = 'quiz-step-indicator';
    });
  }
}

// -------------------------------------------------------------
// 3. Easybox Locker Selector & Dynamic Checkout System
// -------------------------------------------------------------
function initEasyboxAndCheckout() {
  const packageOptions = document.querySelectorAll('.package-option');
  const selectedPackText = document.getElementById('selectedPackText');
  const packPriceText = document.getElementById('packPriceText');
  const shippingCostText = document.getElementById('shippingCostText');
  const grandTotalText = document.getElementById('grandTotalText');
  const fastOrderForm = document.getElementById('fastOrderForm');

  // Delivery toggle elements
  const btnCourier = document.getElementById('btnDelivCourier');
  const btnEasybox = document.getElementById('btnDelivEasybox');
  const easyboxContainer = document.getElementById('easyboxContainer');
  const easyboxSearchInput = document.getElementById('easyboxSearchInput');
  const easyboxResultsList = document.getElementById('easyboxResultsList');
  const easyboxSelectedInfo = document.getElementById('easyboxSelectedInfo');
  const easyboxSelectedName = document.getElementById('easyboxSelectedName');
  const easyboxSelectedAddress = document.getElementById('easyboxSelectedAddress');
  const custAddressInput = document.getElementById('custAddress');
  const custAddressLabel = document.getElementById('custAddressLabel');

  let currentPrice = 129;
  let currentPackName = '1x Flacon BrowLash (Tratament 2 luni)';
  let deliveryMethod = 'courier'; // 'courier' | 'easybox'
  let selectedEasybox = null;

  // Package Radio Options Click Handling
  packageOptions.forEach(opt => {
    opt.addEventListener('click', () => {
      const radio = opt.querySelector('input[type="radio"]');
      if (radio) radio.checked = true;

      currentPrice = parseInt(opt.dataset.price, 10);
      currentPackName = opt.dataset.name;

      updateTotals();
    });
  });

  // Delivery Method Switcher
  if (btnCourier && btnEasybox) {
    btnCourier.addEventListener('click', () => {
      deliveryMethod = 'courier';
      btnCourier.classList.add('active');
      btnEasybox.classList.remove('active');
      if (easyboxContainer) easyboxContainer.style.display = 'none';
      if (custAddressLabel) custAddressLabel.textContent = 'Adresă Livrare (Stradă, Număr, Bloc)';
      if (custAddressInput && selectedEasybox) {
        custAddressInput.value = '';
      }
      updateTotals();
    });

    btnEasybox.addEventListener('click', () => {
      deliveryMethod = 'easybox';
      btnEasybox.classList.add('active');
      btnCourier.classList.remove('active');
      if (easyboxContainer) easyboxContainer.style.display = 'block';
      if (custAddressLabel) custAddressLabel.textContent = 'Locker Sameday Easybox Selectat';
      renderEasyboxList();
      updateTotals();
    });
  }

  // Easybox List Search & Render
  function renderEasyboxList(searchTerm = '') {
    if (!easyboxResultsList) return;

    const term = searchTerm.trim().toLowerCase();
    const filtered = EASYBOX_LOCATIONS.filter(eb => {
      return !term ||
        eb.name.toLowerCase().includes(term) ||
        eb.city.toLowerCase().includes(term) ||
        eb.address.toLowerCase().includes(term) ||
        eb.id.toLowerCase().includes(term);
    });

    if (filtered.length === 0) {
      easyboxResultsList.innerHTML = `
        <div style="padding: 16px; text-align: center; color: #78716c; font-size: 0.88rem;">
          Nu am găsit niciun locker pentru „${searchTerm}”. Încearcă un alt oraș sau magazin.
        </div>
      `;
      return;
    }

    easyboxResultsList.innerHTML = filtered.map(eb => {
      const isSel = selectedEasybox && selectedEasybox.id === eb.id;
      return `
        <div class="easybox-item${isSel ? ' selected' : ''}" data-eb-id="${eb.id}">
          <div>
            <strong>📍 ${eb.name}</strong>
            <span>${eb.address} • <em>${eb.city}</em> [${eb.id}]</span>
          </div>
          <button type="button" class="pick-badge">${isSel ? '✓ Selectat' : 'Alege'}</button>
        </div>
      `;
    }).join('');

    // Attach click listeners to each locker item
    easyboxResultsList.querySelectorAll('.easybox-item').forEach(item => {
      item.addEventListener('click', () => {
        const id = item.dataset.ebId;
        const found = EASYBOX_LOCATIONS.find(e => e.id === id);
        if (found) {
          selectLocker(found);
        }
      });
    });
  }

  function selectLocker(eb) {
    selectedEasybox = eb;
    if (easyboxSelectedInfo) easyboxSelectedInfo.style.display = 'flex';
    if (easyboxSelectedName) easyboxSelectedName.textContent = `${eb.name} (${eb.id})`;
    if (easyboxSelectedAddress) easyboxSelectedAddress.textContent = `${eb.address}, ${eb.city}`;

    // Fill form address with the Easybox details
    if (custAddressInput) {
      custAddressInput.value = `[Easybox ${eb.id}] ${eb.name}, ${eb.address}, ${eb.city}`;
    }
    const countyInput = document.getElementById('custCounty');
    const cityInput = document.getElementById('custCity');
    if (countyInput && !countyInput.value) countyInput.value = eb.city;
    if (cityInput && !cityInput.value) cityInput.value = eb.city;

    renderEasyboxList(easyboxSearchInput?.value || '');
  }

  if (easyboxSearchInput) {
    easyboxSearchInput.addEventListener('input', (e) => {
      renderEasyboxList(e.target.value);
    });
  }

  // Calculate Shipping & Grand Total
  function updateTotals() {
    if (selectedPackText) selectedPackText.textContent = `Pachet: ${currentPackName}`;
    if (packPriceText) packPriceText.textContent = `${currentPrice} RON`;

    // Free shipping threshold is 150 RON
    const isFree = currentPrice >= 150;
    let shipping = 0;

    if (!isFree) {
      shipping = deliveryMethod === 'easybox' ? 10 : 15;
    }

    if (shippingCostText) {
      if (isFree) {
        shippingCostText.textContent = 'GRATUIT (Promoție >150 RON)';
      } else {
        shippingCostText.textContent = deliveryMethod === 'easybox'
          ? `${shipping} RON (Tarif Redus Easybox)`
          : `${shipping} RON (Curier Rapid)`;
      }
    }

    const grandTotal = currentPrice + shipping;
    if (grandTotalText) grandTotalText.textContent = `${grandTotal} RON`;
  }

  updateTotals();

  // Handle Order Submit via WhatsApp API
  if (fastOrderForm) {
    fastOrderForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('custName')?.value.trim() || '';
      const phone = document.getElementById('custPhone')?.value.trim() || '';
      const county = document.getElementById('custCounty')?.value.trim() || '';
      const city = document.getElementById('custCity')?.value.trim() || '';
      const address = custAddressInput?.value.trim() || '';
      const payMethodRadio = document.querySelector('input[name="payMethod"]:checked');
      const payMethod = payMethodRadio ? payMethodRadio.value : 'ramburs';
      const total = grandTotalText?.textContent || `${currentPrice} RON`;

      // Validation for Easybox
      if (deliveryMethod === 'easybox' && !selectedEasybox && !address.toLowerCase().includes('easybox')) {
        alert('⚠️ Te rugăm să selectezi un Locker Sameday Easybox din listă înainte de finalizare!');
        if (easyboxSearchInput) easyboxSearchInput.focus();
        return;
      }

      const deliveryInfo = deliveryMethod === 'easybox'
        ? `📦 Sameday Easybox: ${selectedEasybox ? `${selectedEasybox.name} (${selectedEasybox.id})` : address}`
        : `🚚 Curier Rapid la Ușă: ${address}, ${city}, ${county}`;

      const message = `🛍️ COMANDĂ NOUĂ BROWLASH ROMÂNIA:\n` +
        `-----------------------------------------\n` +
        `📦 Pachet: ${currentPackName}\n` +
        `💰 Total de Plată: ${total}\n` +
        `💳 Metodă Plată: ${payMethod === 'card' ? 'Card Bancar Online' : 'Ramburs / Plata la Locker'}\n` +
        `📍 Modalitate Livrare: ${deliveryMethod === 'easybox' ? 'Sameday Easybox Locker (Cod PIN pe SMS)' : 'Curier Domiciliu'}\n` +
        `🏢 Punct Livrare: ${deliveryInfo}\n` +
        `👤 Nume Client: ${name}\n` +
        `📱 Telefon: ${phone}\n` +
        `-----------------------------------------\n` +
        `Comandă plasată de pe site-ul oficial BrowLash.`;

      alert(`🎉 Felicitări, ${name}! Comanda ta pentru ${currentPackName} a fost înregistrată cu succes!\n\n${deliveryMethod === 'easybox' ? 'Vei primi codul PIN și QR prin SMS când coletul ajunge în Easybox.' : 'Coletul va fi livrat prin curier rapid în 24-48h.'}`);

      window.open(`https://wa.me/40700000000?text=${encodeURIComponent(message)}`, '_blank');
    });
  }
}
