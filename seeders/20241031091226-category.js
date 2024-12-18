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
        ct_code: "RAGNAROKORIGIN",
        ct_game_publisher: "Gravity",
        ct_image:
          "https://res.cloudinary.com/dqbdwqxsk/image/upload/v1730364839/img-ragnarok_k5bse4.webp",
        ct_image_cover:
          "https://res.cloudinary.com/dqbdwqxsk/image/upload/v1730865410/ragnarok_noodko.webp",
        ct_currency_type: "Nyan Berry",
        ct_currency_type_image:
          "https://res.cloudinary.com/dqbdwqxsk/image/upload/v1730879273/ragnarok-currency_ttjrar.webp",
        ct_is_active: true,
        ct_created_at: new Date(),
        ct_updated_at: new Date(),
      },
      {
        ct_name: "Arena of Valor",
        ct_code: "ARENAOFAVALOR",
        ct_game_publisher: "Garena",
        ct_image:
          "https://res.cloudinary.com/dqbdwqxsk/image/upload/v1730364839/img-aov_myppsw.webp",
        ct_image_cover:
          "https://res.cloudinary.com/dqbdwqxsk/image/upload/v1730865410/arena_of_valor_nswsfb.webp",
        ct_currency_type: "Voucher",
        ct_currency_type_image:
          "https://res.cloudinary.com/dqbdwqxsk/image/upload/v1730879307/aov-currency_mujcea.webp",
        ct_is_active: true,
        ct_created_at: new Date(),
        ct_updated_at: new Date(),
      },
      {
        ct_name: "Undawn",
        ct_code: "UNDAWN",
        ct_game_publisher: "Garena",
        ct_image:
          "https://res.cloudinary.com/dqbdwqxsk/image/upload/v1730364838/img-undawn_dyvt4z.webp",
        ct_image_cover:
          "https://res.cloudinary.com/dqbdwqxsk/image/upload/v1730865410/undawn_wh9obn.webp",
        ct_currency_type: "RC",
        ct_currency_type_image:
          "https://res.cloudinary.com/dqbdwqxsk/image/upload/v1730879995/undawn-currency_zyczci.webp",
        ct_is_active: true,
        ct_created_at: new Date(),
        ct_updated_at: new Date(),
      },
      {
        ct_name: "Teamfight Tactics",
        ct_code: "TEAMFIGHTTACTICS",
        ct_game_publisher: "Riot Games",
        ct_image:
          "https://res.cloudinary.com/dqbdwqxsk/image/upload/v1730364837/img-team-fight_nrzelb.webp",
        ct_image_cover:
          "https://res.cloudinary.com/dqbdwqxsk/image/upload/v1730865410/teamfight_tactics_otvyso.webp",
        ct_currency_type: "TFT Coins",
        ct_currency_type_image:
          "https://res.cloudinary.com/dqbdwqxsk/image/upload/v1730879273/tft-currency_pf6ats.webp",
        ct_is_active: true,
        ct_created_at: new Date(),
        ct_updated_at: new Date(),
      },
      {
        ct_name: "Black Clover",
        ct_code: "BLACKCLOVER",
        ct_game_publisher: "Garena",
        ct_image:
          "https://res.cloudinary.com/dqbdwqxsk/image/upload/v1730364837/img-black-clover_sakboc.webp",
        ct_image_cover:
          "https://res.cloudinary.com/dqbdwqxsk/image/upload/v1730865410/black_clover_knrsgf.webp",
        ct_currency_type: "BC Crystal",
        ct_currency_type_image:
          "https://res.cloudinary.com/dqbdwqxsk/image/upload/v1730879272/black-clover-currency_yuhlog.webp",
        ct_is_active: true,
        ct_created_at: new Date(),
        ct_updated_at: new Date(),
      },
      {
        ct_name: "Brawl Stars",
        ct_code: "BRAWLSTARS",
        ct_game_publisher: "Supercell",
        ct_image:
          "https://res.cloudinary.com/dqbdwqxsk/image/upload/v1730364836/img-brawl-starts_uynkks.webp",
        ct_image_cover:
          "https://res.cloudinary.com/dqbdwqxsk/image/upload/v1730865409/brawl_star_efvxyr.webp",
        ct_currency_type: "Gems",
        ct_currency_type_image:
          "https://res.cloudinary.com/dqbdwqxsk/image/upload/v1730879307/brawl-start-currency_v4aai3.webp",
        ct_is_active: true,
        ct_created_at: new Date(),
        ct_updated_at: new Date(),
      },
      {
        ct_name: "Tarisland",
        ct_code: "TARISLAND",
        ct_game_publisher: "Tencent Games",
        ct_image:
          "https://res.cloudinary.com/dqbdwqxsk/image/upload/v1730364836/img-taris-land_vlzpaq.webp",
        ct_image_cover:
          "https://res.cloudinary.com/dqbdwqxsk/image/upload/v1730865409/tarisland_lqpkb1.webp",
        ct_currency_type: "Crystal",
        ct_currency_type_image:
          "https://res.cloudinary.com/dqbdwqxsk/image/upload/v1730879272/taris-land-currency_wolf8v.webp",
        ct_is_active: true,
        ct_created_at: new Date(),
        ct_updated_at: new Date(),
      },
      {
        ct_name: "Super SUS",
        ct_code: "SUPERSUS",
        ct_game_publisher: "PT. Productions Pte. Ltd.",
        ct_image:
          "https://res.cloudinary.com/dqbdwqxsk/image/upload/v1730862084/img-supersus_hqpogf.webp",
        ct_image_cover:
          "https://res.cloudinary.com/dqbdwqxsk/image/upload/v1730865409/supersus_iqifpt.webp",
        ct_currency_type: "Golden Star",
        ct_currency_type_image:
          "https://res.cloudinary.com/dqbdwqxsk/image/upload/v1730879271/super-sus-currency_qgz4wd.webp",
        ct_is_active: true,
        ct_created_at: new Date(),
        ct_updated_at: new Date(),
      },
      {
        ct_name: "Blood Strike",
        ct_code: "BLOODSTRIKE",
        ct_game_publisher: "NetEase Games",
        ct_image:
          "https://res.cloudinary.com/dqbdwqxsk/image/upload/v1730862390/img-blood-strikes_u6dzn2.webp",
        ct_image_cover:
          "https://res.cloudinary.com/dqbdwqxsk/image/upload/v1730865409/blood_strikeswebp_n7aecx.webp",
        ct_currency_type: "Gold",
        ct_currency_type_image:
          "https://res.cloudinary.com/dqbdwqxsk/image/upload/v1730880355/bs-currency_gawmry.webp",
        ct_is_active: true,
        ct_created_at: new Date(),
        ct_updated_at: new Date(),
      },
      {
        ct_name: "Arknights",
        ct_code: "ARKNIGHTS",
        ct_game_publisher: "Yostar Limited",
        ct_image:
          "https://res.cloudinary.com/dqbdwqxsk/image/upload/v1730364833/img-arknights_wugobw.webp",
        ct_image_cover:
          "https://res.cloudinary.com/dqbdwqxsk/image/upload/v1730865409/ark-knightswebp_b8uh3n.webp",
        ct_currency_type: "Originium",
        ct_currency_type_image:
          "https://res.cloudinary.com/dqbdwqxsk/image/upload/v1730879270/arknight-currency_eysgmk.webp",
        ct_is_active: true,
        ct_created_at: new Date(),
        ct_updated_at: new Date(),
      },
      {
        ct_name: "Pokemon United",
        ct_code: "POKEMONUNITED",
        ct_game_publisher: "The Pokemon Company",
        ct_image:
          "https://res.cloudinary.com/dqbdwqxsk/image/upload/v1730364832/img-pokemon-unite_x5aibo.webp",
        ct_image_cover:
          "https://res.cloudinary.com/dqbdwqxsk/image/upload/v1730865409/Pokemon-Unite-Banner_t1zjrt.webp",
        ct_currency_type: "Aeos Gems",
        ct_currency_type_image:
          "https://res.cloudinary.com/dqbdwqxsk/image/upload/v1730879270/pokemon-currency_kswzhp.webp",
        ct_is_active: true,
        ct_created_at: new Date(),
        ct_updated_at: new Date(),
      },
      {
        ct_name: "8 Ball Pool",
        ct_code: "8BALLPOOL",
        ct_game_publisher: "Miniclip",
        ct_image:
          "https://res.cloudinary.com/dqbdwqxsk/image/upload/v1730364832/img-8-ball_wcogre.webp",
        ct_image_cover:
          "https://res.cloudinary.com/dqbdwqxsk/image/upload/v1730865409/8-ball-pool_braial.webp",
        ct_currency_type: "Cash",
        ct_currency_type_image:
          "https://res.cloudinary.com/dqbdwqxsk/image/upload/v1730879269/8ball-currency_cjjtdr.webp",
        ct_is_active: true,
        ct_created_at: new Date(),
        ct_updated_at: new Date(),
      },
      {
        ct_name: "FC Mobile",
        ct_code: "FCMOBILE",
        ct_game_publisher: "EA Sports",
        ct_image:
          "https://res.cloudinary.com/dqbdwqxsk/image/upload/v1730364831/img-fifa_a06avu.webp",
        ct_image_cover:
          "https://res.cloudinary.com/dqbdwqxsk/image/upload/v1730865409/fc_mobile_lwkijm.webp",
        ct_currency_type: "FC Points",
        ct_currency_type_image:
          "https://res.cloudinary.com/dqbdwqxsk/image/upload/v1730879269/fc-mobile_fdouzz.webp",
        ct_is_active: true,
        ct_created_at: new Date(),
        ct_updated_at: new Date(),
      },
      {
        ct_name: "Warewolf",
        ct_code: "WAREWOLF",
        ct_game_publisher: "Walkman",
        ct_image:
          "https://res.cloudinary.com/dqbdwqxsk/image/upload/v1730364830/img-warewolf_lj8qsn.webp",
        ct_image_cover:
          "https://res.cloudinary.com/dqbdwqxsk/image/upload/v1730865408/warewolf-banner_zdifda.webp",
        ct_currency_type: "Diamonds",
        ct_currency_type_image:
          "https://res.cloudinary.com/dqbdwqxsk/image/upload/v1730879270/warewolf-currency_i121q4.webp",
        ct_is_active: true,
        ct_created_at: new Date(),
        ct_updated_at: new Date(),
      },
      {
        ct_name: "Seal M Sea",
        ct_code: "SEALMSEA",
        ct_game_publisher: "PLAYWITH GAMES Inc",
        ct_image:
          "https://res.cloudinary.com/dqbdwqxsk/image/upload/v1730364830/img-seal_gezy0i.webp",
        ct_image_cover:
          "https://res.cloudinary.com/dqbdwqxsk/image/upload/v1730865408/SEAL_M_SEA_BANNER_1-0697-original_oc91vs.webp",
        ct_currency_type: "Ruby",
        ct_currency_type_image:
          "https://res.cloudinary.com/dqbdwqxsk/image/upload/v1730879269/seal-currency_nvdi4c.webp",
        ct_is_active: true,
        ct_created_at: new Date(),
        ct_updated_at: new Date(),
      },
      {
        ct_name: "Metal Slug: Awekening",
        ct_code: "METALSLUGAWAKENING",
        ct_game_publisher: "VNGGAMES",
        ct_image:
          "https://res.cloudinary.com/dqbdwqxsk/image/upload/v1730364830/img-metal-slug_dea9df.webp",
        ct_image_cover:
          "https://res.cloudinary.com/dqbdwqxsk/image/upload/v1730865408/metal_slug_dxpcsg.webp",
        ct_currency_type: "Ruby",
        ct_currency_type_image:
          "https://res.cloudinary.com/dqbdwqxsk/image/upload/v1730879269/metal-slug-currency_j6b5nt.webp",
        ct_is_active: true,
        ct_created_at: new Date(),
        ct_updated_at: new Date(),
      },
      {
        ct_name: "Free Fire",
        ct_code: "FREEFIRE",
        ct_game_publisher: "Garena",
        ct_image:
          "https://res.cloudinary.com/dqbdwqxsk/image/upload/v1730364829/img-free-fire_tedp5o.webp",
        ct_image_cover:
          "https://res.cloudinary.com/dqbdwqxsk/image/upload/v1730865408/free-fire_vt3eu9.webp",
        ct_currency_type: "Diamond",
        ct_currency_type_image:
          "https://res.cloudinary.com/dqbdwqxsk/image/upload/v1730879268/free-fire-currency_s3sczk.webp",
        ct_is_active: true,
        ct_created_at: new Date(),
        ct_updated_at: new Date(),
      },
      {
        ct_name: "One Punch Man: The Strongest",
        ct_code: "ONEPUNCHMAN",
        ct_game_publisher: "Finger Fun",
        ct_image:
          "https://res.cloudinary.com/dqbdwqxsk/image/upload/v1730364828/img-one-punch-man_mwo44g.webp",
        ct_image_cover:
          "https://res.cloudinary.com/dqbdwqxsk/image/upload/v1730865407/one-punch-man-header_dyy0k9.webp",
        ct_currency_type: "Coupon",
        ct_currency_type_image:
          "https://res.cloudinary.com/dqbdwqxsk/image/upload/v1730879268/one-punch-man-currency_l4al23.webp",
        ct_is_active: true,
        ct_created_at: new Date(),
        ct_updated_at: new Date(),
      },
      {
        ct_name: "Luna Online New World",
        ct_code: "LUNAONLINE",
        ct_game_publisher: "Lyto Games",
        ct_image:
          "https://res.cloudinary.com/dqbdwqxsk/image/upload/v1730364828/img-luna-online_fzdd1p.webp",
        ct_image_cover:
          "https://res.cloudinary.com/dqbdwqxsk/image/upload/v1730865407/luna-online_tzh8sg.webp",
        ct_currency_type: "Coin",
        ct_currency_type_image:
          "https://res.cloudinary.com/dqbdwqxsk/image/upload/v1730879268/luna-currency_lyv0fc.webp",
        ct_is_active: true,
        ct_created_at: new Date(),
        ct_updated_at: new Date(),
      },
      {
        ct_name: "Mobile Legends",
        ct_code: "MOBILELEGEND",
        ct_game_publisher: "Moonton",
        ct_image:
          "https://res.cloudinary.com/dqbdwqxsk/image/upload/v1730364827/img-mobile-legend_cekwoh.webp",
        ct_image_cover:
          "https://res.cloudinary.com/dqbdwqxsk/image/upload/v1730865410/mobile_legend_dayfr3.webp",
        ct_currency_type: "Diamond",
        ct_currency_type_image:
          "https://res.cloudinary.com/dqbdwqxsk/image/upload/v1730879269/ml-currency_dnvuvd.webp",
        ct_is_active: true,
        ct_created_at: new Date(),
        ct_updated_at: new Date(),
      },
      {
        ct_name: "Honor of Kings",
        ct_code: "HONOROFKINGS",
        ct_game_publisher: "Tencent Games",
        ct_image:
          "https://res.cloudinary.com/dqbdwqxsk/image/upload/v1730364827/img-honor-of-kings_tef806.webp",
        ct_image_cover:
          "https://res.cloudinary.com/dqbdwqxsk/image/upload/v1730865408/honor-of-kings_wc1hpz.webp",
        ct_currency_type: "Tokens",
        ct_currency_type_image:
          "https://res.cloudinary.com/dqbdwqxsk/image/upload/v1730879273/hok-currency_opdp2e.webp",
        ct_is_active: true,
        ct_created_at: new Date(),
        ct_updated_at: new Date(),
      },
      {
        ct_name: "Valorant",
        ct_code: "VALORANT",
        ct_game_publisher: "Riot Games",
        ct_image:
          "https://res.cloudinary.com/dqbdwqxsk/image/upload/v1730364826/img-valorant_ahcesf.webp",
        ct_image_cover:
          "https://res.cloudinary.com/dqbdwqxsk/image/upload/v1730865407/valorant_tkaqxi.webp",
        ct_currency_type: "Valorant Points",
        ct_currency_type_image:
          "https://res.cloudinary.com/dqbdwqxsk/image/upload/v1730879308/valorant-currency_khcr6l.webp",
        ct_is_active: true,
        ct_created_at: new Date(),
        ct_updated_at: new Date(),
      },
      {
        ct_name: "PUBG Mobile",
        ct_code: "PUBGMOBILE",
        ct_game_publisher: "PUBG Corporation",
        ct_image:
          "https://res.cloudinary.com/dqbdwqxsk/image/upload/v1730364825/img-pubg_w5q7hr.webp",
        ct_image_cover:
          "https://res.cloudinary.com/dqbdwqxsk/image/upload/v1730865407/pubg_fwkjct.webp",
        ct_currency_type: "UC",
        ct_currency_type_image:
          "https://res.cloudinary.com/dqbdwqxsk/image/upload/v1730879269/uc-currency_k6j9qj.webp",
        ct_is_active: true,
        ct_created_at: new Date(),
        ct_updated_at: new Date(),
      },
      {
        ct_name: "Genshin Impact",
        ct_code: "GENSHINIMPACT",
        ct_game_publisher: "miHoYo",
        ct_image:
          "https://res.cloudinary.com/dqbdwqxsk/image/upload/v1730364825/img-genshin_iejsnu.webp",
        ct_image_cover:
          "https://res.cloudinary.com/dqbdwqxsk/image/upload/v1730865407/genshin_jgrhhv.webp",
        ct_currency_type: "Genesis Crystals",
        ct_currency_type_image:
          "https://res.cloudinary.com/dqbdwqxsk/image/upload/v1730879268/genshin-currency_h832it.webp",
        ct_is_active: true,
        ct_created_at: new Date(),
        ct_updated_at: new Date(),
      },
      {
        ct_name: "League of Legends: Wild Rift",
        ct_code: "WILDRIFT",
        ct_game_publisher: "Riot Games",
        ct_image:
          "https://res.cloudinary.com/dqbdwqxsk/image/upload/v1730364825/img-lol_qgtanc.webp",
        ct_image_cover:
          "https://res.cloudinary.com/dqbdwqxsk/image/upload/v1730865407/league-of-legends_g4zog0.webp",
        ct_currency_type: "Wild Cores",
        ct_currency_type_image:
          "https://res.cloudinary.com/dqbdwqxsk/image/upload/v1730879269/lol-currency_yffh0d.webp",
        ct_is_active: true,
        ct_created_at: new Date(),
        ct_updated_at: new Date(),
      },
      {
        ct_name: "Honkai: Star Rail",
        ct_code: "HONKAI",
        ct_game_publisher: "miHoYo",
        ct_image:
          "https://res.cloudinary.com/dqbdwqxsk/image/upload/v1730364825/img-honkai-starail_tz64ny.webp",
        ct_image_cover:
          "https://res.cloudinary.com/dqbdwqxsk/image/upload/v1730865407/honkai-star_qlpxyw.webp",
        ct_currency_type: "Oneiric Shard",
        ct_currency_type_image:
          "https://res.cloudinary.com/dqbdwqxsk/image/upload/v1730879268/honkai-currency_jwibzx.webp",
        ct_is_active: true,
        ct_created_at: new Date(),
        ct_updated_at: new Date(),
      },
      {
        ct_name: "Call of Duty: Mobile",
        ct_code: "CALLOFDUTY",
        ct_game_publisher: "Activision",
        ct_image:
          "https://res.cloudinary.com/dqbdwqxsk/image/upload/v1730364825/img-cod_bedp55.webp",
        ct_image_cover:
          "https://res.cloudinary.com/dqbdwqxsk/image/upload/v1730865407/honkai-star_qlpxyw.webp",
        ct_currency_type: "CP",
        ct_currency_type_image:
          "https://res.cloudinary.com/dqbdwqxsk/image/upload/v1730879269/cod-currency_a505se.webp",
        ct_is_active: true,
        ct_created_at: new Date(),
        ct_updated_at: new Date(),
      },
      {
        ct_name: "Clash of Clans",
        ct_code: "CLASHOFCLANS",
        ct_game_publisher: "Supercell",
        ct_image:
          "https://res.cloudinary.com/dqbdwqxsk/image/upload/v1730364825/img-coc_a9qhvg.webp",
        ct_image_cover:
          "https://res.cloudinary.com/dqbdwqxsk/image/upload/v1730865406/clash-of-clans_mckrnj.webp",
        ct_currency_type: "Gems",
        ct_currency_type_image:
          "https://res.cloudinary.com/dqbdwqxsk/image/upload/v1730879307/coc-currency_cbem8a.webp",
        ct_is_active: true,
        ct_created_at: new Date(),
        ct_updated_at: new Date(),
      },
      {
        ct_name: "Sausage Man",
        ct_code: "SAUSAGEMAN",
        ct_game_publisher: "X.D. Network",
        ct_image:
          "https://res.cloudinary.com/dqbdwqxsk/image/upload/v1730364824/img-sausage-man_lsprha.webp",
        ct_image_cover:
          "https://res.cloudinary.com/dqbdwqxsk/image/upload/v1730865406/Sausage-man_nqvj0m.webp",
        ct_currency_type: "Candy",
        ct_currency_type_image:
          "https://res.cloudinary.com/dqbdwqxsk/image/upload/v1730879274/sausage-man-currency_jszuky.webp",
        ct_is_active: true,
        ct_created_at: new Date(),
        ct_updated_at: new Date(),
      },
      {
        ct_name: "Solo Leveling: Arise",
        ct_code: "SOLOLEVELING",
        ct_game_publisher: "Netmarble",
        ct_image:
          "https://res.cloudinary.com/dqbdwqxsk/image/upload/v1730364824/img-solo-leveling_npfgjh.webp",
        ct_image_cover:
          "https://res.cloudinary.com/dqbdwqxsk/image/upload/v1730865410/solo-leveling_olsmbx.webp",
        ct_currency_type: "Diamond",
        ct_currency_type_image:
          "https://res.cloudinary.com/dqbdwqxsk/image/upload/v1730879273/solo-leveling-currency_spdwub.webp",
        ct_is_active: true,
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
