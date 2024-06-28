let cartService;

class ShoppingCartService {

    cart = {
        items:[],
        total:0
    };

    addToCart(productId)
    {
        const url = `${config.baseUrl}/cart/products/${productId}`;
        // const headers = userService.getHeaders();

        axios.post(url, {})// ,{headers})
            .then(response => {
                this.setCart(response.data)

                this.updateCartDisplay()

            })
            .catch(error => {

                const data = {
                    error: "Add to cart failed."
                };

                templateBuilder.append("error", data, "errors")
            });
    }

    setCart(data)
    {
        this.cart = {
            items: [],
            total: 0
        }

        this.cart.total = data.total;

        for (const [key, value] of Object.entries(data.items)) {
            this.cart.items.push(value);
        }
    }

    loadCart() {

        const url = `${config.baseUrl}/cart`;

        axios.get(url)
            .then(response => {
                this.setCart(response.data)

                this.updateCartDisplay()

            })
            .catch(error => {

                const data = {
                    error: "Load cart failed."
                };

                templateBuilder.append("error", data, "errors")
            });

    }

    loadCartPage() {
        // templateBuilder.build("cart", this.cart, "main");

        const main = document.getElementById("main")
        main.innerHTML = "";

        let div = document.createElement("div");
        div.classList="filter-box";
        main.appendChild(div);

        const contentDiv = document.createElement("div")
        contentDiv.id = "content";
        contentDiv.classList.add("content-form");

        const cartHeader = document.createElement("div")
        cartHeader.classList.add("cart-header")

        const h1 = document.createElement("h1")
        h1.innerText = "Cart";
        cartHeader.appendChild(h1);

        const button = document.createElement("button");
        button.classList.add("btn")
        button.classList.add("btn-danger")
        button.innerText = "Clear";
        button.addEventListener("click", () => this.clearCart());
        cartHeader.appendChild(button)

        contentDiv.appendChild(cartHeader)
        main.appendChild(contentDiv);

        // let parent = document.getElementById("cart-item-list");
        this.cart.items.forEach(item => {
            this.buildItem(item, contentDiv)
        });
    }

    buildItem(item, parent)
    {
        let outerDiv = document.createElement("div");
        outerDiv.classList.add("cart-item");

        let div = document.createElement("div");
        outerDiv.appendChild(div);
        let h4 = document.createElement("h4")
        h4.innerText = item.product.name;
        div.appendChild(h4);

        let photoDiv = document.createElement("div");
        photoDiv.classList.add("photo")
        let img = document.createElement("img");
        img.src = `/images/products/${item.product.imageUrl}`
        img.addEventListener("click", () => {
            showImageDetailForm(item.product.name, img.src)
        })
        photoDiv.appendChild(img)
        let priceH4 = document.createElement("h4");
        priceH4.classList.add("price");
        priceH4.innerText = `$${item.product.price}`;
        photoDiv.appendChild(priceH4);
        outerDiv.appendChild(photoDiv);

        let descriptionDiv = document.createElement("div");
        descriptionDiv.innerText = item.product.description;
        outerDiv.appendChild(descriptionDiv);

        let quantityDiv = document.createElement("div")
        quantityDiv.innerText = `Quantity: ${item.quantity}`;
        outerDiv.appendChild(quantityDiv)


        parent.appendChild(outerDiv);
    }

    clearCart() {
        const url = `${config.baseUrl}/cart`;

        axios.delete(url)
            .then(response => {
                console.log("Clear cart response:", response);

                this.cart = {
                    items: [],
                    total: 0
                };

                this.updateCartDisplay();
                this.loadCartPage();

                console.log("Cart cleared successfully");

                // Add a success message
                const data = {
                    success: "Cart cleared successfully."
                };
                templateBuilder.append("success", data, "notifications");
            })
            .catch(error => {
                console.error("Error clearing cart:", error);

                const data = {
                    error: "Empty cart failed."
                };

                templateBuilder.append("error", data, "errors");
            });
    }


    updateCartDisplay()
    {
        try {
            const itemCount = this.cart.items.length;
            const cartControl = document.getElementById("cart-items")

            cartControl.innerText = itemCount;
        }
        catch (e) {
        console.log(e);

        }
    }

 }


/*checkout() {
    console.log("Checkout button clicked!");

    // Prepare data for checkout (optional step)
    const checkoutData = {
      items: this.cart.items,
      total: this.cart.total
      // Add more data as needed for your checkout process
    };

    // Example: Make a POST request to your backend to process the checkout
    axios.post(`${config.baseUrl}/checkout`, checkoutData)
      .then(response => {
        // Handle successful checkout response
        console.log("Checkout successful:", response.data);
        // Optionally, clear the cart after successful checkout
        this.clearCart();
        // Redirect to a thank you page or order summary page
        window.location.href = "/order-summary.html"; // Replace with your actual page URL
      })
      .catch(error => {
        // Handle errors during checkout process
        console.error("Checkout error:", error);
        // Display error message to the user
        const errorMessage = "Checkout failed. Please try again later.";
        templateBuilder.append("error", { error: errorMessage }, "errors");
      });
  }*/




document.addEventListener('DOMContentLoaded', () => {
    cartService = new ShoppingCartService();

    if(userService.isLoggedIn())
    {
        cartService.loadCart();
    }

});
