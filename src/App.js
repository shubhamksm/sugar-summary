import React, { useState } from "react";
import CSVReader from "react-csv-reader";
import moment from "moment";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

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
        data.blood_sugar_measurement__mg_dl_
        // data.blood_sugar_measurement__mg_dl_ &&
        // data.blood_sugar_measurement__mg_dl_ >= 74
      ) {
        reference[_key].sum += data.blood_sugar_measurement__mg_dl_;
        reference[_key].count += 1;
        reference[_key].records.push(data);
      }
    });

    // Count the Average :
    for (let i = 0; i < reference.length; i++) {
      // reference[i].avg = reference[i].sum / (reference[i].count - 7);
      reference[i].avg = reference[i].sum / reference[i].count;
      if (reference[i].avg > 140) {
        reference[i].avg += 20;
      } else {
        // reference[i].avg -= 10;
      }
      reference[i].displayTime = reference[i].time.format("hA");
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
      <div className="file-container">
        <CSVReader
          cssClass="react-csv-input"
          label="Please upload a File"
          onFileLoaded={handleForce}
          parserOptions={papaparseOptions}
        />
      </div>
      <br />
      <br />
      <hr />
      <br />
      <br />
      <div className="chart-container">
        {data && (
          // <ResponsiveContainer width="100%" height="100%">
          <LineChart
            width={800}
            height={300}
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="displayTime" />
            <YAxis dataKey="avg" />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="avg" stroke="#8884d8" />
            {/* <Line type="monotone" dataKey="uv" stroke="#82ca9d" /> */}
          </LineChart>
          // </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}

export default App;
