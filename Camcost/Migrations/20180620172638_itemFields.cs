using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace Camcost.Migrations
{
    public partial class itemFields : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Filters",
                table: "Items",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "FiltersNames",
                table: "Items",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Filters",
                table: "Items");

            migrationBuilder.DropColumn(
                name: "FiltersNames",
                table: "Items");
        }
    }
}
