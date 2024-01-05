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
    const reponseCategory = await fetch ("http://localhost:5678/api/categories");
    console.log(reponseCategory);
    const reponseJSCat = await reponseCategory.json();
    console.log(reponseJSCat);

    reponseJSCat.forEach(category => {
        const sectionPortfolio = document.getElementById("portfolio");
        const objetCategory = document.createElement("input");
        objetCategory.setAttribute("type", "submit");
        objetCategory.value = category.name;
        sectionPortfolio.appendChild(objetCategory);
        sectionPortfolio.insertBefore(objetCategory, divGallery);
    })
}
catch (error){
    console.log(error, "erreur")
}
};

getWork();


