using Microsoft.EntityFrameworkCore.Migrations;

namespace Programa_de_estandardizacao_de_leite.Migrations
{
    public partial class inicial : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "depositos",
                columns: table => new
                {
                    Nome = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Capacidade = table.Column<int>(type: "int", nullable: false, defaultValue: 0)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_depositos", x => x.Nome);
                });

            migrationBuilder.CreateTable(
                name: "formulas",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Gordura = table.Column<double>(type: "float", nullable: false, defaultValue: 0.0),
                    FatorAcucarMin = table.Column<double>(type: "float", nullable: false, defaultValue: 0.0),
                    FatorAcucarObj = table.Column<double>(type: "float", nullable: false, defaultValue: 0.0),
                    FatorAcucarMax = table.Column<double>(type: "float", nullable: false, defaultValue: 0.0),
                    RfMin = table.Column<double>(type: "float", nullable: false, defaultValue: 0.0),
                    RfObj = table.Column<double>(type: "float", nullable: false, defaultValue: 0.0),
                    RfMax = table.Column<double>(type: "float", nullable: false, defaultValue: 0.0),
                    Acucar = table.Column<double>(type: "float", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_formulas", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "materias_primas",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Nome = table.Column<string>(type: "nvarchar(max)", nullable: true, defaultValue: "vazio"),
                    Codigo = table.Column<string>(type: "nvarchar(max)", nullable: true, defaultValue: "vazio"),
                    Procedencia = table.Column<string>(type: "nvarchar(max)", nullable: true, defaultValue: "vazio")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_materias_primas", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "mensagem",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false),
                    Texto = table.Column<string>(type: "nvarchar(max)", nullable: true, defaultValue: "")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_mensagem", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "ResumoTls",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    NomeTanque = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    QuantidadeMateriaPrima = table.Column<double>(type: "float", nullable: false),
                    NomeMateriaPrima = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ResumoTls", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "tl",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Data = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Tanque = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Gordura = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Snf = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Crioscopia = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Densidade = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Acidez = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    NotaFiscal = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Transportadora = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    CodigoCarreta = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    KilosRecebidos = table.Column<double>(type: "float", nullable: false),
                    MateriaPrima = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    CodigoMateriaPrima = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Temperatura = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_tl", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "analise",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Gordura = table.Column<double>(type: "float", nullable: false, defaultValue: 0.0),
                    Snf = table.Column<double>(type: "float", nullable: false, defaultValue: 0.0),
                    Densidade = table.Column<double>(type: "float", nullable: false, defaultValue: 0.0),
                    Status = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    DepositoNome = table.Column<string>(type: "nvarchar(450)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_analise", x => x.Id);
                    table.ForeignKey(
                        name: "FK_analise_depositos_DepositoNome",
                        column: x => x.DepositoNome,
                        principalTable: "depositos",
                        principalColumn: "Nome",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_analise_DepositoNome",
                table: "analise",
                column: "DepositoNome",
                unique: true,
                filter: "[DepositoNome] IS NOT NULL");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "analise");

            migrationBuilder.DropTable(
                name: "formulas");

            migrationBuilder.DropTable(
                name: "materias_primas");

            migrationBuilder.DropTable(
                name: "mensagem");

            migrationBuilder.DropTable(
                name: "ResumoTls");

            migrationBuilder.DropTable(
                name: "tl");

            migrationBuilder.DropTable(
                name: "depositos");
        }
    }
}
