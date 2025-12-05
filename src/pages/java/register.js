// Script del registro

// Verificar que la página está cargada
document.addEventListener('DOMContentLoaded', function() {
    console.log("✅📝 Página de Registro Cargada - Sistema Listo");

    // Constante de la API
    const API_URL = "http://localhost:8081/api/user/register";

    // Obtener el formulario
    const form = document.getElementById('registro-form');
    const btn = document.getElementById('registro-btn');

    // Enviar datos del formulario
    form.addEventListener('submit', async function(e) {
        e.preventDefault();

        // Recoger los campos del formulario
        const datos = {
            nombre: document.getElementById('nombre').value.trim(),
            apellido: document.getElementById('apellido').value.trim(),
            edad: parseInt(document.getElementById('edad').value),
            telefono: document.getElementById('telefono').value.trim(),
            correo: document.getElementById('correo').value.trim(),
            password: document.getElementById('password').value.trim(),
            confirmarPassword: document.getElementById('confirmar-password').value.trim()
        };

        const terminos = document.getElementById('terminos').checked;

        // ✅ VALIDACIONES EN EL FRONTEND

        // Validar campos vacíos
        if (!datos.nombre || !datos.apellido || !datos.edad || !datos.telefono || !datos.correo || !datos.password || !datos.confirmarPassword) {
            mostrarAlerta('Por favor completa todos los campos', 'error');
            return;
        }

        // Validar términos y condiciones
        if (!terminos) {
            mostrarAlerta('Debes aceptar los términos y condiciones', 'error');
            return;
        }

        // Validar formato de correo
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(datos.correo)) {
            mostrarAlerta('Correo electrónico inválido', 'error');
            return;
        }

        // Validar edad
        if (isNaN(datos.edad) || datos.edad < 18 || datos.edad > 120) {
            mostrarAlerta('La edad debe estar entre 18 y 120 años', 'error');
            return;
        }

        // Validar teléfono (mínimo 10 dígitos)
        if (datos.telefono.length < 10) {
            mostrarAlerta('El teléfono debe tener al menos 10 dígitos', 'error');
            return;
        }

        // Validar longitud de contraseña
        if (datos.password.length < 6) {
            mostrarAlerta('La contraseña debe tener al menos 6 caracteres', 'error');
            return;
        }

        // Validar que las contraseñas coincidan
        if (datos.password !== datos.confirmarPassword) {
            mostrarAlerta('Las contraseñas no coinciden', 'error');
            return;
        }

        // Cambiar estado del botón
        btn.disabled = true;
        btn.textContent = 'Registrando...';

        // Preparar datos para enviar (sin confirmarPassword)
        const datosEnviar = {
            nombre: datos.nombre,
            apellido: datos.apellido,
            edad: datos.edad,
            telefono: datos.telefono,
            correo: datos.correo,
            password: datos.password
        };

        // ✅ ENVIAR AL SERVIDOR
        try {
            console.log("📤 Enviando datos al servidor:", datosEnviar);

            const response = await fetch(API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(datosEnviar)
            });

            const resultado = await response.json();
            console.log("📥 Respuesta del servidor:", resultado);

            if (response.ok) {
                console.log('✅ Usuario registrado exitosamente');

                // Mostrar mensaje de éxito
                mostrarAlerta('¡Registro exitoso! Redirigiendo al login...', 'success');

                // Limpiar formulario
                form.reset();

                // Redirigir al login después de 2 segundos
                setTimeout(() => {
                    window.location.href = 'login.html';
                }, 2000);

            } else {
                // Mostrar error del servidor
                console.error("❌ Error en el registro:", resultado.message);
                mostrarAlerta(resultado.message || 'Error al registrar usuario', 'error');
                btn.disabled = false;
                btn.textContent = 'Crear cuenta';
            }

        } catch (error) {
            console.error('❌ Error de conexión con el servidor:', error);
            mostrarAlerta('Error de conexión con el servidor', 'error');
            btn.disabled = false;
            btn.textContent = 'Crear cuenta';
        }
    });

    // ✅ VALIDACIÓN EN TIEMPO REAL DE CONTRASEÑAS
    const passwordInput = document.getElementById('password');
    const confirmarPasswordInput = document.getElementById('confirmar-password');
    const passwordMatchMessage = document.getElementById('password-match-message');

    confirmarPasswordInput.addEventListener('input', function() {
        const password = passwordInput.value;
        const confirmar = this.value;

        // Remover estilos previos
        this.classList.remove('border-green-500', 'border-red-500');
        passwordMatchMessage.classList.add('hidden');

        if (confirmar.length > 0) {
            if (password === confirmar) {
                this.classList.add('border-green-500');
                passwordMatchMessage.textContent = '✓ Las contraseñas coinciden';
                passwordMatchMessage.className = 'text-xs text-green-600 mt-1';
                passwordMatchMessage.classList.remove('hidden');
            } else {
                this.classList.add('border-red-500');
                passwordMatchMessage.textContent = '✗ Las contraseñas no coinciden';
                passwordMatchMessage.className = 'text-xs text-red-600 mt-1';
                passwordMatchMessage.classList.remove('hidden');
            }
        }
    });

    // ✅ VALIDACIÓN DE TELÉFONO (solo números)
    document.getElementById('telefono').addEventListener('input', function(e) {
        this.value = this.value.replace(/[^0-9]/g, '');
    });
});

// ✅ FUNCIÓN PARA MOSTRAR ALERTAS
function mostrarAlerta(mensaje, tipo) {
    // Crear elemento de alerta
    const alerta = document.createElement('div');
    alerta.className = `fixed top-5 right-5 px-6 py-4 rounded-xl shadow-2xl z-50 
                        transition-all duration-500 transform translate-x-0
                        ${tipo === 'success' 
                            ? 'bg-green-600 text-white' 
                            : 'bg-red-600 text-white'}`;
    alerta.innerHTML = `
        <div class="flex items-center gap-3">
            <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                ${tipo === 'success' 
                    ? '<path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>'
                    : '<path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"/>'}
            </svg>
            <span class="font-semibold">${mensaje}</span>
        </div>
    `;

    // Agregar al body
    document.body.appendChild(alerta);

    // Animar entrada
    setTimeout(() => {
        alerta.style.opacity = '1';
    }, 10);

    // Remover después de 4 segundos
    setTimeout(() => {
        alerta.style.opacity = '0';
        alerta.style.transform = 'translateX(100%)';
        setTimeout(() => alerta.remove(), 500);
    }, 4000);
}