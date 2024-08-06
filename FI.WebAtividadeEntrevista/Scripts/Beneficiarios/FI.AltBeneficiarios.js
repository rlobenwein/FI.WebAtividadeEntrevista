function altBeneficiario(id) {
    index = beneficiarios.findIndex((b) => b.Id == id);
    $('#idBen').val(id);
    $('#nomeBen').val(beneficiarios[index].Nome);
    $('#CPFBen').val(beneficiarios[index].Cpf);
    $('#insBen').text('Alterar');
}
