using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Enlightme.Migrations
{
    /// <inheritdoc />
    public partial class UpdatedGenre : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Name",
                table: "Genres",
                newName: "Type");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Type",
                table: "Genres",
                newName: "Name");
        }
    }
}
