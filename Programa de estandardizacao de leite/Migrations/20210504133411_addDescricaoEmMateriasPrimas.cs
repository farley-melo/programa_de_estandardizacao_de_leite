using Microsoft.EntityFrameworkCore.Migrations;

namespace Programa_de_estandardizacao_de_leite.Migrations
{
    public partial class addDescricaoEmMateriasPrimas : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Descricao",
                table: "materias_primas",
                type: "nvarchar(max)",
                nullable: true,
                defaultValue: "vazio");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Descricao",
                table: "materias_primas");
        }
    }
}
