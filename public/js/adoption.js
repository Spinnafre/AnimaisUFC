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
    let url = "../public/data/animals.json";

    Array.from(document.getElementsByClassName("animal")).
            forEach(element => element.
            remove())
    
    fetch(url)
    .then((response) => response.json()
    ).then(function(response){
        const data = response.filter(filterJson);
            changeAnimalsHTML(data)
    });
}


function filterJson(animal){
    const validation = {
        species: true,
        sex: true,
        port: true,
        age: true
    }
    const fileName = location.pathname.split("/").slice(-1)[0]

    if(!((fileName == "adoption-page.html" && animal.category == "Adoção") 
        || (fileName == "temporary-home-page.html" && animal.category == "Lar temporário") 
        || (fileName == "ufc-animals-page.html" && animal.category == "Animais ufc"))){
            return false;
    }

    for(let i = 0;i < filter.species.length; i++){
        if(animal.species == filter.species[i]){
            validation.species = true
            break;
        }
        validation.species = false;
    }
    if(!validation.species){
        return false
    }

    for(let i = 0;i < filter.sex.length; i++){
        if(animal.sex == filter.sex[i]){
            validation.sex = true
            break;
        }
        validation.sex = false;
    }
    if(!validation.sex){
        return false
    }

    for(let i = 0;i < filter.port.length; i++){
        if(animal.port == filter.port[i]){
            validation.port = true
            break;
        }
        validation.port = false;
    }
    if(!validation.port){
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
            if(animal.age == j){
                validation.age = true
                return true;
            }
            validation.age = false;
        }
    }
    if(!validation.age){
        return false
    }
    return true;
}


function changeAnimalsHTML(data){
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
                    "../public/images/animals/feminino.svg";
        }
        if(element.sex == "Masculino"){
            animal.getElementsByTagName("img")[1].src =
                    "../public/images/animals/masculino.svg";
        }
        animalsArea.getElementsByTagName("form")[0].appendChild(animal);
    });
}