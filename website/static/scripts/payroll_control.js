let doc_type_input = document.getElementById('doc_type');
let doc_date_input_container = document.getElementById('doc_date');

function changeDateInput() {
    if ( doc_type_input.value == "Nomina" ) {
        doc_date_input_container.innerHTML = `
            <input type="week" class="form-input font-roboto txt-input" name="doc_period" id="doc_period" {% if doc %} value="{{ doc.docPeriod }}" {% endif %} required>
            <label for="doc_period">Num. de semana:</label>
        `
    }
    else {
        doc_date_input_container.innerHTML = `
            <input type="date" class="form-input font-roboto txt-input" name="doc_period" id="doc_period" {% if doc %} value="{{ doc.docPeriod }}" {% endif %} required>
            <label for="doc_period">Día de pago:</label>
        `
    }
}