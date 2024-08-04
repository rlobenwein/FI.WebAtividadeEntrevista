﻿
$(document).ready(function () {
    console.log('Alterar Ben');
    if (obj) {
        $('#formCadastroBeneficiario #Nome').val(obj.Nome);
        $('#formCadastroBeneficiario #CPF').val(obj.Cpf);
        $('#formCadastroBeneficiario #IdCliente').val(obj.IdCliente);
    }

    $('#formCadastroBeneficiario').submit(function (e) {
        //e.preventDefault();
        
        $.ajax({
            url: urlPost,
            method: "POST",
            data: {
                "NOME": $(this).find("#Nome").val(),
                "CPF": $(this).find("#CPF").val(),
                "IdCliente": $(this).find("#IdCliente").val()
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
                window.location.href = urlRetorno;
            }
        });
    })
    
})

function ModalDialogBen(titulo, texto) {
    var random = Math.random().toString().replace('.', '');
    var texto = '<div id="' + random + '" class="modal fade">                                                               ' +
        '        <div class="modal-dialog">                                                                                 ' +
        '            <div class="modal-content">                                                                            ' +
        '                <div class="modal-header">                                                                         ' +
        '                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>         ' +
        '                    <h4 class="modal-title">' + titulo + '</h4>                                                    ' +
        '                </div>                                                                                             ' +
        '                <div class="modal-body">                                                                           ' +
        '                    <p>' + texto + '</p>                                                                           ' +
        '                </div>                                                                                             ' +
        '                <div class="modal-footer">                                                                         ' +
        '                    <button type="button" class="btn btn-default" data-dismiss="modal">Fechar</button>             ' +
        '                                                                                                                   ' +
        '                </div>                                                                                             ' +
        '            </div><!-- /.modal-content -->                                                                         ' +
        '  </div><!-- /.modal-dialog -->                                                                                    ' +
        '</div> <!-- /.modal -->                                                                                        ';

    $('body').append(texto);
    $('#' + random).modal('show');
}
