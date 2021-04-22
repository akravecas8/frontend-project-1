FARMS_URL = "http://localhost:3000/farms/"
CART_URL = "http://localhost:3000/cart/"

const checkoutCart = [{}]

fetch(FARMS_URL)
    .then (res => res.json())
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
          
    farmSpan.addEventListener("click", () => {
            renderProduce(farms)

            const createBtnId = document.querySelector(".create-item-button")
                  createBtnId.id = farms.id
    })  

    document.getElementById("add-produce-form").addEventListener("submit", (e) => addProduceItem(e, farms))
}

function renderProduce(farms) {
    // console.log(farms)
    document.querySelector("#produce").innerHTML = ""

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
        }
}

function addProduceItem(e, farms) {
    e.preventDefault()

    const id = e.target[4].id

    const addNewProduce = {
        produceName: e.target[0].value,
        available: e.target[1].value,
        quantity: e.target[2].value,
        cost: e.target[3].value,
        produceImage: e.target[4].value,
    }

    const x = [... farms.produce]
    x.push(addNewProduce)

    const spanNewProduce = {
        produce: x
    }

    const newObj = {
        headers: {"Content-Type": "application/json"},
        method: "PATCH",
        body: JSON.stringify(spanNewProduce),
    }

    fetch(FARMS_URL+id, newObj)
        .then(res => res.json())
        .then(function(data){
            // document.querySelector("#produce").innerHTML=""
            renderProduce(data)
    })
}

// function fillCart(e) {
    
//     const cartObj = {"name":e.target.id, "cost":e.target.class, "qty":1}
//     const qty = cartObj.qty
//     const newQty = qty + 1

//     if (checkoutCart.indexOf("name") !== e.target.id)   
//        (checkoutCart.push(cartObj))
//     else iterateCart()

//     function iterateCart() {
//         for (i=0; i<checkoutCart.length; i++) {
//             if (checkoutCart.name === e.target.id)
//                 checkoutCart.qty = newQty
//             else console.log("I didn't increment qty")
//         }  
//     }
// }