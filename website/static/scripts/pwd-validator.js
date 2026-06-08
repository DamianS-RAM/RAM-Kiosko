let validationRegex = [
    { regex: /.{8,}/}, //
    { regex: /[0-9]/ },
    { regex: /[a-z]/ },
    { regex: /[A-Z]/ },
    { regex: /[^A-Za-z0-9]/ },
]

function resetValues() {
    let passwordInp = document.querySelector('.password-input');
    let passwordConfirmInp = document.querySelector('.password-confirm-input');
    let passwordChecklistDiv = document.querySelector('.password-checklist');
    let passwordChecklist = document.querySelectorAll('.list-item');
    let passwordButton = document.getElementById("btn-pwd");
    passwordButtonStatus1 = false
    passwordButtonStatus2 = false

    passwordInp.addEventListener('keyup', () => {
    
        let cont = 0;
        validationRegex.forEach((item, i) => {
            let isvalid = item.regex.test(passwordInp.value)
    
            if(isvalid) {
                passwordChecklist[i].classList.add('checked');
                cont++;
            }
            else {
                passwordChecklist[i].classList.remove('checked');
            }
        })
    
        if (cont == 5) passwordButtonStatus1 = true;
        else passwordButtonStatus1 = false;
        
        btnStatus(passwordButtonStatus1, passwordButtonStatus2, passwordButton);
    })
    
    passwordConfirmInp.addEventListener('keyup', () => {
        if (passwordInp.value != passwordConfirmInp.value) {
            passwordButtonStatus2 = false;
            passwordChecklist[5].classList.remove('checked');
        }
        else {
            passwordButtonStatus2 = true;
            passwordChecklist[5].classList.add('checked');
        }
        
        btnStatus(passwordButtonStatus1, passwordButtonStatus2, passwordButton);
    })
}

function btnStatus(passwordButtonStatus1, passwordButtonStatus2, passwordButton) {
    if (passwordButtonStatus1 && passwordButtonStatus2) passwordButton.disabled = false;
    else passwordButton.disabled = true;
}