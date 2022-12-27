// utility function to grab external dino json file
function grabData() {
    return fetch("./dino.json")
        .then(response => response.json());
}

// Dino Constructor
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
const createDino = () =>{
    grabData().then(data => {
        const dinos = data.Dinos
        const dinos_arr = dinos.map(element => {
            return new Dinosaur(element.species, element.weight, element.height, element.diet, element.where, element.when, element.fact)
        })
        
        generateTiles(dinos_arr)
    });
}

// Create Human Object
function Human(name, height, weight, diet){
    this.species = name
    this.height = height
    this.weight = weight
    this.diet = diet
}

const human = new Human()

// Use IIFE to get human data from form
const createHuman = (function(){
    function createMan(){
        human.species = document.getElementById('name').value 
        // convert feet to inches
        human.height = parseInt(document.getElementById('feet').value) * 12 + parseInt(document.getElementById('inches').value)
        human.weight = document.getElementById('weight').value
        human.diet = document.getElementById('diet').value
    }

    return {
        human: createMan
    }
})()


// Create Dino Compare Method 1
// NOTE: Weight in JSON file is in lbs
Dinosaur.prototype.compareWeight = (ele) => {
    let diff = 0
    if (ele.weight > human.weight){
        diff = ele.weight - human.weight
        return `${ele.species} is ${diff} lbs heavier than ${human.species}`
    }else if (human.weight > ele.weight){
        diff = human.weight - ele.weight
        return `${human.species} is ${diff} lbs heavier than ${ele.species}`  
    }
}

// Create Dino Compare Method 2
// NOTE: height in inches.
Dinosaur.prototype.compareHeight = (ele) => {
    let diff = 0
    if (ele.height > human.height){
        diff = ele.height - human.height
        return `${ele.species} is ${diff} inches taller than ${human.species}`
    }else if (human.height > ele.height){
        diff = human.height - ele.height
        return `${human.species} is ${diff} inches taller than ${ele.species}`  
    }
}


// Create Dino Compare Method 3
Dinosaur.prototype.compareDiet = (ele) => {
    if (ele.diet == human.diet){
        return `${ele.species} and ${human.species} are having the same diet: ${ele.diet}`
    }else {
        return `${ele.species} has ${ele.diet} as diet while ${human.species} has ${human.diet}`  
    }
}

function generateFact(ele){
    if (ele instanceof Dinosaur){
        let random_num = Math.floor(Math.random() * 3);
        let fct = ele.fact

        // fct: All birds are Dinosaurs
        if (ele.species == 'Pigeon'){
            random_num = 3
        }
        
        if (random_num == 0){
            fct = ele.compareWeight(ele)
        }else if (random_num == 1){
            fct = ele.compareHeight(ele)
        }else if (random_num == 2){
            fct = ele.compareDiet(ele)
        }

        return fct
    } 
}

// Generate Tiles for each Dino in Array
function generateTiles(dinos){
    // add human object to dino object
    dinos.splice(4, 0, human)

    const grid = document.getElementById('grid')

    dinos.forEach(ele=>{
        const card = document.createElement('li')
        card.className = 'grid-item'

        const img = document.createElement('img')
        const species = ele.species.toLowerCase()

        if (ele instanceof Dinosaur){
            img.src = `./images/${species}.png`
        }else{
            img.src = `./images/human.png`
        }
        
        // create tile header for each card
        const h3 = document.createElement('h3')
        h3.innerText = ele.species

        // generate fact for each card
        const fct = generateFact(ele)
        const des = document.createElement('p')
        des.innerText = fct || ''
        
        // Add tiles to DOM
        grid.appendChild(card)
        card.appendChild(img)
        card.appendChild(h3)
        card.appendChild(des)
    })
}
    
// Remove form from screen
document.getElementById('grid').style.display = 'none';

// On button click, prepare and display infographic
function displayInfo(){
    createDino()

    createHuman.human()

    document.getElementById('dino-compare').style.display = 'none';
    document.getElementById('grid').style.display = 'flex';
}

const btn = document.getElementById('btn')
btn.onclick = displayInfo