document.addEventListener("DOMContentLoaded", function() {
    const connectButton = document.getElementById("connect");
    console.log(connectButton);
    const loginForm = document.querySelector("#login form");
    console.log(loginForm);
    const emailValue = document.getElementById("email").value;
    console.log(emailValue);
    const passwordValue = document.getElementById("pass").value;
    console.log(passwordValue);
    connectButton.addEventListener("click", logIn);
        console.log(connectButton);
    
    async function logIn (event){
        event.preventDefault();
        try {
            const reponseLogin = await fetch ("http://localhost:5678/api/users/login", {
                method: "POST",
                headers: {
                     "accept": "application/json",
                     "Content-Type": "application/json"},
                body: JSON.stringify({ "email": emailValue, "password": "S0phie"})
            });
            const reponseData = await reponseLogin.json();
            console.log(reponseData);
            if (reponseLogin.ok) {
                location = "index.html"
            } else {
                const errorAlert = document.createElement("p");
                errorAlert.textContent = "erreur de connexion";
                loginForm.appendChild(errorAlert);
            }
            
            
            
        } catch (error) {
            console.log(error, "erreur")
        }
        console.log(logIn);
    }
});




