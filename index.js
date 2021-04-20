BASE_URL = "http://localhost:3000/farms/"

fetch(BASE_URL)
    .then (res => res.json())
    // .then (data => console.log(data))
    .then (data => data.forEach((farms) => {
        renderFarms(farms)
        renderProduce(farms.produce)
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

    const farmName = document.createElement("h3")
          farmName.innerText = farms.name
          farmName.addEventListener("click", (e) => {
              e.preventDefault()
          })
    
    const farmImg = document.createElement("image")
          farmImg.src = farms.image

    document.getElementById("spanny").append(farmName, farmImg)
}

function renderProduce(produce) {

    const produceName = document.createElement("h2")
          produceName.innerText = produce.produceName
    const produceAvail = document.createElement("h3")
          produceAvail
            if (produce.available === true) {
                produceAvail.innerText = "In Stock"
            }
            else "Out of Stock"
    const produceQuant = document.createElement("h3")
          produceQuant.innerText = produce.quantity
    const producePrice = document.createElement("h3")
          producePrice.innerText = produce.cost
    // const produceImage = document.createElement("image")
    //       produceImage.src = produce.produceImage
    
    document.getElementById("produce").append(produceName, produceAvail, produceQuant, producePrice)
}