using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Architecture.Database.Migrations
{
    public partial class AddUserModelAvatar : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "AvatarGuid",
                schema: "User",
                table: "User",
                type: "nvarchar(max)",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "AvatarGuid",
                schema: "User",
                table: "User");
        }
    }
}
