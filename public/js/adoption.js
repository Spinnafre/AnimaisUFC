const checkboxes = Array.from(
    document.querySelectorAll("input[type=checkbox]"));
const animalsArea = document.getElementsByClassName("animals")[0];
const animalTemplate = document.getElementsByClassName("animal")[0];

checkboxes.forEach(element=> {
    element.addEventListener("change", FilterAnimals);
})

showAnimals()

filter = {
    species:[],
    sex:[],
    port:[],
    age:[]  
}

function FilterAnimals(){
    if(this.checked){
        filter[this.name].push(this.value);
    }
    else{
        const value = filter[this.name].indexOf(this.value)
        filter[this.name].splice(value, 1);
    }
    showAnimals()
}

function showAnimals(){
    Array.from(document.getElementsByClassName("animal")).
            forEach(element => element.
            remove())

    fetch("../public/data/animals.json")
    .then((response) => response.json()
    ).then(function(response){
        const data = response.filter(filterJson);
        data.forEach(element => {
            const animal = animalTemplate.cloneNode(true);
            animal.value = (element._id)
            animal.getElementsByTagName("h6")[0].innerHTML = element.name;
            if(element.port == "Pequeno"){
                animal.getElementsByTagName("p")[0].classList
                        .add("actual-port");
            }
            if(element.port == "Médio"){
                animal.getElementsByTagName("p")[1].classList
                        .add("actual-port");
            }
            if(element.port == "Grande"){
                animal.getElementsByTagName("p")[2].classList
                        .add("actual-port");
            }
            animal.getElementsByTagName("img")[0].src = element.image;
            if(element.sex == "Feminino"){
                animal.getElementsByTagName("img")[1].src = 
                        "../public/images/animais/feminino.svg";
            }
            if(element.sex == "Masculino"){
                animal.getElementsByTagName("img")[1].src =
                        "../public/images/animais/masculino.svg";
            }
            animalsArea.getElementsByTagName("form")[0].appendChild(animal);
        });
    });
}

function filterJson(element){
    let species = true;
    let sex = true;
    let port = true;
    let age = true;

    for(let i = 0;i < filter.species.length; i++){
        if(element.species == filter.species[i]){
            species = true
            break;
        }
        species = false;
    }
    if(!species){
        return false
    }

    for(let i = 0;i < filter.sex.length; i++){
        if(element.sex == filter.sex[i]){
            sex = true
            break;
        }
        sex = false;
    }
    if(!sex){
        return false
    }

    for(let i = 0;i < filter.port.length; i++){
        if(element.port == filter.port[i]){
            port = true
            break;
        }
        port = false;
    }
    if(!port){
        return false
    }

    for(let i = 0;i < filter.age.length; i++){
        let ageRange;
        
        if(filter.age[i] == "0-2"){
            ageRange = [0, 1, 2];
        }
        else if(filter.age[i] == "3-5"){
            ageRange = [3, 4, 5];
        }
        else if(filter.age[i] == "6-8"){
            ageRange = [6, 7, 8];
        }
        else if(filter.age[i] == "9+"){
            ageRange = [9, 10, 11, 12, 13 , 14, 15 ,16, 17];
        }
        for (let j = ageRange[0]; j <= ageRange[ageRange.length -1]; j++){
            if(element.age == j){
                age = true
                return true;
            }
            age = false;
        }
    }
    if(!age){
        return false
    }
    return true;
}