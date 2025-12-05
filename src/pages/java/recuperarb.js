//Java 2

const params = new URLSearchParams(window.location.search);
const correo = params.get("correo");

if (!correo) {
    alert("No se recibió el correo. Debes iniciar el proceso nuevamente.");
    window.location.href = "recuperarA.html";
}

document.getElementById("login-form").addEventListener("submit", async (e) => {
    e.preventDefault();

    const codigo = document.getElementById("codigo").value;
    const password = document.getElementById("password").value;
    const passwordver = document.getElementById("passwordver").value;

    if (password !== passwordver) {
        const errorBox = document.getElementById("login-error");
        document.getElementById("login-error-message").textContent =
            "Las contraseñas no coinciden";
        errorBox.classList.remove("hidden");
        return;
    }

    const response = await fetch("http://localhost:8081/api/Recuperar/cambiar-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            correo,
            codigo,
            nuevaPassword: password
        })
    });

    const data = await response.json();

    if (response.ok) {
        alert("Contraseña actualizada correctamente");
        window.location.href = "login.html";
    } else {
        const errorBox = document.getElementById("login-error");
        document.getElementById("login-error-message").textContent = data.message;
        errorBox.classList.remove("hidden");
    }
});