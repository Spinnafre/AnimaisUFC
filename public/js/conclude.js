const details = document.getElementsByClassName("animal-details")[0];
document.getElementById("contact-forms")
        .addEventListener("submit", submitData)

getAnimalData()

function getAnimalData(){
    fetch("../public/data/animals.json")
    .then((response) => response.json()).
    then(function(response){
        const data = response.filter(filterAnimalData)[0];
        changeAnimalHTML(data);
    })
}

const filterAnimalData = (element) => {
    const query = window.location.search.split("animal=")[1]

    if (element._id == query){return true}
}

function submitData(){
    fetch("../public/data/animals.json")
    .then((response) => response.json()).
    then(function(response){
        const data = response.filter(filterAnimalData)[0];
    })
}

function changeAnimalHTML(data){
    const headerDetails = Array.from(details.getElementsByTagName("p"))
    const detailsData = [
        data.species, 
        data.age, 
        data.port, 
        data.sex, 
        data.breed, 
        data.desc
    ]
    const sections = document.getElementsByClassName("sections")[0]
            .getElementsByTagName("h1")

    details.getElementsByTagName("img")[0].src = data.image;
    details.getElementsByTagName("h4")[0].innerHTML += data.name;

    for (let i = 0; i < headerDetails.length; i++){
        headerDetails[i].innerHTML += detailsData[i]
    }
    
    if(data.category == "Adoção"){
        Array.from(sections).forEach(section => {
            if(section.innerHTML === "Adoção"){
                section.parentNode.classList.add("actual-page")
            }
        })
    }
    else if(data.category == "Lar temporário"){
        Array.from(sections).forEach(section => {
            if(section.innerHTML === "Lar Temporário"){
                section.parentNode.classList.add("actual-page")
            }
        })
        document.getElementsByClassName("buttons")[0].
                getElementsByTagName("a")[0].
                href = "temporary-home-page.html"
    }

    document.getElementsByClassName("confirm")[0].value = data._id
}