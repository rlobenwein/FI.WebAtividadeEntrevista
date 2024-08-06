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
            return View();
        }

        [HttpPost]
        public JsonResult Incluir(BeneficiarioModel model)
        {
            BoBeneficiario bo = new BoBeneficiario();
            bool isValidCPF = bo.VerificaValidade(model.Cpf);
            bool isNewCPF = bo.IsNewCPF(model.Cpf, model.IdCliente);

            if (!isValidCPF)
            {
                ModelState.AddModelError("Cpf", "CPF inválido.");
            }
            if (!isNewCPF)
            {
                ModelState.AddModelError("Cpf", "CPF já cadastrado.");
            }

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

        [HttpGet]
        public JsonResult BeneficiarioList(long id)
        {
            try
            {
                List<Beneficiario> beneficiarios = new BoBeneficiario().Listar(id);
                List<BeneficiarioModel> model = new List<BeneficiarioModel>();
                foreach (var ben in beneficiarios)
                {
                    model.Add(new BeneficiarioModel()
                    {
                        Id = ben.Id,
                        Cpf = ben.Cpf,
                        Nome = ben.Nome,
                        IdCliente = ben.IdCliente
                    });
                }

                return Json(model, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(new { Result = "ERROR", Message = ex.Message });
            }
        }
        [HttpPost]
        public JsonResult Excluir(long id)
        {
            BoBeneficiario bo = new BoBeneficiario();
            Beneficiario beneficiario = bo.Consultar(id);

            if (beneficiario != null)
            {
                bo.Excluir(id);
                return Json($"Beneficiário {beneficiario.Nome } excluído com sucesso");
            }
            return Json("Erro");
        }
    }
}
