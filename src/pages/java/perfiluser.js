document.addEventListener("DOMContentLoaded", async () => {
    console.log("🔍 Iniciando perfiluser.js");

    const sesionActiva = localStorage.getItem("sesionActiva");
    if (!sesionActiva) return;

    const perfilLS = JSON.parse(localStorage.getItem("usuario"));
    if (!perfilLS || !perfilLS.correo) {
        alert("Error al cargar tu sesión. Inicia sesión nuevamente.");
        localStorage.clear();
        window.location.href = "../pages/login.html";
        return;
    }

    const emailUsuario = perfilLS.correo;

    let usuario;
    try {
        const res = await fetch("http://localhost:8081/api/perfil/obtener", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email: emailUsuario })
        });

        if (!res.ok) throw new Error("Error en el servidor");

        const data = await res.json();
        usuario = data.usuario;
        if (!usuario) throw new Error("Usuario no encontrado");

    } catch (err) {
        console.error("❌ Error:", err);
        alert("No se pudo cargar tu perfil.");
        return;
    }

    // ============================
    // MOSTRAR DATOS ARRIBA
    // ============================
    const nombreCompleto = `${usuario.nombre} ${usuario.apellido}`;
    document.getElementById("perfil-nombre-completo").textContent = nombreCompleto;
    document.getElementById("perfil-correo").textContent = usuario.correo;

    const iniciales =
        (usuario.nombre?.charAt(0) || "?").toUpperCase() +
        (usuario.apellido?.charAt(0) || "").toUpperCase();

    document.getElementById("perfil-foto").textContent = iniciales;

    // ============================
    // LLENAR FORMULARIO
    // ============================
    document.getElementById("edit-nombre").value = usuario.nombre;
    document.getElementById("edit-apellido").value = usuario.apellido;
    document.getElementById("edit-correo").value = usuario.correo;
    document.getElementById("edit-telefono").value = usuario.telefono;

    // ============================
    // BOTONES Y MODALES
    // ============================
    const inputs = document.querySelectorAll("input");
    const btnEditar = document.getElementById("btn-editar");
    const btnCancelar = document.getElementById("btn-cancelar");
    const btnEliminar = document.getElementById("btn-eliminar");

    const modalGuardar = document.getElementById("modal-guardar");
    const modalEliminar = document.getElementById("modal-eliminar");
    const modalActualizado = document.getElementById("modal-actualizado");

    const btnConfirmarGuardar = document.getElementById("confirmar-guardar");
    const btnCancelarGuardar = document.getElementById("cancelar-guardar");

    const btnConfirmarEliminar = document.getElementById("confirmar-eliminar");
    const btnCancelarEliminar = document.getElementById("cancelar-eliminar");

    const btnCerrarActualizado = document.getElementById("cerrar-actualizado");

    let editando = false;

    // ============================
    // EDITAR PERFIL
    // ============================
    btnEditar.addEventListener("click", () => {
        if (!editando) {
            inputs.forEach(input => input.removeAttribute("readonly"));

            btnEditar.textContent = "Guardar Cambios";
            btnEditar.classList.remove("bg-blue-600");
            btnEditar.classList.add("bg-green-600", "hover:bg-green-700");

            btnCancelar.classList.remove("hidden");

            editando = true;
        } else {
            modalGuardar.classList.remove("hidden");
        }
    });

    // ============================
    // CANCELAR EDICIÓN
    // ============================
    btnCancelar.addEventListener("click", () => {
        document.getElementById("edit-nombre").value = usuario.nombre;
        document.getElementById("edit-apellido").value = usuario.apellido;
        document.getElementById("edit-correo").value = usuario.correo;
        document.getElementById("edit-telefono").value = usuario.telefono;

        inputs.forEach(input => input.setAttribute("readonly", true));

        btnEditar.textContent = "Editar Perfil";
        btnEditar.classList.add("bg-blue-600");
        btnEditar.classList.remove("bg-green-600", "hover:bg-green-700");

        btnCancelar.classList.add("hidden");

        editando = false;
    });

    // ============================
    // CONFIRMAR GUARDAR
    // ============================
    btnConfirmarGuardar.addEventListener("click", async () => {
        const actualizado = {
            nombre: document.getElementById("edit-nombre").value,
            apellido: document.getElementById("edit-apellido").value,
            correo: document.getElementById("edit-correo").value,
            telefono: document.getElementById("edit-telefono").value
        };

        try {
            const res = await fetch("http://localhost:8081/api/perfil/actualizar", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    emailOriginal: emailUsuario,
                    datos: actualizado
                })
            });

            if (!res.ok) throw new Error("Error al actualizar");

            usuario = { ...usuario, ...actualizado };

            // Mostrar modal de éxito
            modalActualizado.classList.remove("hidden");

            // Cerrar edición
            inputs.forEach(input => input.setAttribute("readonly", true));
            btnEditar.textContent = "Editar Perfil";
            btnEditar.classList.add("bg-blue-600");
            btnEditar.classList.remove("bg-green-600", "hover:bg-green-700");
            btnCancelar.classList.add("hidden");

            editando = false;

        } catch (err) {
            console.error("❌ Error al guardar cambios:", err);
            alert("No se pudieron guardar los cambios.");
        }

        modalGuardar.classList.add("hidden");
    });

    btnCancelarGuardar.addEventListener("click", () => {
        modalGuardar.classList.add("hidden");
    });

    // ============================
    // ELIMINAR CUENTA
    // ============================
    btnEliminar.addEventListener("click", () => {
        modalEliminar.classList.remove("hidden");
    });

    btnConfirmarEliminar.addEventListener("click", async () => {
        try {
            const res = await fetch("http://localhost:8081/api/perfil/eliminar", {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email: emailUsuario })
            });

            if (!res.ok) throw new Error("Error eliminando la cuenta");

            // Redirige después de cerrar modal
            modalEliminar.classList.add("hidden");

            setTimeout(() => {
                localStorage.clear();
                window.location.href = "../pages/login.html";
            }, 300);

        } catch (err) {
            console.error("❌ Error:", err);
            alert("No se pudo eliminar tu cuenta.");
        }
    });

    btnCancelarEliminar.addEventListener("click", () => {
        modalEliminar.classList.add("hidden");
    });

    // ============================
    // CERRAR MODAL ACTUALIZADO
    // ============================
    btnCerrarActualizado.addEventListener("click", () => {
        modalActualizado.classList.add("hidden");
    });

});
