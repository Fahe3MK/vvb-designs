
const btn = document.getElementById("themeToggleBtn");
const body = document.body;

// Initialize from saved preference
if (localStorage.getItem("theme") === "dark") {
  body.classList.add("dark-mode");
  btn.textContent = "☀️ Light";
  btn.classList.remove("btn-outline-secondary");
  btn.classList.add("btn-outline-light");
}

btn.addEventListener("click", function () {
  const isDark = body.classList.toggle("dark-mode");

  if (isDark) {
    btn.textContent = "☀️ Light";
    btn.classList.remove("btn-outline-secondary");
    btn.classList.add("btn-outline-light");
    localStorage.setItem("theme", "dark");
  } else {
    btn.textContent = "🌙 Dark";
    btn.classList.remove("btn-outline-light");
    btn.classList.add("btn-outline-secondary");
    localStorage.setItem("theme", "light");
  }
});


// hero section script start 
  const typedElement = document.getElementById("typedText");

      const phrases = [
        "Brand Identity & Logo Design.",
        "Marketing & Advertising Design.",
        "Social Media Design & Content Kit.",
        "Website & UI Design (Design Only).",
        "Print & Packaging Design.",
        "Custom Illustration & Icon Design."
      ];

      let phraseIndex = 0;
      let charIndex = 0;
      let isDeleting = false;

      function typeLoop() {
        const currentPhrase = phrases[phraseIndex];
        const displayed = currentPhrase.substring(0, charIndex);

        typedElement.textContent = displayed;

        if (!isDeleting && charIndex < currentPhrase.length) {
          charIndex++;
          setTimeout(typeLoop, 80); // typing speed
        } else if (isDeleting && charIndex > 0) {
          charIndex--;
          setTimeout(typeLoop, 50); // deleting speed
        } else {
          if (!isDeleting) {
            // Pause before deleting
            isDeleting = true;
            setTimeout(typeLoop, 1200);
          } else {
            // Move to next phrase
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            setTimeout(typeLoop, 200);
          }
        }
      }

      // Start typing after small delay
      setTimeout(typeLoop, 400);
      // hero section script end 





      // portfolio script start 
        // When any "View More" inside a card is clicked, populate the modal with that card's data.
      document.querySelectorAll('.portfolio-grid .card').forEach(card => {
        const btn = card.querySelector('.btn-view');
        btn.addEventListener('click', function () {
          const title = card.getAttribute('data-title') || card.querySelector('.card-title').innerText;
          const desc = card.getAttribute('data-desc') || card.querySelector('.card-text').innerText;
          const img = card.getAttribute('data-img') || card.querySelector('.card-img-top').src;
          const contact = card.getAttribute('data-contact') || 'mailto:info@example.com';

          document.getElementById('modalTitle').innerText = title;
          document.getElementById('modalDesc').innerText = desc;
          document.getElementById('modalImage').setAttribute('src', img);
          document.getElementById('modalImage').setAttribute('alt', title);
          document.getElementById('modalContact').setAttribute('href', contact);

          // Optionally, you can add a subtle image zoom in animation when modal opens
          const imgEl = document.getElementById('modalImage');
          imgEl.style.transform = 'scale(0.98)';
          setTimeout(() => imgEl.style.transform = 'scale(1)', 30);
        });
      });

      // Accessibility: allow keyboard focus back on last card after modal close (optional)
      const portfolioModalEl = document.getElementById('portfolioModal');
      portfolioModalEl.addEventListener('hidden.bs.modal', function (event) {
        // find any open/active element? we can leave as is; optionally return focus programmatically
      });
      // portfolio section end 


      // services script start here 
       // Reveal on scroll with stagger
      const cards = document.querySelectorAll('.service-card');
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            // add small stagger by delay based on index
            const i = Array.from(cards).indexOf(entry.target);
            entry.target.style.transitionDelay = (i * 80) + 'ms';
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.12 });

      cards.forEach(c => observer.observe(c));

      // Tilt effect for icon area (mouse move)
      document.querySelectorAll('.service-card').forEach(card => {
        const iconWrap = card.querySelector('.service-icon-wrap');
        card.addEventListener('mousemove', (e) => {
          const r = card.getBoundingClientRect();
          const x = (e.clientX - r.left) / r.width - 0.5;
          const y = (e.clientY - r.top) / r.height - 0.5;
          iconWrap.style.transform = `translateZ(30px) rotateX(${ -y * 8 }deg) rotateY(${ x * 8 }deg)`;
        });
        card.addEventListener('mouseleave', () => {
          iconWrap.style.transform = '';
        });
      });

      // Modal population logic
      const serviceModal = document.getElementById('serviceModal');
      const svcImg = document.getElementById('svcImg');
      const svcTitle = document.getElementById('svcTitle');
      const svcText = document.getElementById('svcText');
      const svcContact = document.getElementById('svcContact');
      const svcList = document.getElementById('svcList');

      document.querySelectorAll('.service-card').forEach(card => {
        const btn = card.querySelector('.btn-details');
        btn.addEventListener('click', () => {
          const title = card.dataset.title || card.querySelector('.service-title').innerText;
          const desc = card.dataset.desc || card.querySelector('.service-desc').innerText;
          const img = card.dataset.img || '';
          const contact = card.dataset.contact || 'mailto:info@example.com';

          svcTitle.innerText = title;
          svcText.innerText = desc;
          svcImg.src = img;
          svcContact.href = contact;

          // example dynamic bullet points (you can set data-attributes if you want)
          svcList.innerHTML = `
            <li>Scoping & planning</li>
            <li>Implementation & testing</li>
            <li>Monitoring & handover</li>
          `;

          // small image reveal animation
          svcImg.style.transform = 'scale(.98)';
          setTimeout(()=> svcImg.style.transform = 'scale(1)', 30);
        });
      });

      // Optional: keyboard accessibility to open modal with Enter key on focused card
      document.querySelectorAll('.service-card').forEach(card => {
        card.tabIndex = 0;
        card.addEventListener('keydown', (e) => {
          if (e.key === 'Enter') {
            card.querySelector('.btn-details').click();
          }
        });
      });
      // services script end here 


      // case study section start 
       document.addEventListener('DOMContentLoaded', function () {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const caseItems = document.querySelectorAll('.case-item');

    filterButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        // active class change
        filterButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filterValue = btn.getAttribute('data-filter');

        caseItems.forEach(item => {
          const itemCategories = item.getAttribute('data-category');

          if (filterValue === 'all' || itemCategories.includes(filterValue)) {
            item.style.display = 'block';
          } else {
            item.style.display = 'none';
          }
        });
      });
    });
  });

  // case study section end 


  // testimonal script start 
    // Pause bootstrap carousel when user hovers the card
  const tCarousel = document.getElementById('testimonialCarousel');
  if (tCarousel) {
    tCarousel.addEventListener('mouseenter', () => {
      bootstrap.Carousel.getInstance(tCarousel)?.pause();
    });
    tCarousel.addEventListener('mouseleave', () => {
      bootstrap.Carousel.getInstance(tCarousel)?.cycle();
    });
  }
  // testimonal script end 


  // contact cta start 
   (function () {
    'use strict';
    const form = document.getElementById('quoteForm');
    const formAlert = document.getElementById('formAlert');

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      // basic html5 validation check
      if (!form.checkValidity()) {
        form.classList.add('was-validated');
        return;
      }

      // Show a simple sending indicator (replace with real AJAX or normal POST)
      const submitBtn = form.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = 'Sending...';

      // Simulate sending (replace with fetch/ajax to your backend)
      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
        form.reset();
        form.classList.remove('was-validated');
        formAlert.style.display = 'block';
        formAlert.className = 'alert alert-success small mt-2';
        formAlert.innerText = 'Thanks! Your request has been received. We will contact you shortly.';
        // hide alert after 6s
        setTimeout(() => formAlert.style.display = 'none', 6000);
      }, 1100);
    });
  })();
  // contact cta end 


  // newsletter footer script start 
  // insert current year in footer
  document.getElementById('yearNow').innerText = new Date().getFullYear();

  // Basic validation & fake submit handler for three forms (inline, footer, modal)
  (function () {
    const forms = [
      { id: 'newsletterForm', alertId: 'nlAlert' },
      { id: 'footerNL', alertId: null },
      { id: 'modalNL', alertId: null }
    ];

    forms.forEach(f => {
      const form = document.getElementById(f.id);
      if (!form) return;
      form.addEventListener('submit', function (e) {
        e.preventDefault();
        if (!form.checkValidity()) {
          form.classList.add('was-validated');
          return;
        }
        // Replace this block with fetch/ajax to your mailing provider
        const submitBtn = form.querySelector('button[type="submit"]') || form.querySelector('input[type="submit"]');
        const originalText = submitBtn ? submitBtn.innerHTML : null;
        if (submitBtn) {
          submitBtn.disabled = true;
          submitBtn.innerHTML = 'Sending...';
        }

        setTimeout(() => {
          if (submitBtn) { submitBtn.disabled = false; submitBtn.innerHTML = originalText; }
          form.reset();
          form.classList.remove('was-validated');
          if (f.alertId) {
            const alert = document.getElementById(f.alertId);
            alert.style.display = 'block';
            alert.className = 'alert alert-success small mt-2';
            alert.innerText = 'Thanks! Check your inbox for the checklist.';
            setTimeout(() => alert.style.display = 'none', 6000);
          } else {
            // close modal if opened
            const modalEl = document.getElementById('leadModal');
            if (modalEl && bootstrap.Modal.getInstance(modalEl)) {
              bootstrap.Modal.getInstance(modalEl).hide();
            }
            // small toast fallback
            alert('Thanks! Check your inbox for the checklist.');
          }
        }, 900);
      });
    });

    // OPTIONAL: Auto-show modal after X seconds for first-time visitors
    // Uncomment to enable (or trigger with a button)
    /*
    setTimeout(() => {
      const modalEl = document.getElementById('leadModal');
      const modal = new bootstrap.Modal(modalEl);
      modal.show();
    }, 4500);
    */

  })();

  // newsletter footer script end 

  // legal section start 
const year = new Date().getFullYear();
  document.getElementById('footerYear').innerText = year;
  document.getElementById('footerYearCopy').innerText = year;

    (function(){
    // ---------- SERVICE DATA ----------
    const SERVICE_DATA = {
      brand: {
        title: 'Brand Identity',
        items: [
          {title:'Logo Design', desc:'Minimal, Mascot, Wordmark, Icon'},
          {title:'Complete Brand Kit', desc:'Color palette, Typography, Guidelines PDF'},
          {title:'Rebranding', desc:'Audit + new identity + rollout assets'}
        ]
      },
      social: {
        title: 'Social Media Kit',
        items: [
          {title:'Post Templates', desc:'Editable Canva / Figma templates (15-30)'},
          {title:'Stories & Reels', desc:'Animated stories + covers'},
          {title:'Profile & Banners', desc:'Consistent profiles & covers'}
        ]
      },
      marketing: {
        title:'Marketing & Advertising',
        items:[
          {title:'Ad Creatives', desc:'Facebook/IG & Google display variations'},
          {title:'Flyers & Posters', desc:'Print-ready & digital assets'},
          {title:'Billboards & Hoardings', desc:'Large-format designs'}
        ]
      },
      ui: {
        title:'Website & UI Design',
        items:[
          {title:'Landing Page UI', desc:'Pixel-perfect Figma layouts'},
          {title:'Design System', desc:'Components, tokens, reusable kit'},
          {title:'App Screens', desc:'Mobile & dashboard wireframes'}
        ]
      },
      print: {
        title:'Print & Packaging',
        items:[
          {title:'Stationery', desc:'Business card, letterhead, envelopes'},
          {title:'Packaging', desc:'Dielines-ready boxes & labels'},
          {title:'Catalogs & Brochures', desc:'Bi-fold/tri-fold layouts'}
        ]
      },
      illustration: {
        title:'Illustration & Icons',
        items:[
          {title:'Custom Illustrations', desc:'Website scenes, mascots, explainer art'},
          {title:'Icon Sets', desc:'Custom icons for UI and prints'},
          {title:'Character / Mascot', desc:'Brand mascot design & poses'}
        ]
      }
    };

    // ---------- ELEMENTS ----------
    const pop = document.getElementById('servicePopover');
    const popTitle = document.getElementById('svPopTitle');
    const popList = document.getElementById('svPopList');
    const overlay = document.getElementById('svOverlay');
    const closeBtn = document.getElementById('svCloseBtn');

    let activeAnchor = null;

    // ---------- OPEN / CLOSE ----------
    function openPopover(key, anchor){
      const data = SERVICE_DATA[key];
      if(!data) return;
      popTitle.textContent = data.title;
      popList.innerHTML = '';

      data.items.forEach(i=>{
        const btn = document.createElement('div');
        btn.className = 'sv-sub-item';
        btn.tabIndex = 0;
        btn.innerHTML = '<div style="width:10px;height:10px;border-radius:50%;background:#0ea5a4"></div><div style="text-align:left"><strong>'+i.title+'</strong><br><small style="color:#6b7280">'+i.desc+'</small></div>';
        btn.addEventListener('click', ()=> {
          // TODO: replace alert with real action (navigate to page or open modal)
          // Example: location.href = '/services/brand/logo-minimal';
          alert(data.title + ' → ' + i.title);
        });
        popList.appendChild(btn);
      });

      positionPopover(anchor);
      pop.style.display = 'block';
      overlay.style.display = 'block';
      activeAnchor = anchor;
      // close any open bootstrap dropdown so popover isn't hidden
      try {
        const parent = anchor.closest('.dropdown');
        if(parent){
          const inst = bootstrap.Dropdown.getOrCreateInstance(parent.querySelector('.dropdown-toggle'));
          inst.hide();
        }
      } catch(e){}
    }

    function closePopover(){
      pop.style.display = 'none';
      overlay.style.display = 'none';
      activeAnchor = null;
    }

    // ---------- POSITION ----------
    function positionPopover(anchor){
      const rect = anchor.getBoundingClientRect();
      // temporarily show to measure (if hidden)
      const wasHidden = pop.style.display === 'none';
      if(wasHidden){
        pop.style.visibility = 'hidden';
        pop.style.display = 'block';
      }
      const popRect = pop.getBoundingClientRect();
      const gap = 8;
      let left = rect.left + window.scrollX;
      let top = rect.bottom + window.scrollY + gap;

      // right overflow
      if(left + popRect.width + 20 > window.innerWidth){
        left = Math.max(10, window.innerWidth - popRect.width - 20) + window.scrollX;
      }
      // bottom overflow => show above
      if(top + popRect.height + 20 > window.scrollY + window.innerHeight){
        top = rect.top + window.scrollY - popRect.height - gap;
      }
      pop.style.left = left + 'px';
      pop.style.top = top + 'px';

      if(wasHidden){
        pop.style.display = 'none';
        pop.style.visibility = '';
      }
    }

    // ---------- ATTACH HANDLERS ----------
    document.querySelectorAll('.service-link').forEach(el=>{
      el.addEventListener('click', function(ev){
        ev.preventDefault();
        const key = this.dataset.key;
        // toggle
        if(activeAnchor === this){ closePopover(); return; }
        openPopover(key, this);
      });
    });

    // close handlers
    closeBtn.addEventListener('click', closePopover);
    overlay.addEventListener('click', closePopover);
    window.addEventListener('scroll', ()=>{ if(activeAnchor) positionPopover(activeAnchor); }, true);
    window.addEventListener('resize', ()=>{ if(activeAnchor) positionPopover(activeAnchor); });

    // escape to close
    document.addEventListener('keydown', function(e){
      if(e.key === 'Escape') closePopover();
    });

  })();