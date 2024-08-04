using FI.AtividadeEntrevista.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FI.AtividadeEntrevista.Utilities
{
    public class ValidadorCpf : IValidadorCpf
    {
        public bool IsValid(string cpf)
        {
            int soma = 0;
            int resto;

            string strCPF = new string(cpf.Where(char.IsDigit).ToArray());

            if (strCPF.Length != 11)
                return false;

            string[] invalidCPFs = new string[]
            {
            "00000000000",
            "11111111111",
            "22222222222",
            "33333333333",
            "44444444444",
            "55555555555",
            "66666666666",
            "77777777777",
            "88888888888",
            "99999999999"
            };

            if (invalidCPFs.Contains(strCPF))
                return false;

            for (int i = 1; i <= 9; i++)
                soma += int.Parse(strCPF.Substring(i - 1, 1)) * (11 - i);

            resto = (soma * 10) % 11;

            if (resto == 10 || resto == 11)
                resto = 0;

            if (resto != int.Parse(strCPF.Substring(9, 1)))
                return false;

            soma = 0;

            for (int i = 1; i <= 10; i++)
                soma += int.Parse(strCPF.Substring(i - 1, 1)) * (12 - i);

            resto = (soma * 10) % 11;

            if (resto == 10 || resto == 11)
                resto = 0;

            if (resto != int.Parse(strCPF.Substring(10, 1)))
                return false;

            return true;
        }
    }
}
