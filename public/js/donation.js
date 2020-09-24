const buttons = Array.from(document.getElementsByClassName("opcao"));

buttons.forEach(element =>{
    element.addEventListener("click", dropdown);
})

function dropdown(){
    if(this.classList.length == 1){

        const buttonsAlreadyActive = document.getElementsByClassName("btn-drop")
        
        if(Array.from(buttonsAlreadyActive).length == 1){
            buttonsAlreadyActive[0].classList.remove("btn-drop")
            document.getElementsByClassName("donations-visible")[0].classList.remove("donations-visible")
        }

        this.classList.add("btn-drop")
        this.parentNode.parentNode.getElementsByClassName("donation-info")[0].
                classList.add("donations-visible")
    }
    else{
        this.classList.remove("btn-drop")
        this.parentNode.parentNode.getElementsByClassName("donation-info")[0].
                classList.remove("donations-visible")
    }
}