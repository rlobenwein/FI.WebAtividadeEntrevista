﻿
$(document).ready(function () {

    $('#formCadastroCliente').submit(function (e) {
        e.preventDefault();
        var cpf = $(this).find("#CPF").val().replace(/\D/g, '');
        if (!validaCPF(cpf)) {
            alert('CPF inválido');
            return;
        }

        if (cpfExiste(cpf)) {
            alert('CPF já cadastrado');
            return;
        }

        if (validaCPF(cpf) && !cpfExiste(cpf)) {
            $.ajax({
                url: urlPost,
                method: "POST",
                data: {
                    "NOME": $(this).find("#Nome").val(),
                    "CEP": $(this).find("#CEP").val(),
                    "Email": $(this).find("#Email").val(),
                    "Sobrenome": $(this).find("#Sobrenome").val(),
                    "Nacionalidade": $(this).find("#Nacionalidade").val(),
                    "Estado": $(this).find("#Estado").val(),
                    "Cidade": $(this).find("#Cidade").val(),
                    "Logradouro": $(this).find("#Logradouro").val(),
                    "Telefone": $(this).find("#Telefone").val(),
                    "Cpf": cpf
                },
                error:
                    function (r) {
                        if (r.status == 400)
                            ModalDialogCli("Ocorreu um erro", r.responseJSON);
                        else if (r.status == 500)
                            ModalDialogCli("Ocorreu um erro", "Ocorreu um erro interno no servidor.");
                    },
                success:
                    function (r) {
                        ModalDialogCli("Sucesso!", r)
                        $("#formCadastroCliente")[0].reset();
                    }
            });
        } else {
            alert("Insira um CPF válido");
        }
    })

})

function ModalDialogCli(titulo, texto) {
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

function cpfExiste(cpf) {
    cpf = cpf.replace(/\D/g, '');
    var resp = false;
    $.ajax({
        url: 'CpfExiste',
        method: "POST",
        data: {
            "cpf": cpf,
        },
        error:
            function (r) {
                if (r.status == 400) {
                    ModalDialogBen("Ocorreu um erro", r.responseJSON);
                    console.log(r.responseJSON);
                }
                else if (r.status == 500)
                    ModalDialogBen("Ocorreu um erro", "Ocorreu um erro interno no servidor.");
            },
        success:
            function (r) {
                resp = r;
                console.log('cpfExiste', resp);
            }
    });

    return resp;
}