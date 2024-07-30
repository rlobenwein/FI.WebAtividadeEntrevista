# Função Sistemas
## Processo seletivo - teste prático

### Vaga: Desenvolvedor Full-Stack .NET - Passos para solução do problema:

#### Backend

1. Modelo Cliente: incluir a propriedade CPF com a anotação ```Required``` para tornar o campo obrigatório

- Arquivo `FI.WebAtividadeEntrevista\FI.WebAtividadeEntrevista\Models\ClienteModel.cs`
```C#
    [Required]
    [MaxLength(11)]
    public string Cpf {get; set;}
```
- Arquivo `FI.WebAtividadeEntrevista\FI.AtividadeEntrevista\DML\Cliente.cs`
```C#
    public string Cpf {get; set;}
```

2. Banco de dados: query para adicionar a coluna CPF na tabela clientes

```SQL
    ALTER TABLE dbo.CLIENTES
    ADD CPF VARCHAR(11) NOT NULL CONSTRAINT UNIQUE_CLIENTES_CPF UNIQUE;
```
- campo de texto
- 11 caracteres (somente números)
- não pode se repetir
- não pode ser nulo.

1. Modelo Beneficiarios: 
   - a tabela já existe, mas é necessário incluir a constraint de chave estrangeira para o IdCliente.
   - o modelo não existe. Será necessário cria-lo com os campos Id, Cpf, Nome, IdCliente.

- Arquivo Beneficiario.cs
```C#
    public class Beneficiarios
    {
        [key]
        public long Id {get; set;} // tipo long para corresponder ao tipo bigint da tabela existente

        [MaxLength(11)]
        [Required]
        public string Cpf {get; set;} 

        [Required]
        public string Nome {get; set;} 

        [Required]
        public long IdCliente {get; set;} 
    }
```
- Query para incluir a constraint de chave estrangeira na tabela beneficiários:
```SQL
    ALTER TABLE dbo.BENEFICIARIOS
    ADD CONSTRAINT FK_BENEFICIARIOS_CLIENTES FOREIGN KEY (IDCLIENTE) REFERENCES dbo.CLIENTES(ID);
```
3. Controladores:
    - Incluir o CPF na lógica dos métodos `Incluir` e `Alterar` (Post e Get):

```C#
                   model.Id = bo.Incluir(new Cliente()
                {                    
                    CEP = model.CEP,
                    Cidade = model.Cidade,
                    Email = model.Email,
                    Estado = model.Estado,
                    Logradouro = model.Logradouro,
                    Nacionalidade = model.Nacionalidade,
                    Nome = model.Nome,
                    Sobrenome = model.Sobrenome,
                    Telefone = model.Telefone
                    Cpf = model.Cpf //Nova linha - igual nos 3 métodos. 
                });
```

## Próximos passos
- Incluir um método para validação do CPF antes da inclusão no BD para garantir a consistência e integridade dos dados (também será adicionada validação no frontend). O método será incluído em uma classe à parte para ser acessada por vários métodos da aplicação.
- Criar o controlador BeneficiariosController.cs:
- Alterar as procedures para inclusão do CPF
- Criar procedures para buscar os beneficiários de um cliente
- alterar os métodos de DaoCliente para incluir o cpf
- Criar DaoBeneficiario
- Criar BoBeneficiario
- Criar DML/Beneficiario
- incluir em App_Start
  - BundleConfig - bundles para beneficiario



#### Frontend
- Criar a tela beneficiarios (modal)
- Alterar a tela de clientes para incluir o botão beneficiarios e o campo de cpf
  - Alterar
  - Incluir
- Incluir script de validação do cpf no front
- Incluir scripts para beneficiarios