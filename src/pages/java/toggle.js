//funcion de visibilidad del ojito
document.getElementById('toggle-password').addEventListener('click', function(){
    const passwordInput=document.getElementById('password');
    const eyeOpen=document.getElementById('eye-icon-open');
    const eyeClosed=document.getElementById('eye-icon-closed');

    //verificacion si la contrasena esta oculta

    const isHidden = passwordInput.type==='password';

    //cambiar de password a text

    passwordInput.type=isHidden ? 'text':'password';

    //alteracion del ojito
    eyeOpen.classList.toggle('hidden', !isHidden);
    eyeClosed.classList.toggle('hidden', isHidden);
}
)