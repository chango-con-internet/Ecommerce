//Java 1

document.getElementById("login-form").addEventListener("submit", async (e) => {
    e.preventDefault();

    const correo = document.getElementById("emailveri").value;

    const response = await fetch("http://localhost:8081/api/Recuperar/solicitar-codigo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ correo })
    });

    const data = await response.json();

    if (response.ok) {
        // Pasamos el correo a recuperarB
        window.location.href = `recuperarB.html?correo=${encodeURIComponent(correo)}`;
    } else {
        const errorBox = document.getElementById("login-error");
        document.getElementById("login-error-message").textContent = data.message;
        errorBox.classList.remove("hidden");
    }
});