
function grabData() {
    return fetch("./dino.json")
        .then(response => response.json());
}

// Create Dino Constructor

function Dinosaur(species, weight, height, diet, where, when, fact){
    this.species = species
    this.weight = weight
    this.height = height
    this.diet = diet
    this.where = where
    this.when = when
    this.fact = fact
}

// Create Dino Objects
let dinos = []

grabData().then(data => {
    const dinos = data.Dinos
    dinos.forEach(element => {
        const d = new Dinosaur(element.species, element.weight, element.height, element.diet, element.where, element.when, element.fact)

        console.log(d)
        dinos.push(d)
    });
});

setTimeout(() => {
    console.log(dinos)
}, 2000);




// Create Human Object

// Use IIFE to get human data from form


// Create Dino Compare Method 1
// NOTE: Weight in JSON file is in lbs, height in inches. 


// Create Dino Compare Method 2
// NOTE: Weight in JSON file is in lbs, height in inches.


// Create Dino Compare Method 3
// NOTE: Weight in JSON file is in lbs, height in inches.


// Generate Tiles for each Dino in Array

    // Add tiles to DOM

// Remove form from screen


// On button click, prepare and display infographic
const btn = document.getElementById('btn')
btn.onclick = function(e){
    const name = document.getElementById('name').value
    const feet = document.getElementById('feet').value
    const inches = document.getElementById('inches').value
    const weight = document.getElementById('weight').value
    const diet = document.getElementById('diet').value

    console.log(name, feet, inches, weight, diet)

    document.getElementById('dino-compare').style.display = 'none';
}
