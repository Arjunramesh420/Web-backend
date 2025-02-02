const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const cron = require("node-cron");
const fs = require("fs");
const path = require("path");
const XLSX = require("xlsx");
const csvParser = require("csv-parse");

const app = express();
app.use(cors());

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// Handle Mongoose Deprecation Warning
mongoose.set('strictQuery', false);

const db = require("./app/models");
db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch(err => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome To Dynamics101" });
});

// require routes
require("./app/routes/movies.routes")(app);
require("./app/routes/upload.routes")(app);

// Function to process Excel and CSV files
const processUploadedFiles = () => {
  const uploadDirectory = path.join(__dirname, 'uploads');

  // Check if the uploads directory exists
  if (fs.existsSync(uploadDirectory)) {
    const files = fs.readdirSync(uploadDirectory);

    if (files.length === 0) {
      console.log("No new files to process.");
    } else {
      files.forEach((file) => {
        const filePath = path.join(uploadDirectory, file);
        console.log(`Processing file: ${filePath}`);

        // Get the file extension
        const fileExtension = path.extname(file).toLowerCase();

        if (fileExtension === '.xlsx' || fileExtension === '.xlsm' || fileExtension === '.xlsb' || fileExtension === '.xls') {
          // Process Excel file
          try {
            const workbook = XLSX.readFile(filePath);  // Reads Excel files (.xlsx, .xlsm, .xlsb)
            const sheetNameList = workbook.SheetNames;

            sheetNameList.forEach(sheetName => {
              const worksheet = workbook.Sheets[sheetName];
              const data = XLSX.utils.sheet_to_json(worksheet);
              console.log(`Data from sheet "${sheetName}":`, data);
            });

            // After processing, delete the file
            fs.unlinkSync(filePath);
            console.log(`Excel file processed and deleted: ${filePath}`);
          } catch (error) {
            console.error(`Error processing Excel file ${file}:`, error);
          }
        } else if (fileExtension === '.csv') {
          // Process CSV file
          try {
            const csvData = [];
            const parser = fs.createReadStream(filePath)
              .pipe(csvParser.parse({ columns: true, delimiter: ',' }));

            parser.on('data', (row) => {
              csvData.push(row);
            });

            parser.on('end', () => {
              console.log(`Data from CSV file "${file}":`, csvData);
              // After processing, delete the file
              fs.unlinkSync(filePath);
              console.log(`CSV file processed and deleted: ${filePath}`);
            });
          } catch (error) {
            console.error(`Error processing CSV file ${file}:`, error);
          }
        } else {
          console.log(`Unsupported file type: ${file}`);
          // Optionally reject unsupported formats
        }
      });
    }
  } else {
    console.log("Upload directory does not exist.");
  }
};

// Cron Job that runs every day at midnight (00:00)
cron.schedule('0 0 * * *', () => {
  console.log('Running cron job to process files...');
  processUploadedFiles();
});

// set port, listen for requests
const PORT = process.env.PORT || 5000; 
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
