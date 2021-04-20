BASE_URL = "http://localhost:3000/farms/"

fetch(BASE_URL)
    .then (res => res.json())
    // .then (data => console.log(data))
    .then (data => data.forEach((farms) => {
        renderFarms(farms)
    }))

// function renderFarms(farms) {
//     const farmsSpan = document.createElement("span")
//           farmsSpan.id = farms.id
//           farmsSpan.addEventListener("click", (e) =>{
//                 e.preventDefault()
//           })

//     const farmName = document.createElement("h3")
//           farmName.innerText = farms.name
    
//     const farmImg = document.createElement("image")
//           farmImg.src = farms.image
    
//     farmsSpan.append(farmName, farmImg)

//     document.getElementById("farm-bar").append(farmsSpan)
// }

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
        })     
}

function renderProduce(farms) {
    console.log(farms)

    for (i=0; i < farms.produce.length; i++) {

        const itemCard = document.createElement("div")
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

        itemCard.append(produceName, produceAvail, produceQuant, producePrice, produceImage, addToCartButton)    

        document.getElementById("produce").append(itemCard)
        }
}

function fillCart(e) {
    console.log(e)
    // debugger

    let i = 0
    
    const cartCard = document.createElement("div")

    const produceName = document.createElement("h3")
          produceName.innerText = e.target.id
    let produceQuant = document.createElement("h3")
          produceQuant = i++
    let produceCost = document.createElement("h3")
          produceCost = e.target.class * produceQuant
    const produceImg = document.createElement("image")
          produceImg.src = e.target.name

    cartCard.append(produceName, produceQuant, produceCost, produceImg)

    document.getElementById("shopping-cart").append(cartCard)
}