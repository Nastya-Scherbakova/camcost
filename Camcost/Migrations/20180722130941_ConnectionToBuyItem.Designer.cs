﻿// <auto-generated />
using Camcost.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage;
using Microsoft.EntityFrameworkCore.Storage.Internal;
using System;

namespace Camcost.Migrations
{
    [DbContext(typeof(ItemContext))]
    [Migration("20180722130941_ConnectionToBuyItem")]
    partial class ConnectionToBuyItem
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "2.0.1-rtm-125")
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("Camcost.Models.BuyItem", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<int>("Count");

                    b.Property<int>("ItemId");

                    b.Property<int?>("OrderId");

                    b.HasKey("Id");

                    b.HasIndex("ItemId");

                    b.HasIndex("OrderId");

                    b.ToTable("BuyItems");
                });

            modelBuilder.Entity("Camcost.Models.Item", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("About");

                    b.Property<string>("Cathegory");

                    b.Property<string>("Country");

                    b.Property<string>("FilterNamesString");

                    b.Property<string>("FilterValuesString");

                    b.Property<string>("Firm");

                    b.Property<int>("Gender");

                    b.Property<byte[]>("Image");

                    b.Property<double>("Price");

                    b.Property<string>("SubcathegoriesString");

                    b.Property<string>("Title");

                    b.HasKey("Id");

                    b.ToTable("Items");
                });

            modelBuilder.Entity("Camcost.Models.Order", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("AdditionalInfo");

                    b.Property<string>("CityCtrl");

                    b.Property<string>("Comment");

                    b.Property<string>("DeliveryVariant");

                    b.Property<string>("Email");

                    b.Property<string>("House");

                    b.Property<bool>("IsDone");

                    b.Property<string>("Middlename");

                    b.Property<string>("Name");

                    b.Property<string>("PayVariant");

                    b.Property<string>("Phone");

                    b.Property<string>("Postmail");

                    b.Property<string>("Room");

                    b.Property<string>("Street");

                    b.Property<double>("Sum");

                    b.Property<string>("Surname");

                    b.Property<string>("TakeVariant");

                    b.HasKey("Id");

                    b.ToTable("Orders");
                });

            modelBuilder.Entity("Camcost.Models.BuyItem", b =>
                {
                    b.HasOne("Camcost.Models.Item", "Item")
                        .WithMany("WasBought")
                        .HasForeignKey("ItemId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("Camcost.Models.Order")
                        .WithMany("Items")
                        .HasForeignKey("OrderId");
                });
#pragma warning restore 612, 618
        }
    }
}
