document.addEventListener("DOMContentLoaded", function() {
    const connectButton = document.getElementById("connect");
    console.log(connectButton);
    const loginForm = document.querySelector("#login form");
    console.log(loginForm);
    const emailValue = "sophie.bluel@test.tld"
    console.log(emailValue);
    const passwordValue = "S0phie"
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
                body: JSON.stringify({ "email": emailValue, "password": passwordValue})
            });
            const reponseData = await reponseLogin.json();
            console.log(reponseData);

            
        } catch (error) {
            console.log(error, "erreur")
        }
        console.log(logIn);
    }
});


