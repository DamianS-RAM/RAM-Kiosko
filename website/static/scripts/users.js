function deleteUser(id, full_name) {
    modal_html = `
    <div class="modal font-roboto" id="modal">
        <div class="modal-content p-2" id="modal-content">
            <header id="modal-header">
                <h3 class="mb-5 txt-center">Eliminar usuario</h3>
                <div class="txt-center">
                    ¿Está seguro que desea eliminar al usuario <b>${id} - ${full_name}</b>?
                </div>
            </header>
            <div class="form-single-button-container w-100">
                <a class="form-button form-button-submit w-100" href='/delete-user/${id}'>
                    <span>
                        Confirmar
                    </span>
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px"><path d="M640-520v-80h240v80H640Zm-280 40q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM40-160v-112q0-34 17.5-62.5T104-378q62-31 126-46.5T360-440q66 0 130 15.5T616-378q29 15 46.5 43.5T680-272v112H40Zm80-80h480v-32q0-11-5.5-20T580-306q-54-27-109-40.5T360-360q-56 0-111 13.5T140-306q-9 5-14.5 14t-5.5 20v32Zm240-320q33 0 56.5-23.5T440-640q0-33-23.5-56.5T360-720q-33 0-56.5 23.5T280-640q0 33 23.5 56.5T360-560Zm0-80Zm0 400Z"/></svg>
                </a>
            </div>
            <div class="modal-close-btn" onclick="closeModal()">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                    <path d="M6.28 5.22a.75.75 0 0 0-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 1 0 1.06 1.06L10 11.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L11.06 10l3.72-3.72a.75.75 0 0 0-1.06-1.06L10 8.94 6.28 5.22Z" />
                </svg>
            </div>
        </div>
    </div>
    `
    showModal(modal_html);
}

function changePassword(id, full_name) {
    modal_html = `
    <div class="modal font-roboto" id="modal">
        <div class="modal-content p-2" id="modal-content">
            <div class="change-password-header">
                <h3 class="mb-5 txt-center">Cambiar contraseña</h3>
                <p class="user_name txt-center">${id} - ${full_name}</p>
            </div>
                <form action="/change-user-password/${id}" method="POST" class="form-container font-roboto" onsubmit="loader()">
                    <div class="mb-15">
                        <div class="form-element-container">
                            <div class="form-label-container">
                                <label for="password1">Contraseña:</label>
                            </div>
                            <div class="form-input-w-icon-container">
                                <div class="form-input-icon-container">
                                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px"><path d="M240-80q-33 0-56.5-23.5T160-160v-400q0-33 23.5-56.5T240-640h40v-80q0-83 58.5-141.5T480-920q83 0 141.5 58.5T680-720v80h40q33 0 56.5 23.5T800-560v400q0 33-23.5 56.5T720-80H240Zm0-80h480v-400H240v400Zm240-120q33 0 56.5-23.5T560-360q0-33-23.5-56.5T480-440q-33 0-56.5 23.5T400-360q0 33 23.5 56.5T480-280ZM360-640h240v-80q0-50-35-85t-85-35q-50 0-85 35t-35 85v80ZM240-160v-400 400Z"/></svg>
                                </div>
                                <input type="password" name="password1" id="password1" class="form-input-w-icon w-100" placeholder="Ingresar contraseña">
                            </div>
                        </div>
                        <div class="form-element-container">
                            <div class="form-label-container">
                                <label for="password2">Confirmar contraseña:</label>
                            </div>
                            <div class="form-input-w-icon-container">
                                <div class="form-input-icon-container">
                                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px"><path d="M240-80q-33 0-56.5-23.5T160-160v-400q0-33 23.5-56.5T240-640h40v-80q0-83 58.5-141.5T480-920q83 0 141.5 58.5T680-720v80h40q33 0 56.5 23.5T800-560v400q0 33-23.5 56.5T720-80H240Zm0-80h480v-400H240v400Zm240-120q33 0 56.5-23.5T560-360q0-33-23.5-56.5T480-440q-33 0-56.5 23.5T400-360q0 33 23.5 56.5T480-280ZM360-640h240v-80q0-50-35-85t-85-35q-50 0-85 35t-35 85v80ZM240-160v-400 400Z"/></svg>
                                </div>
                                <input type="password" name="password2" id="password2" class="form-input-w-icon w-100" placeholder="Ingresar confirmación de contraseña">
                            </div>
                        </div>
                    </div>
                    <div class="form-single-button-container w-100">
                        <button type="submit" class="form-button w-100">
                            Cambiar contraseña
                            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px"><path d="M80-200v-80h800v80H80Zm46-242-52-30 34-60H40v-60h68l-34-58 52-30 34 58 34-58 52 30-34 58h68v60h-68l34 60-52 30-34-60-34 60Zm320 0-52-30 34-60h-68v-60h68l-34-58 52-30 34 58 34-58 52 30-34 58h68v60h-68l34 60-52 30-34-60-34 60Zm320 0-52-30 34-60h-68v-60h68l-34-58 52-30 34 58 34-58 52 30-34 58h68v60h-68l34 60-52 30-34-60-34 60Z"/></svg>
                        </button>
                    </div>
                </form>
                <div class="modal-close-btn" onclick="closeModal()">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                        <path d="M6.28 5.22a.75.75 0 0 0-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 1 0 1.06 1.06L10 11.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L11.06 10l3.72-3.72a.75.75 0 0 0-1.06-1.06L10 8.94 6.28 5.22Z" />
                    </svg>
                </div>
        </div>
    </div>
    `
    showModal(modal_html);
}

//add_user();

function add_user() {
    let lvl_selection = "";
    if (user_level > 2) {
        let levels_select = '';
        for (const [key, value] of Object.entries(levels)) {
            levels_select += `<option value="${key}">${value}</option>`
        }
        lvl_selection = `
            <div class="modal-input-with-icon">
                <div class="modal-form-label">
                    <label for="user_level">Nivel de usuario:</label>
                </div>
                <div class="modal-input-with-icon">
                    <div class="modal-input-icon display-center">
                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px"><path d="M680-280q25 0 42.5-17.5T740-340q0-25-17.5-42.5T680-400q-25 0-42.5 17.5T620-340q0 25 17.5 42.5T680-280Zm0 120q31 0 57-14.5t42-38.5q-22-13-47-20t-52-7q-27 0-52 7t-47 20q16 24 42 38.5t57 14.5ZM480-80q-139-35-229.5-159.5T160-516v-244l320-120 320 120v227q-19-8-39-14.5t-41-9.5v-147l-240-90-240 90v188q0 47 12.5 94t35 89.5Q310-290 342-254t71 60q11 32 29 61t41 52q-1 0-1.5.5t-1.5.5Zm200 0q-83 0-141.5-58.5T480-280q0-83 58.5-141.5T680-480q83 0 141.5 58.5T880-280q0 83-58.5 141.5T680-80ZM480-494Z"/></svg>
                    </div>
                    <select name="user_level" id="user_level" class="modal-input font-poppins w-100" required >
                        ${levels_select}
                    </select>
                </div>
            </div>
        `;
    }
    modal_html = `
        <div class="modal font-roboto" id="modal">
            <div class="modal-content modal-with-icon" id="modal-content">
                <div class="modal-header-icon-container">
                    <div class="modal-header-icon p-half">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                            <path d="M399 384.2C376.9 345.8 335.4 320 288 320l-64 0c-47.4 0-88.9 25.8-111 64.2c35.2 39.2 86.2 63.8 143 63.8s107.8-24.7 143-63.8zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zm256 16a72 72 0 1 0 0-144 72 72 0 1 0 0 144z"/>
                        </svg>
                    </div>
                </div>
                <div class="modal-close-btn" onclick="closeModal()">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                        <path d="M6.28 5.22a.75.75 0 0 0-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 1 0 1.06 1.06L10 11.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L11.06 10l3.72-3.72a.75.75 0 0 0-1.06-1.06L10 8.94 6.28 5.22Z" />
                    </svg>
                </div>
                <form action="/add-user" method="post" class="user-control-form font-poppins" onsubmit="loader();" autocomplete="off">
                    <div class="modal-form-body font-poppins mb-15">
                        <div class="user-control-form-container">
                            <div class="modal-form-input-container mb-1">
                                <div class="modal-form-label">
                                    <label for="id">Num. de empleado:</label>
                                </div>
                                <div class="modal-input-with-icon">
                                    <div class="modal-input-icon display-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px"><path d="M480-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM160-160v-112q0-34 17.5-62.5T224-378q62-31 126-46.5T480-440q66 0 130 15.5T736-378q29 15 46.5 43.5T800-272v112H160Zm80-80h480v-32q0-11-5.5-20T700-306q-54-27-109-40.5T480-360q-56 0-111 13.5T260-306q-9 5-14.5 14t-5.5 20v32Zm240-320q33 0 56.5-23.5T560-640q0-33-23.5-56.5T480-720q-33 0-56.5 23.5T400-640q0 33 23.5 56.5T480-560Zm0-80Zm0 400Z"/></svg>
                                    </div>
                                    <input type="number" class="modal-input font-poppins w-100 no-show-number" name="id" id="id" placeholder="Ingrese número de empleado" required autofocus>
                                </div>
                            </div>
            
                            <div class="form-element-container">
                                <div class="form-label-container">
                                    <label for="doc_num">Empresa:</label>
                                </div>
                                <div class="form-input-container">
                                    <div class="w-100 form-radio-options d-flex-center">
                                        <label for="company_ram">
                                            <div class="form-radio-btn">
                                                <input type="radio" name="company" id="company_ram" value="RAM" checked>
                                                <img src="static/images/logo_Letters.webp" alt="">
                                                RAM
                                            </div>
                                        </label>
                                        <label for="company_will">
                                            <div class="form-radio-btn">
                                                <img src="static/images/williams_logo.webp" alt="">
                                                <input type="radio" name="company" id="company_will" value="WMM">
                                                Williams
                                            </div>
                                        </label>
                                    </div>
                                </div>
                            </div>

                            ${ lvl_selection }
                        </div>
                    </div>
                    <div class="form-single-button-container w-100">
                        <button type="submit" class="form-button w-100 font-roboto">
                            Agregar usuario
                            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px"><path d="M720-400v-120H600v-80h120v-120h80v120h120v80H800v120h-80Zm-360-80q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM40-160v-112q0-34 17.5-62.5T104-378q62-31 126-46.5T360-440q66 0 130 15.5T616-378q29 15 46.5 43.5T680-272v112H40Zm80-80h480v-32q0-11-5.5-20T580-306q-54-27-109-40.5T360-360q-56 0-111 13.5T140-306q-9 5-14.5 14t-5.5 20v32Zm240-320q33 0 56.5-23.5T440-640q0-33-23.5-56.5T360-720q-33 0-56.5 23.5T280-640q0 33 23.5 56.5T360-560Zm0-80Zm0 400Z"/></svg>    
                        </button>
                    </div>
                </form>
            </div>
        </div>
    `
    showModal(modal_html);
}