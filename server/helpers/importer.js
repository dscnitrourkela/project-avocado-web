const csv = require("csv-parse");
const fs = require("fs");

const mentorSchema = require("../models/mentor");

const Importter = () => {
  const results = [];
  let count = 0;

  fs.createReadStream("mentors.csv")
    .pipe(csv({}))
    .on("data", (data) => results.push(data))
    .on("end", () => {
      results.forEach(async (result) => {
        count++;
        let mentor = new mentorSchema({
          year: 2021,
          name: result[0],
          rollNumber: result[1],
          contact: result[2],
          email: result[3],
          prefect: result[4],
        });
        await mentor.save();
        console.log(`Added: ${count}`);
      });
    });
};

module.exports = Importter;
