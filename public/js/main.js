var pass = document.getElementById("pass");
var email = document.getElementById("email");

function valida(event, form) {
    event.preventDefault();
    if (email.value == "" || email.value.length < 4) {

        alert('Por favor, preencha o campo email');
        email.focus();

    }
    else if (pass.value == "" || document.getElementById("pass").value.length < 6) {

        alert('Por favor, preencha o campo senha');
        pass.focus();


    } else {
        form.submit();
    }
}

function validaPass() {
    if (pass.value == "" || pass.value.lenght <= 6) {
        alert('Por favor, preencha o campo senha');
        pass.focus();

        return false
    }
    else if (email.value == "" || email.value.lenght <= 3) {
        alert('Por favor, preencha o campo nome');
        email.focus();
        return false
    } else {
        return true
    }
}


