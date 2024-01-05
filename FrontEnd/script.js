//Récupérer les travaux
async function getWork () {
//console.log("test getWork");
try {
    const reponseJSON = await fetch ("http://localhost:5678/api/works");
    //console.log(reponseJSON)
    const reponseJS = await reponseJSON.json();
    //console.log(reponseJS);
    const divGallery = document.querySelector(".gallery")
    //console.log(divGallery)
    reponseJS.forEach(work => {
        const figureWork = document.createElement("figure")
        const imageWork = document.createElement("img");
        imageWork.src = work.imageUrl;
        const titleWork = document.createElement("figcaption");
        titleWork.textContent = work.title;
        divGallery.appendChild(figureWork);
        figureWork.appendChild(imageWork);
        figureWork.appendChild(titleWork);
    })
    
}
catch (error){
    console.log(error, "erreur")
}
};

async function getCategory(){
    try {
        const reponseCategory = await fetch ("http://localhost:5678/api/categories");
    console.log(reponseCategory);
    const reponseJSCat = await reponseCategory.json();
    console.log(reponseJSCat);
    const divGallery = document.querySelector(".gallery");
    reponseJSCat.forEach((category) => {
        const sectionPortfolio = document.getElementById("portfolio");
        const workCategory = document.createElement("input");
        workCategory.setAttribute("type", "submit");
        workCategory.id = "categoryButton"
        workCategory.value = category.name;
        sectionPortfolio.appendChild(workCategory);
        sectionPortfolio.insertBefore(workCategory, divGallery);
    });
    const filterButton = reponseJSCat[0].name;
    const objetsButton = document.getElementById("categoryButton");
    objetsButton.addEventListener("click", function (){
        console.log(objetsButton);
        divGallery.innerHTML = ;
    })
   
    
   
    
    } catch (error) {
        console.log(error, "erreur");
    }
};

getCategory();
getWork();


