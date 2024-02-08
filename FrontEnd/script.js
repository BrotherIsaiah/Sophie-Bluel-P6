import { getToken } from "./login.js";
//Récupérer les travaux
const divCategory = document.createElement("div");
const headerSection = document.querySelector("header");
const sectionIntroduction = document.getElementById("introduction");
const sectionPortfolio = document.getElementById("portfolio");
async function getWorkAndCategories () {
    //console.log("test getWork");
    try {
        const reponseJSON = await fetch ("http://localhost:5678/api/works");
        const reponseJS = await reponseJSON.json();
        console.log(reponseJS);
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
        const sectionPortfolio = document.getElementById("portfolio");
        //const divCategory = document.createElement("div");
        divCategory.classList.add = "divCategory";
        sectionPortfolio.appendChild(divCategory);

        reponseJSCat.forEach((category, index) => {
            
            const workCategory = document.createElement("input");
            workCategory.setAttribute("type", "submit");
            workCategory.id = `categoryButton_${index}`
            workCategory.value = category.name;
            sectionPortfolio.appendChild(divCategory);
            sectionPortfolio.appendChild(workCategory);
            
            divCategory.appendChild(workCategory);
            sectionPortfolio.insertBefore(divCategory, divGallery);
            workCategory.addEventListener("click", function(){
                // Récupération de l'id de la catégorie
                const categoryId = category.id;
                //vidage de la galerie
                divGallery.innerHTML = "";
                //filtrage des travaux par catégorie
                reponseJS.forEach(work => {
                    if (work.categoryId === categoryId) {
                        const figureWork = document.createElement("figure");
                        const imageWork = document.createElement("img");
                        imageWork.src = work.imageUrl;
                        const titleWork = document.createElement("figcaption");
                        titleWork.textContent = work.title;
                        figureWork.appendChild(imageWork);
                        figureWork.appendChild(titleWork);
                        divGallery.appendChild(figureWork);
                    }
                })
            })
        });
        
        //bouton pour afficher tout les travaux
        const resetFilter = document.createElement("input");
        
        resetFilter.setAttribute("type", "submit");
        resetFilter.value = "Tous";
        divCategory.appendChild(resetFilter);
        //sectionPortfolio.insertBefore(resetFilter, divGallery);
        resetFilter.addEventListener("click", function(){
            divGallery.innerHTML = "";
            reponseJS.forEach(work => {
                const figureWork = document.createElement("figure");
                const imageWork = document.createElement("img");
                imageWork.src = work.imageUrl;
                const titleWork = document.createElement("figcaption");
                titleWork.textContent = work.title;
                divGallery.appendChild(figureWork);
                figureWork.appendChild(imageWork);
                figureWork.appendChild(titleWork);
            });
        })
    }
    catch (error){
        console.log(error, "erreur")
    };
    };
getWorkAndCategories();

function modalEditionAndLogout(){
    const modalDiv = document.getElementById("modal1");
    const loginLink = document.querySelector('nav ul li:nth-child(3) a');
    const sectionPortfolio = document.getElementById("portfolio");
    console.log(sectionPortfolio);
    const divModifier = document.querySelector(".div-modifier");
    const icon = divModifier.querySelector("i");
    const paragraph = divModifier.querySelector("p");
    icon.style.display = "none";
    paragraph.style.display = "none";
   
    if (getToken()) {
        modalDiv.style.display = "flex";
        loginLink.textContent = "logout";
        divCategory.style.display = "none";
        icon.style.display = "flex";
        paragraph.style.display = "flex";
    } else {
        modalDiv.style.display = "none";
        //console.log("erreur");
    };
    if (loginLink.textContent === "login") {
        loginLink.addEventListener("click", function(){
            
            window.location.href = "login.html";
        })
    };
    const modalDiv2 = document.querySelector(".modal2");
    const modalGallery = document.querySelector(".modalGallery");
    //const editIcon = document.querySelector(".fa-pen-to-square");
    icon.addEventListener("click", function(){
        modalDiv2.style.display = "grid";
        headerSection.style.filter = "blur(2px)";
        sectionIntroduction.style.filter = "blur(2px)";
        sectionPortfolio.style.filter = "blur(2px)";
    });
    const xCloseModal = document.querySelector(".fa-xmark");
    xCloseModal.addEventListener("click", function(){
        modalDiv2.style.display ="none";
        headerSection.style.filter = "blur(0)";
        sectionIntroduction.style.filter = "blur(0)";
        sectionPortfolio.style.filter = "blur(0)";
    });
    if (loginLink.textContent === "logout") {
        loginLink.addEventListener("click", function(){
            window.localStorage.removeItem("myToken");
            window.location.reload();
            loginLink.textContent = "login";
            window.location.href = "index.html";
        });
    };
};
modalEditionAndLogout();

async function deleteWork(work){
    try {
        const token = getToken(); 
        if (!token) {
            throw new Error("Token d'authentification manquant");
        }
        const deleteWorkById = await fetch (`http://localhost:5678/api/works/${work.id}`,{
            method: "DELETE",
headers: {
    "Accept": "*/*",
    "Authorization": `Bearer ${token}`, 
},
        });
        if (deleteWorkById.ok){
            console.log("Travail supprimé");
            //await fetchModal();
            window.location.reload();
        } else {
            console.log ("Erreur lors de la suppression");
        }
    } catch (error) {
        console.log(error, "Impossible de supprimer")
    }
}

async function fetchModal (){
    try {
        const reponseJSON = await fetch ("http://localhost:5678/api/works");
        const reponseJS = await reponseJSON.json();
        const modalDiv2 = document.querySelector(".modal2");
        const modalGallery = document.querySelector(".modalGallery");
        reponseJS.forEach(work => {
            const figureWork = document.createElement("figure")
            const imageWork = document.createElement("img");
            imageWork.src = work.imageUrl;
            modalDiv2.appendChild(modalGallery);
            modalGallery.appendChild(figureWork);
            modalGallery.style.display = "grid";
            figureWork.style.display = "grid";
           figureWork.appendChild(imageWork);
           const trashButton = document.createElement("button");
           trashButton.innerHTML = '<i class="fa-solid fa-trash-can"></i>'
           
           trashButton.addEventListener("click", async function(){
            await deleteWork(work);
           })
           figureWork.appendChild(trashButton);
        });
        const addPhotoButton = document.createElement("input");
        addPhotoButton.setAttribute("type", "button");
        addPhotoButton.value = "Ajouter photo";
        addPhotoButton.classList.add("add-photo-button");
        modalDiv2.appendChild(addPhotoButton);
    } catch (error) {
        console.log(error, "erreur pour la modale")
    }
};

async function addWorkModal() {
    const modalDiv2 = document.querySelector(".modal2");
    const modalDiv3 = document.querySelector(".modal3");
    const navModal3 = document.createElement("nav");
    const titleModal3 = document.createElement("h3");
    const formWork = document.createElement("form");
    const divImageInput = document.createElement("div");
    const imageIcon = document.createElement("span");
    const fileInputLabel = document.createElement("label");
    const imageFileInput = document.createElement("input");
    const previewImage = document.createElement("img");
    const titleInput = document.createElement("input");
    const titleText = document.createElement("p");
    const reponseCategory = await fetch ("http://localhost:5678/api/categories");
    const reponseJSCat = await reponseCategory.json();
    const categoryInput = document.createElement("select");
    const categoryText = document.createElement("p");
    const submitButton = document.createElement("input");
    const requestBody = new FormData();
    document.addEventListener("click", async function (event) {
        if (event.target.classList.contains("add-photo-button")) {
            modalDiv2.style.display = "none"; 
            modalDiv3.style.display = "flex"; 
            navModal3.innerHTML = '<i class="fa-solid fa-arrow-left"></i><i class="fa-solid fa-xmark"></i>';
            
            // Utilisation de délégués d'événements pour le bouton de fermeture
            document.addEventListener("click", function (event) {
            if (event.target.classList.contains("fa-xmark")) {
            modalDiv3.style.display = "none";
            headerSection.style.filter = "blur(0)";
            sectionIntroduction.style.filter = "blur(0)";
            sectionPortfolio.style.filter = "blur(0)";
            };
            });

            // Utilisation de délégués d'événements pour le bouton précédent
            document.addEventListener("click", function (event) {
            if (event.target.classList.contains("fa-arrow-left")) {
            modalDiv3.style.display = "none";
            modalDiv2.style.display = "flex";
            }
            });
            titleModal3.textContent = "Ajout photo";
            divImageInput.classList.add = "image-input";
            imageIcon.innerHTML = '<i class="fa-regular fa-image"></i>';
            
            fileInputLabel.textContent = "Ajouter une photo";
            fileInputLabel.htmlFor = "fileInput";

            imageFileInput.type = "file"; 
            imageFileInput.id = "fileInput";
            imageFileInput.accept = "jpg, png";
            imageFileInput.style.opacity = "0";
            
            previewImage.style.maxWidth = "100%";
            previewImage.style.maxHeight = "150px";

            imageFileInput.addEventListener("change", () => {
                const file = imageFileInput.files[0];
                if (file) {
                    const reader = new FileReader();
                    imageFileInput.style.flexDirection = "column-reverse";
                    imageIcon.style.display = 'none';
                    submitButton.style.backgroundColor = "#1D6154";
                    reader.onload = (e) => {
                        previewImage.src = e.target.result;
                    };
                    reader.readAsDataURL(file);
                } else {
                    previewImage.src = ""; 
                }
            });
            
            titleInput.type = "text";
            titleInput.value = "";

            titleText.textContent = "Titre";
            
            //console.log(reponseCategory);
            //console.log(reponseJSCat);
            
            reponseJSCat.forEach((category) => {
                const option = document.createElement("option");
                option.value = category.id;
                option.textContent = category.name;
                categoryInput.appendChild(option);
                });
            
            
            categoryText.textContent = "Catégories";

            submitButton.type = "submit";
            submitButton.value = "Valider";
            submitButton.style.backgroundColor = "#A7A7A7";

            requestBody.append('image', imageFileInput.files[0]);
            requestBody.append('title', titleInput.value);
            requestBody.append('category', categoryInput.value);
            //console.log(requestBody);

            formWork.appendChild(divImageInput);
            divImageInput.append(fileInputLabel);
            divImageInput.append(imageFileInput);
            divImageInput.appendChild(previewImage);
            divImageInput.appendChild(imageIcon);
            
            formWork.appendChild(titleText);
            formWork.appendChild(titleInput);
            formWork.appendChild(categoryText);
            formWork.appendChild(categoryInput);
            formWork.appendChild(submitButton);
            
            async function createWork(work){
                try {
                    const token = await getToken(); 
                    if (!token) {
                        throw new Error("Token d'authentification manquant");
                    };

                    const requestBody = new FormData();
                    requestBody.append('image', imageFileInput.files[0]);
                    requestBody.append('title', titleInput.value);
                    requestBody.append('category', categoryInput.value);

                    const createWorkBySubmit = await fetch("http://localhost:5678/api/works", {
                        method: "POST",
                        headers: {

                            "Authorization": `Bearer ${token}`,

                        },
                        body: requestBody
                    });
                    if (createWorkBySubmit.ok){
                        console.log("Travail crée");
                        await fetchModal();
                        window.location.reload();
                    } else {
                        console.log ("Erreur lors de la création");
                    }
                } catch (error) {
                    console.log(error, "Impossible de créer")
                }
            };
            formWork.addEventListener("submit", async function (event) {
                event.preventDefault();
                await createWork();
            });
            
        }
    });
    modalDiv3.appendChild(navModal3);
    modalDiv3.appendChild(titleModal3);
    modalDiv3.appendChild(formWork);
    };

fetchModal();
addWorkModal();