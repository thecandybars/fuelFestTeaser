const server = require("./src/app.js");
const {
  conn,
  Festival,
  UserCategory,
  User,
  Car,
  CarImage,
  CarOwner,
  VoteCategory,
  CarVoteCategory,
  Event,
  Wallet,
} = require("./src/db.js");

// Syncing all the models at once.
// force:true to erase data
conn.sync({ force: true, alter: true }).then(() => {
  server.listen(process.env.PORT, () => {
    console.log(`Listening at ${process.env.PORT}`); // eslint-disable-line no-console
  });
  // Festival.bulkCreate(
  //   [
  //     {
  //       id: "40f41d79-21ae-4db8-8d1d-bb831eabc337",
  //       title: "FuelFest Test edition",
  //       dateStart: "2022-01-01 00:00:00.000 -0500",
  //       dateEnd: "2022-12-31 00:00:00.000 -0500",
  //       location: "Test City",
  //     },
  //   ],
  //   {
  //     ignoreDuplicates: true,
  //   }
  // );
  // UserCategory.bulkCreate(
  //   [
  //     {
  //       id: "5f40db04-7e21-4e88-acaa-87d5928f7ebb",
  //       title: "User",
  //       category: "U",
  //     },
  //   ],
  //   {
  //     ignoreDuplicates: true,
  //   }
  // );
  // Wallet.bulkCreate(
  //   [
  //     {
  //       id: "147a9663-e722-4667-b54e-44b5817e0bd8",
  //       liquid: 10000,
  //       frozen: 0,
  //     },
  //   ],
  //   {
  //     ignoreDuplicates: true,
  //   }
  // );
  // User.bulkCreate(
  //   [
  //     {
  //       id: "ddf40198-fc6c-4595-95cc-bda6d77fffaa",
  //       firstName: "Test",
  //       lastName: "User",
  //       walletId: "147a9663-e722-4667-b54e-44b5817e0bd8",
  //       userCategoryId: "5f40db04-7e21-4e88-acaa-87d5928f7ebb",
  //     },
  //   ],
  //   {
  //     ignoreDuplicates: true,
  //   }
  // );
  // Car.bulkCreate(
  //   [
  //     {
  //       id: "99ac1b58-3926-45f8-8b73-2a199025319d",
  //       title: "Z-Tuned Skyline GT-R",
  //       number: 23,
  //       manufacturer: "GT",
  //       tireManufacturer: "Yokohama",
  //       chasis: "AZ-76",
  //       description:
  //         "Placerat in egestas erat imperdiet sed euismod. Ut tellus elementum sagittis vitae et. Morbi tristique senectus et netus et malesuada fames ac.",
  //       geolocation: "174.2,65.93",
  //       festivalId: "40f41d79-21ae-4db8-8d1d-bb831eabc337",
  //       carOwnerId: "12dcd2f1-3e86-4fb9-bc07-4f90c314808b",
  //     },
  //     {
  //       id: "99ac1b58-3926-45f8-8b73-2a199025318d",
  //       title: "Rx7 Mazda",
  //       number: 73,
  //       manufacturer: "Mazda",
  //       tireManufacturer: "Yokohama",
  //       chasis: "EWZ-46",
  //       description:
  //         "Placerat in egestas erat imperdiet sed euismod. Ut tellus elementum sagittis vitae et. Morbi tristique senectus et netus et malesuada fames ac.",
  //       geolocation: "174.2,65.93",
  //       festivalId: "40f41d79-21ae-4db8-8d1d-bb831eabc337",
  //       carOwnerId: "12dcd2f1-3e86-4fb9-bc07-4f90c314808b",
  //     },
  //     {
  //       id: "99ac1b58-3926-45f8-8b73-2a199025318a",
  //       title: "1997 eclipse f&f replica",
  //       number: 1984,
  //       manufacturer: "GM",
  //       tireManufacturer: "Yokohama",
  //       chasis: "EWQ-9",
  //       description:
  //         "Placerat in egestas erat imperdiet sed euismod. Ut tellus elementum sagittis vitae et. Morbi tristique senectus et netus et malesuada fames ac.",
  //       geolocation: "174.2,65.93",
  //       festivalId: "40f41d79-21ae-4db8-8d1d-bb831eabc337",
  //       carOwnerId: "12dcd2f1-3e86-4fb9-bc07-4f90c314808b",
  //     },
  //     {
  //       id: "99ac1b58-3926-45f8-8b73-2a199025319c",
  //       title: "BDM ARCH 65",
  //       number: 124,
  //       manufacturer: "BDM",
  //       tireManufacturer: "Michelin",
  //       chasis: "Q29",
  //       description:
  //         "Placerat in egestas erat imperdiet sed euismod. Ut tellus elementum sagittis vitae et. Morbi tristique senectus et netus et malesuada fames ac.",
  //       geolocation: "174.2,65.93",
  //       festivalId: "40f41d79-21ae-4db8-8d1d-bb831eabc337",
  //       carOwnerId: "12dcd2f1-3e86-4fb9-bc07-4f90c314808b",
  //     },
  //     {
  //       id: "7ad0230c-81a1-402f-8baa-922f6d8bba7d",
  //       title: "TYRALM 34X",
  //       number: 34,
  //       manufacturer: "TYRALM",
  //       tireManufacturer: "Goodyear",
  //       chasis: "27Ty",
  //       description:
  //         "Placerat in egestas erat imperdiet sed euismod. Ut tellus elementum sagittis vitae et. Morbi tristique senectus et netus et malesuada fames ac.",
  //       geolocation: "174.2,65.93",
  //       festivalId: "40f41d79-21ae-4db8-8d1d-bb831eabc337",
  //       carOwnerId: "12dcd2f1-3e86-4fb9-bc07-4f90c314808b",
  //     },
  //   ],
  //   {
  //     ignoreDuplicates: true,
  //   }
  // );
  // CarImage.bulkCreate(
  //   [
  //     {
  //       image: "uploads/car/car-1660054875610.jpg",
  //       carId: "99ac1b58-3926-45f8-8b73-2a199025319c",
  //     },
  //     {
  //       image: "uploads/car/car-1660054875616.jpg",
  //       carId: "99ac1b58-3926-45f8-8b73-2a199025319c",
  //     },
  //     {
  //       image: "uploads/car/GT03.png",
  //       carId: "99ac1b58-3926-45f8-8b73-2a199025319d",
  //     },
  //     //
  //     {
  //       image: "uploads/car/RX71.png",
  //       carId: "99ac1b58-3926-45f8-8b73-2a199025318d",
  //     },
  //     {
  //       image: "uploads/car/RX72.png",
  //       carId: "99ac1b58-3926-45f8-8b73-2a199025318d",
  //     },
  //     //
  //     {
  //       image: "uploads/car/GM1.png",
  //       carId: "99ac1b58-3926-45f8-8b73-2a199025318a",
  //     },
  //     {
  //       image: "uploads/car/GM2.png",
  //       carId: "99ac1b58-3926-45f8-8b73-2a199025318a",
  //     },
  //     {
  //       image: "uploads/car/car-1659971663360.jpg",
  //       carId: "7ad0230c-81a1-402f-8baa-922f6d8bba7d",
  //     },
  //     {
  //       image: "uploads/car/car-1659971663362.jpg",
  //       carId: "7ad0230c-81a1-402f-8baa-922f6d8bba7d",
  //     },
  //   ],
  //   {
  //     ignoreDuplicates: true,
  //   }
  // );
  // CarOwner.bulkCreate(
  //   [
  //     {
  //       id: "12dcd2f1-3e86-4fb9-bc07-4f90c314808b",
  //       name: "John Doe",
  //       facebook: "www.facebook.com/johndoe",
  //       twitter: "www.twitter.com/johndoe",
  //       instagram: "www.instagram.com/johndoe",
  //       youtube: "www.youtube.com/johndoe",
  //     },
  //   ],
  //   {
  //     ignoreDuplicates: true,
  //   }
  // );
  // VoteCategory.bulkCreate(
  //   [
  //     {
  //       id: "43957a19-fa0d-4796-8614-87b427039f81",
  //       title: "Overall",
  //       desc: "Dolor sed viverra ipsum nunc aliquet bibendum enim facilisis gravida.",
  //     },
  //     {
  //       id: "f1c1b970-2d46-4ce1-a175-71af6cfe9b03",
  //       title: "Best ligths",
  //       desc: "Dolor sed viverra ipsum nunc aliquet bibendum enim facilisis gravida.",
  //     },
  //     {
  //       id: "43957a19-fa0d-4796-8614-87b427039f41",
  //       title: "Best paint",
  //       desc: "Dolor sed viverra ipsum nunc aliquet bibendum enim facilisis gravida.",
  //     },
  //     {
  //       id: "43957a19-fa0d-4796-8614-87b423039f41",
  //       title: "Drift king",
  //       desc: "Dolor sed viverra ipsum nunc aliquet bibendum enim facilisis gravida.",
  //     },
  //     {
  //       id: "43957a19-fa0d-4796-8614-87b427039f88",
  //       title: "Best rookie",
  //       desc: "Dolor sed viverra ipsum nunc aliquet bibendum enim facilisis gravida.",
  //     },
  //   ],
  //   {
  //     ignoreDuplicates: true,
  //   }
  // );
  // CarVoteCategory.bulkCreate(
  //   [
  //     // OVERALL
  //     {
  //       carId: "99ac1b58-3926-45f8-8b73-2a199025319d",
  //       voteCategoryId: "f1c1b970-2d46-4ce1-a175-71af6cfe9b03",
  //     },
  //     {
  //       carId: "99ac1b58-3926-45f8-8b73-2a199025318d",
  //       voteCategoryId: "f1c1b970-2d46-4ce1-a175-71af6cfe9b03",
  //     },
  //     {
  //       carId: "99ac1b58-3926-45f8-8b73-2a199025318a",
  //       voteCategoryId: "f1c1b970-2d46-4ce1-a175-71af6cfe9b03",
  //     },
  //     {
  //       carId: "99ac1b58-3926-45f8-8b73-2a199025319c",
  //       voteCategoryId: "f1c1b970-2d46-4ce1-a175-71af6cfe9b03",
  //     },
  //     {
  //       carId: "7ad0230c-81a1-402f-8baa-922f6d8bba7d",
  //       voteCategoryId: "f1c1b970-2d46-4ce1-a175-71af6cfe9b03",
  //     },
  //     // BEST LIGHTS
  //     {
  //       carId: "99ac1b58-3926-45f8-8b73-2a199025319d",
  //       voteCategoryId: "43957a19-fa0d-4796-8614-87b427039f81",
  //     },
  //     {
  //       carId: "99ac1b58-3926-45f8-8b73-2a199025318d",
  //       voteCategoryId: "43957a19-fa0d-4796-8614-87b427039f81",
  //     },
  //     {
  //       carId: "99ac1b58-3926-45f8-8b73-2a199025318a",
  //       voteCategoryId: "43957a19-fa0d-4796-8614-87b427039f81",
  //     },
  //     {
  //       carId: "99ac1b58-3926-45f8-8b73-2a199025319c",
  //       voteCategoryId: "43957a19-fa0d-4796-8614-87b427039f81",
  //     },
  //     {
  //       carId: "7ad0230c-81a1-402f-8baa-922f6d8bba7d",
  //       voteCategoryId: "43957a19-fa0d-4796-8614-87b427039f81",
  //     },
  //     // BEST PAINT
  //     {
  //       carId: "99ac1b58-3926-45f8-8b73-2a199025319d",
  //       voteCategoryId: "43957a19-fa0d-4796-8614-87b427039f41",
  //     },
  //     {
  //       carId: "99ac1b58-3926-45f8-8b73-2a199025318d",
  //       voteCategoryId: "43957a19-fa0d-4796-8614-87b427039f41",
  //     },
  //     {
  //       carId: "99ac1b58-3926-45f8-8b73-2a199025318a",
  //       voteCategoryId: "43957a19-fa0d-4796-8614-87b427039f41",
  //     },
  //     {
  //       carId: "99ac1b58-3926-45f8-8b73-2a199025319c",
  //       voteCategoryId: "43957a19-fa0d-4796-8614-87b427039f41",
  //     },
  //     {
  //       carId: "7ad0230c-81a1-402f-8baa-922f6d8bba7d",
  //       voteCategoryId: "43957a19-fa0d-4796-8614-87b427039f41",
  //     },
  //     // BEST DRIFT KING
  //     {
  //       carId: "99ac1b58-3926-45f8-8b73-2a199025319d",
  //       voteCategoryId: "43957a19-fa0d-4796-8614-87b423039f41",
  //     },
  //     {
  //       carId: "99ac1b58-3926-45f8-8b73-2a199025318d",
  //       voteCategoryId: "43957a19-fa0d-4796-8614-87b423039f41",
  //     },
  //     {
  //       carId: "99ac1b58-3926-45f8-8b73-2a199025318a",
  //       voteCategoryId: "43957a19-fa0d-4796-8614-87b423039f41",
  //     },
  //     {
  //       carId: "99ac1b58-3926-45f8-8b73-2a199025319c",
  //       voteCategoryId: "43957a19-fa0d-4796-8614-87b423039f41",
  //     },
  //     {
  //       carId: "7ad0230c-81a1-402f-8baa-922f6d8bba7d",
  //       voteCategoryId: "43957a19-fa0d-4796-8614-87b423039f41",
  //     },
  //     // BEST ROOKIE
  //     {
  //       carId: "99ac1b58-3926-45f8-8b73-2a199025319d",
  //       voteCategoryId: "43957a19-fa0d-4796-8614-87b427039f88",
  //     },
  //     {
  //       carId: "99ac1b58-3926-45f8-8b73-2a199025318d",
  //       voteCategoryId: "43957a19-fa0d-4796-8614-87b427039f88",
  //     },
  //     {
  //       carId: "99ac1b58-3926-45f8-8b73-2a199025318a",
  //       voteCategoryId: "43957a19-fa0d-4796-8614-87b427039f88",
  //     },
  //     {
  //       carId: "99ac1b58-3926-45f8-8b73-2a199025319c",
  //       voteCategoryId: "43957a19-fa0d-4796-8614-87b427039f88",
  //     },
  //     {
  //       carId: "7ad0230c-81a1-402f-8baa-922f6d8bba7d",
  //       voteCategoryId: "43957a19-fa0d-4796-8614-87b427039f88",
  //     },
  //   ],
  //   {
  //     ignoreDuplicates: true,
  //   }
  // );
  // Event.bulkCreate(
  //   [
  //     {
  //       id: "330003c5-777e-4b1c-9eff-de34b1680e06",
  //       title: "Los Saicoss",
  //       date: "2022-03-02 11:20:00.000 -0500",
  //       location: "Main Stage",
  //       description:
  //         "Cursus turpis massa tincidunt dui ut ornare. Fermentum leo vel orci porta non pulvinar. Felis eget nunc lobortis mattis aliquam faucibus.",
  //       image: "uploads/event/event-1659628527020.jpg",
  //       geolocation: "174.32,65.46",
  //       festivalId: "40f41d79-21ae-4db8-8d1d-bb831eabc337",
  //       category: "music",
  //       duartion: "30",
  //     },
  //     {
  //       id: "f71c9ea4-f791-412c-8d5d-7b9464804d83",
  //       title: "Bo Didley",
  //       date: "2022-09-02 08:30:00.000 -0500",
  //       location: "Main Stage",
  //       description:
  //         "Cursus turpis massa tincidunt dui ut ornare. Fermentum leo vel orci porta non pulvinar. Felis eget nunc lobortis mattis aliquam faucibus.",
  //       image: "uploads/event/event-1659628562514.jpg",
  //       geolocation: "174.32,65.46",
  //       festivalId: "40f41d79-21ae-4db8-8d1d-bb831eabc337",
  //       category: "music",
  //       duartion: "30",
  //     },
  //     {
  //       id: "d09348d4-3ad2-4f16-ab2b-de2c28e3cb98",
  //       title: "Katy Perry",
  //       date: "2022-09-05 08:30:00.000 -0500",
  //       location: "Main Stage",
  //       description:
  //         "Cursus turpis massa tincidunt dui ut ornare. Fermentum leo vel orci porta non pulvinar. Felis eget nunc lobortis mattis aliquam faucibus.",
  //       image: "uploads/event/event-1659628597304.jpg",
  //       geolocation: "174.32,65.46",
  //       festivalId: "40f41d79-21ae-4db8-8d1d-bb831eabc337",
  //       category: "music",
  //       duartion: "30",
  //     },
  //     {
  //       id: "5c9ce303-b359-45b2-b2b1-aa15d41e771f",
  //       title: "Morning Drifting",
  //       date: "2022-08-05 08:30:00.000 -0500",
  //       location: "Main track",
  //       description:
  //         "Cursus turpis massa tincidunt dui ut ornare. Fermentum leo vel orci porta non pulvinar. Felis eget nunc lobortis mattis aliquam faucibus.",
  //       image: "uploads/event/event-1659709659144.jpg",
  //       geolocation: "174.32,65.46",
  //       festivalId: "40f41d79-21ae-4db8-8d1d-bb831eabc337",
  //       category: "drifting",
  //       duartion: "30",
  //     },
  //     {
  //       id: "52ea1dd3-e04d-4496-aaac-0eeb3bdc8d3c",
  //       title: "Late Drifting",
  //       date: "2022-08-05 08:30:00.000 -0500",
  //       location: "Main track",
  //       description:
  //         "Cursus turpis massa tincidunt dui ut ornare. Fermentum leo vel orci porta non pulvinar. Felis eget nunc lobortis mattis aliquam faucibus.",
  //       image: "uploads/event/event-1659710307821.jpg",
  //       geolocation: "174.32,65.46",
  //       festivalId: "40f41d79-21ae-4db8-8d1d-bb831eabc337",
  //       category: "drifting",
  //       duartion: "30",
  //     },
  //     {
  //       id: "304d2a01-2981-4161-8325-5eb63e0d06dc",
  //       title: "Metallica",
  //       date: "2022-10-05 08:30:00.000 -0500",
  //       location: "Main stage",
  //       description:
  //         "Cursus turpis massa tincidunt dui ut ornare. Fermentum leo vel orci porta non pulvinar. Felis eget nunc lobortis mattis aliquam faucibus.",
  //       image: "uploads/event/event-1659555569745.jpg",
  //       geolocation: "174.32,65.46",
  //       festivalId: "40f41d79-21ae-4db8-8d1d-bb831eabc337",
  //       category: "music",
  //       duartion: "30",
  //     },
  //     {
  //       id: "5367dfbe-7c60-4c78-a8e3-e0a7fcc81ca3",
  //       title: "Will Smith",
  //       date: "2022-10-05 08:30:00.000 -0500",
  //       location: "Main stage",
  //       description:
  //         "Cursus turpis massa tincidunt dui ut ornare. Fermentum leo vel orci porta non pulvinar. Felis eget nunc lobortis mattis aliquam faucibus.",
  //       image: "uploads/event/event-1659710701440.jpg",
  //       geolocation: "174.32,65.46",
  //       festivalId: "40f41d79-21ae-4db8-8d1d-bb831eabc337",
  //       category: "guest",
  //       duartion: "30",
  //     },
  //   ],
  //   {
  //     ignoreDuplicates: true,
  //   }
  // );
});
