using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace Camcost.Migrations
{
    public partial class ItemsImproving : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "FiltersNames",
                table: "Items",
                newName: "SubcathegoriesString");

            migrationBuilder.RenameColumn(
                name: "Filters",
                table: "Items",
                newName: "FilterValuesString");

            migrationBuilder.AddColumn<string>(
                name: "Country",
                table: "Items",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "FilterNamesString",
                table: "Items",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Country",
                table: "Items");

            migrationBuilder.DropColumn(
                name: "FilterNamesString",
                table: "Items");

            migrationBuilder.RenameColumn(
                name: "SubcathegoriesString",
                table: "Items",
                newName: "FiltersNames");

            migrationBuilder.RenameColumn(
                name: "FilterValuesString",
                table: "Items",
                newName: "Filters");
        }
    }
}
