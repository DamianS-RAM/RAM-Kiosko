function showModal(modalHTML=0) {
    let modal_container = document.getElementById('modal-container');
    if (!modal_container.classList.contains("modal-open")) {
        modal_container.classList.add("modal-open");
        if (!modalHTML) return;
        if( !document.getElementById("modal-content") ) {
            // modal = document.getElementById("modal");
            modal_container.innerHTML = modalHTML;
        }
    }
}
  
function closeModal(delElement=1) {
    let modal_container = document.getElementById('modal-container');
    if(delElement) modal_container.removeChild(modal_container.firstElementChild);
    modal_container.classList.remove("modal-open");
}