let current_menu = 'nom-table', current_doc;

loadToTable(nom_list, "Nomina ", "nom-table");
loadToTable(aguinaldo_list, "Aguinaldo ", "agu-table");

function loadToTable(file, type, elementID) {
    var tbody = document.getElementById(elementID);
    file.forEach( el => {
        tbody.innerHTML += `
        <tr>
            <td><a onclick="openDoc('${el}')" href="javascript:void(0)"><div class="nom-item">${ el.replace(type, "") }
            </div></a></td>
            <td class="doc-icon">
                <a onclick="openDoc('${el}')" href="javascript:void(0)">
                    <div class="nom-item">
                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#404040"><path d="M480-320q75 0 127.5-52.5T660-500q0-75-52.5-127.5T480-680q-75 0-127.5 52.5T300-500q0 75 52.5 127.5T480-320Zm0-72q-45 0-76.5-31.5T372-500q0-45 31.5-76.5T480-608q45 0 76.5 31.5T588-500q0 45-31.5 76.5T480-392Zm0 192q-134 0-244.5-72T61-462q-5-9-7.5-18.5T51-500q0-10 2.5-19.5T61-538q64-118 174.5-190T480-800q134 0 244.5 72T899-538q5 9 7.5 18.5T909-500q0 10-2.5 19.5T899-462q-64 118-174.5 190T480-200Zm0-300Zm0 220q113 0 207.5-59.5T832-500q-50-101-144.5-160.5T480-720q-113 0-207.5 59.5T128-500q50 101 144.5 160.5T480-280Z"/></svg>
                    </div>
                </a>
            </td>
            <td class="doc-icon">
                <a href="/send-nom/${el}" onclick="loader('Enviando')">
                    <div class="nom-item">
                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#404040"><path d="M160-160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h640q33 0 56.5 23.5T880-720v480q0 33-23.5 56.5T800-160H160Zm320-280L160-640v400h640v-400L480-440Zm0-80 320-200H160l320 200ZM160-640v-80 480-400Z"/></svg>
                    </div>
                </a>
            </td>
            <td class="doc-icon">
                <a onclick="printPdf('${el}')">
                    <div class="nom-item">
                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#404040"><path d="M640-640v-120H320v120h-80v-200h480v200h-80Zm-480 80h640-640Zm560 100q17 0 28.5-11.5T760-500q0-17-11.5-28.5T720-540q-17 0-28.5 11.5T680-500q0 17 11.5 28.5T720-460Zm-80 260v-160H320v160h320Zm80 80H240v-160H80v-240q0-51 35-85.5t85-34.5h560q51 0 85.5 34.5T880-520v240H720v160Zm80-240v-160q0-17-11.5-28.5T760-560H200q-17 0-28.5 11.5T160-520v160h80v-80h480v80h80Z"/></svg>
                    </div>
                </a>
            </td>
        </tr>
        `
    });
}

function openDoc(docId) {
    let pdf_body = document.getElementById('pdf-body');
    if (pdf_body.classList.contains("no-show")) {
        pdf_body.classList.remove("no-show");
        if ( announcement_exists ) {
            document.getElementById('modal-announce-container').classList.add("no-show");
            stopAnnouncements();
        }
    }
    if (docId == current_doc)  return;
    let pdf_viewer = document.getElementById('pdf_viewer');
    pdf_viewer.setAttribute("data", `static\\current_nom\\${userId}\\${docId}.pdf#toolbar=0&navpanes=0&scrollbar=0`);
    current_doc = docId
    let pdf_footer = document.getElementById('pdf-footer');
    pdf_footer.innerHTML = `
        <div class="form-double-button-container w-100">
            <div class="form-button-container">
                <a href="javascript:void(0)" onclick="buzonDudasModal('${docId}', '${userId}')" class="form-button form-button-submit">
                    Dudas con tu nómina
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px"><path d="M440-120v-80h320v-284q0-117-81.5-198.5T480-764q-117 0-198.5 81.5T200-484v244h-40q-33 0-56.5-23.5T80-320v-80q0-21 10.5-39.5T120-469l3-53q8-68 39.5-126t79-101q47.5-43 109-67T480-840q68 0 129 24t109 66.5Q766-707 797-649t40 126l3 52q19 9 29.5 27t10.5 38v92q0 20-10.5 38T840-249v49q0 33-23.5 56.5T760-120H440Zm-80-280q-17 0-28.5-11.5T320-440q0-17 11.5-28.5T360-480q17 0 28.5 11.5T400-440q0 17-11.5 28.5T360-400Zm240 0q-17 0-28.5-11.5T560-440q0-17 11.5-28.5T600-480q17 0 28.5 11.5T640-440q0 17-11.5 28.5T600-400Zm-359-62q-7-106 64-182t177-76q89 0 156.5 56.5T720-519q-91-1-167.5-49T435-698q-16 80-67.5 142.5T241-462Z"/></svg>
                </a>
            </div>
            <div class="form-button-container w-100">
                <a href="javascript:void(0)" onclick="close_doc()" class="form-button form-button-cancel">
                    Cerrar documento
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px"><path d="M120-240v-80h520v80H120Zm664-40L584-480l200-200 56 56-144 144 144 144-56 56ZM120-440v-80h400v80H120Zm0-200v-80h520v80H120Z"/></svg>
                </a>
            </div>
        </div>
    `
}


function close_doc() {
    let pdf_body = document.getElementById('pdf-body');
    pdf_body.classList.add("no-show");
    if ( announcement_exists ) {
        document.getElementById('modal-announce-container').classList.remove("no-show");
        autoSlide();
    }
}


function reloadHome() {
    window.location.href = "/";
}

function printPdf (url) {
    var iframe = this._printIframe;
    if (!this._printIframe) {
        iframe = this._printIframe = document.createElement('iframe');
        document.body.appendChild(iframe);

        iframe.style.display = 'none';
        iframe.onload = function() {
        setTimeout(function() {
            iframe.focus();
            iframe.contentWindow.print();
        }, 1);
        };
    }
    
    iframe.src = `static\\current_nom\\${userId}\\` + url + ".pdf";
}

function openMenu(tableId) {
    if (window.innerHeight < 724) {
        current = document.getElementsByClassName("table-menu-opened");
        current[0].classList.add("table-menu-closed");
        current[0].classList.remove("table-menu-opened");
        table = document.getElementById(`${tableId}`);
        table.classList.remove("table-menu-closed");
        table.classList.add("table-menu-opened");
    }
}