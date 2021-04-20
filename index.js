BASE_URL = "http://localhost:3000/farms/"

fetch(BASE_URL)
    .then (res => res.json())
    // .then (data => console.log(data))
    .then (data => data.forEach((farms) => {
        renderFarms(farms)
        renderProduce(farms)
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
    
    const farmImg = document.createElement("image")
          farmImg.src = farms.image

    document.getElementById("spanny").append(farmName, farmImg)
}

function renderProduce(farms) {

    const produceName = document.createElement("h2")
          produceName.innerText = farms.produce.name
    const produceAvail = document.createElement("h3")
          produceAvail
            if (farms.produce.available === true) {
                produceAvail.innerText = "In Stock"
            }
            else "Out of Stock"
    const produceQuant = document.createElement("h3")
          produceQuant.innerText = farms.produce.quantity
    const producePrice = document.createElement("h3")
          producePrice.innerText = farms.produce.cost
    // const produceImage = document.createElement("image")
    //       produceImage.src = farms.produce.Image
    
    document.getElementById("produce").append(produceName, produceAvail, produceQuant, producePrice)
}