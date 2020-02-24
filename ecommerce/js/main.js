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
    var itemTotal = cartContent[i].items*cartContent[i].price;

    product.classList.add('cart-item');
    product.id = `item-${cartContent[i].id}`;
    product.innerHTML = `
      <img class="thumbnail" src="${cartContent[i].thumbnail}" alt="${cartContent[i].name}">
      <span class="cart-detail">
        <strong class="cart-name">${cartContent[i].name}</strong>
        <span class="cart-price">${currPrice}</span>
        <div class="cart-qty" data-id="${cartContent[i].id}" data-name="${cartContent[i].name}">
          <input type="text" data-min="0" class="qty" value="${cartContent[i].items}">
          <button type="button" class="minus">-</button>
          <button type="button" class="plus">+</button>
          <a href="#" onclick="alert('No way!')" class="remove">Remove</a>
        </div>
      </span>
      <span class="item-total">
        Item total
        <b id="item-1-total">$${itemTotal}</b>
      </span>`
    cartOutput.appendChild(product);
  }
  cart_items.appendChild(cartOutput);
}


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

function afterChangeQty(val,event) {
  if (val > 0) {
    // TODO: recalc subtotal
    console.log('recalc subtotal');
  } else {
    var itm = event.target.parentNode,
        del = confirm("You're about to remove "+itm.dataset.name+", proceed?");
    if (del) {
      document.querySelector('#item-'+itm.dataset.id).remove();
    }
  }
}

window.onload = function(){
  if (document.querySelector('#procucts_list')) renderProducts();
  if (document.querySelector('#cart_items')) renderCart();

  // change qty 

  var qty_controls = document.querySelectorAll('.cart-qty button');
  qty_controls.forEach( function(el) {
    el.onclick = changeInputQty;
  });
  
}