// const Upload = require("../models/upload.model.js"); // Import model
// const XLSX = require("xlsx"); // Excel parsing library
// const fs = require("fs");
// const path = require("path");
// const excleUpload = require("../models/upload.models.js");

// exports.create = (req, res) => {
//   if (!req.file) {
//     return res.status(400).send({ message: "No file uploaded!" });
//   }

//   // Read the uploaded file
//   const filePath = path.join(__dirname, "../uploads", req.file.filename);
//   const workbook = XLSX.readFile(filePath);
//   const sheetNames = workbook.SheetNames;

//   // Check if there are any sheets in the Excel file
//   if (!sheetNames.length) {
//     return res.status(400).send({ message: "No sheets found in the Excel file." });
//   }

//   // Read the first sheet
//   const sheet = workbook.Sheets[sheetNames[0]];
//   const data = XLSX.utils.sheet_to_json(sheet); // Convert to JSON

//   if (data.length === 0) {
//     return res.status(400).send({ message: "No data found in the sheet." });
//   }

//   let validEntries = 0;
//   let invalidEntries = 0;

//   // Process each row in the data
//   data.forEach(async (row) => {
//     // Validate that required fields exist
//     const { name, email, phoneNumber, queryTitle, query } = row;

//     if (!name || !email || !phoneNumber || !queryTitle || !query) {
//       invalidEntries++;
//       console.log(`Skipping invalid row:`, row);
//       return; // Skip invalid row
//     }

//     // Create a new database entry for the valid row
//     try {
//       const newUpload = new Upload({
//         name,
//         email,
//         phoneNumber,
//         queryTitle,
//         query,
//         published: true,
//       });

//       await newUpload.save();
//       validEntries++;
//     } catch (err) {
//       console.error("Error saving to database:", err);
//       invalidEntries++;
//     }
//   });

//   // Provide feedback to the user based on the processed rows
//   if (validEntries > 0) {
//     res.status(200).send({
//       message: `${validEntries} records processed successfully!`,
//       invalidEntries: invalidEntries,
//     });
//   } else {
//     res.status(400).send({
//       message: "No valid records found in the uploaded file.",
//       invalidEntries: invalidEntries,
//     });
//   }

//   // Optionally delete the file after processing
//   fs.unlinkSync(filePath);
// }

// const XLSX = require("xlsx"); // Excel parsing library
// const fs = require("fs");
// const path = require("path");
// const db = require("../models");
// const excleUpload = db.Upload // Import model


// exports.create = (req, res) => {
//   if (!req.file) {
//     return res.status(400).send({ message: "No file uploaded!" });
//   }

//   // Read the uploaded file
//   const filePath = path.join(__dirname, "../uploads", req.file.filename);
//   const workbook = XLSX.readFile(filePath);
//   const sheetNames = workbook.SheetNames;

//   // Check if there are any sheets in the Excel file
//   if (!sheetNames.length) {
//     return res.status(400).send({ message: "No sheets found in the Excel file." });
//   }

//   // Read the first sheet
//   const sheet = workbook.Sheets[sheetNames[0]];
//   const data = XLSX.utils.sheet_to_json(sheet); // Convert to JSON

//   if (data.length === 0) {
//     return res.status(400).send({ message: "No data found in the sheet." });
//   }

//   let validEntries = 0;
//   let invalidEntries = 0;

//   // Process each row in the data
//   data.forEach(async (row) => {
//     // Validate that required fields exist
//     const { name, email, phoneNumber, queryTitle, query } = row;

//     if (!firstName || !lastName   || !email || !phoneNumber || !queryTitle || !query) {
//       invalidEntries++;
//       console.log(`Skipping invalid row:`, row);
//       return; // Skip invalid row
//     }

//     // Create a new database entry for the valid row
//     try {
//       const newEntry = new excleUpload({
//         firstName,
//         lastName,
//         email,
//         phoneNumber,
//         queryTitle,
//         query,
//         published: true,
//       });

//       await newEntry.save();
//       validEntries++;
//     } catch (err) {
//       console.error("Error saving to database:", err);
//       invalidEntries++;
//     }
//   });

//   // Provide feedback to the user based on the processed rows
//   if (validEntries > 0) {
//     res.status(200).send({
//       message: `${validEntries} records processed successfully!`,
//       invalidEntries: invalidEntries,
//     });
//   } else {
//     res.status(400).send({
//       message: "No valid records found in the uploaded file.",
//       invalidEntries: invalidEntries,
//     });
//   }

//   // Optionally delete the file after processing
//   fs.unlinkSync(filePath);
// };

// const XLSX = require("xlsx");
// const fs = require("fs");
// const path = require("path");
// const db = require("../models");
// const excleUpload = db.Upload;

// exports.create = (req, res) => {
//   if (!req.file) {
//     return res.status(400).send({ message: "No file uploaded!" });
//   }

//   // Read the uploaded file
//   const filePath = path.join(__dirname, "../uploads", req.file.filename);
//   const workbook = XLSX.readFile(filePath);
//   const sheetNames = workbook.SheetNames;

//   // Check if there are any sheets in the Excel file
//   if (!sheetNames.length) {
//     return res.status(400).send({ message: "No sheets found in the Excel file." });
//   }

//   // Read the first sheet
//   const sheet = workbook.Sheets[sheetNames[0]];
//   const data = XLSX.utils.sheet_to_json(sheet, {raw:false}); // Convert to JSON

//   if (data.length === 0) {
//     return res.status(400).send({ message: "No data found in the sheet." });
//   }

//   let validEntries = 0;
//   let invalidEntries = 0;

//   // Process each row in the data
//   data.forEach(async (row) => {
//     const { employeeId, firstName, lastName, department, email, salary, hireDate } = row;

//     // Validate that the necessary fields are present
//     if ( employeeId || firstName || lastName ||department || email || salary || hireDate) {
//       invalidEntries++;
//       console.log(`Skipping invalid row:`, row);
//       return; // Skip invalid row
//     }
    

//     // Create a new database entry for the valid row
//     try {
//       const newEntry = new excleUpload({
//         employeeId,
//         firstName,
//         lastName,
//         department,
//         email,
//         salary,
//         hireDate,
//         // published: true,
//       });

//       await newEntry.save();
//       validEntries++;
//     } catch (err) {
//       console.error("Error saving to database:", err);
//       invalidEntries++;
//     }
//   });

//   // Provide feedback to the user based on the processed rows
//   if (validEntries > 0) {
//     res.status(200).send({
//       message: `${validEntries} records processed successfully!`,
//       validEntries: validEntries,
//     });
//   }
//    else {
//     res.status(400).send({
//       message: "No valid records found in the uploaded file.",
//       invalidEntries: validEntries,
//     });
//   }

//   // Optionally delete the file after processing
//   fs.unlinkSync(filePath);
// };


const XLSX = require("xlsx");
const fs = require("fs");
const path = require("path");
const db = require("../models");
const excleUpload = db.Upload;

exports.create = (req, res) => {
  if (!req.file) {
    return res.status(400).send({ message: "No file uploaded!" });
  }

  // Read the uploaded file
  const filePath = path.join(__dirname, "../uploads", req.file.filename);
  const workbook = XLSX.readFile(filePath);
  const sheetNames = workbook.SheetNames;

  // Check if there are any sheets in the Excel file
  if (!sheetNames.length) {
    return res.status(400).send({ message: "No sheets found in the Excel file." });
  }

  // Read the first sheet
  const sheet = workbook.Sheets[sheetNames[0]];

  // Add date parsing option to sheet_to_json
  const data = XLSX.utils.sheet_to_json(sheet, { raw: false }); // Ensures that dates are parsed

  if (data.length === 0) {
    return res.status(400).send({ message: "No data found in the sheet." });
  }

  let validEntries = 0;
  let invalidEntries = 0;

  // Process each row in the data
  data.forEach(async (row) => {
    const { employeeId, firstName, lastName, department, email, salary, hireDate } = row;

    // Validate that the necessary fields are present
    if (!employeeId || !firstName || !lastName || !email || !salary || !hireDate) {
      invalidEntries++;
      console.log(`Skipping invalid row:`, row);
      return; // Skip invalid row
    }

    // If the hireDate is a string and it's not in the desired format (YYYY-MM-DD), try to parse it
    let formattedHireDate;
    if (typeof hireDate === 'string') {
      // Attempt to parse different date formats
      const parsedDate = new Date(hireDate);

      if (isNaN(parsedDate)) {
        invalidEntries++;
        console.log(`Skipping invalid date for row:`, row);
        return; // Skip invalid date row
      }

      formattedHireDate = parsedDate.toISOString().split('T')[0]; // Convert to YYYY-MM-DD format
    } else {
      formattedHireDate = hireDate; // If it's already in date format, just use it
    }

    // Create a new database entry for the valid row
    try {
      const newEntry = new excleUpload({
        employeeId,
        firstName,
        lastName,
        department,
        email,
        salary,
        hireDate: formattedHireDate,  // Save the formatted hireDate
      });

      await newEntry.save();
      validEntries++;
    } catch (err) {
      console.error("Error saving to database:", err);
      invalidEntries++;
    }
  });

  // Provide feedback to the user based on the processed rows
  if (validEntries > 0) {
    res.status(200).send({
      message: `${validEntries} records processed successfully!`,
      validEntries: validEntries,
    });
  } else {
    res.status(400).send({
      message: "No valid records found in the uploaded file.",
      invalidEntries: validEntries,
    });
  }

  // Optionally delete the file after processing
  fs.unlinkSync(filePath);
};
