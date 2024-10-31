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
    return queryInterface.bulkInsert("categories", [
      {
        ct_name: "Ragnarok Origin",
        ct_game_publisher: "Gravity",
        ct_image:
          "https://res.cloudinary.com/dqbdwqxsk/image/upload/v1730364839/img-ragnarok_k5bse4.webp",
        ct_created_at: new Date(),
        ct_updated_at: new Date(),
      },
      {
        ct_name: "Arena of Valor",
        ct_game_publisher: "Garena",
        ct_image:
          "https://res.cloudinary.com/dqbdwqxsk/image/upload/v1730364839/img-aov_myppsw.webp",
        ct_created_at: new Date(),
        ct_updated_at: new Date(),
      },
      {
        ct_name: "Undawn",
        ct_game_publisher: "Garena",
        ct_image:
          "https://res.cloudinary.com/dqbdwqxsk/image/upload/v1730364838/img-undawn_dyvt4z.webp",
        ct_created_at: new Date(),
        ct_updated_at: new Date(),
      },
      {
        ct_name: "Teamfight Tactics",
        ct_game_publisher: "Riot Games",
        ct_image:
          "https://res.cloudinary.com/dqbdwqxsk/image/upload/v1730364837/img-team-fight_nrzelb.webp",
        ct_created_at: new Date(),
        ct_updated_at: new Date(),
      },
      {
        ct_name: "Black Clover",
        ct_game_publisher: "Garena",
        ct_image:
          "https://res.cloudinary.com/dqbdwqxsk/image/upload/v1730364837/img-black-clover_sakboc.webp",
        ct_created_at: new Date(),
        ct_updated_at: new Date(),
      },
      {
        ct_name: "Brawl Stars",
        ct_game_publisher: "Supercell",
        ct_image:
          "https://res.cloudinary.com/dqbdwqxsk/image/upload/v1730364836/img-brawl-starts_uynkks.webp",
        ct_created_at: new Date(),
        ct_updated_at: new Date(),
      },
      {
        ct_name: "Taris Land",
        ct_game_publisher: "Tencent Games",
        ct_image:
          "https://res.cloudinary.com/dqbdwqxsk/image/upload/v1730364836/img-taris-land_vlzpaq.webp",
        ct_created_at: new Date(),
        ct_updated_at: new Date(),
      },
      {
        ct_name: "NBA Infinite",
        ct_game_publisher: "Level Infinite",
        ct_image:
          "https://res.cloudinary.com/dqbdwqxsk/image/upload/v1730364835/img-nba-infinite_regfla.webp",
        ct_created_at: new Date(),
        ct_updated_at: new Date(),
      },
      {
        ct_name: "Devil May Cry",
        ct_game_publisher: "nabulajoy",
        ct_image:
          "https://res.cloudinary.com/dqbdwqxsk/image/upload/v1730364834/img-devil-my-cry_vuofb0.webp",
        ct_created_at: new Date(),
        ct_updated_at: new Date(),
      },
      {
        ct_name: "Arknights",
        ct_game_publisher: "Yostar Limited",
        ct_image:
          "https://res.cloudinary.com/dqbdwqxsk/image/upload/v1730364833/img-arknights_wugobw.webp",
        ct_created_at: new Date(),
        ct_updated_at: new Date(),
      },
      {
        ct_name: "Pokemon United",
        ct_game_publisher: "The Pokemon Company",
        ct_image:
          "https://res.cloudinary.com/dqbdwqxsk/image/upload/v1730364832/img-pokemon-unite_x5aibo.webp",
        ct_created_at: new Date(),
        ct_updated_at: new Date(),
      },
      {
        ct_name: "8 Ball Pool",
        ct_game_publisher: "Miniclip",
        ct_image:
          "https://res.cloudinary.com/dqbdwqxsk/image/upload/v1730364832/img-8-ball_wcogre.webp",
        ct_created_at: new Date(),
        ct_updated_at: new Date(),
      },
      {
        ct_name: "FC Mobile",
        ct_game_publisher: "EA Sports",
        ct_image:
          "https://res.cloudinary.com/dqbdwqxsk/image/upload/v1730364831/img-fifa_a06avu.webp",
        ct_created_at: new Date(),
        ct_updated_at: new Date(),
      },
      {
        ct_name: "Wareworlf",
        ct_game_publisher: "Walkman",
        ct_image:
          "https://res.cloudinary.com/dqbdwqxsk/image/upload/v1730364830/img-warewolf_lj8qsn.webp",
        ct_created_at: new Date(),
        ct_updated_at: new Date(),
      },
      {
        ct_name: "Seal M Sea",
        ct_game_publisher: "PLAYWITH GAMES Inc",
        ct_image:
          "https://res.cloudinary.com/dqbdwqxsk/image/upload/v1730364830/img-seal_gezy0i.webp",
        ct_created_at: new Date(),
        ct_updated_at: new Date(),
      },
      {
        ct_name: "Metal Slug: Awekening",
        ct_game_publisher: "VNGGAMES",
        ct_image:
          "https://res.cloudinary.com/dqbdwqxsk/image/upload/v1730364830/img-metal-slug_dea9df.webp",
        ct_created_at: new Date(),
        ct_updated_at: new Date(),
      },
      {
        ct_name: "Free Fire",
        ct_game_publisher: "Garena",
        ct_image:
          "https://res.cloudinary.com/dqbdwqxsk/image/upload/v1730364829/img-free-fire_tedp5o.webp",
        ct_created_at: new Date(),
        ct_updated_at: new Date(),
      },
      {
        ct_name: "One Punch Man",
        ct_game_publisher: "Finger Fun",
        ct_image:
          "https://res.cloudinary.com/dqbdwqxsk/image/upload/v1730364828/img-one-punch-man_mwo44g.webp",
        ct_created_at: new Date(),
        ct_updated_at: new Date(),
      },
      {
        ct_name: "Luna Online New World",
        ct_game_publisher: "Lyto Games",
        ct_image:
          "https://res.cloudinary.com/dqbdwqxsk/image/upload/v1730364828/img-luna-online_fzdd1p.webp",
        ct_created_at: new Date(),
        ct_updated_at: new Date(),
      },
      {
        ct_name: "Mobile Legends",
        ct_game_publisher: "Moonton",
        ct_image:
          "https://res.cloudinary.com/dqbdwqxsk/image/upload/v1730364827/img-mobile-legend_cekwoh.webp",
        ct_created_at: new Date(),
        ct_updated_at: new Date(),
      },
      {
        ct_name: "Honor of Kings",
        ct_game_publisher: "Tencent Games",
        ct_image:
          "https://res.cloudinary.com/dqbdwqxsk/image/upload/v1730364827/img-honor-of-kings_tef806.webp",
        ct_created_at: new Date(),
        ct_updated_at: new Date(),
      },
      {
        ct_name: "Valorant",
        ct_game_publisher: "Riot Games",
        ct_image:
          "https://res.cloudinary.com/dqbdwqxsk/image/upload/v1730364826/img-valorant_ahcesf.webp",
        ct_created_at: new Date(),
        ct_updated_at: new Date(),
      },
      {
        ct_name: "PUBG Mobile",
        ct_game_publisher: "PUBG Corporation",
        ct_image:
          "https://res.cloudinary.com/dqbdwqxsk/image/upload/v1730364825/img-pubg_w5q7hr.webp",
        ct_created_at: new Date(),
        ct_updated_at: new Date(),
      },
      {
        ct_name: "Genshin Impact",
        ct_game_publisher: "miHoYo",
        ct_image:
          "https://res.cloudinary.com/dqbdwqxsk/image/upload/v1730364825/img-genshin_iejsnu.webp",
        ct_created_at: new Date(),
        ct_updated_at: new Date(),
      },
      {
        ct_name: "League of Legends: Wild Rift",
        ct_game_publisher: "Riot Games",
        ct_image:
          "https://res.cloudinary.com/dqbdwqxsk/image/upload/v1730364825/img-lol_qgtanc.webp",
        ct_created_at: new Date(),
        ct_updated_at: new Date(),
      },
      {
        ct_name: "Honkai: Star Rail",
        ct_game_publisher: "miHoYo",
        ct_image:
          "https://res.cloudinary.com/dqbdwqxsk/image/upload/v1730364825/img-honkai-starail_tz64ny.webp",
        ct_created_at: new Date(),
        ct_updated_at: new Date(),
      },
      {
        ct_name: "Call of Duty: Mobile",
        ct_game_publisher: "Activision",
        ct_image:
          "https://res.cloudinary.com/dqbdwqxsk/image/upload/v1730364825/img-cod_bedp55.webp",
        ct_created_at: new Date(),
        ct_updated_at: new Date(),
      },
      {
        ct_name: "Clash of Clans",
        ct_game_publisher: "Supercell",
        ct_image:
          "https://res.cloudinary.com/dqbdwqxsk/image/upload/v1730364825/img-coc_a9qhvg.webp",
        ct_created_at: new Date(),
        ct_updated_at: new Date(),
      },
      {
        ct_name: "Sausage Man",
        ct_game_publisher: "X.D. Network",
        ct_image:
          "https://res.cloudinary.com/dqbdwqxsk/image/upload/v1730364824/img-sausage-man_lsprha.webp",
        ct_created_at: new Date(),
        ct_updated_at: new Date(),
      },
      {
        ct_name: "Solo Leveling: Arise",
        ct_game_publisher: "Netmarble",
        ct_image:
          "https://res.cloudinary.com/dqbdwqxsk/image/upload/v1730364824/img-solo-leveling_npfgjh.webp",
        ct_created_at: new Date(),
        ct_updated_at: new Date(),
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
    return queryInterface.bulkDelete("users", null, {});
  },
};
