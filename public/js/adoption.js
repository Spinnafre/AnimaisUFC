const checkboxes = Array.from(document.querySelectorAll("input[type=checkbox]"));

checkboxes.forEach(element=> {
    element.addEventListener("change", FilterAnimals);
})

filter = {
    species:[],
    sex:[],
    porte:[],
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
    
}