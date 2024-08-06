
var beneficiarios;
$(document).ready(function () {
    $('#formCadastroBeneficiario').submit(function (e) {
        e.preventDefault();

        var nome = $(this).find("#nomeBen").val();
        var cpf = $(this).find("#CPFBen").val().replace(/\D/g, '');
        var idCliente = id;
        var idBen = $(this).find("#idBen").val()

        var formData = new FormData(this);
        var index = formData.get('idBen');
        if (index >= 0) {
            index = beneficiarios.findIndex((b) => b.Id == idBen);
        }

        var url = index >= 0 ? urlAltBen : urlPostBen;

        if (!validaCPF(cpf)) {
            alert('CPF inválido');
            return;
        }

        if (cpfBenExiste(cpf, index)) {
            alert('CPF já cadastrado!!!');
            return;
        }
        $.ajax({
            url: url,
            method: "POST",
            data: {
                "ID": index >= 0 ? idBen : 0,
                "NOME": nome,
                "CPF": cpf,
                "IdCliente": idCliente
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
                    ModalDialogBen("Sucesso!", r);
                    $("#formCadastroBeneficiario")[0].reset();
                    $('#idBen').val(-1);
                    listBeneficiarios(true);
                }
        });
    })
})
function cpfBenExiste(cpf, index) {
    console.log('beneficiarios', beneficiarios);
    console.log('index', index);
    cpf = cpf.replace(/\D/g, '');
    if (index >= 0) {
        return beneficiarios.findIndex(x => {
            if (x.Cpf) {
                var normalizedCpf = x.Cpf.replace(/\D/g, '');
                console.log('beneficiario:', beneficiarios[index]);
                console.log('normalizedCpf:', normalizedCpf);
                console.log('cpf:', cpf);
                console.log('x.Id:', x.Id);
                console.log('beneficiarios[index].Id:', beneficiarios[index].Id);
                console.log('normalizedCpf === cpf:', normalizedCpf === cpf);
                console.log('x.Id !== beneficiarios[index].Id:', x.Id !== beneficiarios[index].Id);
                console.log('return:', normalizedCpf === cpf && x.Id !== beneficiarios[index].Id);
                return normalizedCpf === cpf && x.Id !== beneficiarios[index].Id;
            }
            return false;
        }) >= 0;
    } else {
        return beneficiarios.findIndex(x => {
            if (x.Cpf) {
                var normalizedCpf = x.Cpf.replace(/\D/g, '');
                return normalizedCpf === cpf;
            }
            return false;
        }) >= 0;
    }
}

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

function ModalOpen() {
    $(`#modalBeneficiarioForm`).modal('show');
    $('#insBen').text('Incluir');

    listBeneficiarios(false);
}
function listBeneficiarios(update) {
    if (update || !beneficiarios) {
        $.ajax({
            url: urlBeneficiarios,
            type: 'get',
            async: false,
            success: data => {
                beneficiarios = data;
            },
            error: error => { console.error(data); }
        });
    }
    console.log('listBeneficiarios', beneficiarios);
    var table = $('#benTable tbody');
    table.empty();
    beneficiarios.sort((a, b) => a.Nome.localeCompare(b.Nome));
    beneficiarios.forEach(ben => insBeneficiario(ben));
}
function insBeneficiario(beneficiario) {
    var cpf = mascaraCpf(beneficiario.Cpf);
    var table = $('#benTable tbody');
    table.append(`
    <tr>
        <td>${cpf}</td>
        <td>${beneficiario.Nome}</td>
        <td>
            <button type="button" class="btn btn-primary btn-sm" onclick="altBeneficiario(${beneficiario.Id})">Alterar</button>
            <button type="button" class="btn btn-primary btn-sm" onclick="excluirBeneficiario(${beneficiario.Id})">Excluir</button>
        </td>
    </tr>
    `);
}

