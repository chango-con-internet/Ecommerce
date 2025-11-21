// Script del login

//Verificar que la pagina esta cargada
document.addEventListener('DOMContentLoaded',function(){
    console.log("✅📘 Pagina Cargada - Sistema Listo");

    // Creamos la constante de la API
    const API_URL=("http://localhost:8081/api/login");

    //enviar datos del formulario
    document.getElementById('login-form').addEventListener('submit',async function (e) {
    
    e.preventDefault();

    //Preparar Elementos De La Pagina
    const btn = document.getElementById('login-btn');
    const errorDiv = document.getElementById('login-error');
    const errorMsg = document.getElementById('login-error-message');

    errorDiv.classList.add('hidden');

    //Recoger los campos del formularios

    const datos = {
        correo: document.getElementById('email').value.trim(),
        password: document.getElementById('password').value.trim()
    };

    //validar que los campos esten vacios

    //validar que los campos esten vacios
    if (!datos.correo || !datos.password) {
    errorMsg.textContent = 'Por Favor Completa Los Datos';
    errorDiv.classList.remove('hidden');
    return;
}


    //cambiar el boton mientras procesa
    btn.disabled=true;
    btn.textContent='Iniciando Sesion...';

    //Enviar Data al server
    try{

    const response=await fetch(API_URL,{
        method:'POST',
        headers:{'Content-Type': 'application/json'},
        body:JSON.stringify(datos)
    });

    //Recibir Respuesta
    const resultado=await response.json();
    if (response.ok){
        console.log('201 - Inicio De Sesion Exitante 🥵');

        //Guardar la ip de estos weones
    localStorage.setItem("sesionActiva", "true");
    localStorage.setItem("usuario",JSON.stringify({
        userId:resultado.usuario.userId,
        nombre:resultado.usuario.nombre,
        apellido:resultado.usuario.apellido,
        edad:resultado.usuario.edad,
        telefono:resultado.usuario.telefono,
        correo:resultado.usuario.correo,
        password:resultado.usuario.password
    }));

    //Mensaje de Textoso
    errorDiv.className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg";
    errorMsg.textContent='Inicio De Sesion, Redirigiendo.....';
    errorDiv.classList.remove('hidden');

    //Redirigir A Productos Papu
    setTimeout(()=>window.location.href='productos.html',300)

    //ESA NO ES LA CONTRASEÑA PE
    } else {   
    errorMsg.textContent=resultado.message || 'Credenciales Incorrectas';
    errorDiv.classList.remove('hidden');
    btn.disabled=false;
    btn.innerHTML='Iniciar Sesion'
    }

    }catch (error){
        console.error('Error 404 - Error De Conexion Con El Servidor');
        errorMsg.textContent='Error Conexion De Servidor';
        errorDiv.classList.remove('hidden');
        btn.innerHTML='Iniciar Sesion';

    }

    });
})