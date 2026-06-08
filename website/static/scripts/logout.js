function logout() {
    let body = document.getElementsByTagName('body');
    body[0].innerHTML = `
        <div class="vh-container font-roboto" style="background-color: #000; color: #fff;">
            <span>Sesión cerrada, favor de actualizar página.</span>
        </div>
    `;
    window.location = '/logout';
}