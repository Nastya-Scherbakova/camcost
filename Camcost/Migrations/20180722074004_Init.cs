﻿using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace Camcost.Migrations
{
    public partial class Init : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Items",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    About = table.Column<string>(nullable: true),
                    Cathegory = table.Column<string>(nullable: true),
                    Filters = table.Column<string>(nullable: true),
                    FiltersNames = table.Column<string>(nullable: true),
                    Firm = table.Column<string>(nullable: true),
                    Gender = table.Column<int>(nullable: false),
                    Image = table.Column<byte[]>(nullable: true),
                    Price = table.Column<double>(nullable: false),
                    Title = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Items", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Orders",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    AdditionalInfo = table.Column<string>(nullable: true),
                    CityCtrl = table.Column<string>(nullable: true),
                    Comment = table.Column<string>(nullable: true),
                    DeliveryVariant = table.Column<string>(nullable: true),
                    Email = table.Column<string>(nullable: true),
                    House = table.Column<string>(nullable: true),
                    IsDone = table.Column<bool>(nullable: false),
                    Middlename = table.Column<string>(nullable: true),
                    Name = table.Column<string>(nullable: true),
                    PayVariant = table.Column<string>(nullable: true),
                    Phone = table.Column<string>(nullable: true),
                    Postmail = table.Column<string>(nullable: true),
                    Room = table.Column<string>(nullable: true),
                    Street = table.Column<string>(nullable: true),
                    Sum = table.Column<double>(nullable: false),
                    Surname = table.Column<string>(nullable: true),
                    TakeVariant = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Orders", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "BuyItems",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Count = table.Column<int>(nullable: false),
                    ItemId = table.Column<int>(nullable: false),
                    OrderId = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BuyItems", x => x.Id);
                    table.ForeignKey(
                        name: "FK_BuyItems_Items_ItemId",
                        column: x => x.ItemId,
                        principalTable: "Items",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_BuyItems_Orders_OrderId",
                        column: x => x.OrderId,
                        principalTable: "Orders",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_BuyItems_ItemId",
                table: "BuyItems",
                column: "ItemId");

            migrationBuilder.CreateIndex(
                name: "IX_BuyItems_OrderId",
                table: "BuyItems",
                column: "OrderId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "BuyItems");

            migrationBuilder.DropTable(
                name: "Items");

            migrationBuilder.DropTable(
                name: "Orders");
        }
    }
}
