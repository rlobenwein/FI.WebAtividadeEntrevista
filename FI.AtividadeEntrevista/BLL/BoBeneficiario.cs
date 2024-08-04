﻿using System.Collections.Generic;
using FI.AtividadeEntrevista.DAL;
using FI.AtividadeEntrevista.Interfaces;
using FI.AtividadeEntrevista.Utilities;

namespace FI.AtividadeEntrevista.BLL
{
    public class BoBeneficiario
    {
        /// <summary>
        /// Inclui um novo beneficiario
        /// </summary>
        /// <param name="beneficiario">Objeto de beneficiario</param>
        public long Incluir(DML.Beneficiario beneficiario)
        {
            DaoBeneficiario ben = new DaoBeneficiario();
            return ben.Incluir(beneficiario);
        }

        /// <summary>
        /// Altera um beneficiario
        /// </summary>
        /// <param name="beneficiario">Objeto de beneficiario</param>
        public void Alterar(DML.Beneficiario beneficiario)
        {
            DaoBeneficiario ben = new DaoBeneficiario();
            ben.Alterar(beneficiario);
        }

        /// <summary>
        /// Consulta o beneficiario pelo id
        /// </summary>
        /// <param name="id">id do beneficiario</param>
        /// <returns></returns>
        public DML.Beneficiario Consultar(long id)
        {
            DaoBeneficiario ben = new DaoBeneficiario();
            return ben.Consultar(id);
        }

        /// <summary>
        /// Excluir o beneficiario pelo id
        /// </summary>
        /// <param name="id">id do beneficiario</param>
        /// <returns></returns>
        public void Excluir(long id)
        {
            DaoBeneficiario ben = new DaoBeneficiario();
            ben.Excluir(id);
        }

        /// <summary>
        /// Lista os beneficiarios do Cliente
        /// </summary>
        /// <param name="id">id do cliente</param>
        /// <returns>List<DML.Beneficiario></returns>
        public List<DML.Beneficiario> Listar(long id)
        {
            DaoBeneficiario ben = new DaoBeneficiario();
            return ben.Listar(id);
        }

        /// <summary>
        /// Lista os beneficiarios
        /// </summary>
        public List<DML.Beneficiario> Pesquisa(int iniciarEm, int quantidade, string campoOrdenacao, bool crescente, out int qtd,long idCliente)
        {
            DaoBeneficiario ben = new DaoBeneficiario();
            return ben.Pesquisa(iniciarEm, quantidade, campoOrdenacao, crescente, out qtd, idCliente);
        }

        /// <summary>
        /// VerificaExistencia
        /// </summary>
        /// <param name="CPF"></param>
        /// <returns></returns>
        public bool VerificarExistencia(string CPF)
        {
            DaoBeneficiario ben = new DaoBeneficiario();
            return ben.VerificarExistencia(CPF);
        }
        /// <summary>
        /// Verifica se o CPF é válido
        /// </summary>
        /// <param name="cpf"></param>
        /// <returns></returns>
        public bool VerificaValidade(string cpf)
        {
            IValidadorCpf validaCpf = new ValidadorCpf();
            return validaCpf.IsValid(cpf);
        }

    }
}
