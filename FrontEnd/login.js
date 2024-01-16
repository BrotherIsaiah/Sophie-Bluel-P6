
document.addEventListener("DOMContentLoaded", function(){
    const connectButton = document.getElementById("connect");
connectButton.addEventListener("click", async function (event){
    event.preventDefault();
    const emailForm = document.getElementById("email").value;
    const passwordForm = document.getElementById("pass").value;
    await validateForm(emailForm, passwordForm);
});
})

async function validateForm(email, password) {
    try {
        const responseLogin = await fetch("http://localhost:5678/api/users/login", {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "email": email,
                "password": password
            })
        });
        if (responseLogin.ok) {
            const responseData = await responseLogin.json();
            console.log(responseData);
            location = "index.html";
            window.localStorage.setItem("myToken", responseData.token);
        } else {
            console.log("Erreur de connexion");
            const existingError = document.querySelector("#loginError")
            if (!existingError){
                const loginForm = document.querySelector("#login form");
                const logError = document.createElement("p");
                logError.textContent = "Erreur dans les identifiants !"
                logError.id = "loginError";
                logError.style.color = "red"
                loginForm.insertBefore(logError, loginForm.firstChild);
            }
           
        }
    } catch (error) {
        console.error("Erreur lors de la requête:", error);
    }
}

export function getToken() {
    return window.localStorage.getItem("myToken");

}

const storedToken = getToken();

if (storedToken) {
    console.log("Le token est stocké :", storedToken);
} else {
    console.log("Aucun token n'est stocké");
}
