'use strict';

// modal variables
const modal = document.querySelector('[data-modal]');
const modalCloseBtn = document.querySelector('[data-modal-close]');
const modalCloseOverlay = document.querySelector('[data-modal-overlay]');

// modal function
const modalCloseFunc = function () { modal.classList.add('closed') }

// modal eventListener
modalCloseOverlay.addEventListener('click', modalCloseFunc);
modalCloseBtn.addEventListener('click', modalCloseFunc);





// notification toast variables
const notificationToast = document.querySelector('[data-toast]');
const toastCloseBtn = document.querySelector('[data-toast-close]');

// Dynamic Notification Toast Logic
if (notificationToast && typeof products !== 'undefined') {
  const toastImg = notificationToast.querySelector('.toast-banner img');
  const toastTitle = notificationToast.querySelector('.toast-title');
  const toastTime = notificationToast.querySelector('.toast-meta time');

  const productKeys = Object.keys(products);
  
  const showRandomToast = () => {
    // Pick a random product
    const randomKey = productKeys[Math.floor(Math.random() * productKeys.length)];
    const product = products[randomKey];

    // Update toast content
    toastImg.src = product.images[0];
    toastImg.alt = product.name;
    toastTitle.textContent = product.name;
    
    // Pick a random time between 1 and 59 minutes
    const randomMin = Math.floor(Math.random() * 59) + 1;
    toastTime.textContent = `${randomMin} Minutes`;
    toastTime.setAttribute('datetime', `PT${randomMin}M`);

    // Show toast
    notificationToast.classList.remove('closed');
    setTimeout(() => {
      notificationToast.classList.add('active');
    }, 50);

    // Auto-hide after 8 seconds
    setTimeout(() => {
      notificationToast.classList.remove('active');
    }, 8000);

    // Click to navigate
    notificationToast.onclick = () => {
      window.location.href = `product-details.html?id=${randomKey}`;
    };
  };

  // Initial delay, then show toast every 20 seconds (8s visible + 12s gap)
  setTimeout(() => {
    showRandomToast();
    setInterval(showRandomToast, 20000);
  }, 5000);

  // Handle manual close
  toastCloseBtn.addEventListener('click', function (e) {
    e.stopPropagation();
    notificationToast.classList.remove('active');
    setTimeout(() => {
      notificationToast.classList.add('closed');
    }, 500);
  });
}

// Countdown Timer Logic
const countdownElements = document.querySelectorAll('[data-countdown-target]');

if (countdownElements.length > 0) {
  countdownElements.forEach(container => {
    const targetAttr = container.getAttribute('data-countdown-target');
    const targetDate = new Date();
    
    if (targetAttr.endsWith('d')) {
      targetDate.setDate(targetDate.getDate() + parseInt(targetAttr));
    } else if (targetAttr.endsWith('h')) {
      targetDate.setHours(targetDate.getHours() + parseInt(targetAttr));
    }
    
    const dCell = container.querySelector('[data-days]');
    const hCell = container.querySelector('[data-hours]');
    const mCell = container.querySelector('[data-minutes]');
    const sCell = container.querySelector('[data-seconds]');
    
    const updateCountdown = () => {
      const now = new Date().getTime();
      const distance = targetDate.getTime() - now;

      if (distance < 0) {
        return;
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      if (dCell) dCell.textContent = days;
      if (hCell) hCell.textContent = hours.toString().padStart(2, '0');
      if (mCell) mCell.textContent = minutes.toString().padStart(2, '0');
      if (sCell) sCell.textContent = seconds.toString().padStart(2, '0');
    };

    updateCountdown();
    setInterval(updateCountdown, 1000);
  });
}





// mobile menu variables
const mobileMenuOpenBtn = document.querySelectorAll('[data-mobile-menu-open-btn]');
const mobileMenu = document.querySelectorAll('[data-mobile-menu]');
const mobileMenuCloseBtn = document.querySelectorAll('[data-mobile-menu-close-btn]');
const overlay = document.querySelector('[data-overlay]');

for (let i = 0; i < mobileMenuOpenBtn.length; i++) {

  // mobile menu function
  const mobileMenuCloseFunc = function () {
    mobileMenu[i].classList.remove('active');
    overlay.classList.remove('active');
  }

  mobileMenuOpenBtn[i].addEventListener('click', function () {
    mobileMenu[i].classList.add('active');
    overlay.classList.add('active');
  });

  mobileMenuCloseBtn[i].addEventListener('click', mobileMenuCloseFunc);
  overlay.addEventListener('click', mobileMenuCloseFunc);

}





// accordion variables
const accordionBtn = document.querySelectorAll('[data-accordion-btn]');
const accordion = document.querySelectorAll('[data-accordion]');

for (let i = 0; i < accordionBtn.length; i++) {

  accordionBtn[i].addEventListener('click', function () {

    const clickedBtn = this.nextElementSibling.classList.contains('active');

    for (let i = 0; i < accordion.length; i++) {

      if (clickedBtn) break;

      if (accordion[i].classList.contains('active')) {

        accordion[i].classList.remove('active');
        accordionBtn[i].classList.remove('active');

      }

    }

    this.nextElementSibling.classList.toggle('active');
    this.classList.toggle('active');

  });

}