# Função Sistemas - Processo seletivo - teste prático
## Vaga: Desenvolvedor Full-Stack .NET - Candidato: Rodrigo Lobenwein
## Status: concluído
## Passos para solução do problema:
### Backend

1. Modelos
   - Cliente: incluir a propriedade CPF com a anotação ```Required``` para tornar o campo obrigatório e a anotação ```[MaxLength(11)]``` para limitar o campo em 11 caracteres.
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
   - Beneficiarios: 
     - a tabela já existe, mas é necessário incluir a constraint de chave estrangeira para o IdCliente.
     - o modelo não existe. Será necessário cria-lo com os campos Id, Cpf, Nome, IdCliente:
       - Arquivo Beneficiario.cs
       ```C#
           public class Beneficiarios
           {
               public long Id {get; set;} // tipo long para corresponder ao tipo bigint da tabela existente
               public string Cpf {get; set;} 
               public string Nome {get; set;} 
               public long IdCliente {get; set;} 
           }
       ```
       - Arquivo BeneficiarioModel.cs
       ```C#
           public class BeneficiarioModel
           {
               public long Id {get; set;} 

               [Required]
               [MaxLength(11)]
               public string Cpf {get; set;} 

               [Required]
               public string Nome {get; set;} 

               [Required]
               public long IdCliente {get; set;} 
           }
       ```

2. Controladores:
   - Incluir o CPF na lógica dos métodos `Incluir` e `Alterar` (Post e Get):
   - Criar o controlador BeneficiariosController.cs.
3. BundleConfig
   - bundles para beneficiario
   - Incluir um método para validação do CPF antes da inclusão no BD para garantir a consistência e integridade dos dados (também será adicionada validação no frontend). O método será incluído em uma classe à parte para ser acessada por vários métodos da aplicação.
4. Camada de Lógica de Negócios
   - Criar BoBeneficiario
   - Incluir Serviço de validação do CPF
5. Camada de Acesso a dados
   - alterar os métodos de DaoCliente para incluir o cpf
   - Criar DaoBeneficiario
   - Em DaoCliente, criar sobrecarga do método Converter para ser usado no Index (requer somente nome e email)
6. Utilities: criar validador de CPF. Validação do CPF antes da inclusão no BD para garantir a consistência e integridade dos dados (também será adicionada validação no frontend). O método será incluído em uma classe à parte para ser acessada por vários métodos da aplicação

7. Banco de dados: 
- query para adicionar a coluna CPF na tabela clientes
    ```SQL
        ALTER TABLE dbo.CLIENTES
        ADD CPF VARCHAR(11) NOT NULL CONSTRAINT UNIQUE_CLIENTES_CPF UNIQUE;
    ```
   - campo de texto
   - 11 caracteres (somente números)
   - não pode se repetir
   - não pode ser nulo.
 - Alterar as procedures do Cliente para inclusão do CPF. Exemplo:
```SQL
ALTER PROC FI_SP_AltCliente
    @NOME          VARCHAR (50) ,
    @SOBRENOME     VARCHAR (255),
    @NACIONALIDADE VARCHAR (50) ,
    @CEP           VARCHAR (9)  ,
    @ESTADO        VARCHAR (2)  ,
    @CIDADE        VARCHAR (50) ,
    @LOGRADOURO    VARCHAR (500),
    @EMAIL         VARCHAR (2079),
    @TELEFONE      VARCHAR (15),
    @CPF		   VARCHAR (11),
	@Id           BIGINT
AS
BEGIN
	UPDATE CLIENTES 
	SET 
		NOME = @NOME, 
		SOBRENOME = @SOBRENOME, 
		NACIONALIDADE = @NACIONALIDADE, 
		CEP = @CEP, 
		ESTADO = @ESTADO, 
		CIDADE = @CIDADE, 
		LOGRADOURO = @LOGRADOURO, 
		EMAIL = @EMAIL, 
		TELEFONE = @TELEFONE,
		CPF = @CPF
	WHERE Id = @Id
END
```
 - Criar procedures para beneficiários. Exemplo:
  ```SQL
CREATE PROCEDURE FI_SP_ConsBeneficiario
    @IDCLIENTE BIGINT = NULL,
    @ID BIGINT = NULL
AS
BEGIN
    SET NOCOUNT ON;

    IF @ID IS NULL AND @IDCLIENTE IS NULL
    BEGIN
        SELECT NOME, CPF, IDCLIENTE, ID 
        FROM BENEFICIARIOS WITH(NOLOCK);
    END
    ELSE IF @IDCLIENTE IS NULL AND @ID IS NOT NULL
    BEGIN
        SELECT NOME, CPF, IDCLIENTE, ID 
        FROM BENEFICIARIOS WITH(NOLOCK) 
        WHERE ID = @ID;
    END
    ELSE
    BEGIN
        SELECT NOME, CPF, IDCLIENTE, ID 
        FROM BENEFICIARIOS WITH(NOLOCK) 
        WHERE IDCLIENTE = @IDCLIENTE;
    END
END;

  ```

- Query para incluir a constraint de chave estrangeira na tabela beneficiários:
```SQL
    ALTER TABLE dbo.BENEFICIARIOS
    ADD CONSTRAINT FK_BENEFICIARIOS_CLIENTES FOREIGN KEY (IDCLIENTE) REFERENCES dbo.CLIENTES(ID);
```

### Frontend
- Criar a tela beneficiarios (modal)
- Alterar a tela de clientes para incluir o botão beneficiarios e o campo de cpf. Botão Beneficiários somente na tela de alterar Cliente (é necessário que o cliente já exista para cadastrar um Beneficiário)
- Incluir scripts para beneficiarios
- Incluir script de validação do cpf no front

```JS
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
```