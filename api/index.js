const server = require("./src/app.js");
const {
  conn,
  Festival,
  UserCategory,
  User,
  Sponsor,
  Car,
  CarImage,
  CarSponsor,
  CarOwner,
  VoteCategory,
  CarVoteCategory,
  Event,
  Wallet,
  AssetCategory,
  AstNFTCard,
  Asset,
  Template,
  Voucher,
} = require("./src/db.js");

// Syncing all the models at once.
const force = true; // force:true to erase data
const alter = true;
conn.sync({ force, alter }).then(() => {
  server.listen(process.env.PORT, async () => {
    console.log(`Listening at ${process.env.PORT}`); // eslint-disable-line no-console

    await Festival.bulkCreate(
      [
        {
          id: "40f41d79-21ae-4db8-8d1d-bb831eabc337",
          title: "FuelFest Test edition",
          short: "FuelFestTest22",
          dateStart: "2022-01-01 00:00:00.000 -0500",
          dateEnd: "2022-12-31 00:00:00.000 -0500",
          location: "Test City",
        },
      ],
      {
        ignoreDuplicates: true,
      }
    );
    await UserCategory.bulkCreate(
      [
        {
          id: "5f40db04-7e21-4e88-acaa-87d5928f7ebb",
          title: "User",
          category: "U",
        },
        {
          id: "5f40db04-7e21-4e88-acaa-87d5928f7ebc",
          title: "Admin",
          category: "A",
        },
      ],
      {
        ignoreDuplicates: true,
      }
    );
    await Wallet.bulkCreate(
      [
        {
          id: "147a9663-e722-4667-b54e-44b5817e0bd8",
          liquid: 9500,
          frozen: 500,
        },
        {
          id: "147a9663-e722-4667-b54e-44b5817e0bd9",
          liquid: 9500,
          frozen: 500,
        },
      ],
      {
        ignoreDuplicates: true,
      }
    );
    await User.bulkCreate(
      [
        {
          id: "ddf40198-fc6c-4595-95cc-bda6d77fffaa",
          firstName: "Test",
          lastName: "User",
          walletId: "147a9663-e722-4667-b54e-44b5817e0bd8",
          userCategoryId: "5f40db04-7e21-4e88-acaa-87d5928f7ebb",
        },
        {
          id: "ddf40198-fc6c-4595-95cc-bda6d77fffab",
          firstName: "Fuel",
          lastName: "Fest",
          walletId: "147a9663-e722-4667-b54e-44b5817e0bd9",
          userCategoryId: "5f40db04-7e21-4e88-acaa-87d5928f7ebc",
        },
      ],
      {
        ignoreDuplicates: true,
      }
    );
    await Sponsor.bulkCreate(
      [
        {
          id: "12dcd2f1-3e86-4fb9-bc07-4f90c314808b",
          title: "FritoLay",
          description: "Volutpat odio facilisis mauris sit.",
          festivalId: "40f41d79-21ae-4db8-8d1d-bb831eabc337",
        },
        {
          id: "22dcd2f1-3e86-4fb9-bc07-4f90c314808b",
          title: "Meguiars",
          description: "Volutpat odio facilisis mauris sit.",
          festivalId: "40f41d79-21ae-4db8-8d1d-bb831eabc337",
        },
      ],
      {
        ignoreDuplicates: true,
      }
    );
    await CarOwner.bulkCreate(
      [
        {
          id: "12dcd2f1-3e86-4fb9-bc07-4f90c314808b",
          name: "Mark Davis",
          facebook: "www.facebook.com/johndoe",
          twitter: "www.twitter.com/johndoe",
          instagram: "www.instagram.com/johndoe",
          youtube: "www.youtube.com/johndoe",
        },
        {
          id: "12dcd2f1-3e86-4fb9-bc07-4f90c3148081",
          name: "Malcom Young",
          facebook: "www.facebook.com/johndoe",
          twitter: "www.twitter.com/johndoe",
          instagram: "www.instagram.com/johndoe",
          youtube: "www.youtube.com/johndoe",
        },
        {
          id: "12dcd2f1-3e86-4fb9-bc07-4f90c3148082",
          name: "John Peter Graves",
          facebook: "www.facebook.com/johndoe",
          twitter: "www.twitter.com/johndoe",
          instagram: "www.instagram.com/johndoe",
          youtube: "www.youtube.com/johndoe",
        },
      ],
      {
        ignoreDuplicates: true,
      }
    );
    await Car.bulkCreate(
      [
        {
          id: "99ac1b58-3926-45f8-8b73-2a199025319d",
          title: "Z-Tuned Skyline GT-R",
          number: 23,
          manufacturer: "GT",
          tireManufacturer: "Michelin",
          chasis: "AZ-76",
          description:
            "Blue in egestas erat imperdiet sed euismod. Ut tellus elementum sagittis vitae et. Morbi tristique senectus et netus et malesuada fames ac.",
          location: "H15",
          geolocation: "174.2,65.93",
          festivalId: "40f41d79-21ae-4db8-8d1d-bb831eabc337",
          carOwnerId: "12dcd2f1-3e86-4fb9-bc07-4f90c3148081",
        },

        {
          id: "99ac1b58-3926-45f8-8b73-2a199025318d",
          title: "Rx7 Mazda",
          number: 73,
          manufacturer: "Mazda",
          tireManufacturer: "Yokohama",
          chasis: "EWZ-46",
          description:
            "Placerat in egestas erat imperdiet sed euismod. Ut tellus elementum sagittis vitae et. Morbi tristique senectus et netus et malesuada fames ac.",
          location: "A72",
          geolocation: "174.2,65.93",
          festivalId: "40f41d79-21ae-4db8-8d1d-bb831eabc337",
          carOwnerId: "12dcd2f1-3e86-4fb9-bc07-4f90c3148081",
        },
        {
          id: "99ac1b58-3926-45f8-8b73-2a199025318a",
          title: "Mitsubishi 1997 eclipse f&f replica",
          number: 1984,
          manufacturer: "Mitsubishi",
          tireManufacturer: "Yokohama",
          chasis: "EWQ-9",
          description:
            "Placerat in egestas erat imperdiet sed euismod. Ut tellus elementum sagittis vitae et. Morbi tristique senectus et netus et malesuada fames ac.",
          location: "R35",
          geolocation: "174.2,65.93",
          festivalId: "40f41d79-21ae-4db8-8d1d-bb831eabc337",
          carOwnerId: "12dcd2f1-3e86-4fb9-bc07-4f90c3148082",
        },
        {
          id: "99ac1b58-3926-45f8-8b73-2a199025319c",
          title: "Toyota Supra",
          number: 124,
          manufacturer: "Toyota",
          tireManufacturer: "Michelin",
          chasis: "Q29",
          description:
            "Placerat in egestas erat imperdiet sed euismod. Ut tellus elementum sagittis vitae et. Morbi tristique senectus et netus et malesuada fames ac.",
          location: "T25",
          geolocation: "174.2,65.93",
          festivalId: "40f41d79-21ae-4db8-8d1d-bb831eabc337",
          carOwnerId: "12dcd2f1-3e86-4fb9-bc07-4f90c314808b",
        },
        // {
        //   id: "7ad0230c-81a1-402f-8baa-922f6d8bba7d",
        //   title: "GM 34X",
        //   number: 34,
        //   manufacturer: "GM",
        //   tireManufacturer: "Goodyear",
        //   chasis: "27Ty",
        //   description:
        //     "Blue in egestas erat imperdiet sed euismod. Ut tellus elementum sagittis vitae et. Morbi tristique senectus et netus et malesuada fames ac.",
        //   location: "E02",
        //   geolocation: "174.2,65.93",
        //   festivalId: "40f41d79-21ae-4db8-8d1d-bb831eabc337",
        //   carOwnerId: "12dcd2f1-3e86-4fb9-bc07-4f90c314808b",
        // },
      ],
      {
        ignoreDuplicates: true,
      }
    );
    await CarSponsor.bulkCreate(
      [
        {
          sponsorId: "12dcd2f1-3e86-4fb9-bc07-4f90c314808b",
          carId: "99ac1b58-3926-45f8-8b73-2a199025319d",
        },
        {
          sponsorId: "22dcd2f1-3e86-4fb9-bc07-4f90c314808b",
          carId: "99ac1b58-3926-45f8-8b73-2a199025319d",
        },
      ],
      {
        ignoreDuplicates: true,
      }
    );
    await CarImage.bulkCreate(
      [
        {
          image: "uploads/car/car-1660054875610.jpg",
          carId: "99ac1b58-3926-45f8-8b73-2a199025319c",
        },
        {
          image: "uploads/car/car-1660054875616.jpg",
          carId: "99ac1b58-3926-45f8-8b73-2a199025319c",
        },
        {
          image: "uploads/car/GT03.png",
          carId: "99ac1b58-3926-45f8-8b73-2a199025319d",
        },
        {
          image: "uploads/car/RX71.png",
          carId: "99ac1b58-3926-45f8-8b73-2a199025318d",
        },

        {
          image: "uploads/car/RX72.png",
          carId: "99ac1b58-3926-45f8-8b73-2a199025318d",
        },
        {
          image: "uploads/car/GM1.png",
          carId: "99ac1b58-3926-45f8-8b73-2a199025318a",
        },
        {
          image: "uploads/car/GM2.png",
          carId: "99ac1b58-3926-45f8-8b73-2a199025318a",
        },
        // {
        //   image: "uploads/car/car-1659971663360.jpg",
        //   carId: "7ad0230c-81a1-402f-8baa-922f6d8bba7d",
        // },
        // {
        //   image: "uploads/car/car-1659971663362.jpg",
        //   carId: "7ad0230c-81a1-402f-8baa-922f6d8bba7d",
        // },
      ],
      {
        ignoreDuplicates: true,
      }
    );
    await VoteCategory.bulkCreate(
      [
        {
          id: "43957a19-fa0d-4796-8614-87b427039f81",
          title: "Best interior",
          icon: "uploads/voteCategory/voteCategory-1660858326182.svg",
          category: "interior",
          desc: "Dolor sed viverra ipsum nunc aliquet bibendum enim facilisis gravida.",
        },
        {
          id: "f1c1b970-2d46-4ce1-a175-71af6cfe9b03",
          title: "Best ligths",
          icon: "uploads/voteCategory/voteCategory-1660858314514.svg",
          category: "lights",
          desc: "Dolor sed viverra ipsum nunc aliquet bibendum enim facilisis gravida.",
        },
        {
          id: "43957a19-fa0d-4796-8614-87b427039f41",
          title: "Best paint",
          icon: "uploads/voteCategory/voteCategory-1660858304071.svg",
          category: "paint",
          desc: "Dolor sed viverra ipsum nunc aliquet bibendum enim facilisis gravida.",
        },
        {
          id: "43957a19-fa0d-4796-8614-87b423039f41",
          title: "Best rims",
          icon: "uploads/voteCategory/voteCategory-1660858293218.svg",
          category: "rims",
          desc: "Dolor sed viverra ipsum nunc aliquet bibendum enim facilisis gravida.",
        },
        {
          id: "13957a19-fa0d-4796-8614-87b423039f41",
          title: "Best stereo",
          icon: "uploads/voteCategory/voteCategory-1660858276661.svg",
          category: "stereo",
          desc: "Dolor sed viverra ipsum nunc aliquet bibendum enim facilisis gravida.",
        },
      ],
      {
        ignoreDuplicates: true,
      }
    );
    await CarVoteCategory.bulkCreate(
      [
        // INTERIOR

        {
          carId: "99ac1b58-3926-45f8-8b73-2a199025318d",
          voteCategoryId: "f1c1b970-2d46-4ce1-a175-71af6cfe9b03",
        },
        {
          carId: "99ac1b58-3926-45f8-8b73-2a199025318a",
          voteCategoryId: "f1c1b970-2d46-4ce1-a175-71af6cfe9b03",
        },
        {
          carId: "99ac1b58-3926-45f8-8b73-2a199025319c",
          voteCategoryId: "f1c1b970-2d46-4ce1-a175-71af6cfe9b03",
        },
        // {
        //   carId: "7ad0230c-81a1-402f-8baa-922f6d8bba7d",
        //   voteCategoryId: "f1c1b970-2d46-4ce1-a175-71af6cfe9b03",
        // },
        // BEST LIGHTS
        {
          carId: "99ac1b58-3926-45f8-8b73-2a199025319d",
          voteCategoryId: "43957a19-fa0d-4796-8614-87b427039f81",
        },
        {
          carId: "99ac1b58-3926-45f8-8b73-2a199025318d",
          voteCategoryId: "43957a19-fa0d-4796-8614-87b427039f81",
        },

        // {
        //   carId: "7ad0230c-81a1-402f-8baa-922f6d8bba7d",
        //   voteCategoryId: "43957a19-fa0d-4796-8614-87b427039f81",
        // },
        // BEST PAINT
        {
          carId: "99ac1b58-3926-45f8-8b73-2a199025319d",
          voteCategoryId: "43957a19-fa0d-4796-8614-87b427039f41",
        },

        {
          carId: "99ac1b58-3926-45f8-8b73-2a199025319c",
          voteCategoryId: "43957a19-fa0d-4796-8614-87b427039f41",
        },
        // {
        //   carId: "7ad0230c-81a1-402f-8baa-922f6d8bba7d",
        //   voteCategoryId: "43957a19-fa0d-4796-8614-87b427039f41",
        // },
        // BEST RIMS
        {
          carId: "99ac1b58-3926-45f8-8b73-2a199025319d",
          voteCategoryId: "43957a19-fa0d-4796-8614-87b423039f41",
        },
        {
          carId: "99ac1b58-3926-45f8-8b73-2a199025318d",
          voteCategoryId: "43957a19-fa0d-4796-8614-87b423039f41",
        },

        {
          carId: "99ac1b58-3926-45f8-8b73-2a199025319c",
          voteCategoryId: "43957a19-fa0d-4796-8614-87b423039f41",
        },

        // BEST STEREO
        {
          carId: "99ac1b58-3926-45f8-8b73-2a199025319d",
          voteCategoryId: "13957a19-fa0d-4796-8614-87b423039f41",
        },
        {
          carId: "99ac1b58-3926-45f8-8b73-2a199025318a",
          voteCategoryId: "13957a19-fa0d-4796-8614-87b423039f41",
        },

        // {
        //   carId: "7ad0230c-81a1-402f-8baa-922f6d8bba7d",
        //   voteCategoryId: "13957a19-fa0d-4796-8614-87b423039f41",
        // },
      ],
      {
        ignoreDuplicates: true,
      }
    );
    await Event.bulkCreate(
      [
        {
          id: "330003c5-777e-4b1c-9eff-de34b1680e06",
          title: "Los Saicoss",
          date: "2022-03-02 11:20:00.000 -0500",
          location: "Main Stage",
          description:
            "Cursus turpis massa tincidunt dui ut ornare. Fermentum leo vel orci porta non pulvinar. Felis eget nunc lobortis mattis aliquam faucibus.",
          image: "uploads/event/event-1659628527020.jpg",
          geolocation: "174.32,65.46",
          festivalId: "40f41d79-21ae-4db8-8d1d-bb831eabc337",
          category: "music",
          duartion: "30",
        },
        {
          id: "f71c9ea4-f791-412c-8d5d-7b9464804d83",
          title: "Bo Didley",
          date: "2022-09-02 08:30:00.000 -0500",
          location: "Main Stage",
          description:
            "Cursus turpis massa tincidunt dui ut ornare. Fermentum leo vel orci porta non pulvinar. Felis eget nunc lobortis mattis aliquam faucibus.",
          image: "uploads/event/event-1659628562514.jpg",
          geolocation: "174.32,65.46",
          festivalId: "40f41d79-21ae-4db8-8d1d-bb831eabc337",
          category: "music",
          duartion: "30",
        },
        {
          id: "d09348d4-3ad2-4f16-ab2b-de2c28e3cb98",
          title: "Katy Perry",
          date: "2022-09-05 08:30:00.000 -0500",
          location: "Main Stage",
          description:
            "Cursus turpis massa tincidunt dui ut ornare. Fermentum leo vel orci porta non pulvinar. Felis eget nunc lobortis mattis aliquam faucibus.",
          image: "uploads/event/event-1659628597304.jpg",
          geolocation: "174.32,65.46",
          festivalId: "40f41d79-21ae-4db8-8d1d-bb831eabc337",
          category: "music",
          duartion: "30",
        },
        {
          id: "5c9ce303-b359-45b2-b2b1-aa15d41e771f",
          title: "Morning Drifting",
          date: "2022-08-05 08:30:00.000 -0500",
          location: "Main track",
          description:
            "Cursus turpis massa tincidunt dui ut ornare. Fermentum leo vel orci porta non pulvinar. Felis eget nunc lobortis mattis aliquam faucibus.",
          image: "uploads/event/event-1659709659144.jpg",
          geolocation: "174.32,65.46",
          festivalId: "40f41d79-21ae-4db8-8d1d-bb831eabc337",
          category: "drifting",
          duartion: "30",
        },
        {
          id: "52ea1dd3-e04d-4496-aaac-0eeb3bdc8d3c",
          title: "Late Drifting",
          date: "2022-08-05 08:30:00.000 -0500",
          location: "Main track",
          description:
            "Cursus turpis massa tincidunt dui ut ornare. Fermentum leo vel orci porta non pulvinar. Felis eget nunc lobortis mattis aliquam faucibus.",
          image: "uploads/event/event-1659710307821.jpg",
          geolocation: "174.32,65.46",
          festivalId: "40f41d79-21ae-4db8-8d1d-bb831eabc337",
          category: "drifting",
          duartion: "30",
        },
        {
          id: "304d2a01-2981-4161-8325-5eb63e0d06dc",
          title: "Metallica",
          date: "2022-10-05 08:30:00.000 -0500",
          location: "Main stage",
          description:
            "Cursus turpis massa tincidunt dui ut ornare. Fermentum leo vel orci porta non pulvinar. Felis eget nunc lobortis mattis aliquam faucibus.",
          image: "uploads/event/event-1659555569745.jpg",
          geolocation: "174.32,65.46",
          festivalId: "40f41d79-21ae-4db8-8d1d-bb831eabc337",
          category: "music",
          duartion: "30",
        },
        {
          id: "5367dfbe-7c60-4c78-a8e3-e0a7fcc81ca3",
          title: "Will Smith",
          date: "2022-10-05 08:30:00.000 -0500",
          location: "Main stage",
          description:
            "Cursus turpis massa tincidunt dui ut ornare. Fermentum leo vel orci porta non pulvinar. Felis eget nunc lobortis mattis aliquam faucibus.",
          image: "uploads/event/event-1659710701440.jpg",
          geolocation: "174.32,65.46",
          festivalId: "40f41d79-21ae-4db8-8d1d-bb831eabc337",
          category: "guest",
          duartion: "30",
        },
      ],
      {
        ignoreDuplicates: true,
      }
    );
    await AssetCategory.bulkCreate(
      [
        {
          id: "8edb1c31-5005-479c-953d-514bd9bfe5ee",
          title: "Token Coupon",
          table: "TokenCoupon",
        },
        {
          id: "8664b015-7972-408a-bf8d-1ef55b0da2fc",
          title: "NFT Card",
          table: "AstNFTCard",
        },
        {
          id: "4664b015-7972-408a-bf8d-1ef55b0da2fc",
          title: "Voucher",
          table: "Voucher",
        },
        {
          id: "8664b015-7972-408a-bf8d-13355b0da2fc",
          title: "Voucher coupon",
          table: "VoucherCoupon",
        },
      ],
      {
        ignoreDuplicates: true,
      }
    );
    await Template.bulkCreate(
      [
        {
          id: "c98fc7a9-2824-4a62-a543-56b9dca0a176",
          festivalId: "40f41d79-21ae-4db8-8d1d-bb831eabc337",
          walletId: "147a9663-e722-4667-b54e-44b5817e0bd9",
        },
        {
          id: "90505905-3eda-4b8c-a300-64c3caaedcab",
          festivalId: "40f41d79-21ae-4db8-8d1d-bb831eabc337",
          walletId: "147a9663-e722-4667-b54e-44b5817e0bd9",
        },
      ],
      { ignoreDuplicates: true }
    );
    /// NFT CAR CARDS
    //NISSAN GTR
    // await Asset.bulkCreate(
    //   [
    //     {
    //       id: "dbb148fa-9031-4393-9fc0-1d0974d24aea",
    //       categoryId: "8664b015-7972-408a-bf8d-1ef55b0da2fc",
    //       walletId: "147a9663-e722-4667-b54e-44b5817e0bd9",
    //       isListed: true,
    //     },
    //     {
    //       id: "dbb148fa-9031-4393-9fc0-1d0974d24aeb",
    //       categoryId: "8664b015-7972-408a-bf8d-1ef55b0da2fc",
    //       walletId: "147a9663-e722-4667-b54e-44b5817e0bd9",
    //       isListed: true,
    //     },
    //     {
    //       id: "dbb148fa-9031-4393-9fc0-1d0974d24aec",
    //       categoryId: "8664b015-7972-408a-bf8d-1ef55b0da2fc",
    //       walletId: "147a9663-e722-4667-b54e-44b5817e0bd9",
    //       isListed: true,
    //     },
    //   ],
    //   { ignoreDuplicates: true }
    // );
    // await AstNFTCard.bulkCreate(
    //   [
    //     {
    //       id: "543691f2-9c20-4166-99bd-7bc906e35f0a",
    //       name: "Nissan GT-R 'Frank 6.0'",
    //       mintNum: "1",
    //       mintTotal: "3",
    //       mintMax: "3",
    //       imageFront: "uploads/NFTCard/NFTCard-1660680119281.jpeg",
    //       imageBack: "uploads/NFTCard/NFTCard-1660680037824.png",
    //       owner: "Oliver Atom",
    //       price: 200,
    //       burnable: true,
    //       transferable: true,
    //       assetId: "dbb148fa-9031-4393-9fc0-1d0974d24aea",
    //       templateId: "c98fc7a9-2824-4a62-a543-56b9dca0a176",
    //       carId:""
    //     },
    //     {
    //       id: "593691f2-9c20-4166-59bd-7bc906e35f0a",
    //       name: "Nissan GT-R 'Frank 6.0'",
    //       mintNum: "2",
    //       mintTotal: "3",
    //       mintMax: "3",
    //       imageFront: "uploads/NFTCard/NFTCard-1660680119281.jpeg",
    //       imageBack: "uploads/NFTCard/NFTCard-1660680037824.png",
    //       price: 200,
    //       burnable: true,
    //       transferable: true,
    //       assetId: "dbb148fa-9031-4393-9fc0-1d0974d24aeb",
    //       templateId: "c98fc7a9-2824-4a62-a543-56b9dca0a176",
    //     },
    //     {
    //       id: "593691f2-9c20-4166-99bd-7bc906e35f0a",
    //       name: "Nissan GT-R 'Frank 6.0'",
    //       mintNum: "3",
    //       mintTotal: "3",
    //       mintMax: "3",
    //       imageFront: "uploads/NFTCard/NFTCard-1660680119281.jpeg",
    //       imageBack: "uploads/NFTCard/NFTCard-1660680037824.png",
    //       price: 200,
    //       burnable: true,
    //       transferable: true,
    //       assetId: "dbb148fa-9031-4393-9fc0-1d0974d24aec",
    //       templateId: "c98fc7a9-2824-4a62-a543-56b9dca0a176",
    //     },
    //   ],
    //   {
    //     ignoreDuplicates: true,
    //   }
    // );
    //MITSUBISHI 1997 Eclipse
    await Asset.bulkCreate(
      [
        {
          id: "0bb148fa-9031-4393-9fc1-1d0974d24aea",
          categoryId: "8664b015-7972-408a-bf8d-1ef55b0da2fc",
          walletId: "147a9663-e722-4667-b54e-44b5817e0bd9",
          isListed: true,
        },
        {
          id: "1bb148fa-9031-4393-9fc1-1d0974d24aea",
          categoryId: "8664b015-7972-408a-bf8d-1ef55b0da2fc",
          walletId: "147a9663-e722-4667-b54e-44b5817e0bd9",
          isListed: true,
        },
        {
          id: "2bb148fa-9031-4393-9fc1-1d0974d24aea",
          categoryId: "8664b015-7972-408a-bf8d-1ef55b0da2fc",
          walletId: "147a9663-e722-4667-b54e-44b5817e0bd9",
          isListed: true,
        },
      ],
      { ignoreDuplicates: true }
    );
    await AstNFTCard.bulkCreate(
      [
        {
          id: "543691f2-9c20-2136-99bd-7bc906e35f0a",
          name: "Mitsubishi 1997 Eclipse",
          mintNum: "1",
          mintTotal: "3",
          mintMax: "3",
          imageFront: "uploads/NFTCard/NFTCard-1660679976626.jpeg",
          imageBack: "uploads/NFTCard/NFTCard-1660680037824.png",
          owner: "Benji Price",
          price: 50,
          burnable: true,
          transferable: true,
          assetId: "0bb148fa-9031-4393-9fc1-1d0974d24aea",
          templateId: "c98fc7a9-2824-4a62-a543-56b9dca0a176",
          carId: "99ac1b58-3926-45f8-8b73-2a199025318a",
        },
        {
          id: "593691f2-9c20-4166-29bd-7bc906ed5f0a",
          name: "Mitsubishi 1997 Eclipse",
          mintNum: "2",
          mintTotal: "3",
          mintMax: "3",
          imageFront: "uploads/NFTCard/NFTCard-1660679976626.jpeg",
          imageBack: "uploads/NFTCard/NFTCard-1660680037824.png",
          price: 50,
          burnable: true,
          transferable: true,
          assetId: "1bb148fa-9031-4393-9fc1-1d0974d24aea",
          templateId: "c98fc7a9-2824-4a62-a543-56b9dca0a176",
          carId: "99ac1b58-3926-45f8-8b73-2a199025318a",
        },
        {
          id: "593691f1-9c23-4166-99bd-7bc906e35f0a",
          name: "Mitsubishi 1997 Eclipse",
          mintNum: "3",
          mintTotal: "3",
          mintMax: "3",
          imageFront: "uploads/NFTCard/NFTCard-1660679976626.jpeg",
          imageBack: "uploads/NFTCard/NFTCard-1660680037824.png",
          price: 50,
          burnable: true,
          transferable: true,
          assetId: "2bb148fa-9031-4393-9fc1-1d0974d24aea",
          templateId: "c98fc7a9-2824-4a62-a543-56b9dca0a176",
          carId: "99ac1b58-3926-45f8-8b73-2a199025318a",
        },
      ],
      {
        ignoreDuplicates: true,
      }
    );
    //Toyota Supra
    await Asset.bulkCreate(
      [
        {
          id: "dbb148fa-9031-4390-9fc1-1d0974d24aea",
          categoryId: "8664b015-7972-408a-bf8d-1ef55b0da2fc",
          walletId: "147a9663-e722-4667-b54e-44b5817e0bd8",
          isListed: false,
        },
        {
          id: "dbb148fa-9031-4391-9fc1-1d0974d24aea",
          categoryId: "8664b015-7972-408a-bf8d-1ef55b0da2fc",
          walletId: "147a9663-e722-4667-b54e-44b5817e0bd9",
          isListed: true,
        },
        {
          id: "dbb148fa-9031-4392-9fc1-1d0974d24aea",
          categoryId: "8664b015-7972-408a-bf8d-1ef55b0da2fc",
          walletId: "147a9663-e722-4667-b54e-44b5817e0bd9",
          isListed: true,
        },
      ],
      { ignoreDuplicates: true }
    );
    await AstNFTCard.bulkCreate(
      [
        {
          id: "543691f2-9c20-2166-99bd-7bc546e35f0a",
          name: "Toyota Supra",
          mintNum: "1",
          mintTotal: "3",
          mintMax: "3",
          imageFront: "uploads/NFTCard/NFTCard-1660680222373.jpeg",
          imageBack: "uploads/NFTCard/NFTCard-1660680037824.png",
          owner: "Tom Jones",
          price: 2000,
          burnable: true,
          transferable: true,
          assetId: "dbb148fa-9031-4390-9fc1-1d0974d24aea",
          templateId: "c98fc7a9-2824-4a62-a543-56b9dca0a176",
          carId: "99ac1b58-3926-45f8-8b73-2a199025319c",
        },
        {
          id: "593691f2-9c20-4166-59bd-7bc936ed5f0a",
          name: "Toyota Supra",
          mintNum: "2",
          mintTotal: "3",
          mintMax: "3",
          imageFront: "uploads/NFTCard/NFTCard-1660680222373.jpeg",
          imageBack: "uploads/NFTCard/NFTCard-1660680037824.png",
          price: 2000,
          burnable: true,
          transferable: true,
          assetId: "dbb148fa-9031-4391-9fc1-1d0974d24aea",
          templateId: "c98fc7a9-2824-4a62-a543-56b9dca0a176",
          carId: "99ac1b58-3926-45f8-8b73-2a199025319c",
        },
        {
          id: "593691f1-9c20-4166-79bd-7bc906e35f0a",
          name: "Toyota Supra",
          mintNum: "3",
          mintTotal: "3",
          mintMax: "3",
          imageFront: "uploads/NFTCard/NFTCard-1660680222373.jpeg",
          imageBack: "uploads/NFTCard/NFTCard-1660680037824.png",
          price: 2000,
          burnable: true,
          transferable: true,
          assetId: "dbb148fa-9031-4392-9fc1-1d0974d24aea",
          templateId: "c98fc7a9-2824-4a62-a543-56b9dca0a176",
          carId: "99ac1b58-3926-45f8-8b73-2a199025319c",
        },
      ],
      {
        ignoreDuplicates: true,
      }
    );
    //PORSCHE 911
    // await Asset.bulkCreate(
    //   [
    //     {
    //       id: "aab148fa-9031-4393-9fc1-1d0974d24aea",
    //       categoryId: "8664b015-7972-408a-bf8d-1ef55b0da2fc",
    //       walletId: "147a9663-e722-4667-b54e-44b5817e0bd9",
    //       isListed: true,
    //     },
    //     {
    //       id: "bbb148fa-9031-4393-9fc1-1d0974d24aea",
    //       categoryId: "8664b015-7972-408a-bf8d-1ef55b0da2fc",
    //       walletId: "147a9663-e722-4667-b54e-44b5817e0bd9",
    //       isListed: true,
    //     },
    //     {
    //       id: "ccb148fa-9031-4393-9fc1-1d0974d24aea",
    //       categoryId: "8664b015-7972-408a-bf8d-1ef55b0da2fc",
    //       walletId: "147a9663-e722-4667-b54e-44b5817e0bd9",
    //       isListed: true,
    //     },
    //   ],
    //   { ignoreDuplicates: true }
    // );
    // await AstNFTCard.bulkCreate(
    //   [
    //     {
    //       id: "543691f2-9c20-4466-99bd-7bc906e35f0a",
    //       name: "Porsche 911",
    //       mintNum: "1",
    //       mintTotal: "3",
    //       mintMax: "3",
    //       imageFront: "uploads/NFTCard/photo_2022-08-16 14.35.11.jpeg",
    //       imageBack: "uploads/NFTCard/NFTCard-1660680037824.png",
    //       owner: "Tom Riddle",
    //       price: 200,
    //       burnable: true,
    //       transferable: true,
    //       assetId: "aab148fa-9031-4393-9fc1-1d0974d24aea",
    //       templateId: "c98fc7a9-2824-4a62-a543-56b9dca0a176",
    //     },
    //     {
    //       id: "593691f2-9c20-4166-22bd-7bc906ed5f0a",
    //       name: "Porsche 911",
    //       mintNum: "2",
    //       mintTotal: "3",
    //       mintMax: "3",
    //       imageFront: "uploads/NFTCard/photo_2022-08-16 14.35.11.jpeg",
    //       imageBack: "uploads/NFTCard/NFTCard-1660680037824.png",
    //       price: 200,
    //       burnable: true,
    //       transferable: true,
    //       assetId: "bbb148fa-9031-4393-9fc1-1d0974d24aea",
    //       templateId: "c98fc7a9-2824-4a62-a543-56b9dca0a176",
    //     },
    //     {
    //       id: "593691f1-9c20-4521-99bd-7bc906e35f0a",
    //       name: "Porsche 911",
    //       mintNum: "3",
    //       mintTotal: "3",
    //       mintMax: "3",
    //       imageFront: "uploads/NFTCard/photo_2022-08-16 14.35.11.jpeg",
    //       imageBack: "uploads/NFTCard/NFTCard-1660680037824.png",
    //       price: 200,
    //       burnable: true,
    //       transferable: true,
    //       assetId: "ccb148fa-9031-4393-9fc1-1d0974d24aea",
    //       templateId: "c98fc7a9-2824-4a62-a543-56b9dca0a176",
    //     },
    //   ],
    //   {
    //     ignoreDuplicates: true,
    //   }
    // );
    //MCLAREN SENNA
    // await Asset.bulkCreate(
    //   [
    //     {
    //       id: "00b148fa-9031-4393-9fc1-1d0974d24aea",
    //       categoryId: "8664b015-7972-408a-bf8d-1ef55b0da2fc",
    //       walletId: "147a9663-e722-4667-b54e-44b5817e0bd9",
    //       isListed: true,
    //     },
    //     {
    //       id: "01b148fa-9031-4393-9fc1-1d0974d24aea",
    //       categoryId: "8664b015-7972-408a-bf8d-1ef55b0da2fc",
    //       walletId: "147a9663-e722-4667-b54e-44b5817e0bd9",
    //       isListed: true,
    //     },
    //     {
    //       id: "02b148fa-9031-4393-9fc1-1d0974d24aea",
    //       categoryId: "8664b015-7972-408a-bf8d-1ef55b0da2fc",
    //       walletId: "147a9663-e722-4667-b54e-44b5817e0bd9",
    //       isListed: true,
    //     },
    //   ],
    //   { ignoreDuplicates: true }
    // );
    // await AstNFTCard.bulkCreate(
    //   [
    //     {
    //       id: "543691f2-9c20-2776-99bd-7bc906e35f0a",
    //       name: "McLaren Senna",
    //       mintNum: "1",
    //       mintTotal: "3",
    //       mintMax: "3",
    //       imageFront: "uploads/NFTCard/photo_2022-08-16 14.35.09.jpeg",
    //       imageBack: "uploads/NFTCard/NFTCard-1660680037824.png",
    //       owner: "Juan Raro",
    //       price: 200,
    //       burnable: true,
    //       transferable: true,
    //       assetId: "00b148fa-9031-4393-9fc1-1d0974d24aea",
    //       templateId: "c98fc7a9-2824-4a62-a543-56b9dca0a176",
    //     },
    //     {
    //       id: "593691f2-9c20-4166-51ed-7bc906ed5f0a",
    //       name: "McLaren Senna",
    //       mintNum: "2",
    //       mintTotal: "3",
    //       mintMax: "3",
    //       imageFront: "uploads/NFTCard/photo_2022-08-16 14.35.09.jpeg",
    //       imageBack: "uploads/NFTCard/NFTCard-1660680037824.png",
    //       price: 200,
    //       burnable: true,
    //       transferable: true,
    //       assetId: "01b148fa-9031-4393-9fc1-1d0974d24aea",
    //       templateId: "c98fc7a9-2824-4a62-a543-56b9dca0a176",
    //     },
    //     {
    //       id: "593691f1-9c20-4166-9b3d-7bc906e35f0a",
    //       name: "McLaren Senna",
    //       mintNum: "3",
    //       mintTotal: "3",
    //       mintMax: "3",
    //       imageFront: "uploads/NFTCard/photo_2022-08-16 14.35.09.jpeg",
    //       imageBack: "uploads/NFTCard/NFTCard-1660680037824.png",
    //       price: 200,
    //       burnable: true,
    //       transferable: true,
    //       assetId: "02b148fa-9031-4393-9fc1-1d0974d24aea",
    //       templateId: "c98fc7a9-2824-4a62-a543-56b9dca0a176",
    //     },
    //   ],
    //   {
    //     ignoreDuplicates: true,
    //   }
    // );
    //Mazda RX7
    await Asset.bulkCreate(
      [
        {
          id: "dbb148fa-9031-4393-9fc1-1d0974d24a00",
          categoryId: "8664b015-7972-408a-bf8d-1ef55b0da2fc",
          walletId: "147a9663-e722-4667-b54e-44b5817e0bd8",
          isListed: false,
        },
        {
          id: "dbb148fa-9031-4393-9fc1-1d0974d24a01",
          categoryId: "8664b015-7972-408a-bf8d-1ef55b0da2fc",
          walletId: "147a9663-e722-4667-b54e-44b5817e0bd9",
          isListed: true,
        },
        {
          id: "dbb148fa-9031-4393-9fc1-1d0974d24a02",
          categoryId: "8664b015-7972-408a-bf8d-1ef55b0da2fc",
          walletId: "147a9663-e722-4667-b54e-44b5817e0bd9",
          isListed: true,
        },
      ],
      { ignoreDuplicates: true }
    );
    await AstNFTCard.bulkCreate(
      [
        {
          id: "543691f2-9c20-2166-911d-7bc906e35f0a",
          name: "Mazda RX7",
          mintNum: "1",
          mintTotal: "3",
          mintMax: "3",
          imageFront: "uploads/NFTCard/photo_2022-08-16 14.35.17.jpeg",
          imageBack: "uploads/NFTCard/NFTCard-1660680037824.png",
          owner: "Danny Boy",
          price: 200,
          burnable: true,
          transferable: true,
          assetId: "dbb148fa-9031-4393-9fc1-1d0974d24a00",
          templateId: "c98fc7a9-2824-4a62-a543-56b9dca0a176",
          carId: "99ac1b58-3926-45f8-8b73-2a199025318d",
        },
        {
          id: "593691f2-9c20-4166-522d-7bc906ed5f0a",
          name: "Mazda RX7",
          mintNum: "2",
          mintTotal: "3",
          mintMax: "3",
          imageFront: "uploads/NFTCard/photo_2022-08-16 14.35.17.jpeg",
          imageBack: "uploads/NFTCard/NFTCard-1660680037824.png",
          price: 200,
          burnable: true,
          transferable: true,
          assetId: "dbb148fa-9031-4393-9fc1-1d0974d24a01",
          templateId: "c98fc7a9-2824-4a62-a543-56b9dca0a176",
          carId: "99ac1b58-3926-45f8-8b73-2a199025318d",
        },
        {
          id: "593691f1-9c20-4166-44bd-7bc906e35f0a",
          name: "Mazda RX7",
          mintNum: "3",
          mintTotal: "3",
          mintMax: "3",
          imageFront: "uploads/NFTCard/photo_2022-08-16 14.35.17.jpeg",
          imageBack: "uploads/NFTCard/NFTCard-1660680037824.png",
          price: 200,
          burnable: true,
          transferable: true,
          assetId: "dbb148fa-9031-4393-9fc1-1d0974d24a02",
          templateId: "c98fc7a9-2824-4a62-a543-56b9dca0a176",
          carId: "99ac1b58-3926-45f8-8b73-2a199025318d",
        },
      ],
      {
        ignoreDuplicates: true,
      }
    );
    //NISSAN Z Tuned
    await Asset.bulkCreate(
      [
        {
          id: "dbb148fa-9031-4393-9fc1-1d0974d24aea",
          categoryId: "8664b015-7972-408a-bf8d-1ef55b0da2fc",
          walletId: "147a9663-e722-4667-b54e-44b5817e0bd9",
          isListed: true,
        },
        {
          id: "dbb148fa-9031-4393-9fc2-1d0974d24aeb",
          categoryId: "8664b015-7972-408a-bf8d-1ef55b0da2fc",
          walletId: "147a9663-e722-4667-b54e-44b5817e0bd9",
          isListed: true,
        },
        {
          id: "dbb148fa-9031-4393-9fc3-1d0974d24aea",
          categoryId: "8664b015-7972-408a-bf8d-1ef55b0da2fc",
          walletId: "147a9663-e722-4667-b54e-44b5817e0bd9",
          isListed: true,
        },
      ],
      { ignoreDuplicates: true }
    );
    await AstNFTCard.bulkCreate(
      [
        {
          id: "543691f2-9c20-2166-99bd-7bc906e35f0a",
          name: "Nissan Z Tuned Skyline",
          mintNum: "1",
          mintTotal: "3",
          mintMax: "3",
          imageFront: "uploads/NFTCard/NFTCard-1660679847808.jpeg",
          imageBack: "uploads/NFTCard/NFTCard-1660680037824.png",
          owner: "Gustavo Petro",
          price: 200,
          burnable: true,
          transferable: true,
          assetId: "dbb148fa-9031-4393-9fc1-1d0974d24aea",
          templateId: "c98fc7a9-2824-4a62-a543-56b9dca0a176",
          carId: "99ac1b58-3926-45f8-8b73-2a199025319d",
        },
        {
          id: "593691f2-9c20-4166-59bd-7bc906ed5f0a",
          name: "Nissan Z Tuned Skyline",
          mintNum: "2",
          mintTotal: "3",
          mintMax: "3",
          imageFront: "uploads/NFTCard/NFTCard-1660679847808.jpeg",
          imageBack: "uploads/NFTCard/NFTCard-1660680037824.png",
          price: 200,
          burnable: true,
          transferable: true,
          assetId: "dbb148fa-9031-4393-9fc2-1d0974d24aeb",
          templateId: "c98fc7a9-2824-4a62-a543-56b9dca0a176",
          carId: "99ac1b58-3926-45f8-8b73-2a199025319d",
        },
        {
          id: "593691f1-9c20-4166-99bd-7bc906e35f0a",
          name: "Nissan Z Tuned Skyline",
          mintNum: "3",
          mintTotal: "3",
          mintMax: "3",
          imageFront: "uploads/NFTCard/NFTCard-1660679847808.jpeg",
          imageBack: "uploads/NFTCard/NFTCard-1660680037824.png",
          price: 200,
          burnable: true,
          transferable: true,
          assetId: "dbb148fa-9031-4393-9fc3-1d0974d24aea",
          templateId: "c98fc7a9-2824-4a62-a543-56b9dca0a176",
          carId: "99ac1b58-3926-45f8-8b73-2a199025319d",
        },
      ],
      {
        ignoreDuplicates: true,
      }
    );
    ///////// VOUCHERS   //////////
    /// CORBEAU SEAT   ///
    await Asset.bulkCreate(
      [
        {
          id: "dbb148fa-9031-0000-9fc1-1d0974d24aea",
          categoryId: "4664b015-7972-408a-bf8d-1ef55b0da2fc",
          walletId: "147a9663-e722-4667-b54e-44b5817e0bd9",
          isListed: true,
        },
        {
          id: "dbb148fa-9031-0001-9fc1-1d0974d24aea",
          categoryId: "4664b015-7972-408a-bf8d-1ef55b0da2fc",
          walletId: "147a9663-e722-4667-b54e-44b5817e0bd9",
          isListed: true,
        },
        {
          id: "dbb148fa-9031-0002-9fc1-1d0974d24aea",
          categoryId: "4664b015-7972-408a-bf8d-1ef55b0da2fc",
          walletId: "147a9663-e722-4667-b54e-44b5817e0bd9",
          isListed: true,
        },
      ],
      { ignoreDuplicates: true }
    );
    await Voucher.bulkCreate(
      [
        {
          id: "6ed13fb6-0357-0000-80f5-7cab1295f813",
          isBurnt: false,
          assetId: "dbb148fa-9031-0000-9fc1-1d0974d24aea",
          title: "10% off Corbeau fixed back racing seat",
          brand: "Corbeau seats",
          templateId: "90505905-3eda-4b8c-a300-64c3caaedcab",
          image: "uploads/voucher/voucher-1660836172829.jpg",
          burnable: true,
          transferable: true,
          expires: true,
          price: 100,
        },
        {
          id: "6ed13fb6-0357-0001-80f5-7cab1295f813",
          isBurnt: false,
          assetId: "dbb148fa-9031-0001-9fc1-1d0974d24aea",
          title: "10% off Corbeau fixed back racing seat",
          brand: "Corbeau seats",
          templateId: "90505905-3eda-4b8c-a300-64c3caaedcab",
          image: "uploads/voucher/voucher-1660836172829.jpg",
          burnable: true,
          transferable: true,
          expires: true,
          price: 100,
        },
        {
          id: "6ed13fb6-0357-0002-80f5-7cab1295f813",
          isBurnt: false,
          assetId: "dbb148fa-9031-0002-9fc1-1d0974d24aea",
          title: "10% off Corbeau fixed back racing seat",
          brand: "Corbeau seats",
          templateId: "90505905-3eda-4b8c-a300-64c3caaedcab",
          image: "uploads/voucher/voucher-1660836172829.jpg",
          burnable: true,
          transferable: true,
          expires: true,
          price: 100,
        },
      ],
      {
        ignoreDuplicates: true,
      }
    );
    /// AIR FRESHNER   ///
    await Asset.bulkCreate(
      [
        {
          id: "dbb148fa-9031-0003-9fc1-1d0974d24aea",
          categoryId: "4664b015-7972-408a-bf8d-1ef55b0da2fc",
          walletId: "147a9663-e722-4667-b54e-44b5817e0bd9",
          isListed: true,
        },
        {
          id: "dbb148fa-9031-0004-9fc1-1d0974d24aea",
          categoryId: "4664b015-7972-408a-bf8d-1ef55b0da2fc",
          walletId: "147a9663-e722-4667-b54e-44b5817e0bd9",
          isListed: true,
        },
        {
          id: "dbb148fa-9031-0005-9fc1-1d0974d24aea",
          categoryId: "4664b015-7972-408a-bf8d-1ef55b0da2fc",
          walletId: "147a9663-e722-4667-b54e-44b5817e0bd9",
          isListed: true,
        },
      ],
      { ignoreDuplicates: true }
    );
    await Voucher.bulkCreate(
      [
        {
          id: "6ed13fb6-0357-0003-80f5-7cab1295f813",
          isBurnt: false,
          assetId: "dbb148fa-9031-0003-9fc1-1d0974d24aea",
          title: "1 free Air freshener",
          brand: "Dafski",
          templateId: "90505905-3eda-4b8c-a300-64c3caaedcab",
          image: "uploads/voucher/voucher-1660837031969.jpg",
          burnable: true,
          transferable: true,
          expires: true,
          price: 50,
        },
        {
          id: "6ed13fb6-0357-0004-80f5-7cab1295f813",
          isBurnt: false,
          assetId: "dbb148fa-9031-0004-9fc1-1d0974d24aea",
          title: "1 free Air freshener",
          brand: "Dafski",
          templateId: "90505905-3eda-4b8c-a300-64c3caaedcab",
          image: "uploads/voucher/voucher-1660837031969.jpg",
          burnable: true,
          transferable: true,
          expires: true,
          price: 50,
        },
        {
          id: "6ed13fb6-0357-0005-80f5-7cab1295f813",
          isBurnt: false,
          assetId: "dbb148fa-9031-0005-9fc1-1d0974d24aea",
          title: "1 free Air freshener",
          brand: "Dafski",
          templateId: "90505905-3eda-4b8c-a300-64c3caaedcab",
          image: "uploads/voucher/voucher-1660837031969.jpg",
          burnable: true,
          transferable: true,
          expires: true,
          price: 50,
        },
      ],
      {
        ignoreDuplicates: true,
      }
    );
    /// CERAMIC WHEEL ///
    await Asset.bulkCreate(
      [
        {
          id: "dbb148fa-9031-0006-9fc1-1d0974d24aea",
          categoryId: "4664b015-7972-408a-bf8d-1ef55b0da2fc",
          walletId: "147a9663-e722-4667-b54e-44b5817e0bd9",
          isListed: true,
        },
        {
          id: "dbb148fa-9031-0007-9fc1-1d0974d24aea",
          categoryId: "4664b015-7972-408a-bf8d-1ef55b0da2fc",
          walletId: "147a9663-e722-4667-b54e-44b5817e0bd9",
          isListed: true,
        },
        {
          id: "dbb148fa-9031-0008-9fc1-1d0974d24aea",
          categoryId: "4664b015-7972-408a-bf8d-1ef55b0da2fc",
          walletId: "147a9663-e722-4667-b54e-44b5817e0bd9",
          isListed: true,
        },
      ],
      { ignoreDuplicates: true }
    );
    await Voucher.bulkCreate(
      [
        {
          id: "6ed13fb6-0357-0006-80f5-7cab1295f813",
          isBurnt: false,
          assetId: "dbb148fa-9031-0006-9fc1-1d0974d24aea",
          title: "15% off Ceramic wheels protection",
          brand: "Mr. Ceramic",
          templateId: "90505905-3eda-4b8c-a300-64c3caaedcab",
          image: "uploads/voucher/voucher-1660837229044.jpg",
          burnable: true,
          transferable: true,
          expires: true,
          price: 150,
        },
        {
          id: "6ed13fb6-0357-0007-80f5-7cab1295f813",
          isBurnt: false,
          assetId: "dbb148fa-9031-0007-9fc1-1d0974d24aea",
          title: "15% off Ceramic wheels protection",
          brand: "Mr. Ceramic",
          templateId: "90505905-3eda-4b8c-a300-64c3caaedcab",
          image: "uploads/voucher/voucher-1660837229044.jpg",
          burnable: true,
          transferable: true,
          expires: true,
          price: 150,
        },
        {
          id: "6ed13fb6-0357-0008-80f5-7cab1295f813",
          isBurnt: false,
          assetId: "dbb148fa-9031-0008-9fc1-1d0974d24aea",
          title: "15% off Ceramic wheels protection",
          brand: "Mr. Ceramic",
          templateId: "90505905-3eda-4b8c-a300-64c3caaedcab",
          image: "uploads/voucher/voucher-1660837229044.jpg",
          burnable: true,
          transferable: true,
          expires: true,
          price: 150,
        },
      ],
      {
        ignoreDuplicates: true,
      }
    );
    /// FREE DRINK ///
    await Asset.bulkCreate(
      [
        {
          id: "00b148fa-9031-0006-9fc1-1d0974d24aea",
          categoryId: "4664b015-7972-408a-bf8d-1ef55b0da2fc",
          walletId: "147a9663-e722-4667-b54e-44b5817e0bd9",
          isListed: true,
        },
        {
          id: "01b148fa-9031-0007-9fc1-1d0974d24aea",
          categoryId: "4664b015-7972-408a-bf8d-1ef55b0da2fc",
          walletId: "147a9663-e722-4667-b54e-44b5817e0bd9",
          isListed: true,
        },
        {
          id: "02b148fa-9031-0008-9fc1-1d0974d24aea",
          categoryId: "4664b015-7972-408a-bf8d-1ef55b0da2fc",
          walletId: "147a9663-e722-4667-b54e-44b5817e0bd9",
          isListed: true,
        },
      ],
      { ignoreDuplicates: true }
    );
    await Voucher.bulkCreate(
      [
        {
          id: "6ed23fb6-0357-0006-80f5-7cab1295f813",
          isBurnt: false,
          assetId: "00b148fa-9031-0006-9fc1-1d0974d24aea",
          title: "1 Free drink",
          brand: "Coca Cola",
          templateId: "90505905-3eda-4b8c-a300-64c3caaedcab",
          image: "uploads/voucher/voucher-1660917025865.jpg",
          burnable: true,
          transferable: true,
          expires: true,
          price: 150,
        },
        {
          id: "6ed13fb6-0117-0007-80f5-7cab1295f813",
          isBurnt: false,
          assetId: "01b148fa-9031-0007-9fc1-1d0974d24aea",
          title: "1 Free drink",
          brand: "Coca Cola",
          templateId: "90505905-3eda-4b8c-a300-64c3caaedcab",
          image: "uploads/voucher/voucher-1660917025865.jpg",
          burnable: true,
          transferable: true,
          expires: true,
          price: 150,
        },
        {
          id: "6ed13fb6-0357-0008-85a5-7cab1295f813",
          isBurnt: false,
          assetId: "02b148fa-9031-0008-9fc1-1d0974d24aea",
          title: "1 Free drink",
          brand: "Coca Cola",
          templateId: "90505905-3eda-4b8c-a300-64c3caaedcab",
          image: "uploads/voucher/voucher-1660917025865.jpg",
          burnable: true,
          transferable: true,
          expires: true,
          price: 150,
        },
      ],
      {
        ignoreDuplicates: true,
      }
    );
    /// FREE TSHIRT ///
    await Asset.bulkCreate(
      [
        {
          id: "11b148fa-9031-0006-9fc1-1d0974d24aea",
          categoryId: "4664b015-7972-408a-bf8d-1ef55b0da2fc",
          walletId: "147a9663-e722-4667-b54e-44b5817e0bd9",
          isListed: true,
        },
        {
          id: "12b148fa-9031-0007-9fc1-1d0974d24aea",
          categoryId: "4664b015-7972-408a-bf8d-1ef55b0da2fc",
          walletId: "147a9663-e722-4667-b54e-44b5817e0bd9",
          isListed: true,
        },
        {
          id: "13b148fa-9031-0008-9fc1-1d0974d24aea",
          categoryId: "4664b015-7972-408a-bf8d-1ef55b0da2fc",
          walletId: "147a9663-e722-4667-b54e-44b5817e0bd9",
          isListed: true,
        },
      ],
      { ignoreDuplicates: true }
    );
    await Voucher.bulkCreate(
      [
        {
          id: "6ed23fb6-0357-2306-80f5-7cab1295f813",
          isBurnt: false,
          assetId: "11b148fa-9031-0006-9fc1-1d0974d24aea",
          title: "1 Fuel Fest t-shirt",
          brand: "Fuel Fest",
          templateId: "90505905-3eda-4b8c-a300-64c3caaedcab",
          image: "uploads/voucher/voucher-1660917013096.jpg",
          burnable: true,
          transferable: true,
          expires: true,
          price: 150,
        },
        {
          id: "6ed13fb6-0557-0007-80f5-7cab1295f813",
          isBurnt: false,
          assetId: "12b148fa-9031-0007-9fc1-1d0974d24aea",
          title: "1 Fuel Fest t-shirt",
          brand: "Fuel Fest",
          templateId: "90505905-3eda-4b8c-a300-64c3caaedcab",
          image: "uploads/voucher/voucher-1660917013096.jpg",
          burnable: true,
          transferable: true,
          expires: true,
          price: 150,
        },
        {
          id: "6ed13fb6-0357-0008-8235-7cab1295f813",
          isBurnt: false,
          assetId: "13b148fa-9031-0008-9fc1-1d0974d24aea",
          title: "1 Fuel Fest t-shirt",
          brand: "Fuel Fest",
          templateId: "90505905-3eda-4b8c-a300-64c3caaedcab",
          image: "uploads/voucher/voucher-1660917013096.jpg",
          burnable: true,
          transferable: true,
          expires: true,
          price: 150,
        },
      ],
      {
        ignoreDuplicates: true,
      }
    );
  });
});
