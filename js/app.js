class Menu {
    constructor() {
        this.itemsInCart = {
            itemCount: 0,
            subtotal:0
        }

        // object to hold menu items
        this.menuInventory = {
            item1: {
                id:1,
                img: './img/ramen1.jpg',
                alt: 'Miso Chasu',
                class: 'ramen-img',
                price: 13.50,
                qty: 0,
                name: 'Miso Chasu'
            },
            item2: {
                id:2,
                img: './img/ramen2.jpg',
                alt: 'Miso Chasu',
                class: 'ramen-img',
                price: 13.50,
                qty: 0,
                name: 'Geki-Kara'
            },
            item3: {
                id:3,
                img: './img/ramen3.jpg',
                alt: 'Kuro',
                class: 'ramen-img',
                price: 13.50,
                qty: 0,
                name: 'Kuro'
            },
            item4: {
                id:4,
                img: './img/ramen4.jpg',
                alt: 'Pork Tonkotsu',
                class: 'ramen-img',
                price: 13.50,
                qty: 0,
                name: 'Pork Tonkotsu'
            },
            item5: {
                id:5,
                img: './img/edamame.jpg',
                alt: 'edamame',
                class: 'other-stuff',
                price: 7.00,
                qty: 0,
                name: 'Edamame'
            },
            item6: {
                id:6,
                img: './img/porkBuns.jpg',
                alt: 'Pork Buns',
                class: 'other-stuff',
                price: 8.00,
                qty: 0,
                name: 'Pork Buns'
            },
            item7: {
                id:7,
                img: './img/californiaRoll.jpg',
                alt: 'California Roll',
                class: 'other-stuff',
                price: 6.50,
                qty: 0,
                name: 'California Roll'
            },
            item8: {
                id:8,
                img: './img/rainbowRoll.jpg',
                alt: 'Rain Roll',
                class: 'other-stuff',
                price: 15.00,
                qty: 0,
                name: 'Rainbow Roll'
            }
        }
    }

    // INIT
    // ---------------------------------------------------------
    init() {
        this.loadItems();
        this.addToCart();
        this.checkout();
    }

    loadItems() {
        let count = 0;
        let food1 = document.getElementById('food1');
        let food2 = document.getElementById('food2');
        

        for(const key in this.menuInventory){
            const item = this.menuInventory[key];
            const product = document.createElement('div');
            product.className= 'col-md-3 prodct';
            product.innerHTML = `
                <div class="card">
                    <img src="${item.img}" class="card-img-top ${item.class}" alt="${item.alt}">
                    <div class="card-body">
                    <p class="card-text">${item.name}</p>
                    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                    <button class="btn btn-secondary add-button"
                    data-id="${item.id}">Add to Cart</button>
                    </div>
                </div>
            `;

            if(count < 4){

                food1.append(product);
            } else {
                food2.append(product);
            }
            count++;
        }
    }

    addToCart() {
        // set varibles
        let buttons = document.querySelectorAll('.add-button');
        let cartItems = document.getElementById('cartItems');
        let cartSubtotal = document.getElementById('cartSubtotal');
        let itemCount = 0;
        let price = 0;
        
        // loop
        // --------------------------------
        console.log(this.itemsInCart.subtotal)
        for(const key in this.menuInventory) {
            const item = this.menuInventory[key];
            // add event listener to each button on each menu item card
            buttons.forEach(button => {
                button.addEventListener('click', ()=> {
                    // if the id of the data attribute matchs the item.id
                    if(button.dataset['id'] == item.id){
                        itemCount++;
                        price += item.price;
                        // store the changed item count and price into this.itemsInCart
                        this.itemsInCart.itemCount = itemCount;
                        this.itemsInCart.subtotal = price;
    
                        item.qty++;
                    }
    
                    // send this updated data to the dom
                    cartItems.innerText = itemCount;
                    cartSubtotal.innerText = price.toFixed(2);

                })
            })
        }

    }
    checkout(){
        const table = document.getElementById('tbody');
        const checkout = document.getElementById('checkout');
        const checkoutPage = document.querySelector('.checkout-page');
        const mainPage = document.querySelector('.main-page');
        let subTimesQty = 0;
        const subtotalValue = document.getElementById('subtotalValue');
        const taxValue = document.getElementById('taxValue');
        const totalValue = document.getElementById('totalValue');
        let tax = 0;
        const shippingValue = document.getElementById('shippingValue');
        const checkoutItemCount = document.getElementById('checkoutItemCount');
        const shipping = 6;


        checkout.addEventListener('click', ()=> {
            if(mainPage.classList.contains('d-none')) return;
            // remove d-none from check out and add d-none to main page
            checkoutPage.classList.remove('d-none');
            mainPage.classList.add('d-none');

            if(this.itemsInCart.itemCount == 1) {
                checkoutItemCount.innerText = `${this.itemsInCart.itemCount} item`;
            } else {
                checkoutItemCount.innerText = `${this.itemsInCart.itemCount}items`;

            }

            // load content on checkout page
            for(const key in this.menuInventory) {
                const item = this.menuInventory[key];

                subTimesQty = (item.qty * item.price).toFixed(2);
                subtotalValue.innerText = this.itemsInCart.subtotal.toFixed(2);
                shippingValue.innerText = shipping.toFixed(2);
                tax = this.itemsInCart.subtotal * .07;
                taxValue.innerText = tax.toFixed(2);
                totalValue.innerText = (this.itemsInCart.subtotal + tax + shipping).toFixed(2);

                // if qty > 0 (item has been added to cart)
                if(item.qty > 0) {
                    const tableRow = document.createElement('tr');
                    tableRow.className = 'product-checkout';

                    tableRow.innerHTML += `
                        <td id="checkoutImg">
                            <img src="${item.img}" alt="${item.alt}" class="img-fluid checkout-img" id="checkoutImg" height="250" width="200">
                            <div class="product-desc">
                                <p class="item-name">${item.name}</p>
                                <p>This is a nice description of this item. YUUM!</p>

                                <td>
                                    <p class="unit-price">${item.price.toFixed(2)}</p>
                                </td>

                                <td>
                                    <div id="itemQuantity">
                                        <p id="qtyInput">${item.qty}</p>
                                    </div>
                                </td>
                                <td id ="itemSubtoal">${subTimesQty}</td>
                    
                    `
                    table.append(tableRow);
                }


            }
        })
    }
}

let action = new Menu;
action.init();