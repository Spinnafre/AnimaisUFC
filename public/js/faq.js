const themesDiv = document.getElementsByClassName("questions-themes")[0]
const theme = document.getElementsByClassName("theme")[0].cloneNode(true);
const questionTemplate = theme.getElementsByClassName("question")[0].cloneNode(true);

document.getElementsByClassName("theme")[0].remove();
theme.getElementsByClassName("question")[0].remove()

fetch("/public/data/faq.json").
then((response) => response.json()).
then((response) => {
    const data = response;
    changeFaqHTML(data);
    onFaqLoad()
});


function changeFaqHTML(data){
    const themesInPage = [];

    data.data.forEach(element => {
        if(themesInPage.indexOf(element.theme) == -1){
            const newTheme = theme.cloneNode(true);
  
            newTheme.getElementsByClassName("action")[0].innerHTML = element.theme;
            themesInPage.push(element.theme)
            themesDiv.appendChild(newTheme)
        }
    });
    const themes = themesDiv.getElementsByClassName("theme");
    Array.from(themes).forEach(theme => {
        data.data.forEach(dataElement => {
            if(theme.getElementsByClassName("action")[0].innerHTML 
                    == dataElement.theme){
                const newQuestion = questionTemplate.cloneNode(true);
                newQuestion.getElementsByTagName("h3")[0].
                        innerHTML = dataElement.question;
                newQuestion.getElementsByClassName("answer")[0].
                        getElementsByTagName("p")[0].
                        innerHTML = dataElement.answer;
                theme.getElementsByClassName("questions")[0]
                        .appendChild(newQuestion)
            }
        })
    })    
}