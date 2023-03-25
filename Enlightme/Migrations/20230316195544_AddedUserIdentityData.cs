using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Enlightme.Migrations
{
    /// <inheritdoc />
    public partial class AddedUserIdentityData : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "IsSuperUser",
                table: "Users",
                type: "boolean",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<string>(
                name: "Password",
                table: "Users",
                type: "text",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsSuperUser",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "Password",
                table: "Users");
        }
    }
}
