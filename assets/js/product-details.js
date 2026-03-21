// DOM Elements
const breadcrumbCategory = document.getElementById('breadcrumb-category');
const breadcrumbProduct = document.getElementById('breadcrumb-product');
const productTitle = document.getElementById('product-title');
const productPrice = document.getElementById('product-price');
const productOldPrice = document.getElementById('product-old-price');
const productStars = document.getElementById('product-stars');
const reviewCount = document.getElementById('review-count');
const tabReviewCount = document.getElementById('tab-review-count');
const productShortDesc = document.getElementById('product-short-desc');
const productFullDesc = document.getElementById('full-description');
const mainProductImg = document.getElementById('main-product-img');
const thumbnailContainer = document.getElementById('thumbnail-container');
const metaCategory = document.getElementById('meta-category');
const metaAvailability = document.getElementById('meta-availability');
const productWeight = document.getElementById('product-weight');
const productDimensions = document.getElementById('product-dimensions');
const productMaterials = document.getElementById('product-materials');
const reviewsList = document.getElementById('reviews-list');

// Quantity Selector
const qtyInput = document.getElementById('qty-input');
const qtyMinus = document.getElementById('qty-minus');
const qtyPlus = document.getElementById('qty-plus');

if (qtyMinus && qtyPlus) {
  qtyMinus.addEventListener('click', () => {
    if (qtyInput.value > 1) qtyInput.value--;
  });
  qtyPlus.addEventListener('click', () => {
    qtyInput.value++;
  });
}

// Tab Switching
const tabBtns = document.querySelectorAll('.tab-btn');
const tabPanes = document.querySelectorAll('.tab-pane');

tabBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const target = btn.getAttribute('data-tab');
    
    tabBtns.forEach(b => b.classList.remove('active'));
    tabPanes.forEach(p => p.classList.remove('active'));
    
    btn.classList.add('active');
    document.getElementById(`${target}-pane`).classList.add('active');
  });
});

// Load Product Data
function loadProduct() {
  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get('id');
  
  // Try to get basic info from URL if ID not in database
  const urlName = urlParams.get('name');
  const urlPrice = urlParams.get('price');
  const urlCategory = urlParams.get('category');
  const urlImg = urlParams.get('img');

  let product = products[productId];

  if (!product) {
    product = { ...defaultProduct };
    if (urlName) product.name = urlName;
    if (urlCategory) product.category = urlCategory;
    if (urlPrice) product.price = parseFloat(urlPrice);
    if (urlImg) product.images = [urlImg];
  }

  // Update Text Content
  breadcrumbCategory.textContent = product.category;
  breadcrumbProduct.textContent = product.name;
  productTitle.textContent = product.name;
  productPrice.innerHTML = `&#8377;${product.price.toFixed(2)}`;
  if (product.oldPrice > 0) {
    productOldPrice.innerHTML = `&#8377;${product.oldPrice.toFixed(2)}`;
    productOldPrice.style.display = 'block';
  } else {
    productOldPrice.style.display = 'none';
  }
  reviewCount.textContent = product.reviewCount;
  tabReviewCount.textContent = product.reviewCount;
  productShortDesc.textContent = product.shortDesc;
  productFullDesc.innerHTML = product.fullDesc;
  metaCategory.textContent = product.category;
  metaAvailability.textContent = product.availability;
  productWeight.textContent = product.weight;
  productDimensions.textContent = product.dimensions;
  productMaterials.textContent = product.materials;

  // Update Images
  mainProductImg.src = product.images[0];
  mainProductImg.alt = product.name;
  
  thumbnailContainer.innerHTML = '';
  product.images.forEach((img, index) => {
    const thumb = document.createElement('img');
    thumb.src = img;
    thumb.alt = `${product.name} shadow ${index + 1}`;
    if (index === 0) thumb.classList.add('active');
    
    thumb.addEventListener('click', () => {
      mainProductImg.src = img;
      document.querySelectorAll('.thumbnail-container img').forEach(t => t.classList.remove('active'));
      thumb.classList.add('active');
    });
    
    thumbnailContainer.appendChild(thumb);
  });

  // Update Rating Stars
  productStars.innerHTML = '';
  const fullStars = Math.floor(product.rating);
  const hasHalfStar = product.rating % 1 !== 0;
  
  for (let i = 0; i < 5; i++) {
    const icon = document.createElement('ion-icon');
    if (i < fullStars) {
      icon.name = 'star';
    } else if (i === fullStars && hasHalfStar) {
      icon.name = 'star-half-outline';
    } else {
      icon.name = 'star-outline';
    }
    productStars.appendChild(icon);
  }

  // Update Reviews
  reviewsList.innerHTML = '';
  if (product.reviews.length === 0) {
    reviewsList.innerHTML = '<p>No reviews yet.</p>';
  } else {
    product.reviews.forEach(review => {
      const reviewItem = document.createElement('div');
      reviewItem.className = 'review-item';
      
      let starsHtml = '';
      for (let i = 0; i < 5; i++) {
        starsHtml += `<ion-icon name="${i < review.rating ? 'star' : 'star-outline'}"></ion-icon>`;
      }

      reviewItem.innerHTML = `
        <div class="review-header">
          <span class="review-author">${review.author}</span>
          <span class="review-date">${review.date}</span>
        </div>
        <div class="stars" style="margin-bottom: 10px; font-size: 14px;">${starsHtml}</div>
        <p class="review-content">${review.content}</p>
      `;
      reviewsList.appendChild(reviewItem);
    });
  }
}

// Placeholder actions for buttons
const addToCartBtn = document.getElementById('add-to-cart');
const buyNowBtn = document.getElementById('buy-now');

if (addToCartBtn) {
  addToCartBtn.addEventListener('click', () => {
    alert('Product added to cart!');
  });
}

if (buyNowBtn) {
  buyNowBtn.addEventListener('click', () => {
    alert('Proceeding to checkout...');
  });
}

// Rating selection logic
const starInputs = document.querySelectorAll('.stars-input ion-icon');
starInputs.forEach(star => {
  star.addEventListener('mouseover', () => {
    const val = parseInt(star.getAttribute('data-value'));
    starInputs.forEach(s => {
      if (parseInt(s.getAttribute('data-value')) <= val) {
        s.name = 'star';
      } else {
        s.name = 'star-outline';
      }
    });
  });
});

// Initialize
window.addEventListener('DOMContentLoaded', loadProduct);
