// cart
let cartIcon = document.querySelector("#cart-icon");
let cart = document.querySelector(".cart");
let closeCart = document.querySelector("#close-cart");

// open cart
cartIcon.onclick = () => {
    cart.classList.add("active");
    navbar.classList.remove('active');
    menuIcon.classList.remove('bx-x');
};

// close cart
closeCart.onclick = () => {
    cart.classList.remove("active");
};

// cart working
if (document.readyState == "loading") {
    document.addEventListener("DOMContentLoaded", ready);
} else {
    ready();
}

// making function
function ready() {
    var removeCartButtondss = document.getElementsByClassName("cart-remove");
    for (var i = 0; i < removeCartButtondss.length; i++) {
        var button = removeCartButtons[i];
        button.addEventListener("click", removeCartItem);
    }
    var quantityInputs = document.getElementsByClassName('cart-quantity');
    for (var i = 0; i < quantityInputs.length; i++) {
        var input = quantityInputs[i];
        input.addEventListener("change", quantityChanged);
    }
    // add to cart 
    var addCart = document.getElementsByClassName('add-cart');
    for (var i = 0; i < addCart.length; i++) {
        var button = addCart[i];
        button.addEventListener("click", addCartClicked)
    }
    // buy button work
    document.getElementsByClassName("btn-buy")[0].addEventListener("click", buyButtonClicked);
}

function buyButtonClicked() {
    var cartContent = document.getElementsByClassName("cart-content")[0];
    var cartBoxes = cartContent.getElementsByClassName("cart-box");

    // Periksa apakah keranjang kosong
    if (cartBoxes.length === 0) {

         // Menutup cart
         cart.classList.remove("active");

        var openPopup1 = document.getElementById("popup1");
        openPopup1.classList.add("open-popup1");
    } else {
        
        // Menutup cart
        cart.classList.remove("active");

        var openPopup = document.getElementById("popup");
        openPopup.classList.add("open-popup");

        // Membuat pesan yang berisi isi dari cartBoxContent
        var message = "My Order:\n";
        for (var i = 0; i < cartBoxes.length; i++) {
            var cartBox = cartBoxes[i];
            var title = cartBox.querySelector(".cart-product-title").innerText;
            var price = cartBox.querySelector(".cart-price").innerText;
            var quantity = cartBox.querySelector(".cart-quantity").value;
            message += `${title}\nPrice: ${price}\nQuantity: ${quantity}\n\n`;
        }

        // Menghitung total
        var totalElement = document.getElementsByClassName("total-price")[0];
        var total = totalElement.innerText;

        // Menambahkan total ke pesan
        message += `Total: ${total}`;

        // Menunda pengiriman pesan ke WhatsApp selama 5 detik
        setTimeout(function() {
            // Menggunakan API WhatsApp untuk mengirim pesan
            const nohp = "6281316120091"; // Nomor WhatsApp yang dituju

            // Tautan WhatsApp dengan pesan
            const whatsappLink = `https://api.whatsapp.com/send?phone=${nohp}&text=${encodeURIComponent(message)}`;

            // Mengarahkan pengguna ke tautan WhatsApp
            window.location.href = whatsappLink;

            // Mengosongkan keranjang setelah mengirim pesan
            while (cartContent.hasChildNodes()) {
                cartContent.removeChild(cartContent.firstChild);
            }

            updatetotal();
        }, 3000); // Penundaan 3000 milidetik (3 detik)
    }
}



// remove function
function removeCartItem(event) {
    var buttonClicked = event.target;
    buttonClicked.parentElement.remove();
    updatetotal();
}

// change quantity
function quantityChanged(event) {
    var input = event.target;
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1;
    }
    updatetotal();
}

// add to cart
function addCartClicked(event) {
    var button = event.target;
    var shopProducts = button.parentElement;
    var title = shopProducts.querySelector(".product-title").innerText;
    var price = shopProducts.querySelector(".price").innerText;
    var productImg = shopProducts.querySelector(".product-img").src;

    // Periksa apakah item dengan title yang sama sudah ada di keranjang
    var cartItems = document.getElementsByClassName("cart-content")[0];
    var cartItemsBoxes = cartItems.getElementsByClassName("cart-box");
    for (var i = 0; i < cartItemsBoxes.length; i++) {
        var cartItem = cartItemsBoxes[i];
        var cartTitle = cartItem.querySelector(".cart-product-title").innerText;
        if (cartTitle === title) {
            alert("this item is already in the cart");
            return; 
        }
    }

    addProductToCart(title, price, productImg);
    updatetotal();
}


function addProductToCart(title, price, productImg) {
    var cartShopBox = document.createElement("div");
    cartShopBox.classList.add("cart-box");
    var cartItems = document.getElementsByClassName("cart-content")[0];
    var cartItemsNames = cartItems.getElementsByClassName("cart-product-title");
    for (var i = 0; i < cartItemsNames.length; i++) {
        if (cartItemsNames[i].innerText == title) {
            alert("You add this item");
            return;
        }
    }

    var cartBoxContent = `
        <img src="${productImg}" alt="#" class="cart-img">
        <div class="detail-box">
            <div class="cart-product-title">${title}</div>
            <div class="cart-price">${price}</div>
            <input type="number" value="1" class="cart-quantity">
        </div>
        <i class='bx bxs-trash-alt cart-remove'></i>
    `;

    cartShopBox.innerHTML = cartBoxContent;
    cartItems.appendChild(cartShopBox);
    cartShopBox.getElementsByClassName("cart-remove")[0].addEventListener("click", removeCartItem);
    cartShopBox.getElementsByClassName("cart-quantity")[0].addEventListener("change", quantityChanged);
}

// update total
function updatetotal() {
    var cartBoxes = document.getElementsByClassName('cart-box');
    var total = 0;
    for (var i = 0; i < cartBoxes.length; i++) {
        var cartBox = cartBoxes[i];
        var priceElement = cartBox.getElementsByClassName('cart-price')[0];
        var quantityElement = cartBox.getElementsByClassName('cart-quantity')[0];
        var price = parseFloat(priceElement.innerText.replace("Rp. ", "").replace(".", "").replace(",", ""));
        var quantity = parseInt(quantityElement.value);
        total += price * quantity;
    }
    // Format total sebagai mata uang Indonesia dengan tiga angka sebelum titik
    total = total.toLocaleString("id-ID");
    document.getElementsByClassName("total-price")[0].innerText = `Rp. ${total}`;
}

function closePopup(){
    popup1.classList.remove("open-popup1");
}

// preview script
let preveiwMenue = document.querySelector('.menu-preview');
let previewBox = preveiwMenue.querySelectorAll('.preview');

document.querySelectorAll('.product-content .product-box-prev').forEach(product =>{
  product.onclick = () =>{
    preveiwMenue.style.display = 'flex';
    let name = product.getAttribute('data-name');
    previewBox.forEach(preview =>{
      let target = preview.getAttribute('data-target');
      if(name == target){
        preview.classList.add('active');
      }
    });
  };
});

previewBox.forEach(close =>{
  close.querySelector('.fa-xmark').onclick = () =>{
    close.classList.remove('active');
    preveiwMenue.style.display = 'none';
  };
});


// slide img
let slider = document.querySelector('.slider .list');
let items = document.querySelectorAll('.slider .list .item');
let next = document.getElementById('next');
let prev = document.getElementById('prev');
let dots = document.querySelectorAll('.slider .dots li');
let lengthItems = items.length - 1;
let active = 0;

// previous and next
next.onclick = function(){
    active = active + 1 <= lengthItems ? active + 1 : 0;
    reloadSlider();
}
prev.onclick = function(){
    active = active - 1 >= 0 ? active - 1 : lengthItems;
    reloadSlider();
}

// slide img function
let refreshInterval = setInterval(()=> {next.click()}, 3000);
function reloadSlider(){
    slider.style.left = -items[active].offsetLeft + 'px';
    // 
    let last_active_dot = document.querySelector('.slider .dots li.active');
    last_active_dot.classList.remove('active');
    dots[active].classList.add('active');

    clearInterval(refreshInterval);
    refreshInterval = setInterval(()=> {next.click()}, 6000);    
}

dots.forEach((li, key) => {
    li.addEventListener('click', ()=>{
         active = key;
         reloadSlider();
    })
})
window.onresize = function(event) {
    reloadSlider();
};
// End Slide Img

// navbar burger
const menuIcon = document.querySelector('#menu-icon');
const navbar = document.querySelector('.navbar');

menuIcon.addEventListener('click', () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
});
// End navbar burbger