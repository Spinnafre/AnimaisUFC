const details = document.getElementsByClassName("details-header")[0];

getAnimalData()

function getAnimalData(){
    fetch("../public/data/animals.json")
    .then((response) => response.json()).
    then(function(response){
        const data = response.filter(filterAnimalData)[0];
        details.getElementsByTagName("img")[0].src = data.image;
        details.getElementsByTagName("h4")[0].innerHTML += data.name;
        const headerDetails = Array.from(details.getElementsByTagName("p"))
        const detailsData = [data.species, data.age, 
            data.port, data.sex, data.breed]
        for (let i = 0; i < headerDetails.length; i++){
            headerDetails[i].innerHTML += detailsData[i]
        }
        document.getElementsByClassName("description")[0].
                getElementsByTagName("p")[0].
                innerHTML += data.desc;
    })
}

const filterAnimalData = (element) => {
    const query = window.location.search.split("=")[1]

    if (element._id == query){return true}
}