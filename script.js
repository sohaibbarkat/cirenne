(function () {
  'use strict';

  /* =========================================================
     Mobile navigation
  ========================================================= */
  const navToggle = document.getElementById('navToggle');
  const mobileMenu = document.getElementById('mobileMenu');

  function closeMobileMenu() {
    navToggle.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
    mobileMenu.classList.remove('open');
  }

  navToggle.addEventListener('click', () => {
    const isOpen = mobileMenu.classList.toggle('open');
    navToggle.classList.toggle('open', isOpen);
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });

  mobileMenu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', closeMobileMenu);
  });

  /* =========================================================
     Scroll reveal (IntersectionObserver)
  ========================================================= */
  const revealEls = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, i) => {
          if (entry.isIntersecting) {
            const el = entry.target;
            const delay = (i % 3) * 90;
            setTimeout(() => el.classList.add('in-view'), delay);
            revealObserver.unobserve(el);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -60px 0px' }
    );
    revealEls.forEach((el) => revealObserver.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add('in-view'));
  }

  /* =========================================================
     Hero liquid blob — mouse parallax
  ========================================================= */
  const blobWrap = document.getElementById('blobWrap');
  const blob = document.getElementById('blob');

  if (blobWrap && blob && window.matchMedia('(hover: hover)').matches) {
    blobWrap.addEventListener('mousemove', (e) => {
      const rect = blobWrap.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width - 0.5;
      const py = (e.clientY - rect.top) / rect.height - 0.5;
      blob.style.setProperty('--tx', `${px * 22}px`);
      blob.style.setProperty('--ty', `${py * 18}px`);
      blob.style.setProperty('--rot', `${px * 10}deg`);
    });
    blobWrap.addEventListener('mouseleave', () => {
      blob.style.setProperty('--tx', '0px');
      blob.style.setProperty('--ty', '0px');
      blob.style.setProperty('--rot', '0deg');
    });
  }

  /* =========================================================
     Product card tilt
  ========================================================= */
  const tiltCards = document.querySelectorAll('[data-tilt]');

  if (window.matchMedia('(hover: hover)').matches) {
    tiltCards.forEach((card) => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const px = (e.clientX - rect.left) / rect.width - 0.5;
        const py = (e.clientY - rect.top) / rect.height - 0.5;
        card.style.setProperty('--ry', `${px * 10}deg`);
        card.style.setProperty('--rx', `${-py * 10}deg`);
      });
      card.addEventListener('mouseleave', () => {
        card.style.setProperty('--rx', '0deg');
        card.style.setProperty('--ry', '0deg');
      });
    });
  }

  /* =========================================================
     Accordion (FAQ)
  ========================================================= */
  const accordionTriggers = document.querySelectorAll('.accordion-trigger');

  accordionTriggers.forEach((trigger) => {
    const panel = trigger.nextElementSibling;
    panel.style.maxHeight = '0px';

    trigger.addEventListener('click', () => {
      const isOpen = trigger.getAttribute('aria-expanded') === 'true';

      accordionTriggers.forEach((otherTrigger) => {
        if (otherTrigger !== trigger) {
          otherTrigger.setAttribute('aria-expanded', 'false');
          otherTrigger.nextElementSibling.style.maxHeight = '0px';
        }
      });

      trigger.setAttribute('aria-expanded', String(!isOpen));
      panel.style.maxHeight = isOpen ? '0px' : `${panel.scrollHeight}px`;
    });
  });

  /* =========================================================
     Newsletter form
  ========================================================= */
  const newsletterForm = document.getElementById('newsletterForm');
  const newsletterEmail = document.getElementById('newsletterEmail');
  const newsletterMessage = document.getElementById('newsletterMessage');

  newsletterForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const value = newsletterEmail.value.trim();
    const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

    if (!isValid) {
      newsletterMessage.textContent = 'Please enter a valid email address.';
      newsletterMessage.classList.add('error');
      return;
    }

    newsletterMessage.classList.remove('error');
    newsletterMessage.textContent = "You're on the list. Welcome to the source.";
    newsletterForm.querySelector('button').disabled = true;
    newsletterEmail.disabled = true;
  });

  /* =========================================================
     Cart drawer
  ========================================================= */
  const cartOverlay = document.getElementById('cartOverlay');
  const cartDrawer = document.getElementById('cartDrawer');
  const cartClose = document.getElementById('cartClose');
  const cartItemsEl = document.getElementById('cartItems');
  const cartEmptyEl = document.getElementById('cartEmpty');
  const cartTotalEl = document.getElementById('cartTotal');
  const shopBtn = document.getElementById('shopBtn');
  const mobileShopBtn = document.getElementById('mobileShopBtn');
  const checkoutBtn = document.getElementById('checkoutBtn');
  const addToCartButtons = document.querySelectorAll('.add-to-cart');

  let cart = [];

  function openCart() {
    cartDrawer.classList.add('open');
    cartOverlay.classList.add('open');
    cartDrawer.setAttribute('aria-hidden', 'false');
  }

  function closeCart() {
    cartDrawer.classList.remove('open');
    cartOverlay.classList.remove('open');
    cartDrawer.setAttribute('aria-hidden', 'true');
  }

  function parsePrice(str) {
    return Number(str.replace(/[^0-9.]/g, ''));
  }

  function renderCart() {
    cartItemsEl.innerHTML = '';

    if (cart.length === 0) {
      cartItemsEl.appendChild(cartEmptyEl);
      cartTotalEl.textContent = '$0';
      return;
    }

    let total = 0;

    cart.forEach((item, index) => {
      total += item.price;

      const row = document.createElement('div');
      row.className = 'cart-item';
      row.innerHTML = `
        <div class="cart-item-info">
          <span class="cart-item-name">${item.name}</span>
          <span class="cart-item-kind">${item.kind}</span>
          <button class="cart-item-remove" data-index="${index}">Remove</button>
        </div>
        <span class="cart-item-price">$${item.price}</span>
      `;
      cartItemsEl.appendChild(row);
    });

    cartTotalEl.textContent = `$${total}`;

    cartItemsEl.querySelectorAll('.cart-item-remove').forEach((btn) => {
      btn.addEventListener('click', () => {
        const idx = Number(btn.getAttribute('data-index'));
        cart.splice(idx, 1);
        renderCart();
      });
    });
  }

  addToCartButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const card = btn.closest('.product-card');
      const name = card.getAttribute('data-name');
      const kind = card.getAttribute('data-kind');
      const price = parsePrice(card.getAttribute('data-price'));

      cart.push({ name, kind, price });
      renderCart();
      openCart();
    });
  });

  shopBtn.addEventListener('click', openCart);
  mobileShopBtn.addEventListener('click', () => {
    closeMobileMenu();
    document.getElementById('products').scrollIntoView({ behavior: 'smooth' });
  });
  cartClose.addEventListener('click', closeCart);
  cartOverlay.addEventListener('click', closeCart);

  checkoutBtn.addEventListener('click', () => {
    if (cart.length === 0) return;
    alert('This is a front-end demo. Checkout would continue to payment here.');
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeCart();
  });

  renderCart();

  /* =========================================================
     Back to top button
  ========================================================= */
  const backToTop = document.getElementById('backToTop');

  window.addEventListener('scroll', () => {
    backToTop.classList.toggle('visible', window.scrollY > 600);
  });

  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
})();
                                          
