let alert = document.getElementById('alert');
let alertTimeout = setTimeout(hideDiv, 15000);

function closeAlarm() {
    hideDiv();
    clearTimeout(alertTimeout);
}

function hideDiv() {
    alert.style.opacity = "0";

    // Hide the div after 200ms (the same amount of milliseconds it takes to fade out)
    setTimeout(function(){ alert.style.display = "none"; alert.parentElement.remove(); }, 200);
}