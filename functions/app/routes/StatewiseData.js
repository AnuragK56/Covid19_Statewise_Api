const axios = require("axios");
const cheerio = require("cheerio");
const url = "https://www.mohfw.gov.in/";
const StatewiseData = [];
axios(url)
  .then((response) => {
    const html = response.data;
    const $ = cheerio.load(html);
    const statsTable = $("tbody tr");

    statsTable.each(function () {
      if (statsTable) {
        const data = $(this).find("td");
        const id = $(data[0]).text();
        if (
          id === "Total number of confirmed cases in India" ||
          id ===
            "*States wise distribution is subject to further verification and reconciliation"
        )
          return;

        const state = $(data[1]).text();
        const cases = $(data[2]).text();
        const recovered = $(data[3]).text();
        const deaths = $(data[4]).text();
        StatewiseData.push({
          id,
          name: state,
          cases,
          recovered,
          deaths,
        });
      }
    });

    // console.log(StatewiseData);
  })
  .catch(console.error);

module.exports = StatewiseData;
