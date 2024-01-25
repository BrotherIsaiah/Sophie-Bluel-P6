import { getToken } from "./login.js";
//Récupérer les travaux
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
    
        reponseJSCat.forEach((category, index) => {
            const sectionPortfolio = document.getElementById("portfolio");
            const workCategory = document.createElement("input");
            workCategory.setAttribute("type", "submit");
            workCategory.id = `categoryButton_${index}`
            workCategory.value = category.name;
            sectionPortfolio.appendChild(workCategory);
            sectionPortfolio.insertBefore(workCategory, divGallery);
    
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
        const sectionPortfolio = document.getElementById("portfolio");
        resetFilter.setAttribute("type", "submit");
        resetFilter.value = "Tous";
        sectionPortfolio.appendChild(resetFilter);
        sectionPortfolio.insertBefore(resetFilter, divGallery);
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
    }
    };
getWorkAndCategories();

function modalEditionAndLogout(){
    const modalDiv = document.getElementById("modal1");
    const loginLink = document.querySelector('nav ul li:nth-child(3) a');
    if (getToken()) {
        modalDiv.style.display = "flex";
        loginLink.textContent = "logout"
    } else {
        modalDiv.style.display = "none";
        console.log("erreur");
    };
    const modalDiv2 = document.querySelector(".modal2");
    const modalGallery = document.querySelector(".modalGallery");
    const editIcon = document.querySelector(".fa-pen-to-square");
    editIcon.addEventListener("click", function(){
        modalDiv2.style.display = "grid";
        
    });
    const xCloseModal = document.querySelector(".fa-xmark");
    xCloseModal.addEventListener("click", function(){
        modalDiv2.style.display ="none";
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
        const token = getToken(); // Assurez-vous d'avoir une fonction getToken qui renvoie votre jeton
        if (!token) {
            throw new Error("Token d'authentification manquant");
        }
        const deleteWorkById = await fetch (`http://localhost:5678/api/works/${work.id}`,{
            method: "DELETE",
headers: {
    "Accept": "*/*",
    "Authorization": `Bearer ${token}`, // Ajoutez votre jeton ici
},
        });
        if (deleteWorkById.ok){
            console.log("Travail supprimé");
            await fetchModal();
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
        addPhotoButton.setAttribute("type", "submit");
        addPhotoButton.value = "Ajouter photo";
        modalDiv2.appendChild(addPhotoButton);
        addPhotoButton.addEventListener("click", async function () {
            modalDiv2.style.display = "none";
            const modalDiv3 = document.querySelector(".modal3");
            modalDiv3.style.display = "flex";

            const formWork = document.createElement("form");
        
            const imageFileInput = document.createElement("input");
            imageFileInput.type = "file";  // Pour les fichiers

            const titleInput = document.createElement("input");
            titleInput.type = "text";
            titleInput.value = "Titre";

            const categoryInput = document.createElement("input");
            categoryInput.type = "text";
            categoryInput.value = "Catégorie";

            const submitButton = document.createElement("input");
            submitButton.type = "submit";
            submitButton.textContent = "Valider";

            modalDiv3.appendChild(formWork);
            formWork.appendChild(imageFileInput);
            formWork.appendChild(titleInput);
            formWork.appendChild(categoryInput);
            formWork.appendChild(submitButton);

            formWork.addEventListener("submit", async function (event){
               event.preventDefault();
               const formData = new FormData(formWork);
               const token = await getToken();
               console.log(token, "tokeeeen")

               const fakeData = new FormData();
               console.log(imageFileInput.value,categoryInput.value,titleInput.value)
               fakeData.append('title',titleInput   .value);
               fakeData.append('image',imageFileInput.value);
               fakeData.append("category",parseInt(categoryInput.value));

               console.log(fakeData,"fakeData")

               try {
                const response = await fetch("http://localhost:5678/api/works",{
                    method: "POST",
                    headers: {
                        'Authorization': `Bearer ${token}`
                    },
                    // body: formData,
                    body:fakeData
                });
                if (response.ok){
                    const responseData = await response.json();
                    console.log("Travail créé", responseData);
                } else {
                    console.error("Erreur lors de la création",console.log(await response.json()));
                }
               } catch (error) {
                console.error("Erreur pendantla requete:", error);
               } 
            })
           
        });
        
        
    } catch (error) {
        console.log(error, "erreur pour la modale")
    }
};

fetchModal();
//Essaye de reprendre la requete et la methode forEach du début pour implémenter le formulaire pour la modal