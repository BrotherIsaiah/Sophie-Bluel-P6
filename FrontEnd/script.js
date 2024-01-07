//Récupérer les travaux
async function getWorkAndCategories () {
//console.log("test getWork");
try {
    const reponseJSON = await fetch ("http://localhost:5678/api/works");
    const reponseJS = await reponseJSON.json();
    const reponseCategory = await fetch ("http://localhost:5678/api/categories");
    //console.log(reponseCategory);
    const reponseJSCat = await reponseCategory.json();
    //console.log(reponseJSCat);
    const divGallery = document.querySelector(".gallery")
    
    reponseJS.forEach(work => {
        const figureWork = document.createElement("figure")
        const imageWork = document.createElement("img");
        imageWork.src = work.imageUrl;
        const titleWork = document.createElement("figcaption");
        titleWork.textContent = work.title;
        divGallery.appendChild(figureWork);
        figureWork.appendChild(imageWork);
        figureWork.appendChild(titleWork);
    });
    reponseJSCat.forEach((category, index) => {
        const sectionPortfolio = document.getElementById("portfolio");
        const workCategory = document.createElement("input");
        workCategory.setAttribute("type", "submit");
        workCategory.id = `categoryButton_${index}`
        workCategory.value = category.name;
        sectionPortfolio.appendChild(workCategory);
        sectionPortfolio.insertBefore(workCategory, divGallery);
        });
    
}
catch (error){
    console.log(error, "erreur")
}
};

getWorkAndCategories();



