import { useEffect, useState, forwardRef } from "react";
import { getWeathersOnly } from "../APIs/dataAPI";
import { Form, useFetcher } from "react-router-dom";
//pico bello dziala. Dodaje pogode w zaleznosci od id. Teraz trzeba zrobic UI do tego
const DownloadButton = forwardRef(function DownloadButton(props, ref) {
  const [storeData, setData] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);
  useEffect(() => {
    async function getData() {
      const result = await getWeathersOnly();
      setData([...result]);
    }
    getData();
  }, []);
  // console.log("DownloadButton data", storeData);
  const downloadCSV = (csv, filename) => {
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", filename);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  const exportToCSV = (data) => {
    // console.log("data ", data);
    // Convert array of objects to JSON
    // const json = JSON.stringify(data);
    // console.log("json: ", json);
    if (data.length !== 0) {
      const header = Object.keys(data[0]).join(",");
      const csv = data.map((row) =>
        Object.values(row)
          .map((value) => `"${value}"`)
          .join(",")
      );
      csv.unshift(header);
      const csvContent = csv.join("\n");

      return csvContent;
    }
  };
  //NIE KONWERTUJE POPRAWNIE
  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log("Selected option:", selectedOptions);
    const weatherDownload = storeData.filter((weather) => {
      return selectedOptions.includes(weather.id);
    });
    const parcelData = weatherDownload.map((pogoda) => {
      const parsedHour = pogoda.hourly.map((hour) => {
        // console.log(hour);
        const { weather, ...newHour } = hour;
        // console.log(newHour);
        return newHour;
      });
      return { city: pogoda.city, ...parsedHour };
    });
    // console.log("data:", parcelData);
    // handleDownload(parcelData);
    setSelectedOptions([]);
  };
  const handleDownload = (data) => {
    const csv = exportToCSV(data);
    downloadCSV(csv, `weather_data.csv`);
  };
  const handleOptionChange = (e) => {
    const value = e.target.value;
    if (e.target.checked) {
      setSelectedOptions([...selectedOptions, value]);
    } else {
      setSelectedOptions(selectedOptions.filter((option) => option !== value));
    }
  };
  return (
    <div id="download-data" ref={ref}>
      <form onSubmit={handleSubmit}>
        <div>
          {!storeData ? (
            <h3>No data to download!</h3>
          ) : (
            storeData
              .filter((weather) => weather.city !== undefined)
              .map((weather) => {
                return (
                  <p
                    key={weather.id + Math.floor(Math.random() * 11).toString()}
                  >
                    <input
                      type="checkbox"
                      value={weather.id}
                      checked={selectedOptions.includes(weather.id)}
                      onChange={handleOptionChange}
                    />
                    <label>{weather.city}</label>
                  </p>
                );
              })
          )}
        </div>

        <button type="submit">Download File</button>
      </form>
      {/* <button onClick={handleDownload}>Download File</button> */}
    </div>
  );
});

export default DownloadButton;
