//Récupérer les travaux
async function getWork () {
console.log("test getWork");
try {
    const reponseJSON = await fetch ("http://localhost:5678/api/works");
    console.log(reponseJSON)
    const reponseJS = await reponseJSON.json();
    console.log(reponseJS);
    const divGallery = document.querySelector(".gallery")
    console.log(divGallery)
    reponseJS.forEach(work => {
        const figureWork = document.createElement("figure")
        const imageWork = document.createElement("img");
        imageWork.src = work.imageUrl;
        const titleWork = document.createElement("figcaption");
        titleWork.textContent = work.title;
        divGallery.appendChild(figureWork)
        figureWork.appendChild(imageWork)
        figureWork.appendChild(titleWork)
    })
}
catch (error){
    console.log(error, "erreur")
}
};

getWork();
