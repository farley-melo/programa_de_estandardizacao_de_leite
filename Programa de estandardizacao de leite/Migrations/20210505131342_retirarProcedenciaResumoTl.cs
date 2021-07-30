using Microsoft.EntityFrameworkCore.Migrations;

namespace Programa_de_estandardizacao_de_leite.Migrations
{
    public partial class retirarProcedenciaResumoTl : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Procedencia",
                table: "ResumoTls");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Procedencia",
                table: "ResumoTls",
                type: "nvarchar(max)",
                nullable: true);
        }
    }
}
