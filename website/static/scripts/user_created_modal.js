created_user();

function created_user() {
    modal_html = `
    <div class="modal font-roboto" id="modal">
        <div class="modal-content modal-created-user txt-center" id="modal-content">
            <div class="modal-header-icon-container d-flex-center">
                <div class="modal-header-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <path fill-rule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z" clip-rule="evenodd" />
                    </svg>
                </div>
            </div>
            <header id="modal-header">
                <h3>Usuario agregado<h3>
            </header>
            <section class="modal-form-body mb-15">
                <div class="modal-form-input-container w-100">
                    <div class="modal-form-label">
                        <label for="user">Usuario:</label>
                    </div>
                    <div class="modal-input-with-icon">
                        <div class="modal-input-icon display-center">
                            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px"><path d="M480-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM160-160v-112q0-34 17.5-62.5T224-378q62-31 126-46.5T480-440q66 0 130 15.5T736-378q29 15 46.5 43.5T800-272v112H160Zm80-80h480v-32q0-11-5.5-20T700-306q-54-27-109-40.5T480-360q-56 0-111 13.5T260-306q-9 5-14.5 14t-5.5 20v32Zm240-320q33 0 56.5-23.5T560-640q0-33-23.5-56.5T480-720q-33 0-56.5 23.5T400-640q0 33 23.5 56.5T480-560Zm0-80Zm0 400Z"/></svg>
                        </div>
                        <input type="text" class="modal-input font-poppins w-100" name="user" id="user" readonly value="${ user_id + ' - ' + user_fullname }">
                    </div>
                </div>
                <div class="modal-form-input-container w-100">
                    <div class="modal-form-label">
                        <label for="password">Contraseña:</label>
                    </div>
                    <div class="modal-input-with-icon created-user-password">
                        <div class="modal-input-icon display-center">
                            <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="24px"><path d="M240-80q-33 0-56.5-23.5T160-160v-400q0-33 23.5-56.5T240-640h40v-80q0-83 58.5-141.5T480-920q83 0 141.5 58.5T680-720v80h40q33 0 56.5 23.5T800-560v400q0 33-23.5 56.5T720-80H240Zm0-80h480v-400H240v400Zm240-120q33 0 56.5-23.5T560-360q0-33-23.5-56.5T480-440q-33 0-56.5 23.5T400-360q0 33 23.5 56.5T480-280ZM360-640h240v-80q0-50-35-85t-85-35q-50 0-85 35t-35 85v80ZM240-160v-400 400Z"/></svg>
                        </div>
                        <input type="password" class="modal-input font-poppins w-100" name="password" id="password" readonly value="${ pwd }">
                        <div class="password-visibility-icon" onclick="change_pwd_visibility()">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" id="visibility-on"><path d="M480-320q75 0 127.5-52.5T660-500q0-75-52.5-127.5T480-680q-75 0-127.5 52.5T300-500q0 75 52.5 127.5T480-320Zm0-72q-45 0-76.5-31.5T372-500q0-45 31.5-76.5T480-608q45 0 76.5 31.5T588-500q0 45-31.5 76.5T480-392Zm0 192q-146 0-266-81.5T40-500q54-137 174-218.5T480-800q146 0 266 81.5T920-500q-54 137-174 218.5T480-200Zm0-300Zm0 220q113 0 207.5-59.5T832-500q-50-101-144.5-160.5T480-720q-113 0-207.5 59.5T128-500q50 101 144.5 160.5T480-280Z"/></svg>

                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" id="visibility-off"><path d="m644-428-58-58q9-47-27-88t-93-32l-58-58q17-8 34.5-12t37.5-4q75 0 127.5 52.5T660-500q0 20-4 37.5T644-428Zm128 126-58-56q38-29 67.5-63.5T832-500q-50-101-143.5-160.5T480-720q-29 0-57 4t-55 12l-62-62q41-17 84-25.5t90-8.5q151 0 269 83.5T920-500q-23 59-60.5 109.5T772-302Zm20 246L624-222q-35 11-70.5 16.5T480-200q-151 0-269-83.5T40-500q21-53 53-98.5t73-81.5L56-792l56-56 736 736-56 56ZM222-624q-29 26-53 57t-41 67q50 101 143.5 160.5T480-280q20 0 39-2.5t39-5.5l-36-38q-11 3-21 4.5t-21 1.5q-75 0-127.5-52.5T300-500q0-11 1.5-21t4.5-21l-84-82Zm319 93Zm-151 75Z"/></svg>
                        </div>
                        <a onclick="copy_input('password')" title="Copiar">
                            <div class="copy-icon">
                                <span id="copy-span">Copiado!</span>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" fill="#404040"><path d="M360-240q-33 0-56.5-23.5T280-320v-480q0-33 23.5-56.5T360-880h360q33 0 56.5 23.5T800-800v480q0 33-23.5 56.5T720-240H360Zm0-80h360v-480H360v480ZM200-80q-33 0-56.5-23.5T120-160v-560h80v560h440v80H200Zm160-240v-480 480Z"/></svg>
                            </div>
                        </a>
                    </div>
                </div>
            </section>
            <footer>
            <a onclick='closeModal()'><div class="modal-created-user-btn font-roboto w-100">Confirmar</div></a>
            </footer>
        </div>
    </div>
    `
    showModal(modal_html);
}

function copy_input(input_id) {
    let input_copy = document.getElementById(input_id);
    // Select the text field
    input_copy.select();

    // Copy the text inside the text field
    if (window.isSecureContext && navigator.clipboard) {
        navigator.clipboard.writeText(input_copy.value);
        show_span();
    } else {
        unsecuredCopyToClipboard(input_copy.value)
    }
}

function unsecuredCopyToClipboard(text) {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
        document.execCommand('copy');
        show_span();
    } catch (err) {
        console.error('Unable to copy to clipboard', err);
    }
    document.body.removeChild(textArea);
}

function change_pwd_visibility() {
    let pwd_input = document.getElementById('password');
    let visibility_on = document.getElementById('visibility-on');
    let visibility_off = document.getElementById('visibility-off');

    if ( visibility_on.style.display == "none" ) {
        visibility_on.style.display = "block";
        visibility_off.style.display = "none";
        pwd_input.type = "password";
    } else {
        visibility_on.style.display = "none";
        visibility_off.style.display = "block";
        pwd_input.type = "text";
    }
}

function show_span() {
    let copy_span = document.getElementById('copy-span');
    copy_span.style.opacity = 1;

    setTimeout( () => {
        copy_span.style.opacity = 0;
    }, 3000);
}