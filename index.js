BASE_URL = "http://localhost:3000/farms/"

fetch(BASE_URL)
    .then (res => res.json())
    .then (data => console.log(data))
//         .then (data => data.forEach((farms) => {
//             renderFarms(farms)
//     }))

// function renderFarms(farms) {
//     const farmsSpan = document.createElement("span")
//           farmsSpan.id = farms.id

//     const farmName = document.createElement("h3")
//           farmName.innerText = farms.name
    
//     farmsSpan.append(farmName)

//     document.getElementById("farm-bar").append(farmsSpan)
// }


//shit to addf