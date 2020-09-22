function onFaqLoad(){
    let themes = Array.from(document.getElementsByClassName("action"));
    let questions = Array.from(document.getElementsByClassName("question"));

    themes.forEach(element => {
        element.addEventListener("click", showQuestions);
    });
    questions.forEach(element => {
        element.getElementsByTagName("button")[0]
                .addEventListener("click", showAnswer);
    });
}

function showQuestions(){
    let node = this.parentNode.getElementsByClassName("questions")[0];
    if(node === undefined){
        return;
    }
    
    if(node.classList.length === 1){
        this.classList.add("theme-chosen")
        node.classList.add("visible")
    }
    else{
        this.classList.remove("theme-chosen")
        node.classList.remove("visible")
    }
}

function showAnswer(){
    let node = this.parentNode.getElementsByClassName("answer")[0];
    if(node === undefined){
        return;
    }

    if(node.classList.length === 1){
        this.classList.add("answer-visible")
        node.classList.add("visible");
    }
    else{
        this.classList.remove("answer-visible")
        node.classList.remove("visible");
    }
}
