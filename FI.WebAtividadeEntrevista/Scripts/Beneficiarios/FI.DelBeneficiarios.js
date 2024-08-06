function excluirBeneficiario(id) {
    var url = urlDelBen;

    $.ajax({
        url: url,
        method: "POST",
        data: {
            "ID":id,
        },
        error:
            function (r) {
                if (r.status == 400)
                    ModalDialogBen("Ocorreu um erro", r.responseJSON);
                else if (r.status == 500)
                    ModalDialogBen("Ocorreu um erro", "Ocorreu um erro interno no servidor.");
            },
        success:
            function (r) {
                ModalDialogBen("Sucesso!", r)
                $("#formCadastroBeneficiario")[0].reset();
                $('#idBen').val(-1);
                listBeneficiarios(true);
            }
    });
}

