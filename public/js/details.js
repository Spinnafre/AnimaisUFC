const details = document.getElementsByClassName("details-header")[0];

getAnimalData()

function getAnimalData(){
    fetch("../public/data/animals.json")
    .then((response) => response.json()).
    then(function(response){
        const data = response.filter(filterAnimalData)[0];
        changeDetailsHTML(data)
    })
}

const filterAnimalData = (element) => {
    const query = window.location.search.split("=")[1]

    if (element._id == query){return true}
}

function changeDetailsHTML(data){
    const headerDetails = Array.from(details.getElementsByTagName("p"))
    const detailsData = [
        data.species, 
        data.age, 
        data.port, 
        data.sex, 
        data.breed
    ]

    details.getElementsByTagName("img")[0].src = data.image;
    details.getElementsByTagName("h4")[0].innerHTML += data.name;
    for (let i = 0; i < headerDetails.length; i++){
        headerDetails[i].innerHTML += detailsData[i]
    }
    document.getElementsByClassName("description")[0].
            getElementsByTagName("p")[0].
            innerHTML += data.desc;

    const sections = document.getElementsByClassName("sections")[0]
                        .getElementsByTagName("h1")

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
        document.getElementsByClassName("confirm")[0].innerHTML 
        = "Oferecer lar temporário"
    }
    else if(data.category == "Animais ufc"){
        Array.from(sections).forEach(section => {
            if(section.innerHTML === "Animais UFC"){
                section.parentNode.classList.add("actual-page")
            }
        })
        document.getElementsByClassName("buttons")[0].
                getElementsByTagName("a")[0].
                href = "ufc-animals-page.html"
        document.getElementsByClassName("confirm")[0].
            classList.add("invisible")
        document.getElementsByClassName("buttons").disabled = ""
    }
    document.getElementsByClassName("confirm")[0].value = data._id
}