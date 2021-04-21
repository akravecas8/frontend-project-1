FARMS_URL = "http://localhost:3000/farms/"
CART_URL = "http://localhost:3000/cart/"

const checkoutCart = [{}]

fetch(FARMS_URL)
    .then (res => res.json())
    // .then (data => console.log(data))
    .then (data => data.forEach((farms) => {
        renderFarms(farms)
        console.log(farms.produce)
    }))

function renderFarms(farms) {

    const farmSpan = document.createElement("span")
          farmSpan.id = farms.id

    const farmName = document.createElement("h3")
          farmName.innerText = farms.name
          
    const farmImg = document.createElement("image")
          farmImg.src = farms.image
                
    farmSpan.append(farmName, farmImg)
            
    document.getElementById("navvy").append(farmSpan)
    
    document.getElementById("add-produce-form").addEventListener("submit", (e) => addProduceItem(e, farms))
          
    farmSpan.addEventListener("click", () => {
            renderProduce(farms)

            const createBtnId = document.querySelector(".create-item-button")
                  createBtnId.id = farms.id
    })  
}

function renderProduce(farms) {
    console.log(farms)
    
    for (i=0; i < farms.produce.length; i++) {

        const itemCard = document.createElement("div")
              itemCard.className = "box"
              itemCard.id = i

        const produceName = document.createElement("h2")
              produceName.innerText = farms.produce[i].produceName

        const produceAvail = document.createElement("h3")
              produceAvail
                if (farms.produce[i].available === true) {
                    produceAvail.innerText = "In Stock"
                    }
                else produceAvail.innerText = "Out of Stock"

        const produceQuant = document.createElement("h3")
              produceQuant.innerText = farms.produce[i].quantity

        const producePrice = document.createElement("h3")
              producePrice.innerText = farms.produce[i].cost

        const produceImage = document.createElement("image")
              produceImage.src = produce.produceImage

        const addToCartButton = document.createElement("button")
              addToCartButton.innerText = "Add to Cart"
              addToCartButton.id = farms.produce[i].produceName
              addToCartButton.class = farms.produce[i].cost
              addToCartButton.name = farms.produce[i].produceImage
              addToCartButton.addEventListener("click", (e) =>{
                    fillCart(e)
              })

        const updateButton = document.createElement("button")
              updateButton.innerText = "Update Item"
              updateButton.id = itemCard.id
              updateButton.addEventListener("click", (e) =>{
                    e.preventDefault()
              })

        const deleteButton = document.createElement("button")
              deleteButton.innerText = "Delete Item"
              deleteButton.id = itemCard.id
              deleteButton.addEventListener("click", (e) =>{
                    e.preventDefault()
              })

        itemCard.append(produceName, produceAvail, produceQuant, producePrice, produceImage, addToCartButton, updateButton, deleteButton)    

        document.getElementById("produce").append(itemCard)
        // debugger
        }
}

function addProduceItem(e, farms) {
    // debugger
        // fetch(FARMS_URL)
        //     .then (res => res.json())
        //     .then (data => data.forEach(data))

        const addNewProduce = {produce: {
            produceName: e.target[0].value,
            available: e.target[1].value,
            quantity: e.target[2].value,
            cost: e.target[3].value,
            produceImage: "placeholder",
        }}

        const spanNewProduce = {
            produce: [... farms.produce, addNewProduce]
        }
            
        const newObj = {
            headers: {"Content-Type": "application/json"},
            method: "PATCH",
            body: JSON.stringify(spanNewProduce),
        }

        fetch(FARMS_URL+e.target[4].id, newObj)
            .then(res => res.json())
            .then(renderProduce)
    
        e.target.reset()
}

function fillCart(e) {
    
    const cartObj = {"name":e.target.id, "cost":e.target.class, "qty":1}
    const qty = cartObj.qty
    const newQty = qty + 1

    if (checkoutCart.indexOf("name") !== e.target.id)   
       (checkoutCart.push(cartObj))
    else iterateCart()

    function iterateCart() {
        for (i=0; i<checkoutCart.length; i++) {
            if (checkoutCart.name === e.target.id)
                checkoutCart.qty = newQty
            else console.log("I didn't increment qty")
        }  
    }

         //maybe pass in a function to the 'else' argument that can handle more rigorous
         //logic than the 'else' is capable of?

    // for (i=0; i<checkoutCart.length; i++) {
    //     if (checkoutCart.name !== e.target.id)   
    //        (checkoutCart.push(cartObj))
    //     else (+checkoutCart.qty + 1)
    //     }
    
    // if (checkoutCart.name !== e.target.id)   
    //    (checkoutCart.push(cartObj))
    // else (checkoutCart.qty + 1)

    // if (checkoutCart[1] === e.target.id)   
    //    ((checkoutCart[3]) + 1)
    // else (checkoutCart.push(cartObj))
}



// fetch(CART_URL) 
//     .then (res => res.json())
//     .then (data => console.log(data))

// let i = 0

// const cartCard = document.createElement("div")

// const produceName = document.createElement("h3")
//       produceName.innerText = e.target.id
// const produceQuant = document.createElement("h4")
//       produceQuant.innerText = i++
// const produceCost = document.createElement("h4")
//       produceCost.innerText = e.target.class * produceQuant
// const produceImg = document.createElement("image")
//       produceImg.src = e.target.name

// cartCard.append(produceName, produceQuant, produceCost, produceImg)

// document.getElementById("shopping-cart").append(cartCard)