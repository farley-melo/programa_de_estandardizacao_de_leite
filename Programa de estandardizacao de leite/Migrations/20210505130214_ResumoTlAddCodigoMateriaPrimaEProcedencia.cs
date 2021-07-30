using Microsoft.EntityFrameworkCore.Migrations;

namespace Programa_de_estandardizacao_de_leite.Migrations
{
    public partial class ResumoTlAddCodigoMateriaPrimaEProcedencia : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "CodigoMateriaPrima",
                table: "ResumoTls",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Procedencia",
                table: "ResumoTls",
                type: "nvarchar(max)",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CodigoMateriaPrima",
                table: "ResumoTls");

            migrationBuilder.DropColumn(
                name: "Procedencia",
                table: "ResumoTls");
        }
    }
}
