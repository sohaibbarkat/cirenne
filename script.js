/* =========================================================
   CIRENNE — Alpine Botanical Skincare
   Script
   ========================================================= */

(() => {
  'use strict';

  /* ---------- PRODUCT DATA ---------- */
  const PRODUCTS = [
    {
      id: 'p1',
      name: 'Hydrating Serum',
      eyebrow: 'Ritual I',
      price: 128,
      img: 'assets/images/hero-bottle.png',
      desc: 'A featherweight serum drawn from glacial water and edelweiss extract, formulated to hold moisture through altitude and climate stress alike.'
    },
    {
      id: 'p2',
      name: 'Night Repair Oil',
      eyebrow: 'Ritual II',
      price: 156,
      img: 'assets/images/silk-01.jpg',
      desc: 'A dense, slow-absorbing oil of Arolla pine resin that mirrors skin\u2019s own overnight repair rhythms.'
    },
    {
      id: 'p3',
      name: 'Luxury Cleanser',
      eyebrow: 'Ritual III',
      price: 84,
      img: 'assets/images/water-01.jpg',
      desc: 'A cream-to-milk cleanser that lifts impurities without disturbing the skin barrier\u2019s natural mineral balance.'
    },
    {
      id: 'p4',
      name: 'Botanical Mist',
      eyebrow: 'Ritual IV',
      price: 68,
      img: 'assets/images/mountain-02.jpg',
      desc: 'A fine glacial-water mist infused with rhodiola root, worn throughout the day to sustain resilience.'
    },
    {
      id: 'p5',
      name: 'Luxury Moisturizer',
      eyebrow: 'Ritual V',
      price: 142,
      img: 'assets/images/stone-02.jpg',
      desc: 'A rich, quietly luminous cream that finishes the ritual with lasting comfort through dry alpine air.'
    },
    {
      id: 'p6',
      name: 'Clay Mask',
      eyebrow: 'Ritual VI',
      price: 96,
      img: 'assets/images/stone-01.jpg',
      desc: 'A mineral-dense clay drawn from high-altitude deposits, used weekly to refine and clarify.'
    }
  ];

  const state = {
    cart: [],
    wishlist: []
  };

  /* ---------- UTIL ---------- */
  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));
  const formatPrice = (n) => `$${n}`;
  const findProduct = (id) => PRODUCTS.find((p) => p.id === id);

  /* ---------- LOADER ---------- */
  window.addEventListener('load', () => {
    const loader = $('#loader');
    setTimeout(() => {
      loader.classList.add('is-hidden');
      document.body.style.overflow = '';
    }, 2000);
  });
  document.body.style.overflow = 'hidden';
  setTimeout(() => { document.body.style.overflow = ''; }, 2100);

  /* ---------- COOKIE BANNER ---------- */
  const cookieBanner = $('#cookieBanner');
  const COOKIE_KEY = 'cirenne_cookie_choice';
  if (!sessionStorage.getItem(COOKIE_KEY)) {
    setTimeout(() => cookieBanner.classList.add('is-visible'), 2600);
  }
  const dismissCookie = (choice) => {
    sessionStorage.setItem(COOKIE_KEY, choice);
    cookieBanner.classList.remove('is-visible');
  };
  $('#cookieAccept').addEventListener('click', () => dismissCookie('accepted'));
  $('#cookieDecline').addEventListener('click', () => dismissCookie('declined'));

  /* ---------- STICKY NAV / HIDE ON SCROLL ---------- */
  const nav = $('#siteNav');
  let lastScroll = 0;
  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    nav.classList.toggle('is-scrolled', y > 40);
    if (y > lastScroll && y > 200) {
      nav.classList.add('is-hidden');
    } else {
      nav.classList.remove('is-hidden');
    }
    lastScroll = y;
    updateBackToTop();
  }, { passive: true });

  /* ---------- MOBILE NAV ---------- */
  const menuBtn = $('#menuBtn');
  const mobileNav = $('#mobileNav');
  menuBtn.addEventListener('click', () => {
    const isOpen = mobileNav.classList.toggle('is-open');
    menuBtn.setAttribute('aria-expanded', String(isOpen));
    mobileNav.setAttribute('aria-hidden', String(!isOpen));
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });
  $$('.mobile-nav a').forEach((a) => a.addEventListener('click', () => {
    mobileNav.classList.remove('is-open');
    menuBtn.setAttribute('aria-expanded', 'false');
    mobileNav.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }));

  /* ---------- SCROLL REVEAL ---------- */
  const revealEls = $$('[data-reveal]');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  revealEls.forEach((el) => revealObserver.observe(el));

  /* ---------- PARALLAX ---------- */
  const parallaxEls = $$('[data-parallax]');
  const applyParallax = () => {
    const vh = window.innerHeight;
    parallaxEls.forEach((el) => {
      const rect = el.getBoundingClientRect();
      const center = rect.top + rect.height / 2;
      const offset = (center - vh / 2) * 0.08;
      const img = el.querySelector('img');
      if (img) img.style.transform = `translateY(${offset}px) scale(1.15)`;
    });
  };
  window.addEventListener('scroll', () => requestAnimationFrame(applyParallax), { passive: true });
  window.addEventListener('resize', applyParallax);
  applyParallax();

  /* ---------- HERO SCROLL CUE ---------- */
  $('#scrollCue').addEventListener('click', () => {
    $('.showcase')?.scrollIntoView({ behavior: 'smooth' });
  });

  /* ---------- MAGNETIC BUTTONS ---------- */
  $$('.magnetic').forEach((btn) => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      btn.style.transform = `translate(${x * 0.18}px, ${y * 0.35}px)`;
    });
    btn.addEventListener('mouseleave', () => { btn.style.transform = 'translate(0,0)'; });
  });

  /* ---------- BACK TO TOP ---------- */
  const backToTop = $('#backToTop');
  function updateBackToTop() {
    backToTop.classList.toggle('is-visible', window.scrollY > 800);
  }
  backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  /* ---------- FAQ ACCORDION ---------- */
  $$('.faq__item').forEach((item) => {
    const question = $('.faq__question', item);
    question.addEventListener('click', () => {
      const isOpen = item.classList.contains('is-open');
      $$('.faq__item').forEach((other) => {
        other.classList.remove('is-open');
        $('.faq__question', other).setAttribute('aria-expanded', 'false');
      });
      if (!isOpen) {
        item.classList.add('is-open');
        question.setAttribute('aria-expanded', 'true');
      }
    });
  });

  /* ---------- PRODUCT GRID RENDER ---------- */
  const productGrid = $('#productGrid');
  function renderProducts() {
    productGrid.innerHTML = PRODUCTS.map((p) => `
      <article class="product-card reveal" data-reveal data-id="${p.id}">
        <div class="product-card__media">
          <img src="${p.img}" alt="${p.name} by CIRENNE" loading="lazy" onerror="this.style.display='none'">
          <div class="product-card__actions">
            <button class="product-card__icon-btn js-wishlist-toggle" data-id="${p.id}" aria-label="Add ${p.name} to wishlist">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M20.8 4.6a5.5 5.5 0 00-7.8 0L12 5.6l-1-1a5.5 5.5 0 10-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 000-7.8z"/></svg>
            </button>
            <button class="product-card__icon-btn js-quickview" data-id="${p.id}" aria-label="Quick view ${p.name}">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7z"/><circle cx="12" cy="12" r="3"/></svg>
            </button>
          </div>
        </div>
        <div class="product-card__body">
          <span class="product-card__eyebrow">${p.eyebrow}</span>
          <h3>${p.name}</h3>
          <p>${p.desc}</p>
          <div class="product-card__footer">
            <span class="product-card__price">${formatPrice(p.price)}</span>
            <button class="product-card__add js-add-cart" data-id="${p.id}">Add to Bag</button>
          </div>
        </div>
      </article>
    `).join('');

    $$('.product-card', productGrid).forEach((card) => revealObserver.observe(card));
    $$('.js-wishlist-toggle', productGrid).forEach((btn) => btn.addEventListener('click', () => toggleWishlist(btn.dataset.id, btn)));
    $$('.js-add-cart', productGrid).forEach((btn) => btn.addEventListener('click', () => addToCart(btn.dataset.id)));
    $$('.js-quickview', productGrid).forEach((btn) => btn.addEventListener('click', () => openQuickView(btn.dataset.id)));
  }
  renderProducts();

  /* ---------- WISHLIST ---------- */
  const wishlistCount = $('#wishlistCount');
  const wishlistItems = $('#wishlistItems');

  function toggleWishlist(id, btnEl) {
    const idx = state.wishlist.indexOf(id);
    if (idx > -1) {
      state.wishlist.splice(idx, 1);
    } else {
      state.wishlist.push(id);
    }
    renderWishlistButtons();
    renderWishlistDrawer();
  }

  function renderWishlistButtons() {
    $$('.js-wishlist-toggle').forEach((btn) => {
      btn.classList.toggle('is-active', state.wishlist.includes(btn.dataset.id));
    });
    wishlistCount.textContent = state.wishlist.length;
  }

  function renderWishlistDrawer() {
    if (state.wishlist.length === 0) {
      wishlistItems.innerHTML = '<p class="drawer__empty">Your wishlist is empty.</p>';
      return;
    }
    wishlistItems.innerHTML = state.wishlist.map((id) => {
      const p = findProduct(id);
      return `
        <div class="drawer-item">
          <div class="drawer-item__media"><img src="${p.img}" alt="${p.name}" onerror="this.style.display='none'"></div>
          <div>
            <p class="drawer-item__name">${p.name}</p>
            <p class="drawer-item__price">${formatPrice(p.price)}</p>
            <button class="drawer-item__remove" data-id="${p.id}">Remove</button>
          </div>
          <button class="product-card__add js-move-to-cart" data-id="${p.id}" style="font-size:0.65rem; padding:0.5rem 0.7rem;">Add</button>
        </div>
      `;
    }).join('');
    $$('.drawer-item__remove', wishlistItems).forEach((btn) => btn.addEventListener('click', () => {
      toggleWishlist(btn.dataset.id);
    }));
    $$('.js-move-to-cart', wishlistItems).forEach((btn) => btn.addEventListener('click', () => addToCart(btn.dataset.id)));
  }

  /* ---------- CART ---------- */
  const cartCount = $('#cartCount');
  const cartItemsEl = $('#cartItems');
  const cartFooter = $('#cartFooter');
  const cartTotalEl = $('#cartTotal');

  function addToCart(id) {
    const existing = state.cart.find((item) => item.id === id);
    if (existing) {
      existing.qty += 1;
    } else {
      state.cart.push({ id, qty: 1 });
    }
    renderCart();
    openDrawer('cart');
  }

  function updateQty(id, delta) {
    const item = state.cart.find((i) => i.id === id);
    if (!item) return;
    item.qty += delta;
    if (item.qty <= 0) {
      state.cart = state.cart.filter((i) => i.id !== id);
    }
    renderCart();
  }

  function renderCart() {
    const totalItems = state.cart.reduce((sum, i) => sum + i.qty, 0);
    cartCount.textContent = totalItems;

    if (state.cart.length === 0) {
      cartItemsEl.innerHTML = '<p class="drawer__empty">Your bag is empty.</p>';
      cartFooter.hidden = true;
      return;
    }

    cartFooter.hidden = false;
    let total = 0;
    cartItemsEl.innerHTML = state.cart.map((item) => {
      const p = findProduct(item.id);
      const lineTotal = p.price * item.qty;
      total += lineTotal;
      return `
        <div class="drawer-item">
          <div class="drawer-item__media"><img src="${p.img}" alt="${p.name}" onerror="this.style.display='none'"></div>
          <div>
            <p class="drawer-item__name">${p.name}</p>
            <p class="drawer-item__price">${formatPrice(p.price)}</p>
            <div class="drawer-item__qty">
              <button class="js-qty-minus" data-id="${p.id}" aria-label="Decrease quantity">&minus;</button>
              <span>${item.qty}</span>
              <button class="js-qty-plus" data-id="${p.id}" aria-label="Increase quantity">&plus;</button>
            </div>
          </div>
          <span class="drawer-item__price">${formatPrice(lineTotal)}</span>
        </div>
      `;
    }).join('');
    cartTotalEl.textContent = formatPrice(total);

    $$('.js-qty-minus', cartItemsEl).forEach((b) => b.addEventListener('click', () => updateQty(b.dataset.id, -1)));
    $$('.js-qty-plus', cartItemsEl).forEach((b) => b.addEventListener('click', () => updateQty(b.dataset.id, 1)));
  }

  /* ---------- QUICK VIEW MODAL ---------- */
  const quickViewModal = $('#quickViewModal');
  function openQuickView(id) {
    const p = findProduct(id);
    $('#quickViewImg').src = p.img;
    $('#quickViewImg').alt = p.name;
    $('#quickViewEyebrow').textContent = p.eyebrow;
    $('#quickViewTitle').textContent = p.name;
    $('#quickViewDesc').textContent = p.desc;
    $('#quickViewPrice').textContent = formatPrice(p.price);
    $('#quickViewAddCart').onclick = () => { addToCart(id); closeQuickView(); };
    $('#quickViewWishlist').onclick = () => { toggleWishlist(id); };
    quickViewModal.classList.add('is-open');
    quickViewModal.setAttribute('aria-hidden', 'false');
  }
  function closeQuickView() {
    quickViewModal.classList.remove('is-open');
    quickViewModal.setAttribute('aria-hidden', 'true');
  }
  $('#quickViewClose').addEventListener('click', closeQuickView);
  $('#quickViewBackdrop').addEventListener('click', closeQuickView);

  /* ---------- DRAWERS (search / wishlist / cart) ---------- */
  const overlay = $('#drawerOverlay');
  const drawers = {
    search: $('#searchDrawer'),
    wishlist: $('#wishlistDrawer'),
    cart: $('#cartDrawer')
  };

  function openDrawer(name) {
    Object.values(drawers).forEach((d) => d.classList.remove('is-open'));
    drawers[name].classList.add('is-open');
    drawers[name].setAttribute('aria-hidden', 'false');
    overlay.classList.add('is-visible');
    if (name === 'search') setTimeout(() => $('#searchInput').focus(), 300);
  }
  function closeDrawers() {
    Object.values(drawers).forEach((d) => {
      d.classList.remove('is-open');
      d.setAttribute('aria-hidden', 'true');
    });
    overlay.classList.remove('is-visible');
  }
  overlay.addEventListener('click', closeDrawers);
  $('#searchClose').addEventListener('click', closeDrawers);
  $('#wishlistClose').addEventListener('click', closeDrawers);
  $('#cartClose').addEventListener('click', closeDrawers);
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') { closeDrawers(); closeQuickView(); }
  });

  $('#searchBtn').addEventListener('click', () => openDrawer('search'));
  $('#wishlistBtn').addEventListener('click', () => { renderWishlistDrawer(); openDrawer('wishlist'); });
  $('#cartBtn').addEventListener('click', () => openDrawer('cart'));

  /* ---------- SEARCH ---------- */
  const searchInput = $('#searchInput');
  const searchResults = $('#searchResults');
  function renderSearch(query) {
    const q = query.trim().toLowerCase();
    if (!q) {
      searchResults.innerHTML = '<p class="search-empty">Start typing to search the collection.</p>';
      return;
    }
    const matches = PRODUCTS.filter((p) => p.name.toLowerCase().includes(q) || p.desc.toLowerCase().includes(q));
    if (matches.length === 0) {
      searchResults.innerHTML = '<p class="search-empty">No formulas match your search.</p>';
      return;
    }
    searchResults.innerHTML = matches.map((p) => `
      <div class="search-result" data-id="${p.id}">
        <div class="search-result__media"><img src="${p.img}" alt="${p.name}" onerror="this.style.display='none'"></div>
        <span class="search-result__name">${p.name}</span>
        <span class="product-card__price">${formatPrice(p.price)}</span>
      </div>
    `).join('');
    $$('.search-result', searchResults).forEach((r) => r.addEventListener('click', () => {
      closeDrawers();
      openQuickView(r.dataset.id);
    }));
  }
  searchInput.addEventListener('input', (e) => renderSearch(e.target.value));
  renderSearch('');

  /* ---------- NEWSLETTER FORM ---------- */
  $('#newsletterForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const email = $('#newsletterEmail').value;
    $('#newsletterNote').textContent = `Thank you \u2014 a note of confirmation is on its way to ${email}.`;
    e.target.reset();
  });

  /* ---------- CONTACT FORM ---------- */
  $('#contactForm').addEventListener('submit', (e) => {
    e.preventDefault();
    $('#contactNote').textContent = 'Thank you for writing \u2014 our correspondence team will reply within two business days.';
    e.target.reset();
  });

  /* ---------- INITIAL RENDER ---------- */
  renderWishlistButtons();
  renderCart();
})();
    
