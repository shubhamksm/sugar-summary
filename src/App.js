import React from "react";
import CSVReader from "react-csv-reader";

function App() {
  const handleForce = (data, fileInfo) => {
    //   {
    //     "date": "Jan 28, 2023",
    //     "time": "9:48:03 PM",
    //     "tags": null,
    //     "blood_sugar_measurement__mg_dl_": null,
    //     "insulin_injection_units__pen_": null,
    //     "basal_injection_units": null,
    //     "insulin_injection_units__pump_": null,
    //     "insulin__meal_": null,
    //     "insulin__correction_": null,
    //     "temporary_basal_percentage": null,
    //     "temporary_basal_duration__minutes_": null,
    //     "meal_carbohydrates__custom_ratio__factor_15_": null,
    //     "meal_descriptions": null,
    //     "activity_duration__minutes_": 29,
    //     "activity_intensity__1__cosy__2__ordinary__3__demanding_": null,
    //     "activity_description": "Walking",
    //     "steps": null,
    //     "note": null,
    //     "location": null,
    //     "blood_pressure": null,
    //     "body_weight__kg_": null,
    //     "hba1c__percent_": null,
    //     "ketones": null,
    //     "food_type": null,
    //     "medication": null,
    //     "timezone": "GMT+01:00"
    // }
    const minDate = new Date("Oct 15, 2022");
    const sortedData = [];

    data.forEach((obj) => {
      const date = new Date(obj.date);
      if (date >= minDate) {
        sortedData.push(obj);
      }
    });

    // [{ name: '0', sugar: '350' }];

    const graphData = [];

    // reference : [{ time: '3 O'clock', count: 50, sum: 5000 }];

    // after loop : [{ time: '3 O'clock', count: 50, sum: 5000, avg: 180 }];

    console.log(sortedData);
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
