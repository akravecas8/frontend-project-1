FARMS_URL = "http://localhost:3000/farms/"
CART_URL = "http://localhost:3000/cart/"

const checkoutCart = [{}]

fetch(FARMS_URL)
    .then (res => res.json())
    .then (data => data.forEach((farms) => {
        renderFarms(farms)
}))

function renderFarms(farms) {

    const farmSpan = document.createElement("span")
          farmSpan.id = farms.id
    const farmName = document.createElement("h3")
          farmName.innerText = farms.name        
    const farmImg = document.createElement("img")
          farmImg.src = farms.image
          farmImg.className = "farmImg"
                
    farmSpan.append(farmName, farmImg)          
    document.getElementById("navvy").append(farmSpan)
          
    farmSpan.addEventListener("click", () => {
            renderProduce(farms)

            const createBtnId = document.querySelector(".create-item-button")
                  createBtnId.id = ""
                  createBtnId.id = farms.id
    })  

    document.getElementById("add-produce-form").addEventListener("submit", (e) => addProduceItem(e, farms))
}

function renderProduce(farms) {

    document.querySelector("#produce").innerHTML = ""

    for (i=0; i < farms.produce.length; i++) {

        const itemCard = document.createElement("div")
              itemCard.className = "box"
              itemCard.id = i

        const produceName = document.createElement("h2")
              produceName.innerText = farms.produce[i].produceName
        const produceAvail = document.createElement("h3")
              produceAvail
                if (farms.produce[i].available == "yes") {
                    produceAvail.innerText = "In Stock"
                    }
                else produceAvail.innerText = "Out of Stock"
        const produceQuant = document.createElement("h3")
              produceQuant
                if (produceAvail.innerText === "In Stock") {
                    produceQuant.innerText = `Quantity: ${farms.produce[i].quantity}`
                    }
                else produceQuant.innerText = "--"
        const producePrice = document.createElement("h3")
              producePrice
                if (produceAvail.innerText === "In Stock") {
                    producePrice.innerText = `Price: $${farms.produce[i].cost}`
                    }
                else producePrice.innerText = "N/A"
        const produceImage = document.createElement("image")
              produceImage.src = produce.produceImage

        const addToCartButton = document.createElement("button")
              addToCartButton.innerText = "Add to Cart"
              addToCartButton.id = itemCard.id
              addToCartButton.addEventListener("click", (e) =>{
                    fillCart(e, farms)
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

                    const farmId = farms.id
                    const cardId = e.target.id

                    const farmsProduce = [... farms.produce]
                    farmsProduce.splice(cardId, 1)

                    const spreadNewProduce = {
                        produce: farmsProduce
                    }

                    const newObj = {
                        headers: {"Content-Type": "application/json"},
                        method: "PATCH",
                        body: JSON.stringify(spreadNewProduce),
                    }

                    fetch(FARMS_URL+farmId, newObj)
                        .then(res => res.json())
                        .then(function(data){
                             renderProduce(data)
                    })
              })
       
        itemCard.append(produceName, produceAvail, produceQuant, producePrice, produceImage, addToCartButton, updateButton, deleteButton)    
        document.getElementById("produce").append(itemCard)
    }
}

function addProduceItem(e, farms) {
    e.preventDefault()

    const farmId = e.target[5].id

    const addNewProduce = {
        produceName: e.target[0].value,
        available: e.target[1].value,
        quantity: +e.target[2].value,
        cost: +e.target[3].value,
        produceImage: e.target[4].value,
    }

    const spread = [... farms.produce]
    spread.push(addNewProduce)

    const spreadNewProduce = {
        produce: spread
    }

    const newObj = {
        headers: {"Content-Type": "application/json"},
        method: "PATCH",
        body: JSON.stringify(spreadNewProduce),
    }
    console.log(farmId)
    fetch(FARMS_URL+farmId, newObj)
        .then(res => res.json())
        .then(function(data){
            renderProduce(data)
    })
}

function fillCart(e, farms) {

    // const farmsId = farms.id
    const cardId = e.target.id

    const spread = [... farms.produce]
    const addItem = spread.splice(cardId, 1)

    const cartObj = {"name":addItem[0]["produceName"], "cost":addItem[0]["cost"], "qty":1}
    // const qty = cartObj.qty
    // const newQty = qty + 1
    debugger

    if (checkoutCart.indexOf("name") !== e.target.id)   
       (checkoutCart.push(cartObj))
    else iterateCart()

    function iterateCart() {
        for (i=0; i<checkoutCart.length; i++) {
           const checkoutName = ""
        }
    }
}