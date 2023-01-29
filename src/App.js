import React, { useState } from "react";
import CSVReader from "react-csv-reader";
import moment from "moment";

function App() {
  const [data, setData] = useState(null);

  const handleForce = (data, fileInfo) => {
    const minDate = new Date("Sept 27, 2022");
    const sortedData = [];

    data.forEach((obj) => {
      const date = new Date(obj.date);
      if (date >= minDate) {
        sortedData.push(obj);
      }
    });

    // Reference Struct ->  [{ time: '3 O'clock', count: 50, sum: 5000 }];
    const reference = [];
    for (let i = 0; i <= 23; i++) {
      const str = i.toString();
      const time = moment(`2023-01-29T${str.padStart(2, "0")}`);
      reference.push({ time, count: 0, sum: 0, records: [] });
    }

    // Fill the Data
    sortedData.forEach((data) => {
      const _key = moment(data.time, "LTS").hour();
      if (
        data.blood_sugar_measurement__mg_dl_ &&
        data.blood_sugar_measurement__mg_dl_ >= 74
      ) {
        reference[_key].sum += data.blood_sugar_measurement__mg_dl_;
        reference[_key].count += 1;
        reference[_key].records.push(data);
      }
    });

    // Count the Average :
    for (let i = 0; i < reference.length; i++) {
      reference[i].avg = reference[i].sum / (reference[i].count - 7);
    }

    setData([...reference]);
  };

  const papaparseOptions = {
    header: true,
    dynamicTyping: true,
    skipEmptyLines: true,
    transformHeader: (header) => header.toLowerCase().replace(/\W/g, "_"),
  };

  return (
    <div className="App">
      <div className="container">
        <CSVReader
          cssClass="react-csv-input"
          label="Select CSV with secret Death Star statistics"
          onFileLoaded={handleForce}
          parserOptions={papaparseOptions}
        />
      </div>
    </div>
  );
}

export default App;
