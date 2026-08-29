document.addEventListener("DOMContentLoaded", () => {

  /* --- 1. قائمة الهواتف والشاشات الصغيرة --- */
  const menuToggle = document.getElementById('menuToggle');
  const navMenu = document.getElementById('navMenu');

  if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
      const icon = menuToggle.querySelector('i');
      if (icon) {
        if (navMenu.classList.contains('active')) {
          icon.classList.remove('fa-bars');
          icon.classList.add('fa-xmark');
        } else {
          icon.classList.remove('fa-xmark');
          icon.classList.add('fa-bars');
        }
      }
    });

    document.querySelectorAll('.menu a').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        const icon = menuToggle.querySelector('i');
        if (icon) {
          icon.classList.remove('fa-xmark');
          icon.classList.add('fa-bars');
        }
      });
    });
  }

  /* --- 2. حركة إظهار البطاقات عند التمرير --- */
  function checkCards() {
    const cards = document.querySelectorAll(".life-card");
    cards.forEach(card => {
      const top = card.getBoundingClientRect().top;
      if (top < window.innerHeight - 50) {
        card.style.opacity = "1";
        card.style.transform = "translateY(0)";
      }
    });
  }

  window.addEventListener("scroll", checkCards);
  checkCards();

  /* --- 3. العدادات التنازلية --- */
  const counters = document.querySelectorAll('.counter');
  if (counters.length > 0) {
    const startCounter = (counter) => {
      const target = +counter.getAttribute('data-target');
      let count = 0;
      const speed = target / 80;

      const update = () => {
        count += speed;
        if (count < target) {
          counter.innerText = Math.floor(count);
          requestAnimationFrame(update);
        } else {
          counter.innerText = target;
        }
      };
      update();
    };

    const counterObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          startCounter(entry.target);
          counterObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });

    counters.forEach(counter => counterObserver.observe(counter));
  }

});
