function validaCPF(cpf) {
    var Soma = 0
    var Resto

    var strCPF = String(cpf).replace(/[^\d]/g, '')

    if (strCPF.length !== 11)
        return false

    if ([
        '00000000000',
        '11111111111',
        '22222222222',
        '33333333333',
        '44444444444',
        '55555555555',
        '66666666666',
        '77777777777',
        '88888888888',
        '99999999999',
    ].indexOf(strCPF) !== -1)
        return false

    for (i = 1; i <= 9; i++)
        Soma = Soma + parseInt(strCPF.substring(i - 1, i)) * (11 - i);

    Resto = (Soma * 10) % 11

    if ((Resto == 10) || (Resto == 11))
        Resto = 0

    if (Resto != parseInt(strCPF.substring(9, 10)))
        return false

    Soma = 0

    for (i = 1; i <= 10; i++)
        Soma = Soma + parseInt(strCPF.substring(i - 1, i)) * (12 - i)

    Resto = (Soma * 10) % 11

    if ((Resto == 10) || (Resto == 11))
        Resto = 0

    if (Resto != parseInt(strCPF.substring(10, 11)))
        return false

    return true
}

function mascaraCpf(cpf) {
    cpf = cpf.replace(/\D/g, '');
    if (cpf.length > 9) return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
    if (cpf.length > 6) return cpf.replace(/(\d{3})(\d{3})(\d{3})/, '$1.$2.$3');
    if (cpf.length > 3) return cpf.replace(/(\d{3})(\d{3})/, '$1.$2');
    return cpf;
}

$(document).ready(function () {
    $('.CPF').on('input', function () {
        var cpf = $(this).val();
        $(this).val(mascaraCpf(cpf));
    });

    $('.CPF').on('blur', function () {
        var cpf = $(this).val();
        var isValid = validaCPF(cpf);
        console.log(`CPF ${cpf}`, isValid ? "válido" : "inválido");
        if (!isValid && cpf.length > 0) {
            alert(`CPF ${cpf} inválido!`);
        }

    });
});
