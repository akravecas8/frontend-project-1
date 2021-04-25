FARMS_URL = "http://localhost:3000/farms/"
CART_URL = "http://localhost:3000/cart/"

const checkoutCart = [{}]

// gather farm data from farm API
fetch(FARMS_URL)
    .then (res => res.json())
    .then (data => data.forEach((farms) => {
        renderFarms(farms)
    }))

// renders individual farm info in the nav bar
function renderFarms(farms) {

    // constructing the farm elements
    const farmSpan = document.createElement("span")
          farmSpan.id = farms.id
    const farmName = document.createElement("h3")
          farmName.innerText = farms.name        
    const farmImg = document.createElement("img")
          farmImg.src = farms.image
          farmImg.className = "farmImg"
       
    // appending the farm elements to the nav bar
    farmSpan.append(farmName, farmImg)          
    document.getElementById("navvy").append(farmSpan)
       
    // adds EventListner to each farm
    farmSpan.addEventListener("click", (e) => {
            renderProduce(farms, e)

            const createBtnId = document.querySelector(".create-item-button")
                  createBtnId.id = ""
                  createBtnId.id = farms.id
            const createUpdateBtnId = document.querySelector(".update-item-button")
                  createUpdateBtnId.id = ""
                  createUpdateBtnId.id = farms.id
    })  

    // adds farm ID to form submission events
    document.getElementById("add-produce-form").addEventListener("submit", (e) => addProduceItem(e, farms)) 
    document.querySelector(".update-form").addEventListener("submit", (e) => updateProduceItem(e, farms))
}

// renders each produce item from targeted farm
function renderProduce(farms, e) {

    document.querySelector("#produce").innerHTML = ""

    // for loop iterates all subsequent information into a unique produce display card
    for (i=0; i < farms.produce.length; i++) {

        // constructs the produce item card div and generates a unique ID for each
        const itemCard = document.createElement("div")
              itemCard.className = "box"
              itemCard.id = i

        // populates the produce item card with information 
        const produceName = document.createElement("h2")
              produceName.innerText = farms.produce[i].produceName
        const produceAvail = document.createElement("h3")
              produceAvail
                if (farms.produce[i].available == "yes") {
                    produceAvail.innerText = "In Stock"}
                else produceAvail.innerText = "Out of Stock"
        const produceQuant = document.createElement("h3")
              produceQuant
                if (produceAvail.innerText === "In Stock") {
                    produceQuant.innerText = `Quantity: ${farms.produce[i].quantity}`}
                else produceQuant.innerText = "--"
        const producePrice = document.createElement("h3")
              producePrice
                if (produceAvail.innerText === "In Stock") {
                    producePrice.innerText = `Price: $${farms.produce[i].cost}`}
                else producePrice.innerText = "N/A"
        const produceImage = document.createElement("image")
              produceImage.src = produce.produceImage

        // creates button for adding items to cart on the produce card
        const addToCartButton = document.createElement("button")
              addToCartButton.innerText = "Add to Cart"
              addToCartButton.name = itemCard.id
              addToCartButton.addEventListener("click", (e) =>{
                    fillCart(e, farms)
              })

        // creates button for the update produce form on the produce card
        const updateButton = document.createElement("button")
              updateButton.innerText = "Update Item"
              updateButton.id=itemCard.id
              updateButton.addEventListener("click", (e) => {
                    document.querySelector(".update-form").id = e.target.id
                    })
              updateButton.addEventListener("click", (e) => {
                    const update = document.querySelector("#update-produce-form")
                        if (update.style.display === "none") {
                            update.style.display = "block";} 
                        else {
                            update.style.display = "none";}
                            })

        // creates button to delete a produce card on the produce card
        const deleteButton = document.createElement("button")
              deleteButton.innerText = "Delete Item"
              deleteButton.id = itemCard.id
              deleteButton.addEventListener("click", (e) =>{
                    e.preventDefault()

                    const farmId = farms.id
                    const cardId = e.target.id

                    const produce = [... farms.produce]
                          produce.splice(cardId, 1)

                    const addProduce = {
                        produce: produce
                    }
      
                    const newObj = {
                        headers: {"Content-Type": "application/json"},
                        method: "PATCH",
                        body: JSON.stringify(addProduce),
                    }

                    fetch(FARMS_URL+farmId, newObj)
                        .then(res => res.json())
                        .then(function(data){
                             renderProduce(data)
                    })
               })
       
        // appends produce information to the produce item card and that to the container div
        itemCard.append(produceName, produceAvail, produceQuant, producePrice, produceImage, addToCartButton, updateButton, deleteButton)    
        document.getElementById("produce").append(itemCard)
    }
}

// creates PATCH logic for the add produce form
function addProduceItem(e, farms) {
    e.preventDefault()
 
    // tag ID of produce card to add produce form
    const farmId = e.target[5].id

    // create new produce item inner HTML
    const addNewProduce = {
        produceName: e.target[0].value,
        available: e.target[1].value,
        quantity: +e.target[2].value,
        cost: +e.target[3].value,
        produceImage: e.target[4].value,
    }

    // copy array of objects and add new produce item
    const produce = [... farms.produce]
          produce.push(addNewProduce)

    // convert new array of objects into a whole object array
    const spreadNewProduce = {
        produce: produce
    }

    // refactor new object array into JSON
    const newObj = {
        headers: {"Content-Type": "application/json"},
        method: "PATCH",
        body: JSON.stringify(spreadNewProduce),
    }

    // refactor HTTP address, add destination and PATCH existing data structure
    // with new code
    fetch(FARMS_URL+farmId, newObj)
        .then(res => res.json())
        .then(function(data){
            renderProduce(data)
    })
}

// creates PATCH logic for the udpate produce form
function updateProduceItem(e, farms) {
    e.preventDefault()

        const farmId = e.target[5].id
        const cardId = e.target.id

        const updateProduce = {
            produceName: e.target[0].value,
            available: e.target[1].value,
            quantity: +e.target[2].value,
            cost: +e.target[3].value,
            produceImage: e.target[4].value,
        }

        const produce = [... farms.produce]
              produce.splice(cardId, 1)
              produce.push(updateProduce)

        const updatedProduce = {
            produce: produce
        }
        
        const newObj = {
            headers: {"Content-Type": "application/json"},
            method: "PATCH",
            body: JSON.stringify(updatedProduce),
        }

        fetch(FARMS_URL+farmId, newObj)
            .then(res => res.json())
            .then(function(data){
                renderProduce(data)
        })
}

// creates logic for the fill cart feature
// function fillCart(e, farms) {

//     // const farmsId = farms.id
//     const cardId = e.target.id

//     const spread = [... farms.produce]
//     const addItem = spread.splice(cardId, 1)

//     const cartObj = {"name":addItem[0]["produceName"], "cost":addItem[0]["cost"], "qty":1}
//     // const qty = cartObj.qty
//     // const newQty = qty + 1

//     if (checkoutCart.indexOf("name") !== e.target.id)   
//        (checkoutCart.push(cartObj))
//     else iterateCart()

//     function iterateCart() {
//         for (i=0; i<checkoutCart.length; i++) {
//            const checkoutName = ""
//         }
//     }
// }

