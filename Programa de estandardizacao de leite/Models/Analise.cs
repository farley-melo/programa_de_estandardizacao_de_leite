using System.Text.Json.Serialization;

namespace PelManualBackEnd.Models
{
    public class Analise
    {
        public long Id { get; set; }
        public double Gordura{ get; set; }
        public double Snf{ get; set; }
        public double Densidade{ get; set; }
        public string Status { get; set; }
        public string  DepositoNome { get; set; }
        [JsonIgnore]
        public Depositos Depositos { get; set; }
    }
}