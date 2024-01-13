document.addEventListener("DOMContentLoaded", function() {
    const connectButton = document.getElementById("connect");
    console.log(connectButton);
    const loginForm = document.querySelector("#login form");
    console.log(loginForm);
    const emailForm = document.getElementById("email").value;
    console.log(emailForm);
    const passwordForm = document.getElementById("pass").value;
    console.log(passwordForm);
    connectButton.addEventListener("click", async function (event){
        event.preventDefault();
        await validateForm();
    });
    
    async function validateForm() {
        try {
            const responseLogin = await fetch("http://localhost:5678/api/users/login", {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    "email": "sophie.bluel@test.tld",  // Remplacez par la valeur réelle de l'e-mail
                    "password": "S0phie"  // Remplacez par la valeur réelle du mot de passe
                })
            });
            const responseData = await responseLogin.json();
            console.log(responseData);
            if (responseLogin.ok) {
                location = "index.html";
            } else {
                console.log("Erreur de connexion");
            }
        } catch (error) {
            console.error("Erreur lors de la requête:", error);
        }
    }
    
});