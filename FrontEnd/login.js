// login.js
const connectButton = document.getElementById("connect");
connectButton.addEventListener("click", async function (event){
    event.preventDefault();
    const emailForm = document.getElementById("email").value;
    const passwordForm = document.getElementById("pass").value;
    await validateForm(emailForm, passwordForm);
});
export async function validateForm(email, password) {
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
        }
    } catch (error) {
        console.error("Erreur lors de la requête:", error);
    }
    const storedToken = window.localStorage.getItem("myToken");
}

export function getToken() {
    return window.localStorage.getItem("myToken");
}
