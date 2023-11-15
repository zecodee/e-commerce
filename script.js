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
    let removeCartButtons = document.getElementsByClassName("cart-remove");
    for (let i = 0; i < removeCartButtons.length; i++) {
        let button = removeCartButtons[i];
        button.addEventListener("click", removeCartItem);
    }

    let quantityInputs = document.getElementsByClassName('cart-quantity');
    for (let i = 0; i < quantityInputs.length; i++) {
        let input = quantityInputs[i];
        input.addEventListener("change", quantityChanged);
    }

    // add to cart 
    let addCartButtons = document.getElementsByClassName('add-cart');
    for (let i = 0; i < addCartButtons.length; i++) {
        let button = addCartButtons[i];
        button.addEventListener("click", addCartClicked);
    }

    // buy button work
    document.getElementsByClassName("btn-buy")[0].addEventListener("click", buyButtonClicked);
}

function buyButtonClicked() {
    let cartContent = document.getElementsByClassName("cart-content")[0];
    let cartBoxes = cartContent.getElementsByClassName("cart-box");

    // Periksa apakah keranjang kosong
    if (cartBoxes.length === 0) {

         // Menutup cart
         cart.classList.remove("active");

        var openPopup1 = document.getElementById("popup1");
        openPopup1.classList.add("open-popup1");
    } else {
        
        // Menutup cart
        cart.classList.remove("active");

        let openPopup = document.getElementById("popup");
        openPopup.classList.add("open-popup");

        // Membuat pesan yang berisi isi dari cartBoxContent
        let message = "My Order:\n";
        for (let i = 0; i < cartBoxes.length; i++) {
            let cartBox = cartBoxes[i];
            let title = cartBox.querySelector(".cart-product-title").innerText;
            let price = cartBox.querySelector(".cart-price").innerText;
            let quantity = cartBox.querySelector(".cart-quantity").value;
            message += `${title}\nPrice: ${price}\nQuantity: ${quantity}\n\n`;
        }

        // Menghitung total
        let totalElement = document.getElementsByClassName("total-price")[0];
        let total = totalElement.innerText;

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
            openPopup.classList.remove("open-popup");
            updatetotal();
            saveCartToLocalStorage();
            cartItem.remove();
        }, 3000); // Penundaan 3000 milidetik (3 detik)
    }
}



// remove function
function removeCartItem(event) {
    let buttonClicked = event.target;
    let cartItem = buttonClicked.parentElement;

    // Remove item from the cart
    cartItem.remove();

    // Update total in the cart
    updatetotal();

    // Save updated cart to local storage
    saveCartToLocalStorage();
}

// change quantity
function quantityChanged(event) {
    let input = event.target;
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1;
    }
    updatetotal();
    saveCartToLocalStorage();
}

// add to cart
function addCartClicked(event) {
    let button = event.target;
    let shopProducts = button.parentElement;
    let title = shopProducts.querySelector(".product-title").innerText;
    let price = shopProducts.querySelector(".price").innerText;
    let productImg = shopProducts.querySelector(".product-img").src;

    // check item kalau sudah
    let cartItemsNames = document.getElementsByClassName("cart-product-title");
    for (let i = 0; i < cartItemsNames.length; i++) {
        if (cartItemsNames[i].innerText == title) {
            let openPopup3 = document.getElementById("popup3");
            openPopup3.classList.add("open-popup3");
            return;
        }
    }

    // nambah product to the cart
    addProductToCart(title, price, productImg);

    // mengupdate total in the cart
    updatetotal();

    // ngesave updated cart to local storage
    saveCartToLocalStorage();

    // popup message
    let openPopup2 = document.getElementById("popup2");
        openPopup2.classList.add("open-popup2");
}

function addProductToCart(title, price, productImg) {
    let cartShopBox = document.createElement("div");
    cartShopBox.classList.add("cart-box");
    let cartItems = document.getElementsByClassName("cart-content")[0];

    let cartBoxContent = `
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
    let cartBoxes = document.getElementsByClassName('cart-box');
    let total = 0;

    for (let i = 0; i < cartBoxes.length; i++) {
        let cartBox = cartBoxes[i];
        let priceElement = cartBox.getElementsByClassName('cart-price')[0];
        let quantityElement = cartBox.getElementsByClassName('cart-quantity')[0];
        let price = parseFloat(priceElement.innerText.replace("Rp. ", "").replace(".", "").replace(",", ""));
        let quantity = parseInt(quantityElement.value);
        total += price * quantity;
    }

    // Format total sebagai mata uang Indonesia dengan tiga angka sebelum titik
    total = total.toLocaleString("id-ID");
    document.getElementsByClassName("total-price")[0].innerText = `Rp. ${total}`;
}

function closePopup(){
    popup1.classList.remove("open-popup1");
    popup2.classList.remove("open-popup2");
    popup3.classList.remove("open-popup3");
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

// Local Storage

// Function to get items to local storage
function getCartItems() {
    return JSON.parse(localStorage.getItem('cartItems')) || [];
}

// Function to save items to local storage
function saveCartItems(items) {
    localStorage.setItem('cartItems', JSON.stringify(items));
}

function saveCartToLocalStorage() {
    let cartItems = [];
    let cartBoxes = document.getElementsByClassName('cart-box');
    for (let i = 0; i < cartBoxes.length; i++) {
        let cartBox = cartBoxes[i];
        let title = cartBox.querySelector(".cart-product-title").innerText;
        let price = cartBox.querySelector(".cart-price").innerText;
        let quantity = cartBox.querySelector(".cart-quantity").value;
        let productImg = cartBox.querySelector(".cart-img").src;

        let cartItem = {
            title: title,
            price: price,
            quantity: quantity,
            productImg: productImg
        };
        cartItems.push(cartItem);
    }

    // simpan cart data to local storage
    saveCartItems(cartItems);
}

function loadCartFromLocalStorage() {
    let cartItems = getCartItems();

    // menambah setiap item dari penyimpanan lokal ke keranjang
    for (let i = 0; i < cartItems.length; i++) {
        let cartItem = cartItems[i];
        addProductToCart(cartItem.title, cartItem.price, cartItem.productImg);
        
        // Update the quantity for the added product
        let cartBoxes = document.getElementsByClassName('cart-box');
        for (let j = 0; j < cartBoxes.length; j++) {
            let cartBox = cartBoxes[j];
            let titleElement = cartBox.querySelector(".cart-product-title");
            let quantityElement = cartBox.querySelector(".cart-quantity");
            
            if (titleElement.innerText === cartItem.title) {
                // Set the saved quantity for the corresponding product
                quantityElement.value = cartItem.quantity;
                break;
            }
        }

        updatetotal();
    }
}

// manggil function load cart saat mengload halaman website
loadCartFromLocalStorage();
