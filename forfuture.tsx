// [{
//     "id": 1,
//     "title": "HP Pavilion 15-DK1056WM",
//     "description": "HP Pavilion 15-DK1056WM Gaming...",
//     "price": 1099,
//     "discountPercentage": 6.18,
//     "rating": 4.43,
//     "stock": 89,
//     "zoneId": ["123", "456", "789"]
// }
//   {
//     "id": 2,
//     "title": "HP Pavilion 15-DK1056WM",
//     "description": "HP Pavilion 15-DK1056WM Gaming...",
//     "price": 1099,
//     "discountPercentage": 6.18,
//     "rating": 4.43,
//     "stock": 89,
//     "empId": "123",
//     "zoneId": ["123", "456", "789"]
// }
// ]
// [
//     {
//         "_id": "123",
//         "zone": "east"
//     },
//     {
//         "_id": "456",
//         "zone": "west"
//     },
//     {
//         "_id": "789",
//         "zone": "north"
//     },
//     {
//         "_id": "901",
//         "zone": "south"
//     }
// ]
// {
//     $match: {
//       zoneId: { $in: ["123", "456", "789"] }
//     }
//   },
//   {
//     $lookup: {
//       from: "zones",
//       localField: "zoneId",
//       foreignField: "_id",
//       as: "zonesData"
//     }
//   }

//     {
//       $match: {
   
//       }
//     },
//     {
//       $lookup: {
//         from: "zones",
//         localField: "zoneId",
//         foreignField: "_id",
//         as: "zonesData"
//       }
//     },
//     {
//       $unwind: "$zonesData"
//     },
//     {
//       $match: {
//         "zonesData._id": { $in: zoneIds }
//       }
//     }
//   ]).toArray();
// {
//     $match: {
//       zoneId: { $in: ["123", "456", "789"] }
//     }
//   },
//   {
//     $lookup: {
//       from: "zones",
//       localField: "zoneId",
//       foreignField: "_id",
//       as: "zonesData"
//     }
//   }
// [
//     {
//       $match: {
//         $or: [
//           { _id: 1 }, // If _id is provided, match based on it
//           { _id: { $exists: false } } // If _id is not provided, skip this condition
//         ]
//       }
//     },
//     {
//       $lookup: {
//         from: "zones",
//         localField: "zoneId",
//         foreignField: "_id",
//         as: "zonesData"
//       }
//     }
//   ]
  