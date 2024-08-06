using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FI.AtividadeEntrevista.Interfaces
{
    public interface IValidadorCpf
    {
        bool IsValid(string cpf);
        bool IsNewCPF(string cpf, long idCliente);
    }
}
