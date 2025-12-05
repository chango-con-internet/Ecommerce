document.addEventListener("DOMContentLoaded", async () => {
    const sesionActiva = localStorage.getItem("sesionActiva");
    const contenedor = document.getElementById("user-menu-container");

    // ✅ Verificar si NO existe el contenedor
    if (!contenedor) {
        console.error("❌ No se encontró el contenedor 'user-menu-container'");
        return;
    }

    // ✅ Verificar si NO hay sesión activa
    if (!sesionActiva) {
        console.log("ℹ️ No hay sesión activa");
        return;
    }

    // Traer los datos del localStorage
    const usuarioStorage = localStorage.getItem("usuario");
    console.log("📦 Datos en localStorage:", usuarioStorage);
    
    if (!usuarioStorage) {
        console.error("❌ No hay datos de usuario en localStorage");
        return;
    }
    
    const perfil = JSON.parse(usuarioStorage);
    console.log("👤 Perfil parseado:", perfil);
    
    if (!perfil || !perfil.correo) {
        console.error("❌ No se encontró la propiedad 'correo' en el perfil");
        console.log("🔍 Propiedades disponibles:", Object.keys(perfil));
        return;
    }

    let usuario; // ✅ Declarar la variable

    try {
        console.log("🔄 Obteniendo perfil del servidor...");
        
        const respuesta = await fetch("https://ecommerce-4vw8.onrender.com/api/perfil/obtener", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email: perfil.correo }) // ✅ Usar 'correo' según tu estructura
        });

        const data = await respuesta.json();

        // ✅ Cambiar 'res' por 'respuesta'
        if (!respuesta.ok) {
            throw new Error(data.message || "No se puede obtener el perfil");
        }

        usuario = data.usuario;
        console.log("✅ Perfil obtenido:", usuario);

    } catch (err) {
        console.error("❌ Error al obtener el perfil:", err);
        // Cerrar sesión fallida
        localStorage.clear();
        alert("Error al cargar tu perfil. Debes iniciar sesión nuevamente.");
        window.location.href = "../pages/login.html";
        return;
    }

    // hidden loginn
    const loginbtn = document.getElementById("loginn");
    if(loginbtn){
        loginbtn.classList.add("hidden");
        console.log("ya no esta xd")
    }

    // ✅ CREAR MENÚ DEL USUARIO (fuera del catch)
    contenedor.innerHTML = `
        <div class="relative">
            <button id="user-menu-btn"
                class="w-14 h-14 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-xl shadow-md hover:scale-105 transition-transform">
                <span id="user-avatar"></span>
            </button>
            <div id="user-dropdown"
                class="hidden absolute right-0 mt-2 w-60 bg-white rounded-xl shadow-2xl border border-gray-100 py-2 z-50 
                       transition-all duration-200 ease-out overflow-hidden transform origin-top scale-95 opacity-0">

                <div class="px-4 py-3 border-b border-gray-200">
                    <p class="text-sm font-semibold text-gray-900" id="user-name"></p>
                    <p class="text-xs text-gray-500" id="user-email"></p>
                </div>

                <a href="../pages/perfil.html"
                    class="flex items-center px-4 py-3 text-sm text-gray-700 
                           hover:bg-blue-100 hover:text-blue-800 
                           active:bg-blue-200 transition-all duration-150 rounded-md cursor-pointer">
                    Mi Perfil
                </a>

                <button id="logout-btn"
                    class="flex items-center w-full px-4 py-3 text-sm text-red-600
                           hover:bg-red-50 hover:text-red-800 
                           active:bg-red-100 transition-all duration-150 rounded-md cursor-pointer text-left">
                    Cerrar sesión
                </button>
            </div>
        </div>
    `;

    // ✅ INSERTAR DATOS EN EL MENÚ
    document.getElementById("user-name").textContent = 
        `${usuario.nombre} ${usuario.apellido}`;
    
    document.getElementById("user-email").textContent = usuario.correo;
    
    const avatar = `${usuario.nombre[0]}${usuario.apellido[0]}`.toUpperCase();
    document.getElementById("user-avatar").textContent = avatar;

    // ✅ ANIMACIÓN ABRIR/CERRAR
    document.getElementById("user-menu-btn").addEventListener("click", () => {
        const drop = document.getElementById("user-dropdown");

        if (drop.classList.contains("hidden")) {
            drop.classList.remove("hidden");
            setTimeout(() => {
                drop.classList.remove("opacity-0", "scale-95");
                drop.classList.add("opacity-100", "scale-100");
            }, 20);
        } else {
            drop.classList.remove("opacity-100", "scale-100");
            drop.classList.add("opacity-0", "scale-95");
            setTimeout(() => {
                drop.classList.add("hidden");
            }, 150);
        }
    });

    // ✅ CERRAR SESIÓN
    document.getElementById("logout-btn").addEventListener("click", () => {
        localStorage.clear();
        
        // Mostrar toast de confirmación
        const toast = document.getElementById("logout-toast");
        if (toast) {
            toast.classList.remove("hidden", "opacity-0");
            toast.classList.add("opacity-100");
            
            setTimeout(() => {
                window.location.href = "../pages/login.html";
            }, 1500);
        } else {
            window.location.href = "../pages/login.html";
        }
    });

    console.log("✅ Menú de usuario creado correctamente");
});