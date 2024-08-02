using FI.AtividadeEntrevista.BLL;
using WebAtividadeEntrevista.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Mvc;
using FI.AtividadeEntrevista.DML;
using System.Threading.Tasks;

namespace WebAtividadeEntrevista.Controllers
{
    public class BeneficiarioController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }

        [HttpGet]
        public ActionResult Incluir(int idCliente)
        {
            BoBeneficiario boBeneficiario = new BoBeneficiario();
            var benList = boBeneficiario.Listar(idCliente);
            ClienteModel cliente = new ClienteModel()
            {
                Id = idCliente,
                Beneficiarios=new List<BeneficiarioModel>()
            };
            foreach (var ben in benList)
            {
                cliente.Beneficiarios.Add(new BeneficiarioModel()
                {
                    Id = ben.Id,
                    Nome = ben.Nome,
                    Cpf = ben.Cpf,
                    IdCliente = ben.IdCliente,
                });
            }
            return View(cliente);
        }

        [HttpPost]
        public JsonResult Incluir(BeneficiarioModel model)
        {
            BoBeneficiario bo = new BoBeneficiario();

            if (!this.ModelState.IsValid)
            {
                List<string> erros = (from item in ModelState.Values
                                      from error in item.Errors
                                      select error.ErrorMessage).ToList();

                Response.StatusCode = 400;
                return Json(string.Join(Environment.NewLine, erros));
            }
            else
            {

                model.Id = bo.Incluir(new Beneficiario()
                {
                    Cpf = model.Cpf,
                    IdCliente = model.IdCliente,
                    Nome = model.Nome,
                });


                return Json("Cadastro efetuado com sucesso");
            }
        }

        [HttpPost]
        public JsonResult Alterar(BeneficiarioModel model)
        {
            BoBeneficiario bo = new BoBeneficiario();

            if (!this.ModelState.IsValid)
            {
                List<string> erros = (from item in ModelState.Values
                                      from error in item.Errors
                                      select error.ErrorMessage).ToList();

                Response.StatusCode = 400;
                return Json(string.Join(Environment.NewLine, erros));
            }
            else
            {
                bo.Alterar(new Beneficiario()
                {
                    Id = model.Id,
                    Cpf = model.Cpf,
                    IdCliente = model.IdCliente,
                    Nome = model.Nome,
                });

                return Json("Cadastro alterado com sucesso");
            }
        }

        [HttpGet]
        public ActionResult Alterar(long id)
        {
            BoBeneficiario bo = new BoBeneficiario();
            Beneficiario beneficiario = bo.Consultar(id);
            Models.BeneficiarioModel model = null;

            if (beneficiario != null)
            {
                model = new BeneficiarioModel()
                {
                    Id = beneficiario.Id,
                    Cpf = beneficiario.Cpf,
                    Nome = beneficiario.Nome,
                    IdCliente = beneficiario.IdCliente
                };
            }
            return View(model);
        }

        [HttpPost]
        public JsonResult BeneficiarioList(long idCliente,int jtStartIndex = 0, int jtPageSize = 0, string jtSorting = null)
        {
            try
            {
                int qtd = 0;
                string campo = string.Empty;
                string crescente = string.Empty;
                string[] array = jtSorting.Split(' ');


                if (array.Length > 0)
                    campo = array[0];

                if (array.Length > 1)
                    crescente = array[1];

                List<Beneficiario> beneficiarios = new BoBeneficiario().Pesquisa(jtStartIndex, jtPageSize, campo, crescente.Equals("ASC", StringComparison.InvariantCultureIgnoreCase), out qtd,idCliente);

                //Return result to jTable
                return Json(new { Result = "OK", Records = beneficiarios, TotalRecordCount = qtd });
            }
            catch (Exception ex)
            {
                return Json(new { Result = "ERROR", Message = ex.Message });
            }
        }
        public ActionResult Excluir(long id)
        {
            BoBeneficiario bo = new BoBeneficiario();
            Beneficiario beneficiario = bo.Consultar(id);

            if (beneficiario != null)
            {
                bo.Excluir(id);
            }
            return RedirectToAction("Index", "Cliente");
        }
    }
}
