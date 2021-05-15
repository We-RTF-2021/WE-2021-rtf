using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace WebApp.Data.Migrations
{
    public partial class Cards : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Sets",
                columns: table => new
                {
                    SetID = table.Column<Guid>(type: "TEXT", nullable: false),
                    Name = table.Column<string>(type: "TEXT", nullable: false),
                    CountOfCards = table.Column<int>(type: "INTEGER", nullable: false),
                    PersonId = table.Column<string>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Sets", x => x.SetID);
                });

            migrationBuilder.CreateTable(
                name: "Cards",
                columns: table => new
                {
                    CardID = table.Column<Guid>(type: "TEXT", nullable: false),
                    EN_Name = table.Column<string>(type: "TEXT", nullable: false),
                    RU_Name = table.Column<string>(type: "TEXT", nullable: false),
                    SetID = table.Column<Guid>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Cards", x => x.CardID);
                    table.ForeignKey(
                        name: "FK_Cards_Sets_SetID",
                        column: x => x.SetID,
                        principalTable: "Sets",
                        principalColumn: "SetID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Progress",
                columns: table => new
                {
                    PersonName = table.Column<string>(type: "TEXT", nullable: false),
                    CardId = table.Column<Guid>(type: "TEXT", nullable: false),
                    DaysForNext = table.Column<int>(type: "INTEGER", nullable: false),
                    Status = table.Column<int>(type: "INTEGER", nullable: false),
                    SetID = table.Column<Guid>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Progress", x => new { x.PersonName, x.CardId });
                    table.ForeignKey(
                        name: "FK_Progress_Cards_CardId",
                        column: x => x.CardId,
                        principalTable: "Cards",
                        principalColumn: "CardID",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Progress_Sets_SetID",
                        column: x => x.SetID,
                        principalTable: "Sets",
                        principalColumn: "SetID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Cards_SetID",
                table: "Cards",
                column: "SetID");

            migrationBuilder.CreateIndex(
                name: "IX_Progress_CardId",
                table: "Progress",
                column: "CardId");

            migrationBuilder.CreateIndex(
                name: "IX_Progress_SetID",
                table: "Progress",
                column: "SetID");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Progress");

            migrationBuilder.DropTable(
                name: "Cards");

            migrationBuilder.DropTable(
                name: "Sets");
        }
    }
}
