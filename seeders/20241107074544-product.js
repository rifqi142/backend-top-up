"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    return queryInterface.bulkInsert("products", [
      // Ragnarok Online
      {
        pr_ct_id: 1,
        pr_name: "40 Nyan Berry",
        pr_price: 13000,
        pr_stock_quantity: 50,
        pr_created_at: new Date(),
        pr_updated_at: new Date(),
      },
      {
        pr_ct_id: 1,
        pr_name: "125 Nyan Berry",
        pr_price: 38000,
        pr_stock_quantity: 50,
        pr_created_at: new Date(),
        pr_updated_at: new Date(),
      },
      {
        pr_ct_id: 1,
        pr_name: "210 Nyan Berry",
        pr_price: 65000,
        pr_stock_quantity: 50,
        pr_created_at: new Date(),
        pr_updated_at: new Date(),
      },
      {
        pr_ct_id: 1,
        pr_name: "430 Nyan Berry",
        pr_price: 125000,
        pr_stock_quantity: 50,
        pr_created_at: new Date(),
        pr_updated_at: new Date(),
      },
      {
        pr_ct_id: 1,
        pr_name: "900 Nyan Berry",
        pr_price: 260000,
        pr_stock_quantity: 50,
        pr_created_at: new Date(),
        pr_updated_at: new Date(),
      },

      // Arena of Valor
      {
        pr_ct_id: 2,
        pr_name: "40 Voucher",
        pr_price: 9000,
        pr_stock_quantity: 50,
        pr_created_at: new Date(),
        pr_updated_at: new Date(),
      },
      {
        pr_ct_id: 2,
        pr_name: "90 Voucher",
        pr_price: 18000,
        pr_stock_quantity: 50,
        pr_created_at: new Date(),
        pr_updated_at: new Date(),
      },
      {
        pr_ct_id: 2,
        pr_name: "230 Voucher",
        pr_price: 45000,
        pr_stock_quantity: 50,
        pr_created_at: new Date(),
        pr_updated_at: new Date(),
      },
      {
        pr_ct_id: 2,
        pr_name: "470 Voucher",
        pr_price: 91000,
        pr_stock_quantity: 50,
        pr_created_at: new Date(),
        pr_updated_at: new Date(),
      },
      {
        pr_ct_id: 2,
        pr_name: "950 Voucher",
        pr_price: 182644,
        pr_stock_quantity: 50,
        pr_created_at: new Date(),
        pr_updated_at: new Date(),
      },

      // Undawn
      {
        pr_ct_id: 3,
        pr_name: "80 RC",
        pr_price: 13000,
        pr_stock_quantity: 50,
        pr_created_at: new Date(),
        pr_updated_at: new Date(),
      },
      {
        pr_ct_id: 3,
        pr_name: "250 RC",
        pr_price: 41000,
        pr_stock_quantity: 50,
        pr_created_at: new Date(),
        pr_updated_at: new Date(),
      },
      {
        pr_ct_id: 3,
        pr_name: "450 RC",
        pr_price: 68000,
        pr_stock_quantity: 50,
        pr_created_at: new Date(),
        pr_updated_at: new Date(),
      },
      {
        pr_ct_id: 3,
        pr_name: "920 RC",
        pr_price: 136000,
        pr_stock_quantity: 50,
        pr_created_at: new Date(),
        pr_updated_at: new Date(),
      },
      {
        pr_ct_id: 3,
        pr_name: "1850 RC",
        pr_price: 273000,
        pr_stock_quantity: 50,
        pr_created_at: new Date(),
        pr_updated_at: new Date(),
      },

      // Teamfight Tactics
      {
        pr_ct_id: 4,
        pr_name: "200 TFT Coins",
        pr_price: 15000,
        pr_stock_quantity: 50,
        pr_created_at: new Date(),
        pr_updated_at: new Date(),
      },
      {
        pr_ct_id: 4,
        pr_name: "625 TFT Coins",
        pr_price: 45000,
        pr_stock_quantity: 50,
        pr_created_at: new Date(),
        pr_updated_at: new Date(),
      },
      {
        pr_ct_id: 4,
        pr_name: "1525 TFT Coins",
        pr_price: 107000,
        pr_stock_quantity: 50,
        pr_created_at: new Date(),
        pr_updated_at: new Date(),
      },
      {
        pr_ct_id: 4,
        pr_name: "2900 TFT Coins",
        pr_price: 199000,
        pr_stock_quantity: 50,
        pr_created_at: new Date(),
        pr_updated_at: new Date(),
      },
      {
        pr_ct_id: 4,
        pr_name: "4600 TFT Coins",
        pr_price: 307000,
        pr_stock_quantity: 50,
        pr_created_at: new Date(),
        pr_updated_at: new Date(),
      },

      // Black Clover
      {
        pr_ct_id: 5,
        pr_name: "40 BC Crystal",
        pr_price: 13000,
        pr_stock_quantity: 50,
        pr_created_at: new Date(),
        pr_updated_at: new Date(),
      },
      {
        pr_ct_id: 5,
        pr_name: "225 BC Crystal",
        pr_price: 68000,
        pr_stock_quantity: 50,
        pr_created_at: new Date(),
        pr_updated_at: new Date(),
      },
      {
        pr_ct_id: 5,
        pr_name: "470 BC Crystal",
        pr_price: 136000,
        pr_stock_quantity: 50,
        pr_created_at: new Date(),
        pr_updated_at: new Date(),
      },
      {
        pr_ct_id: 5,
        pr_name: "980 BC Crystal",
        pr_price: 272000,
        pr_stock_quantity: 50,
        pr_created_at: new Date(),
        pr_updated_at: new Date(),
      },
      {
        pr_ct_id: 5,
        pr_name: "1560 BC Crystal",
        pr_price: 408000,
        pr_stock_quantity: 50,
        pr_created_at: new Date(),
        pr_updated_at: new Date(),
      },

      // Brawl Stars
      {
        pr_ct_id: 6,
        pr_name: "80 Gems",
        pr_price: 69000,
        pr_stock_quantity: 50,
        pr_created_at: new Date(),
        pr_updated_at: new Date(),
      },
      {
        pr_ct_id: 6,
        pr_name: "170 Gems",
        pr_price: 139000,
        pr_stock_quantity: 50,
        pr_created_at: new Date(),
        pr_updated_at: new Date(),
      },
      {
        pr_ct_id: 6,
        pr_name: "360 Gems",
        pr_price: 278000,
        pr_stock_quantity: 50,
        pr_created_at: new Date(),
        pr_updated_at: new Date(),
      },
      {
        pr_ct_id: 6,
        pr_name: "950 Gems",
        pr_price: 695000,
        pr_stock_quantity: 50,
        pr_created_at: new Date(),
        pr_updated_at: new Date(),
      },
      {
        pr_ct_id: 6,
        pr_name: "2000 Gems",
        pr_price: 1390000,
        pr_stock_quantity: 50,
        pr_created_at: new Date(),
        pr_updated_at: new Date(),
      },

      // Tarisland
      {
        pr_ct_id: 7,
        pr_name: "60 Crystal",
        pr_price: 25000,
        pr_stock_quantity: 50,
        pr_created_at: new Date(),
        pr_updated_at: new Date(),
      },
      {
        pr_ct_id: 7,
        pr_name: "330 Crystal",
        pr_price: 119000,
        pr_stock_quantity: 50,
        pr_created_at: new Date(),
        pr_updated_at: new Date(),
      },
      {
        pr_ct_id: 7,
        pr_name: "700 Crystal",
        pr_price: 242000,
        pr_stock_quantity: 50,
        pr_created_at: new Date(),
        pr_updated_at: new Date(),
      },
      {
        pr_ct_id: 7,
        pr_name: "1800 Crystal",
        pr_price: 570000,
        pr_stock_quantity: 50,
        pr_created_at: new Date(),
        pr_updated_at: new Date(),
      },
      {
        pr_ct_id: 7,
        pr_name: "3600 Crystal",
        pr_price: 1142000,
        pr_stock_quantity: 50,
        pr_created_at: new Date(),
        pr_updated_at: new Date(),
      },

      // Super SUS
      {
        pr_ct_id: 8,
        pr_name: "100 Golden Star",
        pr_price: 12000,
        pr_stock_quantity: 50,
        pr_created_at: new Date(),
        pr_updated_at: new Date(),
      },
      {
        pr_ct_id: 8,
        pr_name: "310 Golden Star",
        pr_price: 37000,
        pr_stock_quantity: 50,
        pr_created_at: new Date(),
        pr_updated_at: new Date(),
      },
      {
        pr_ct_id: 8,
        pr_name: "520 Golden Star",
        pr_price: 61000,
        pr_stock_quantity: 50,
        pr_created_at: new Date(),
        pr_updated_at: new Date(),
      },
      {
        pr_ct_id: 8,
        pr_name: "1060 Golden Star",
        pr_price: 123000,
        pr_stock_quantity: 50,
        pr_created_at: new Date(),
        pr_updated_at: new Date(),
      },
      {
        pr_ct_id: 8,
        pr_name: "2180 Golden Star",
        pr_price: 241000,
        pr_stock_quantity: 50,
        pr_created_at: new Date(),
        pr_updated_at: new Date(),
      },

      // Blood Strike
      {
        pr_ct_id: 9,
        pr_name: "100 Golds",
        pr_price: 11000,
        pr_stock_quantity: 50,
        pr_created_at: new Date(),
        pr_updated_at: new Date(),
      },
      {
        pr_ct_id: 9,
        pr_name: "300 Gold",
        pr_price: 36000,
        pr_stock_quantity: 50,
        pr_created_at: new Date(),
        pr_updated_at: new Date(),
      },
      {
        pr_ct_id: 9,
        pr_name: "500 Gold",
        pr_price: 60000,
        pr_stock_quantity: 50,
        pr_created_at: new Date(),
        pr_updated_at: new Date(),
      },
      {
        pr_ct_id: 9,
        pr_name: "1000 Gold",
        pr_price: 120000,
        pr_stock_quantity: 50,
        pr_created_at: new Date(),
        pr_updated_at: new Date(),
      },
      {
        pr_ct_id: 9,
        pr_name: "2000 Gold",
        pr_price: 240000,
        pr_stock_quantity: 50,
        pr_created_at: new Date(),
        pr_updated_at: new Date(),
      },

      // Arknight
      {
        pr_ct_id: 10,
        pr_name: "6 Originium",
        pr_price: 69000,
        pr_stock_quantity: 50,
        pr_created_at: new Date(),
        pr_updated_at: new Date(),
      },
      {
        pr_ct_id: 10,
        pr_name: "20 Originium",
        pr_price: 208000,
        pr_stock_quantity: 50,
        pr_created_at: new Date(),
        pr_updated_at: new Date(),
      },
      {
        pr_ct_id: 10,
        pr_name: "40 Originium",
        pr_price: 417000,
        pr_stock_quantity: 50,
        pr_created_at: new Date(),
        pr_updated_at: new Date(),
      },
      {
        pr_ct_id: 10,
        pr_name: "66 Originium",
        pr_price: 695000,
        pr_stock_quantity: 50,
        pr_created_at: new Date(),
        pr_updated_at: new Date(),
      },
      {
        pr_ct_id: 10,
        pr_name: "130 Originium",
        pr_price: 1390000,
        pr_stock_quantity: 50,
        pr_created_at: new Date(),
        pr_updated_at: new Date(),
      },

      // Pokemon United
      {
        pr_ct_id: 11,
        pr_name: "60 Aeos Gems",
        pr_price: 13000,
        pr_stock_quantity: 50,
        pr_created_at: new Date(),
        pr_updated_at: new Date(),
      },
      {
        pr_ct_id: 11,
        pr_name: "250 Aeos Gems",
        pr_price: 54000,
        pr_stock_quantity: 50,
        pr_created_at: new Date(),
        pr_updated_at: new Date(),
      },
      {
        pr_ct_id: 11,
        pr_name: "525 Aeos Gems",
        pr_price: 106000,
        pr_stock_quantity: 50,
        pr_created_at: new Date(),
        pr_updated_at: new Date(),
      },
      {
        pr_ct_id: 11,
        pr_name: "1350 Aeos Gems",
        pr_price: 273000,
        pr_stock_quantity: 50,
        pr_created_at: new Date(),
        pr_updated_at: new Date(),
      },
      {
        pr_ct_id: 11,
        pr_name: "2750 Aeos Gems",
        pr_price: 646000,
        pr_stock_quantity: 50,
        pr_created_at: new Date(),
        pr_updated_at: new Date(),
      },

      // 8 Ball Pool
      {
        pr_ct_id: 12,
        pr_name: "20 Cash",
        pr_price: 19000,
        pr_stock_quantity: 50,
        pr_created_at: new Date(),
        pr_updated_at: new Date(),
      },
      {
        pr_ct_id: 12,
        pr_name: "50 Cash",
        pr_price: 49000,
        pr_stock_quantity: 50,
        pr_created_at: new Date(),
        pr_updated_at: new Date(),
      },
      {
        pr_ct_id: 12,
        pr_name: "110 Cash",
        pr_price: 99000,
        pr_stock_quantity: 50,
        pr_created_at: new Date(),
        pr_updated_at: new Date(),
      },
      {
        pr_ct_id: 12,
        pr_name: "220 Cash",
        pr_price: 195000,
        pr_stock_quantity: 50,
        pr_created_at: new Date(),
        pr_updated_at: new Date(),
      },
      {
        pr_ct_id: 12,
        pr_name: "440 Cash",
        pr_price: 390000,
        pr_stock_quantity: 50,
        pr_created_at: new Date(),
        pr_updated_at: new Date(),
      },

      // FC Mobile
      {
        pr_ct_id: 13,
        pr_name: "100 FC Points",
        pr_price: 165000,
        pr_stock_quantity: 50,
        pr_created_at: new Date(),
        pr_updated_at: new Date(),
      },
      {
        pr_ct_id: 13,
        pr_name: "200 FC Points",
        pr_price: 32000,
        pr_stock_quantity: 50,
        pr_created_at: new Date(),
        pr_updated_at: new Date(),
      },
      {
        pr_ct_id: 13,
        pr_name: "520 FC Points",
        pr_price: 78000,
        pr_stock_quantity: 50,
        pr_created_at: new Date(),
        pr_updated_at: new Date(),
      },
      {
        pr_ct_id: 13,
        pr_name: "1070 FC Points",
        pr_price: 156000,
        pr_stock_quantity: 50,
        pr_created_at: new Date(),
        pr_updated_at: new Date(),
      },
      {
        pr_ct_id: 13,
        pr_name: "2200 FC Points",
        pr_price: 320000,
        pr_stock_quantity: 50,
        pr_created_at: new Date(),
        pr_updated_at: new Date(),
      },

      // Warewolf
      {
        pr_ct_id: 14,
        pr_name: "45 Diamonds",
        pr_price: 16000,
        pr_stock_quantity: 50,
        pr_created_at: new Date(),
        pr_updated_at: new Date(),
      },
      {
        pr_ct_id: 14,
        pr_name: "99 Diamonds",
        pr_price: 35000,
        pr_stock_quantity: 50,
        pr_created_at: new Date(),
        pr_updated_at: new Date(),
      },
      {
        pr_ct_id: 14,
        pr_name: "150 Diamonds",
        pr_price: 53000,
        pr_stock_quantity: 50,
        pr_created_at: new Date(),
        pr_updated_at: new Date(),
      },
      {
        pr_ct_id: 14,
        pr_name: "225 Diamonds",
        pr_price: 80000,
        pr_stock_quantity: 50,
        pr_created_at: new Date(),
        pr_updated_at: new Date(),
      },
      {
        pr_ct_id: 14,
        pr_name: "495 Diamonds",
        pr_price: 177000,
        pr_stock_quantity: 50,
        pr_created_at: new Date(),
        pr_updated_at: new Date(),
      },

      // Seal M Sea
      {
        pr_ct_id: 15,
        pr_name: "123 Ruby",
        pr_price: 11000,
        pr_stock_quantity: 50,
        pr_created_at: new Date(),
        pr_updated_at: new Date(),
      },
      {
        pr_ct_id: 15,
        pr_name: "250 Ruby",
        pr_price: 23000,
        pr_stock_quantity: 50,
        pr_created_at: new Date(),
        pr_updated_at: new Date(),
      },
      {
        pr_ct_id: 15,
        pr_name: "775 Ruby",
        pr_price: 70000,
        pr_stock_quantity: 50,
        pr_created_at: new Date(),
        pr_updated_at: new Date(),
      },
      {
        pr_ct_id: 15,
        pr_name: "1300 Ruby",
        pr_price: 117000,
        pr_stock_quantity: 50,
        pr_created_at: new Date(),
        pr_updated_at: new Date(),
      },
      {
        pr_ct_id: 15,
        pr_name: "2650 Ruby",
        pr_price: 234000,
        pr_stock_quantity: 50,
        pr_created_at: new Date(),
        pr_updated_at: new Date(),
      },

      // Metal Slug
      {
        pr_ct_id: 16,
        pr_name: "24 Ruby",
        pr_price: 6000,
        pr_stock_quantity: 50,
        pr_created_at: new Date(),
        pr_updated_at: new Date(),
      },
      {
        pr_ct_id: 16,
        pr_name: "60 Ruby",
        pr_price: 14000,
        pr_stock_quantity: 50,
        pr_created_at: new Date(),
        pr_updated_at: new Date(),
      },
      {
        pr_ct_id: 16,
        pr_name: "122 Ruby",
        pr_price: 30000,
        pr_stock_quantity: 50,
        pr_created_at: new Date(),
        pr_updated_at: new Date(),
      },
      {
        pr_ct_id: 16,
        pr_name: "182 Ruby",
        pr_price: 45000,
        pr_stock_quantity: 50,
        pr_created_at: new Date(),
        pr_updated_at: new Date(),
      },
      {
        pr_ct_id: 16,
        pr_name: "310 Ruby",
        pr_price: 65000,
        pr_stock_quantity: 50,
        pr_created_at: new Date(),
        pr_updated_at: new Date(),
      },

      // Free fire
      {
        pr_ct_id: 17,
        pr_name: "50 Diamonds",
        pr_price: 6600,
        pr_stock_quantity: 50,
        pr_created_at: new Date(),
        pr_updated_at: new Date(),
      },
      {
        pr_ct_id: 17,
        pr_name: "75 Diamonds",
        pr_price: 10000,
        pr_stock_quantity: 50,
        pr_created_at: new Date(),
        pr_updated_at: new Date(),
      },
      {
        pr_ct_id: 17,
        pr_name: "100 Diamond",
        pr_price: 13000,
        pr_stock_quantity: 50,
        pr_created_at: new Date(),
        pr_updated_at: new Date(),
      },
      {
        pr_ct_id: 17,
        pr_name: "140 Diamond",
        pr_price: 18000,
        pr_stock_quantity: 50,
        pr_created_at: new Date(),
        pr_updated_at: new Date(),
      },
      {
        pr_ct_id: 17,
        pr_name: "210 Diamond",
        pr_price: 27500,
        pr_stock_quantity: 50,
        pr_created_at: new Date(),
        pr_updated_at: new Date(),
      },

      // One Punch Man
      {
        pr_ct_id: 18,
        pr_name: "6 Coupon",
        pr_price: 9000,
        pr_stock_quantity: 50,
        pr_created_at: new Date(),
        pr_updated_at: new Date(),
      },
      {
        pr_ct_id: 18,
        pr_name: "37 Coupon",
        pr_price: 58000,
        pr_stock_quantity: 50,
        pr_created_at: new Date(),
        pr_updated_at: new Date(),
      },
      {
        pr_ct_id: 18,
        pr_name: "109 Coupon",
        pr_price: 176000,
        pr_stock_quantity: 50,
        pr_created_at: new Date(),
        pr_updated_at: new Date(),
      },
      {
        pr_ct_id: 18,
        pr_name: "362 Coupon",
        pr_price: 587000,
        pr_stock_quantity: 50,
        pr_created_at: new Date(),
        pr_updated_at: new Date(),
      },
      {
        pr_ct_id: 18,
        pr_name: "904 Coupon",
        pr_price: 1546150,
        pr_stock_quantity: 50,
        pr_created_at: new Date(),
        pr_updated_at: new Date(),
      },

      // Luna Online
      {
        pr_ct_id: 19,
        pr_name: "3750 Coins",
        pr_price: 15000,
        pr_stock_quantity: 50,
        pr_created_at: new Date(),
        pr_updated_at: new Date(),
      },
      {
        pr_ct_id: 19,
        pr_name: "7500 Coins",
        pr_price: 30000,
        pr_stock_quantity: 50,
        pr_created_at: new Date(),
        pr_updated_at: new Date(),
      },
      {
        pr_ct_id: 19,
        pr_name: "12500 Coins",
        pr_price: 50000,
        pr_stock_quantity: 50,
        pr_created_at: new Date(),
        pr_updated_at: new Date(),
      },
      {
        pr_ct_id: 19,
        pr_name: "25000 Coins",
        pr_price: 100000,
        pr_stock_quantity: 50,
        pr_created_at: new Date(),
        pr_updated_at: new Date(),
      },
      {
        pr_ct_id: 19,
        pr_name: "50000 Coins",
        pr_price: 200000,
        pr_stock_quantity: 50,
        pr_created_at: new Date(),
        pr_updated_at: new Date(),
      },

      // Mobile Legend
      {
        pr_ct_id: 20,
        pr_name: "46 Diamonds",
        pr_price: 13000,
        pr_stock_quantity: 50,
        pr_created_at: new Date(),
        pr_updated_at: new Date(),
      },
      {
        pr_ct_id: 20,
        pr_name: "85 Diamonds",
        pr_price: 23000,
        pr_stock_quantity: 50,
        pr_created_at: new Date(),
        pr_updated_at: new Date(),
      },
      {
        pr_ct_id: 20,
        pr_name: "110 Diamonds",
        pr_price: 30000,
        pr_stock_quantity: 50,
        pr_created_at: new Date(),
        pr_updated_at: new Date(),
      },
      {
        pr_ct_id: 20,
        pr_name: "172 Diamonds",
        pr_price: 47000,
        pr_stock_quantity: 50,
        pr_created_at: new Date(),
        pr_updated_at: new Date(),
      },
      {
        pr_ct_id: 20,
        pr_name: "257 Diamonds",
        pr_price: 70000,
        pr_stock_quantity: 50,
        pr_created_at: new Date(),
        pr_updated_at: new Date(),
      },

      //  Honor of Kings
      {
        pr_ct_id: 21,
        pr_name: "88 Tokens",
        pr_price: 12000,
        pr_stock_quantity: 50,
        pr_created_at: new Date(),
        pr_updated_at: new Date(),
      },
      {
        pr_ct_id: 21,
        pr_name: "240 Tokens",
        pr_price: 38000,
        pr_stock_quantity: 50,
        pr_created_at: new Date(),
        pr_updated_at: new Date(),
      },
      {
        pr_ct_id: 21,
        pr_name: "432 Tokens",
        pr_price: 65000,
        pr_stock_quantity: 50,
        pr_created_at: new Date(),
        pr_updated_at: new Date(),
      },
      {
        pr_ct_id: 21,
        pr_name: "605 Tokens",
        pr_price: 89000,
        pr_stock_quantity: 50,
        pr_created_at: new Date(),
        pr_updated_at: new Date(),
      },
      {
        pr_ct_id: 21,
        pr_name: "1353 Tokens",
        pr_price: 189000,
        pr_stock_quantity: 50,
        pr_created_at: new Date(),
        pr_updated_at: new Date(),
      },

      // Valorant
      {
        pr_ct_id: 22,
        pr_name: "475 Valorant Points",
        pr_price: 55000,
        pr_stock_quantity: 50,
        pr_created_at: new Date(),
        pr_updated_at: new Date(),
      },
      {
        pr_ct_id: 22,
        pr_name: "1000 Valorant Points",
        pr_price: 111194,
        pr_stock_quantity: 50,
        pr_created_at: new Date(),
        pr_updated_at: new Date(),
      },
      {
        pr_ct_id: 22,
        pr_name: "2050 Valorant Points",
        pr_price: 222000,
        pr_stock_quantity: 50,
        pr_created_at: new Date(),
        pr_updated_at: new Date(),
      },
      {
        pr_ct_id: 22,
        pr_name: "3650 Valorant Points",
        pr_price: 386000,
        pr_stock_quantity: 50,
        pr_created_at: new Date(),
        pr_updated_at: new Date(),
      },
      {
        pr_ct_id: 22,
        pr_name: "5350 Valorant Points",
        pr_price: 554000,
        pr_stock_quantity: 50,
        pr_created_at: new Date(),
        pr_updated_at: new Date(),
      },

      // PUBG Mobile
      {
        pr_ct_id: 23,
        pr_name: "60 UC",
        pr_price: 13000,
        pr_stock_quantity: 50,
        pr_created_at: new Date(),
        pr_updated_at: new Date(),
      },
      {
        pr_ct_id: 23,
        pr_name: "325 UC",
        pr_price: 70000,
        pr_stock_quantity: 50,
        pr_created_at: new Date(),
        pr_updated_at: new Date(),
      },
      {
        pr_ct_id: 23,
        pr_name: "660 UC",
        pr_price: 140000,
        pr_stock_quantity: 50,
        pr_created_at: new Date(),
        pr_updated_at: new Date(),
      },
      {
        pr_ct_id: 23,
        pr_name: "985 UC",
        pr_price: 194000,
        pr_stock_quantity: 50,
        pr_created_at: new Date(),
        pr_updated_at: new Date(),
      },
      {
        pr_ct_id: 23,
        pr_name: "1800 UC",
        pr_price: 324000,
        pr_stock_quantity: 50,
        pr_created_at: new Date(),
        pr_updated_at: new Date(),
      },

      // Genshin
      {
        pr_ct_id: 24,
        pr_name: "60 Genesis Crystals",
        pr_price: 11000,
        pr_stock_quantity: 50,
        pr_created_at: new Date(),
        pr_updated_at: new Date(),
      },
      {
        pr_ct_id: 24,
        pr_name: "330 Genesis Crystals",
        pr_price: 30000,
        pr_stock_quantity: 50,
        pr_created_at: new Date(),
        pr_updated_at: new Date(),
      },
      {
        pr_ct_id: 24,
        pr_name: "1090 Genesis Crystals",
        pr_price: 178000,
        pr_stock_quantity: 50,
        pr_created_at: new Date(),
        pr_updated_at: new Date(),
      },
      {
        pr_ct_id: 24,
        pr_name: "2150 Genesis Crystals",
        pr_price: 386000,
        pr_stock_quantity: 50,
        pr_created_at: new Date(),
        pr_updated_at: new Date(),
      },
      {
        pr_ct_id: 24,
        pr_name: "4060 Genesis Crystals",
        pr_price: 594000,
        pr_stock_quantity: 50,
        pr_created_at: new Date(),
        pr_updated_at: new Date(),
      },

      //  LOL Wild Rift
      {
        pr_ct_id: 25,
        pr_name: "425 Wild Cores",
        pr_price: 56000,
        pr_stock_quantity: 50,
        pr_created_at: new Date(),
        pr_updated_at: new Date(),
      },
      {
        pr_ct_id: 25,
        pr_name: "1000 Wild Cores",
        pr_price: 125000,
        pr_stock_quantity: 50,
        pr_created_at: new Date(),
        pr_updated_at: new Date(),
      },
      {
        pr_ct_id: 25,
        pr_name: "1850 Wild Cores",
        pr_price: 226000,
        pr_stock_quantity: 50,
        pr_created_at: new Date(),
        pr_updated_at: new Date(),
      },
      {
        pr_ct_id: 25,
        pr_name: "3275 Wild Cores",
        pr_price: 397000,
        pr_stock_quantity: 50,
        pr_created_at: new Date(),
        pr_updated_at: new Date(),
      },
      {
        pr_ct_id: 25,
        pr_name: "4800 Wild Cores",
        pr_price: 567000,
        pr_stock_quantity: 50,
        pr_created_at: new Date(),
        pr_updated_at: new Date(),
      },

      // Honkai
      {
        pr_ct_id: 26,
        pr_name: "60 Oneiric Shard",
        pr_price: 14000,
        pr_stock_quantity: 50,
        pr_created_at: new Date(),
        pr_updated_at: new Date(),
      },
      {
        pr_ct_id: 26,
        pr_name: "330 Oneiric Shard",
        pr_price: 60000,
        pr_stock_quantity: 50,
        pr_created_at: new Date(),
        pr_updated_at: new Date(),
      },
      {
        pr_ct_id: 26,
        pr_name: "1090 Oneiric Shard",
        pr_price: 183000,
        pr_stock_quantity: 50,
        pr_created_at: new Date(),
        pr_updated_at: new Date(),
      },
      {
        pr_ct_id: 26,
        pr_name: "2240 Oneiric Shard",
        pr_price: 396000,
        pr_stock_quantity: 50,
        pr_created_at: new Date(),
        pr_updated_at: new Date(),
      },
      {
        pr_ct_id: 26,
        pr_name: "3890 Oneiric Shard",
        pr_price: 610000,
        pr_stock_quantity: 50,
        pr_created_at: new Date(),
        pr_updated_at: new Date(),
      },

      // COD Mobile
      {
        pr_ct_id: 27,
        pr_name: "63 CP",
        pr_price: 9000,
        pr_stock_quantity: 50,
        pr_created_at: new Date(),
        pr_updated_at: new Date(),
      },
      {
        pr_ct_id: 27,
        pr_name: "128 CP",
        pr_price: 18000,
        pr_stock_quantity: 50,
        pr_created_at: new Date(),
        pr_updated_at: new Date(),
      },
      {
        pr_ct_id: 27,
        pr_name: "321 CP",
        pr_price: 45000,
        pr_stock_quantity: 50,
        pr_created_at: new Date(),
        pr_updated_at: new Date(),
      },
      {
        pr_ct_id: 27,
        pr_name: "1373 CP",
        pr_price: 182000,
        pr_stock_quantity: 50,
        pr_created_at: new Date(),
        pr_updated_at: new Date(),
      },
      {
        pr_ct_id: 27,
        pr_name: "2750 CP",
        pr_price: 347000,
        pr_stock_quantity: 50,
        pr_created_at: new Date(),
        pr_updated_at: new Date(),
      },

      // Clash of clans
      {
        pr_ct_id: 28,
        pr_name: "500 Gems",
        pr_price: 69000,
        pr_stock_quantity: 50,
        pr_created_at: new Date(),
        pr_updated_at: new Date(),
      },
      {
        pr_ct_id: 28,
        pr_name: "1200 Gems",
        pr_price: 139000,
        pr_stock_quantity: 50,
        pr_created_at: new Date(),
        pr_updated_at: new Date(),
      },
      {
        pr_ct_id: 28,
        pr_name: "2500 Gems",
        pr_price: 278000,
        pr_stock_quantity: 50,
        pr_created_at: new Date(),
        pr_updated_at: new Date(),
      },
      {
        pr_ct_id: 28,
        pr_name: "6500 Gems",
        pr_price: 695000,
        pr_stock_quantity: 50,
        pr_created_at: new Date(),
        pr_updated_at: new Date(),
      },
      {
        pr_ct_id: 28,
        pr_name: "1400 Gems",
        pr_price: 1390000,
        pr_stock_quantity: 50,
        pr_created_at: new Date(),
        pr_updated_at: new Date(),
      },

      // Sausage Man
      {
        pr_ct_id: 29,
        pr_name: "61 Candy",
        pr_price: 11000,
        pr_stock_quantity: 50,
        pr_created_at: new Date(),
        pr_updated_at: new Date(),
      },
      {
        pr_ct_id: 29,
        pr_name: "186 Candy",
        pr_price: 18000,
        pr_stock_quantity: 50,
        pr_created_at: new Date(),
        pr_updated_at: new Date(),
      },
      {
        pr_ct_id: 29,
        pr_name: "160 Candy",
        pr_price: 36000,
        pr_stock_quantity: 50,
        pr_created_at: new Date(),
        pr_updated_at: new Date(),
      },
      {
        pr_ct_id: 29,
        pr_name: "320 Candy",
        pr_price: 63000,
        pr_stock_quantity: 50,
        pr_created_at: new Date(),
        pr_updated_at: new Date(),
      },
      {
        pr_ct_id: 29,
        pr_name: "686 Candy",
        pr_price: 126000,
        pr_stock_quantity: 50,
        pr_created_at: new Date(),
        pr_updated_at: new Date(),
      },

      // Solo Leveling
      {
        pr_ct_id: 30,
        pr_name: "1150 Diamond",
        pr_price: 145000,
        pr_stock_quantity: 50,
        pr_created_at: new Date(),
        pr_updated_at: new Date(),
      },
      {
        pr_ct_id: 30,
        pr_name: "2600 Diamond",
        pr_price: 319000,
        pr_stock_quantity: 50,
        pr_created_at: new Date(),
        pr_updated_at: new Date(),
      },
      {
        pr_ct_id: 30,
        pr_name: "4750 Diamond",
        pr_price: 580000,
        pr_stock_quantity: 50,
        pr_created_at: new Date(),
        pr_updated_at: new Date(),
      },
      {
        pr_ct_id: 30,
        pr_name: "8700 Diamond",
        pr_price: 1015000,
        pr_stock_quantity: 50,
        pr_created_at: new Date(),
        pr_updated_at: new Date(),
      },
      {
        pr_ct_id: 30,
        pr_name: "16400 Diamond",
        pr_price: 2030000,
        pr_stock_quantity: 50,
        pr_created_at: new Date(),
        pr_updated_at: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete("products", null, {});
  },
};