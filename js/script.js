// ===================================
// Ganzon's Smart POS System
// Version 2.0
// ===================================

// Prevent opening dashboard without login

if(localStorage.getItem("loggedIn") !== "true"){

    window.location.href="index.html";

}

// Welcome message

document.getElementById("welcome").innerHTML =
"Welcome, " + localStorage.getItem("role");

// Shopping Cart

let cart=[];

let subtotal=0;

let vat=0;

let grandTotal=0;

let profit=0;

// Add Product

function addProduct(name,price,cost){

    let item=cart.find(product=>product.name===name);

    if(item){

        item.qty++;

    }

    else{

        cart.push({

            name:name,
            price:price,
            cost:cost,
            qty:1

        });

    }

    updateCart();

}

// Increase Quantity

function increase(index){

    cart[index].qty++;

    updateCart();

}

// Decrease Quantity

function decrease(index){

    if(cart[index].qty>1){

        cart[index].qty--;

    }

    else{

        cart.splice(index,1);

    }

    updateCart();

}

// Remove Product

function removeItem(index){

    cart.splice(index,1);

    updateCart();

}
// ===================================
// Update Cart
// ===================================

function updateCart(){

    const tbody = document.getElementById("cart");

    tbody.innerHTML = "";

    subtotal = 0;
    profit = 0;

    let items = 0;

    cart.forEach((product,index)=>{

        let total = product.price * product.qty;

        subtotal += total;

        profit += (product.price - product.cost) * product.qty;

        items += product.qty;

        tbody.innerHTML += `

        <tr>

            <td>${product.name}</td>

            <td>

                <button class="qty-btn"
                onclick="decrease(${index})">-</button>

                ${product.qty}

                <button class="qty-btn"
                onclick="increase(${index})">+</button>

            </td>

            <td>₱${product.price}</td>

            <td>₱${total}</td>

            <td>

                <button
                class="remove"
                onclick="removeItem(${index})">

                ✖

                </button>

            </td>

        </tr>

        `;

    });

    vat = subtotal * 0.12;

    grandTotal = subtotal + vat;

    document.getElementById("subtotal").innerHTML = subtotal.toFixed(2);

    document.getElementById("vat").innerHTML = vat.toFixed(2);

    document.getElementById("grandTotal").innerHTML = grandTotal.toFixed(2);

    document.getElementById("total").innerHTML = grandTotal.toFixed(2);

    document.getElementById("sales").innerHTML = subtotal.toFixed(2);

    document.getElementById("profit").innerHTML = profit.toFixed(2);

    document.getElementById("items").innerHTML = items;

}
// ===================================
// Checkout
// ===================================

function checkout(){

    if(cart.length === 0){

        alert("Your cart is empty!");

        return;

    }

    let cash = parseFloat(document.getElementById("cash").value);

    if(isNaN(cash)){

        alert("Please enter the customer's cash.");

        return;

    }

    if(cash < grandTotal){

        alert("Insufficient cash!");

        return;

    }

    let change = cash - grandTotal;

    document.getElementById("change").innerHTML = change.toFixed(2);

    alert(
        "Payment Successful!\n\n" +
        "Subtotal: ₱" + subtotal.toFixed(2) +
        "\nVAT: ₱" + vat.toFixed(2) +
        "\nGrand Total: ₱" + grandTotal.toFixed(2) +
        "\nCash: ₱" + cash.toFixed(2) +
        "\nChange: ₱" + change.toFixed(2)
    );

    cart = [];

    updateCart();

    document.getElementById("cash").value = "";

}

// ===================================
// Search Products
// ===================================

function searchProducts(){

    let input = document
        .getElementById("search")
        .value
        .toLowerCase();

    let products = document.querySelectorAll(".product");

    products.forEach(product=>{

        let name = product
            .querySelector("h3")
            .innerText
            .toLowerCase();

        if(name.includes(input)){

            product.style.display = "block";

        }else{

            product.style.display = "none";

        }

    });

}

// ===================================
// Logout
// ===================================

function logout(){

    if(confirm("Are you sure you want to logout?")){

        localStorage.removeItem("loggedInUser");

        window.location.href = "index.html";

    }

}

// ===================================
// Welcome Message
// ===================================

window.onload = function(){

    const user = localStorage.getItem("loggedInUser");

    if(user){

        document.getElementById("welcome").innerHTML =
            "Welcome, <b>" + user + "</b>";

    }

    updateCart();

};
