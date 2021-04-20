BASE_URL = "http://localhost:3000/farms/"

fetch(BASE_URL)
    .then (res => res.json())
    // .then (data => console.log(data))
    .then (data => data.forEach((farms) => {
        renderFarms(farms)
    }))

function renderFarms(farms) {
    const farmsSpan = document.createElement("span")
          farmsSpan.id = farms.id
          farmsSpan.addEventListener("click", (e) => {
              
          })

    const farmName = document.createElement("h2")
          farmName.innerText = farms.name

    const farmImg = document.createElement("img")
          farmImg.src = farms.image
    
    farmsSpan.append(farmName, farmImg)

    document.getElementById("farm-bar").append(farmsSpan)
}
