function renderProducts() {
  var productsOutput = document.createDocumentFragment();
  for (let i = 0; i < products.length; i++) {
    var product = document.createElement('div');
    var styled = (products[i].accentColor) ? 'styled-'+products[i].accentColor+'' : '';
    var currPrice = (products[i].special) ? products[i].special : products[i].price;
    var specialString = (products[i].special) ? '<strike class="was">$'+products[i].price+'</strike>' : '';

    product.classList.add('product-item');
    product.innerHTML = `
    <a href="products/${products[i].slug}_${products[i].id}.html" class="item-box ${styled}">
      <img class="thumbnail" src="${products[i].thumbnail}" alt="${products[i].name}">
      <span class="captions">
        <strong class="name">${products[i].name}</strong>
        <span class="price">
          <span class="now">${currPrice}</span>${specialString}
        </span>
      </span>
    </a>`
    productsOutput.appendChild(product);
  }
  procucts_list.appendChild(productsOutput);
}

function renderCart() {
  var cartOutput = document.createDocumentFragment();
  for (let i = 0; i < cartContent.length; i++) {
    var product = document.createElement('div');
    var currPrice = (cartContent[i].special) ? cartContent[i].special : cartContent[i].price;

    product.classList.add('cart-item');
    product.id = `item-${cartContent[i].id}`;
    product.dataset.id = cartContent[i].id;
    product.dataset.price = currPrice;
    product.dataset.name = cartContent[i].name;
    product.innerHTML = `
      <img class="thumbnail" src="${cartContent[i].thumbnail}" alt="${cartContent[i].name}">
      <span class="cart-detail">
        <strong class="cart-name">${cartContent[i].name}</strong>
        <span class="cart-price">$${currPrice}</span>
        <div class="cart-qty" data-id="${cartContent[i].id}">
          <input type="text" data-min="0" class="qty" value="${cartContent[i].items}">
          <button type="button" class="minus">-</button>
          <button type="button" class="plus">+</button>
          <a href="#" onclick="removeConfirm(event);" class="remove">Remove</a>
        </div>
      </span>
      <span class="item-total">
        Item total
        <b id="item-${cartContent[i].id}-total"></b>
      </span>`
    cartOutput.appendChild(product);
  }
  cart_items.appendChild(cartOutput);
  cartTotal();
}

// Plus - Minus buttons handler 

function changeInputQty(event) {
  var btn = event.target;
  btn.parentNode.childNodes.forEach( function(el){
    if (el.className == 'qty') {
      if (btn.textContent == '+') {
        el.value++;
      } else {
        el.value--;
      }
      afterChangeQty(el.value,event);
    }
  });
}

// Change quantity handler

function afterChangeQty(val,event) {
  if (val <= 0) {
    removeConfirm(event)
  }
  cartTotal();
}

// Id qty = 0

function removeConfirm(event) {
  var cartItem = document.querySelector('#item-'+event.target.parentNode.dataset.id);
  if (confirm("You're about to remove "+cartItem.dataset.name+", proceed?")) {
    cartItem.remove();
  } else {
    // set qty to 1 if del not confirmed
    event.target.parentNode.children[0].value = 1;
  }
  cartTotal();
}

// Calculate item total

function itemTotal(item) {
  var price = item.dataset.price,
      qty = document.querySelector('#'+item.id+ ' .qty').value,
      total = price * qty;
  document.querySelector('#'+item.id+'-total').innerHTML = '$'+total.toFixed(2);
  return total;
}

// Calculate cart total

function cartTotal() {
  var products = document.querySelectorAll('.cart-item'),
      summ = 0;
  products.forEach( function(el) {
    summ += itemTotal(el);
  });
  document.querySelector('#cart-total').innerHTML = '$'+summ.toFixed(2);
}


// ======== ON LOAD ========= //


document.addEventListener('DOMContentLoaded', function(){

  //  Populate items from JS

  if (document.querySelector('#procucts_list')) renderProducts();
  if (document.querySelector('#cart_items')) renderCart();

  // ======== handle input events ========= //

  // Qty buttons

  var qty_controls = document.querySelectorAll('.cart-qty button');
  qty_controls.forEach( function(el) {
    el.onclick = changeInputQty;
  });

  // Qty fields

  var qty_inputs = document.querySelectorAll('.cart-qty input');
  qty_inputs.forEach( function(el) {
    // Allow numbers only
    el.onkeypress = function(e){
      if (isNaN(e.key)) return false
    };
    // Process key
    el.oninput = function(e){
      if (e.data == 0) {
        removeConfirm(e);
      } else {
        cartTotal();
      }
    };
  });

  // Page load animation

  setTimeout(function(){
    document.querySelector('body').classList.add('dom-ready');
  },300)
})