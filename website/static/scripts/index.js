if ( user_level == 'User' ) {
    // session_timeout = setTimeout(function() { window.location = "/logout"; }, 178000);

    const timeoutDuration = 178000; // 10 seconds
    const timeoutKey = "timeoutStart";

    function startPersistentTimeout() {
      let startTime = localStorage.getItem(timeoutKey);

      if (!startTime) {
        // Store current time if not already stored
        startTime = Date.now();
        localStorage.setItem(timeoutKey, startTime);
      }

      const elapsed = Date.now() - parseInt(startTime, 10);
      const remaining = timeoutDuration - elapsed;

      if (remaining <= 0) {
        triggerAction();
      } else {
            setTimeout(triggerAction, remaining);
      }
    }

    function triggerAction() {
        localStorage.removeItem(timeoutKey); // optional: reset for next time
        window.location = "/logout";
    }

    startPersistentTimeout();
}

function announcements(announcements) {
    modal_html = `
        <div class="modal-announce-container">
            <div class="modal-announce font-roboto" id="modal">
                <a href="javascript:void(0)" onclick="closeModal()">
                    <div class="close-modal-svg">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" fill="#b30000"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/></svg>
                    </div>
                </a>
                <img src="../static/images/Avisos/2.3.jpg" class="announce-img" alt="Avisos de la semana">
            </div>
        </div>
    `
    showModal(modal_html);
}

function changeEmailModal(email) {
    let email_confirmation = '', title = '';
    if ( !email ) {
        title = "Registrar";
        email_confirmation = `No cuenta con un correo registrado, favor de agregar alguno.`;
    }
    else {
        title = "Cambiar";
        email_confirmation = `¿Desea cambiar el correo <b>${email}</b>?`;
    }
    modal_html = `
        <div class="modal font-roboto" id="modal">
            <div class="modal-content p-2 modal-change-email" id="modal-content">
                <div class="modal-content-header mb-1">
                    <h3 class="mb-5 txt-center">${ title } correo</h3>
                    <p class="user-mail txt-center">${ email_confirmation }</p>
                </div>
                <form action="/change-email" method="POST" class="form-container font-roboto w-100" onsubmit="loader()" id="change-email-form" autocomplete="off">
                    <div class='mb-15'>
                        <div class="form-element-container mb-15">
                            <div class="form-label-container">
                                <label for="email">Correo electrónico</label>
                            </div>
                            <div class="form-input-w-icon-container">
                                <div class="form-input-icon-container">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" height="24px" width="24px"><path d="M160-160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h640q33 0 56.5 23.5T880-720v480q0 33-23.5 56.5T800-160H160Zm320-280L160-640v400h640v-400L480-440Zm0-80 320-200H160l320 200ZM160-640v-80 480-400Z"/></svg>
                                </div>
                                <input type="email" class="form-input-w-icon font-poppins w-100" name="email" id="email" autocomplete="off" placeholder="Ingrese correo electrónico" autofocus required>
                            </div>
                        </div>
                    </div>
                    <div class="form-double-button-container w-100">
                        <div class="form-button-container">
                            <button type="submit" class="form-button w-100">
                                ${ title }
                                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" ><path d="M120-160v-640l760 320-760 320Zm80-120 474-200-474-200v140l240 60-240 60v140Zm0 0v-400 400Z"/></svg>
                            </button>
                        </div>
                        <div class="form-button-container">
                            <button type="button"  onclick="closeModal()" class="form-button form-button-cancel w-100">Cancelar</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    `
    showModal(modal_html);
}

function buzonDudasModal(docId, userID) {
    modal_html = `
        <div class="modal font-roboto" id="modal">
            <div class="modal-content p-2" id="modal-content">
                <div class="modal-content-header mb-2">
                    <h3 class="mb-5 txt-center">Enviar dudas</h3>
                    <p class="user_name txt-center">Duda de <b>${docId}</b>.</p>
                </div>
                <form action="/nom-questions" method="POST" class="form-container w-100 font-roboto" onsubmit="loader();">
                    <div class="mb-15">
                        <div class="form-element-container">
                            <div class="form-label-container">
                                <label for="subject">Asunto:</label>
                            </div>
                            <div class="form-input-container">
                                <input type="text" class="form-input w-100" name="subject" id="subject" value="Duda: ${docId} - Usuario: ${userID}" readonly="true" required>
                            </div>
                        </div>
                        <div class="form-element-container">
                            <div class="form-label-container">
                                <label for="mailbox">Mensaje:</label>
                            </div>
                            <div class="form-input-container">
                                <textarea class="form-textarea w-100 font-roboto font-size-1" name="mailbox" id="mailbox" rows="10" placeholder="Escriba su mensaje" required></textarea>
                            </div>
                        </div>
                    </div>
                    <div class="form-double-button-container w-100">
                        <div class="form-button-container">
                            <button type="submit" class="form-button w-100">
                                Enviar
                                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" ><path d="M120-160v-640l760 320-760 320Zm80-120 474-200-474-200v140l240 60-240 60v140Zm0 0v-400 400Z"/></svg>
                            </button>
                        </div>
                        <div class="form-button-container">
                            <button type="button"  onclick="closeModal()" class="form-button form-button-cancel w-100">Cancelar</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    `
    showModal(modal_html);
}

if (noDocs) noDocuments();

function noDocuments() {
    modal_html = `
        <div class="modal font-roboto" id="modal">
            <div class="modal-content p-2" id="modal-content">
                <div class="modal-content-header">
                    <h3 class="mb-5 txt-center">Aviso</h3>
                </div>
                <div class="modal-content-body txt-center mb-1">
                    <i>No tiene documentos para mostrar.</i>
                </div>
                <button onclick="closeModal()" type="button" class="form-button form-button-submit w-100 font-roboto">Aceptar</button>
            </div>
        </div>
    `
    showModal(modal_html);
}

/*  Show / Hide fondo acumulado  */

let fondo_element = document.getElementById('fondo');
let show = 0;

if (fondo_element) checkShowHide();

function checkShowHide() {
    let fondo_html = '';
    if (show) {
        fondo_html = `
            <div class="info-value">
                <div id="fondo-acumulado" class="fondo-acumulado txt-center" onclick="checkShowHide()">
                    <div id="fondo-text" class="w-100">
                        <div class="fondo-text-item">
                            Acum. Empleado:
                            <div class="fondo-text-item-value">
                                ${ fa }
                            </div>
                        </div>
                        <div class="fondo-text-item">
                            Acum. Empresa:
                            <div class="fondo-text-item-value">
                                ${ fa }
                            </div>
                        </div>
                        <strong>
                        <div class="fondo-text-item fondo-text-item-marked">
                            Total Acum.:
                            <div class="fondo-text-item-value font-size-1">
                                ${ fa_total }
                            </div>
                        </div>
                        </strong>
                    </div>
                    <div class="fondo-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" id="hide-icon"><path d="m644-428-58-58q9-47-27-88t-93-32l-58-58q17-8 34.5-12t37.5-4q75 0 127.5 52.5T660-500q0 20-4 37.5T644-428Zm128 126-58-56q38-29 67.5-63.5T832-500q-50-101-143.5-160.5T480-720q-29 0-57 4t-55 12l-62-62q41-17 84-25.5t90-8.5q151 0 269 83.5T920-500q-23 59-60.5 109.5T772-302Zm20 246L624-222q-35 11-70.5 16.5T480-200q-151 0-269-83.5T40-500q21-53 53-98.5t73-81.5L56-792l56-56 736 736-56 56ZM222-624q-29 26-53 57t-41 67q50 101 143.5 160.5T480-280q20 0 39-2.5t39-5.5l-36-38q-11 3-21 4.5t-21 1.5q-75 0-127.5-52.5T300-500q0-11 1.5-21t4.5-21l-84-82Zm319 93Zm-151 75Z"/></svg>
                    </div>
                </div>
            </div>
        `;
    }
    else {
        fondo_html = `
            <div class="info-header mb-1">
                <div class="info-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" height="40px" viewBox="0 -960 960 960" width="40px"><path d="M546.67-426.67q-50 0-85-35t-35-85q0-50 35-85t85-35q50 0 85 35t35 85q0 50-35 85t-85 35ZM240-293.33q-27.5 0-47.08-19.59-19.59-19.58-19.59-47.08v-373.33q0-27.5 19.59-47.09Q212.5-800 240-800h613.33q27.5 0 47.09 19.58Q920-760.83 920-733.33V-360q0 27.5-19.58 47.08-19.59 19.59-47.09 19.59H240ZM333.33-360H760q0-39 27.17-66.17 27.16-27.16 66.16-27.16V-640q-39 0-66.16-27.17Q760-694.33 760-733.33H333.33q0 39-27.16 66.16Q279-640 240-640v186.67q39 0 66.17 27.16Q333.33-399 333.33-360ZM800-160H106.67q-27.5 0-47.09-19.58Q40-199.17 40-226.67V-680h66.67v453.33H800V-160ZM240-360v-373.33V-360Z"/></svg>
                </div>
                <div class="info-title">
                    Fondo Acumulado
                </div>
            </div>
            <div class="info-value">
                <div id="fondo-acumulado" class="fondo-acumulado txt-center" onclick="checkShowHide()">
                    <div id="fondo-text">***</div>
                    <div class="fondo-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" id="show-icon"><path d="M480-320q75 0 127.5-52.5T660-500q0-75-52.5-127.5T480-680q-75 0-127.5 52.5T300-500q0 75 52.5 127.5T480-320Zm0-72q-45 0-76.5-31.5T372-500q0-45 31.5-76.5T480-608q45 0 76.5 31.5T588-500q0 45-31.5 76.5T480-392Zm0 192q-146 0-266-81.5T40-500q54-137 174-218.5T480-800q146 0 266 81.5T920-500q-54 137-174 218.5T480-200Zm0-300Zm0 220q113 0 207.5-59.5T832-500q-50-101-144.5-160.5T480-720q-113 0-207.5 59.5T128-500q50 101 144.5 160.5T480-280Z"/></svg>
                    </div>
                </div>
            </div>
        `;
    }
    show = (show ? 0 : 1);
    write_fondo(fondo_html);
}

function write_fondo(fondo_html) {
    
    fondo_element.innerHTML = fondo_html;
}

// Reload page when accessed using back button
window.addEventListener( "pageshow", function ( event ) {
    var historyTraversal = event.persisted || 
                        ( typeof window.performance != "undefined" && 
                            window.performance.getEntriesByType("navigation")[0].type === "back_forward" );
    if ( historyTraversal ) {
        window.location.reload();
    }
});