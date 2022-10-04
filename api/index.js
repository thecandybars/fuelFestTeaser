const server = require("./src/app.js");
const {
  conn,
  Festival,
  UserCategory,
  User,
  Sponsor,
  Vendor,
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
          title: "FuelFest 2022 Test edition",
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
          firstName: "Walter",
          lastName: "White",
          email: "walter.white@heisenbergmail.com",
          image: "uploads/user/user-1659715484627.jpg",
          walletId: "147a9663-e722-4667-b54e-44b5817e0bd8",
          userCategoryId: "5f40db04-7e21-4e88-acaa-87d5928f7ebb",
        },
        {
          id: "ddf40198-fc6c-4595-95cc-bda6d77fffab",
          firstName: "Fuel",
          lastName: "Fest",
          email: "fuel.fest@gmail.com",
          image: "uploads/user/user-1660679600259.png",
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
          id: "12dcd2f1-3e86-4fb9-bc07-abcdabcd0000",
          title: "Alpine",
          storeId: "",
          description: "Volutpat odio facilisis mauris sit.",
          image: "",
          logo: "uploads/sponsor/sponsor-1663275475329.png",
          website: "",
          festivalId: "40f41d79-21ae-4db8-8d1d-bb831eabc337",
        },
        {
          id: "12dcd2f1-3e86-4fb9-bc07-abcdabcd0001",
          title: "CarPhysics",
          storeId: "",
          description:
            "The Lifestyle we live, the dreams we make into a reality, the vision representing the creator, the soul behind an automobile, these are all things that define CarPhysics and what we stand for as a Brand, as a Culture, and as a Way of Life.",
          image: "",
          logo: "uploads/sponsor/sponsor-1663275542810.svg",
          website: "https://www.instagram.com/carphysics/?hl=en",
          festivalId: "40f41d79-21ae-4db8-8d1d-bb831eabc337",
        },
        {
          id: "12dcd2f1-3e86-4fb9-bc07-abcdabcd0002",
          title: "Enkie",
          storeId: "",
          description:
            "Enkei has been racing in top competition championships of the world for three decades. As a result of continuous improvement and technological advances, Enkei continues its winning tradition and constantly challenges new horizons in wheel technology.",
          image: "",
          logo: "uploads/sponsor/sponsor-1663275549571.svg",
          website: "https://enkei.com/",
          festivalId: "40f41d79-21ae-4db8-8d1d-bb831eabc337",
        },
        {
          id: "12dcd2f1-3e86-4fb9-bc07-abcdabcd0003",
          title: "Fortune Auto",
          storeId: "",
          description:
            "We develop race-winning, performance suspension systems for Japanese and European vehicles.",
          image: "",
          logo: "uploads/sponsor/sponsor-1663275555003.svg",
          website: "https://fortune-auto.com/",
          festivalId: "40f41d79-21ae-4db8-8d1d-bb831eabc337",
        },
        {
          id: "12dcd2f1-3e86-4fb9-bc07-abcdabcd0004",
          title: "Nardi Torino",
          storeId: "",
          description:
            "Nardi-Personal S.p.A. with its masterpieces worldwide appreciated coniugates the past to the future.",
          image: "",
          logo: "uploads/sponsor/sponsor-1663275564914.svg",
          website: "https://nardi-personal.com/",
          festivalId: "40f41d79-21ae-4db8-8d1d-bb831eabc337",
        },
        {
          id: "12dcd2f1-3e86-4fb9-bc07-abcdabcd0005",
          title: "NOS",
          storeId: "",
          description: "",
          image: "",
          logo: "uploads/sponsor/sponsor-1663275571419.svg",
          website: "",
          festivalId: "40f41d79-21ae-4db8-8d1d-bb831eabc337",
        },
        {
          id: "12dcd2f1-3e86-4fb9-bc07-abcdabcd0006",
          title: "Ovrdue",
          storeId: "",
          description:
            "We are an automotive lifestyle brand made for car enthusiasts, by car enthusiasts.",
          image: "",
          logo: "uploads/sponsor/sponsor-1663275577021.svg",
          website: "https://ovrdue.com/",
          festivalId: "40f41d79-21ae-4db8-8d1d-bb831eabc337",
        },
        {
          id: "12dcd2f1-3e86-4fb9-bc07-abcdabcd0007",
          title: "Team Scoundrels",
          storeId: "",
          description: "",
          image: "",
          logo: "uploads/sponsor/sponsor-1663275582730.svg",
          website: "https://www.youtube.com/c/TeamScoundrels",
          festivalId: "40f41d79-21ae-4db8-8d1d-bb831eabc337",
        },
        {
          id: "12dcd2f1-3e86-4fb9-bc07-abcdabcd0008",
          title: "Sparco",
          storeId: "",
          description: "",
          image: "",
          logo: "uploads/sponsor/sponsor-1663275587510.svg",
          website: "https://www.youtube.com/c/TeamScoundrels",
          festivalId: "40f41d79-21ae-4db8-8d1d-bb831eabc337",
        },
        {
          id: "12dcd2f1-3e86-4fb9-bc07-abcdabcd0009",
          title: "Voltex",
          storeId: "",
          description: "",
          image: "",
          logo: "uploads/sponsor/sponsor-1663275593094.svg",
          website: "https://www.instagram.com/voltexracing/?hl=en",
          festivalId: "40f41d79-21ae-4db8-8d1d-bb831eabc337",
        },
        {
          id: "12dcd2f1-3e86-4fb9-bc07-abcdabcd0010",
          title: "Iceboxx",
          storeId: "",
          description: "",
          image: "",
          logo: "",
          website: "https://www.instagram.com/iceboxxcustoms/?hl=en",
          festivalId: "40f41d79-21ae-4db8-8d1d-bb831eabc337",
        },
      ],
      {
        ignoreDuplicates: true,
      }
    );
    await Vendor.bulkCreate([
      {
        id: "00000000-21ae-4db8-8d1d-bb831eabc337",
        title: "Corbeau Seats",
        category: "none",
        description: "Turpis massa sed elementum tempus.",
        logo: "uploads/vendor/vendor-1663189937301.png",
        image: "",
        tent: "A89",
        geolocation: "A89",
        festivalId: "40f41d79-21ae-4db8-8d1d-bb831eabc337",
      },
      {
        id: "00000001-21ae-4db8-8d1d-bb831eabc337",
        title: "Dafski",
        category: "none",
        description: "Turpis massa sed elementum tempus.",
        logo: "uploads/vendor/vendor-1663189943218.jpg",
        image: "",
        tent: "A90",
        geolocation: "A90",
        festivalId: "40f41d79-21ae-4db8-8d1d-bb831eabc337",
      },
      {
        id: "00000002-21ae-4db8-8d1d-bb831eabc337",
        title: "Tyre Shop & service",
        category: "none",
        description: "Turpis massa sed elementum tempus.",
        logo: "uploads/vendor/vendor-1663189924900.jpg",
        image: "",
        tent: "A91",
        geolocation: "A91",
        festivalId: "40f41d79-21ae-4db8-8d1d-bb831eabc337",
      },
      {
        id: "00000003-21ae-4db8-8d1d-bb831eabc337",
        title: "Coca Cola",
        category: "none",
        description: "Turpis massa sed elementum tempus.",
        logo: "",
        image: "",
        tent: "A92",
        geolocation: "A92",
        festivalId: "40f41d79-21ae-4db8-8d1d-bb831eabc337",
      },
      {
        id: "00000004-21ae-4db8-8d1d-bb831eabc337",
        title: "Fuel Fest",
        category: "none",
        description: "Turpis massa sed elementum tempus.",
        logo: "",
        image: "",
        tent: "A93",
        geolocation: "A93",
        festivalId: "40f41d79-21ae-4db8-8d1d-bb831eabc337",
      },
    ]);
    await CarOwner.bulkCreate(
      [
        {
          id: "12dcd2f1-3e86-4fb9-bc07-4f90c314808b",
          name: "Brandon Rivas",
          facebook: "",
          twitter: "",
          instagram: "brivas710",
          youtube: "",
        },
        {
          id: "12dcd2f1-3e86-4fb9-bc07-4f90c3148081",
          name: "Chase Garrett",
          facebook: "",
          twitter: "",
          instagram: "fcpilot",
          youtube: "",
        },
        {
          id: "12dcd2f1-3e86-4fb9-bc07-4f90c3148082",
          name: "CJ Romero",
          facebook: "",
          twitter: "",
          instagram: "cjrh69",
          youtube: "",
        },
        {
          id: "12dcd2f1-3e86-4fb9-bc07-4f9099948082",
          name: "Skitch Bryant",
          facebook: "",
          twitter: "",
          instagram: "skitchbryant",
          youtube: "",
        },
      ],
      {
        ignoreDuplicates: true,
      }
    );
    await Car.bulkCreate(
      [
        {
          id: "99ac1b58-3926-45f8-8b73-2a199025318a",
          title: "Mitsubishi Eclipse",
          number: 1984,
          manufacturer: "Mitsubishi",
          tireManufacturer: "Yokohama",
          chasis: "EWQ-9",
          upgrades: "Wheels,Stereo,Body,Brakes",
          otherSponsors: "",
          description:
            "Full Replica of the 1995 Eclipse driven by Brian O'Conner in The Fast and the Furious movie. Autographed by Cody Walker",
          location: "R35",
          geolocation: "174.2,65.93",
          festivalId: "40f41d79-21ae-4db8-8d1d-bb831eabc337",
          carOwnerId: "12dcd2f1-3e86-4fb9-bc07-4f90c3148082",
          price: 34999,
          year: "1997",
          engine: "HotShot header, Injen intake",
          body: "Robo Car Aero Armor Kit, APR GT 2 Wing",
          suspension: "Tanabe SS springs, Energy bushings",
          nitro: "75hp NOS",
          brakes: "AEM Cross-drilled rotors",
          tires: "18'' Axis SE7EN",
          lights: "Underglow-X Green",
          stereo: "Alpine CVA 1005 TV/DVD, 2x Sony 8''",
          others: "Full Replica of F&F Eclipse",
        },
        {
          id: "99ac1b58-3926-45f8-8b73-2a199025319c",
          title: "Toyota Supra",
          number: 124,
          manufacturer: "Toyota",
          tireManufacturer: "Michelin",
          chasis: "Q29",
          upgrades: "Wheels,Suspension,Nitro",
          otherSponsors: "",
          description:
            "I'll miss my exit to keep on racing with the guy that I just met on the freeway a little longer...",
          location: "T25",
          geolocation: "174.2,65.93",
          festivalId: "40f41d79-21ae-4db8-8d1d-bb831eabc337",
          carOwnerId: "12dcd2f1-3e86-4fb9-bc07-4f90c314808b",
          price: 79499,
          year: "2021",
          engine: "Injen Power Package, Husky Exhaust",
          body: "Southbay Autoworkz CF, Streethunter Wing",
          suspension: "Iceboxx Customs Air Bags",
          nitro: "",
          brakes: "",
          tires: "20'' Work VS-XX",
          lights: "Underglow-X Green",
          stereo: "",
          others: "",
        },
        {
          id: "99ac1b58-3926-45f8-8b73-2a199025318d",
          title: "Mazda RX7",
          number: 73,
          manufacturer: "Mazda",
          tireManufacturer: "Yokohama",
          chasis: "EWZ-46",
          upgrades: "Body,Engine,Brakes,Stereo",
          otherSponsors: "",
          description: "Full LSX Engine Swap Madness!",
          location: "A72",
          geolocation: "174.2,65.93",
          festivalId: "40f41d79-21ae-4db8-8d1d-bb831eabc337",
          carOwnerId: "12dcd2f1-3e86-4fb9-bc07-4f90c3148081",
          price: 89999,
          year: "1998",
          engine: "LSX Engine Swap, TorqStorm Supercharger",
          body: "Custom rear window spoiler & wing",
          suspension: "FortuneAuto Coilovers, Custom Angle kit",
          nitro: "",
          brakes: "PowerStop z28 Street Warrior kit",
          tires: "Kenda Tires",
          lights: "HID Swap front, removed rear difussers",
          stereo: "",
          others: "",
        },
        {
          id: "99ac1b58-3926-45f8-8b73-2a199025319d",
          title: "Nissan Skyline GT-R",
          number: 23,
          manufacturer: "GT",
          tireManufacturer: "Michelin",
          chasis: "AZ-76",
          upgrades: "Wheels,Body,Brakes,Engine,Nitro,Suspension",
          otherSponsors: "",
          description: "#M3GATRN Skyline GT-R w/ Widebody (R34 Facelift)",
          location: "H15",
          geolocation: "174.2,65.93",
          festivalId: "40f41d79-21ae-4db8-8d1d-bb831eabc337",
          carOwnerId: "12dcd2f1-3e86-4fb9-bc07-4f9099948082",
          price: 45999,
          year: "1991",
          engine: "Garret Turbo",
          body: "JDM, R34 Front-End Conversion, Wide-body",
          suspension: "",
          nitro: "",
          brakes: "",
          tires: "Enkie",
          lights: "",
          stereo: "",
          others: "Nardi Steering Wheels",
        },
      ],
      {
        ignoreDuplicates: true,
      }
    );
    await CarSponsor.bulkCreate(
      [
        // ECLIPSE
        {
          sponsorId: "12dcd2f1-3e86-4fb9-bc07-abcdabcd0000",
          carId: "99ac1b58-3926-45f8-8b73-2a199025318a",
        },
        {
          sponsorId: "12dcd2f1-3e86-4fb9-bc07-abcdabcd0005",
          carId: "99ac1b58-3926-45f8-8b73-2a199025318a",
        },
        {
          sponsorId: "12dcd2f1-3e86-4fb9-bc07-abcdabcd0008",
          carId: "99ac1b58-3926-45f8-8b73-2a199025318a",
        },
        // SUPRA
        {
          sponsorId: "12dcd2f1-3e86-4fb9-bc07-abcdabcd0001",
          carId: "99ac1b58-3926-45f8-8b73-2a199025319c",
        },
        {
          sponsorId: "12dcd2f1-3e86-4fb9-bc07-abcdabcd0006",
          carId: "99ac1b58-3926-45f8-8b73-2a199025319c",
        },
        {
          sponsorId: "12dcd2f1-3e86-4fb9-bc07-abcdabcd0010",
          carId: "99ac1b58-3926-45f8-8b73-2a199025319c",
        },
        // RX7
        {
          sponsorId: "12dcd2f1-3e86-4fb9-bc07-abcdabcd0003",
          carId: "99ac1b58-3926-45f8-8b73-2a199025318d",
        },
        {
          sponsorId: "12dcd2f1-3e86-4fb9-bc07-abcdabcd0007",
          carId: "99ac1b58-3926-45f8-8b73-2a199025318d",
        },
        {
          sponsorId: "12dcd2f1-3e86-4fb9-bc07-abcdabcd0008",
          carId: "99ac1b58-3926-45f8-8b73-2a199025318d",
        },
        // SKYLINE
        {
          sponsorId: "12dcd2f1-3e86-4fb9-bc07-abcdabcd0002",
          carId: "99ac1b58-3926-45f8-8b73-2a199025319d",
        },
        {
          sponsorId: "12dcd2f1-3e86-4fb9-bc07-abcdabcd0004",
          carId: "99ac1b58-3926-45f8-8b73-2a199025319d",
        },
        {
          sponsorId: "12dcd2f1-3e86-4fb9-bc07-abcdabcd0009",
          carId: "99ac1b58-3926-45f8-8b73-2a199025319d",
        },
      ],
      {
        ignoreDuplicates: true,
      }
    );
    await CarImage.bulkCreate(
      [
        // MITSUBISHI ECPLIPSE
        {
          image: "uploads/car/car-1663597280935.jpg",
          carId: "99ac1b58-3926-45f8-8b73-2a199025318a",
        },
        {
          image: "uploads/car/car-1663597280938.jpg",
          carId: "99ac1b58-3926-45f8-8b73-2a199025318a",
        },
        {
          image: "uploads/car/car-1663597280949.jpg",
          carId: "99ac1b58-3926-45f8-8b73-2a199025318a",
        },
        {
          image: "uploads/car/car-1663597280952.jpg",
          carId: "99ac1b58-3926-45f8-8b73-2a199025318a",
        },
        {
          image: "uploads/car/car-1663597280956.jpg",
          carId: "99ac1b58-3926-45f8-8b73-2a199025318a",
        },
        // TOYOTA SUPRA
        {
          image: "uploads/car/car-1663597390410.jpg",
          carId: "99ac1b58-3926-45f8-8b73-2a199025319c",
        },
        {
          image: "uploads/car/car-1663597390413.jpg",
          carId: "99ac1b58-3926-45f8-8b73-2a199025319c",
        },
        {
          image: "uploads/car/car-1663597390414.jpg",
          carId: "99ac1b58-3926-45f8-8b73-2a199025319c",
        },
        {
          image: "uploads/car/car-1663597390418.jpg",
          carId: "99ac1b58-3926-45f8-8b73-2a199025319c",
        },
        {
          image: "uploads/car/car-1663597390421.jpg",
          carId: "99ac1b58-3926-45f8-8b73-2a199025319c",
        },
        // MAZDA RX7
        {
          image: "uploads/car/car-1663597491251.jpg",
          carId: "99ac1b58-3926-45f8-8b73-2a199025318d",
        },
        {
          image: "uploads/car/car-1663597491255.jpg",
          carId: "99ac1b58-3926-45f8-8b73-2a199025318d",
        },
        {
          image: "uploads/car/car-1663597491268.jpg",
          carId: "99ac1b58-3926-45f8-8b73-2a199025318d",
        },
        {
          image: "uploads/car/car-1663597491276.jpg",
          carId: "99ac1b58-3926-45f8-8b73-2a199025318d",
        },
        {
          image: "uploads/car/car-1663597491280.jpg",
          carId: "99ac1b58-3926-45f8-8b73-2a199025318d",
        },
        // NISSAN SKYLINE
        {
          image: "uploads/car/car-1663597573540.jpg",
          carId: "99ac1b58-3926-45f8-8b73-2a199025319d",
        },
        {
          image: "uploads/car/car-1663597573543.jpg",
          carId: "99ac1b58-3926-45f8-8b73-2a199025319d",
        },
        {
          image: "uploads/car/car-1663597573548.jpg",
          carId: "99ac1b58-3926-45f8-8b73-2a199025319d",
        },
        {
          image: "uploads/car/car-1663597573550.jpg",
          carId: "99ac1b58-3926-45f8-8b73-2a199025319d",
        },
        {
          image: "uploads/car/car-1663597573552.jpg",
          carId: "99ac1b58-3926-45f8-8b73-2a199025319d",
        },
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
          id: "330003c5-777e-4b1c-9eff-abcdabcd0000",
          title: "Drifting Session 1",
          date: "2022-03-02 11:20:00.000 -0500",
          dateStart: "2022-03-02 14:00:00.000 -0500",
          dateEnd: "2022-03-02 15:30:00.000 -0500",
          location: "Main Stage",
          description: "Start your engines, first drift session is here",
          image: "uploads/event/event-1663339260770.jpeg",
          geolocation: "174.32,65.46",
          festivalId: "40f41d79-21ae-4db8-8d1d-bb831eabc337",
          category: "drifting",
          duartion: "30",
        },
        {
          id: "330003c5-777e-4b1c-9eff-abcdabcd0003",
          title: "Meirlin",
          date: "2022-03-02 11:20:00.000 -0500",
          dateStart: "2022-03-02 14:40:00.000 -0500",
          dateEnd: "2022-03-02 15:30:00.000 -0500",
          location: "Yokohama Main Stage",
          description:
            "Come kick the party off with Meirlin at the Yokohama Main Stage !",
          image: "uploads/event/event-1663338965932.jpeg",
          geolocation: "174.32,65.46",
          festivalId: "40f41d79-21ae-4db8-8d1d-bb831eabc337",
          category: "music",
          duartion: "30",
        },
        {
          id: "330003c5-777e-4b1c-9eff-abcdabcd0004",
          title: "Gawm",
          date: "2022-03-02 11:20:00.000 -0500",
          dateStart: "2022-03-02 15:55:00.000 -0500",
          dateEnd: "2022-03-02 16:40:00.000 -0500",
          location: "Yokohama Main Stage",
          description: "Gawm mixes up some hot tracks on the main stage!",
          image: "uploads/event/event-1663338953372.jpg",
          geolocation: "174.32,65.46",
          festivalId: "40f41d79-21ae-4db8-8d1d-bb831eabc337",
          category: "music",
          duartion: "30",
        },
        {
          id: "330003c5-777e-4b1c-9eff-abcdabcd0001",
          title: "Drifting Session 2",
          date: "2022-03-02 11:20:00.000 -0500",
          dateStart: "2022-03-02 16:00:00.000 -0500",
          dateEnd: "2022-03-02 17:30:00.000 -0500",
          location: "Main Stage",
          description: "On your mark, get set, drift!",
          image: "uploads/event/event-1663339270093.jpg",
          geolocation: "174.32,65.46",
          festivalId: "40f41d79-21ae-4db8-8d1d-bb831eabc337",
          category: "drifting",
          duartion: "30",
        },
        {
          id: "330003c5-777e-4b1c-9eff-abcdabcd0005",
          title: "Alexcis",
          date: "2022-03-02 11:20:00.000 -0500",
          dateStart: "2022-03-02 17:10:00.000 -0500",
          dateEnd: "2022-03-02 18:10:00.000 -0500",
          location: "Yokohama Main Stage",
          description:
            "Come listen to Alexcis sing his hits like 'Until The Day', 'Chico', and more!",
          image: "uploads/event/event-1663338971431.jpeg",
          geolocation: "174.32,65.46",
          festivalId: "40f41d79-21ae-4db8-8d1d-bb831eabc337",
          category: "music",
          duartion: "30",
        },
        {
          id: "330003c5-777e-4b1c-9eff-abcdabcd0002",
          title: "Drifting Session 3",
          date: "2022-03-02 11:20:00.000 -0500",
          dateStart: "2022-03-02 18:00:00.000 -0500",
          dateEnd: "2022-03-02 19:30:00.000 -0500",
          location: "Main Stage",
          description: "Can't get enough drifting",
          image: "uploads/event/event-1663339279665.jpg",
          geolocation: "174.32,65.46",
          festivalId: "40f41d79-21ae-4db8-8d1d-bb831eabc337",
          category: "drifting",
          duartion: "30",
        },

        {
          id: "330003c5-777e-4b1c-9eff-abcdabcd0006",
          title: "Symba",
          date: "2022-03-02 11:20:00.000 -0500",
          dateStart: "2022-03-02 18:25:00.000 -0500",
          dateEnd: "2022-03-02 19:00:00.000 -0500",
          location: "Yokohama Main Stage",
          description:
            "Special guest Symba warms up the stage before Cody comes out!",
          image: "uploads/event/event-1663338960119.jpg",
          geolocation: "174.32,65.46",
          festivalId: "40f41d79-21ae-4db8-8d1d-bb831eabc337",
          category: "music",
          duartion: "30",
        },
        {
          id: "330003c5-777e-4b1c-9eff-abcdabcd0007",
          title: "Cody Walker on Stage!",
          date: "2022-03-02 11:20:00.000 -0500",
          dateStart: "2022-03-02 19:00:00.000 -0500",
          dateEnd: "2022-03-02 19:30:00.000 -0500",
          location: "Yokohama Main Stage",
          description:
            "Cody Walker comes and joined the party on stage with everyone!",
          image: "uploads/event/event-1663338976179.jpeg",
          geolocation: "174.32,65.46",
          festivalId: "40f41d79-21ae-4db8-8d1d-bb831eabc337",
          category: "guest",
          duartion: "30",
        },
        {
          id: "330003c5-777e-4b1c-9eff-abcdabcd0008",
          title: "Joyner Lucas",
          date: "2022-03-02 11:20:00.000 -0500",
          dateStart: "2022-03-02 19:30:00.000 -0500",
          dateEnd: "2022-03-02 21:00:00.000 -0500",
          location: "Yokohama Main Stage",
          description:
            "Grammy-nominated artist Joyner Lucas joins us as the FuelFest LA 2022 headline event!",
          image: "uploads/event/event-1663338981576.jpeg",
          geolocation: "174.32,65.46",
          festivalId: "40f41d79-21ae-4db8-8d1d-bb831eabc337",
          category: "music",
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
    // NISSAN Z Tuned
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
          id: "540001f2-9c20-2166-99bd-7bc906e35f0a",
          name: "Nissan Z Tuned Skyline Drift",
          mintNum: "1",
          mintTotal: "1",
          mintMax: "1",
          imageFront: "uploads/NFTCard/NFTCard-1664552895959.mp4",
          imageBack: "uploads/NFTCard/NFTCard-1660680037824.png",
          imageFrontType: "video",
          imageBackType: "image",
          owner: "Gustavo Petro",
          price: 2000,
          burnable: true,
          transferable: true,
          assetId: "dbb148fa-9031-4393-9fc1-1d0974d24aea",
          templateId: "c98fc7a9-2824-4a62-a543-56b9dca0a176",
          carId: "99ac1b58-3926-45f8-8b73-2a199025319d",
        },
        {
          id: "543691f2-9c20-2166-99bd-7bc906e35f0a",
          name: "Nissan Z Tuned Skyline",
          mintNum: "1",
          mintTotal: "3",
          mintMax: "3",
          imageFront: "uploads/NFTCard/NFTCard-1660679847808.jpeg",
          imageBack: "uploads/NFTCard/NFTCard-1660680037824.png",
          imageFrontType: "image",
          imageBackType: "image",
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
          imageFrontType: "image",
          imageBackType: "image",
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
          imageFrontType: "image",
          imageBackType: "image",
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
    // MITSUBISHI 1997
    await Asset.bulkCreate(
      [
        {
          id: "0bb148fa-9031-4393-9fc1-1d0974d24aea",
          categoryId: "8664b015-7972-408a-bf8d-1ef55b0da2fc",
          walletId: "147a9663-e722-4667-b54e-44b5817e0bd9",
          isListed: false,
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
          imageFrontType: "image",
          imageBackType: "image",
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
          imageFrontType: "image",
          imageBackType: "image",
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
          imageFrontType: "image",
          imageBackType: "image",
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
    // TOYOTA SUPRA
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
          imageFrontType: "image",
          imageBackType: "image",
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
          imageFrontType: "image",
          imageBackType: "image",
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
          imageFrontType: "image",
          imageBackType: "image",
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
    // MAZDA RX7
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
          imageFrontType: "image",
          imageBackType: "image",
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
          imageFrontType: "image",
          imageBackType: "image",
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
          imageFrontType: "image",
          imageBackType: "image",
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
    ///////// VOUCHERS   //////////
    /// CORBEAU SEAT   ///
    await Asset.bulkCreate(
      [
        {
          id: "dbb148fa-9031-0000-9fc1-1d0974d24aea",
          categoryId: "4664b015-7972-408a-bf8d-1ef55b0da2fc",
          walletId: "147a9663-e722-4667-b54e-44b5817e0bd8",
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
          description: "Ornare quam viverra orci sagittis.",
          templateId: "90505905-3eda-4b8c-a300-64c3caaedcab",
          image: "uploads/voucher/voucher-1660836172829.jpg",
          imageType: "image",
          burnable: true,
          transferable: true,
          expires: true,
          price: 100,
          vendorId: "00000000-21ae-4db8-8d1d-bb831eabc337",
        },
        {
          id: "6ed13fb6-0357-0001-80f5-7cab1295f813",
          isBurnt: false,
          assetId: "dbb148fa-9031-0001-9fc1-1d0974d24aea",
          title: "10% off Corbeau fixed back racing seat",
          brand: "Corbeau seats",
          description: "Ornare quam viverra orci sagittis.",
          templateId: "90505905-3eda-4b8c-a300-64c3caaedcab",
          image: "uploads/voucher/voucher-1660836172829.jpg",
          imageType: "image",
          burnable: true,
          transferable: true,
          expires: true,
          price: 100,
          vendorId: "00000000-21ae-4db8-8d1d-bb831eabc337",
        },
        {
          id: "6ed13fb6-0357-0002-80f5-7cab1295f813",
          isBurnt: false,
          assetId: "dbb148fa-9031-0002-9fc1-1d0974d24aea",
          title: "10% off Corbeau fixed back racing seat",
          brand: "Corbeau seats",
          description: "Ornare quam viverra orci sagittis.",
          templateId: "90505905-3eda-4b8c-a300-64c3caaedcab",
          image: "uploads/voucher/voucher-1660836172829.jpg",
          imageType: "image",
          burnable: true,
          transferable: true,
          expires: true,
          price: 100,
          vendorId: "00000000-21ae-4db8-8d1d-bb831eabc337",
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
          walletId: "147a9663-e722-4667-b54e-44b5817e0bd8",
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
          description: "Ornare quam viverra orci sagittis.",
          templateId: "90505905-3eda-4b8c-a300-64c3caaedcab",
          image: "uploads/voucher/voucher-1660837031969.jpg",
          imageType: "image",
          burnable: true,
          transferable: true,
          expires: true,
          price: 50,
          vendorId: "00000001-21ae-4db8-8d1d-bb831eabc337",
        },
        {
          id: "6ed13fb6-0357-0004-80f5-7cab1295f813",
          isBurnt: false,
          assetId: "dbb148fa-9031-0004-9fc1-1d0974d24aea",
          title: "1 free Air freshener",
          brand: "Dafski",
          description: "Ornare quam viverra orci sagittis.",
          templateId: "90505905-3eda-4b8c-a300-64c3caaedcab",
          image: "uploads/voucher/voucher-1660837031969.jpg",
          imageType: "image",
          burnable: true,
          transferable: true,
          expires: true,
          price: 50,
          vendorId: "00000001-21ae-4db8-8d1d-bb831eabc337",
        },
        {
          id: "6ed13fb6-0357-0005-80f5-7cab1295f813",
          isBurnt: false,
          assetId: "dbb148fa-9031-0005-9fc1-1d0974d24aea",
          title: "1 free Air freshener",
          brand: "Dafski",
          description: "Ornare quam viverra orci sagittis.",
          templateId: "90505905-3eda-4b8c-a300-64c3caaedcab",
          image: "uploads/voucher/voucher-1660837031969.jpg",
          imageType: "image",
          burnable: true,
          transferable: true,
          expires: true,
          price: 50,
          vendorId: "00000001-21ae-4db8-8d1d-bb831eabc337",
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
          walletId: "147a9663-e722-4667-b54e-44b5817e0bd8",
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
          description: "Ornare quam viverra orci sagittis.",
          templateId: "90505905-3eda-4b8c-a300-64c3caaedcab",
          image: "uploads/voucher/voucher-1660837229044.jpg",
          imageType: "image",
          burnable: true,
          transferable: true,
          expires: true,
          price: 150,
          vendorId: "00000002-21ae-4db8-8d1d-bb831eabc337",
        },
        {
          id: "6ed13fb6-0357-0007-80f5-7cab1295f813",
          isBurnt: false,
          assetId: "dbb148fa-9031-0007-9fc1-1d0974d24aea",
          title: "15% off Ceramic wheels protection",
          brand: "Mr. Ceramic",
          description: "Ornare quam viverra orci sagittis.",
          templateId: "90505905-3eda-4b8c-a300-64c3caaedcab",
          image: "uploads/voucher/voucher-1660837229044.jpg",
          imageType: "image",
          burnable: true,
          transferable: true,
          expires: true,
          price: 15,
          vendorId: "00000002-21ae-4db8-8d1d-bb831eabc337",
        },
        {
          id: "6ed13fb6-0357-0008-80f5-7cab1295f813",
          isBurnt: false,
          assetId: "dbb148fa-9031-0008-9fc1-1d0974d24aea",
          title: "15% off Ceramic wheels protection",
          brand: "Mr. Ceramic",
          description: "Ornare quam viverra orci sagittis.",
          templateId: "90505905-3eda-4b8c-a300-64c3caaedcab",
          image: "uploads/voucher/voucher-1660837229044.jpg",
          imageType: "image",
          burnable: true,
          transferable: true,
          expires: true,
          price: 15000,
          vendorId: "00000002-21ae-4db8-8d1d-bb831eabc337",
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
          walletId: "147a9663-e722-4667-b54e-44b5817e0bd8",
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
          description: "Pharetra sit amet aliquam id diam maecenas ultricies.",
          templateId: "90505905-3eda-4b8c-a300-64c3caaedcab",
          image: "uploads/voucher/voucher-1660917025865.jpg",
          imageType: "image",
          burnable: true,
          transferable: true,
          expires: true,
          price: 150,
          vendorId: "00000003-21ae-4db8-8d1d-bb831eabc337",
        },
        {
          id: "6ed13fb6-0117-0007-80f5-7cab1295f813",
          isBurnt: false,
          assetId: "01b148fa-9031-0007-9fc1-1d0974d24aea",
          title: "1 Free drink",
          brand: "Coca Cola",
          description: "Pharetra sit amet aliquam id diam maecenas ultricies.",
          templateId: "90505905-3eda-4b8c-a300-64c3caaedcab",
          image: "uploads/voucher/voucher-1660917025865.jpg",
          imageType: "image",
          burnable: true,
          transferable: true,
          expires: true,
          price: 15000000,
          vendorId: "00000003-21ae-4db8-8d1d-bb831eabc337",
        },
        {
          id: "6ed13fb6-0357-0008-85a5-7cab1295f813",
          isBurnt: false,
          assetId: "02b148fa-9031-0008-9fc1-1d0974d24aea",
          title: "1 Free drink",
          brand: "Coca Cola",
          description: "Pharetra sit amet aliquam id diam maecenas ultricies.",
          templateId: "90505905-3eda-4b8c-a300-64c3caaedcab",
          image: "uploads/voucher/voucher-1660917025865.jpg",
          imageType: "image",
          burnable: true,
          transferable: true,
          expires: true,
          price: 150,
          vendorId: "00000003-21ae-4db8-8d1d-bb831eabc337",
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
          walletId: "147a9663-e722-4667-b54e-44b5817e0bd8",
          isListed: false,
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
          description: "Ornare quam viverra orci sagittis.",
          templateId: "90505905-3eda-4b8c-a300-64c3caaedcab",
          image: "uploads/voucher/voucher-1660917013096.jpg",
          imageType: "image",
          burnable: true,
          transferable: true,
          expires: true,
          price: 150,
          vendorId: "00000004-21ae-4db8-8d1d-bb831eabc337",
        },
        {
          id: "6ed13fb6-0557-0007-80f5-7cab1295f813",
          isBurnt: false,
          assetId: "12b148fa-9031-0007-9fc1-1d0974d24aea",
          title: "1 Fuel Fest t-shirt",
          brand: "Fuel Fest",
          description: "Ornare quam viverra orci sagittis.",
          templateId: "90505905-3eda-4b8c-a300-64c3caaedcab",
          image: "uploads/voucher/voucher-1660917013096.jpg",
          imageType: "image",
          burnable: true,
          transferable: true,
          expires: true,
          price: 150,
          vendorId: "00000004-21ae-4db8-8d1d-bb831eabc337",
        },
        {
          id: "6ed13fb6-0357-0008-8235-7cab1295f813",
          isBurnt: false,
          assetId: "13b148fa-9031-0008-9fc1-1d0974d24aea",
          title: "1 Fuel Fest t-shirt",
          brand: "Fuel Fest",
          description: "Ornare quam viverra orci sagittis.",
          templateId: "90505905-3eda-4b8c-a300-64c3caaedcab",
          image: "uploads/voucher/voucher-1660917013096.jpg",
          imageType: "image",
          burnable: true,
          transferable: true,
          expires: true,
          price: 150,
          vendorId: "00000004-21ae-4db8-8d1d-bb831eabc337",
        },
      ],
      {
        ignoreDuplicates: true,
      }
    );
  });
});
