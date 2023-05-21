import { useEffect, useState, forwardRef } from "react";
import { getWeathers } from "../APIs/dataAPI";
import { Form, useFetcher } from "react-router-dom";
//pico bello dziala. Dodaje pogode w zaleznosci od id. Teraz trzeba zrobic UI do tego
const DownloadButton = forwardRef(function DownloadButton(props, ref) {
  const [storeData, setData] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);
  useEffect(() => {
    async function getData() {
      const result = await getWeathers();
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
    console.log("export CSV", data);
    const header = Object.keys(data[0]).join(",");
    const csv = data.map((row) =>
      Object.values(row)
        .map((value) => `"${value}"`)
        .join(",")
    );
    csv.unshift(header);
    return csv.join("\n");
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Selected option:", selectedOptions);
    setSelectedOptions([]);
  };
  const handleDownload = () => {
    console.log("siema");
    // const csv = exportToCSV(data);
    // downloadCSV(csv, `weather_data.csv`);
  };
  const handleOptionChange = (e) => {
    const value = e.target.value;
    if (e.target.checked) {
      setSelectedOptions([...selectedOptions, value]);
    } else {
      setSelectedOptions(selectedOptions.filter((option) => option !== value));
    }
  };
  if (!storeData) return null;
  return (
    <div id="download-data" ref={ref}>
      <form onSubmit={handleSubmit}>
        {storeData
          .filter((weather) => weather.city !== undefined)
          .map((weather) => {
            return (
              <p key={weather.id + Math.floor(Math.random() * 11).toString()}>
                <label>
                  {weather.city}
                  <input
                    type="checkbox"
                    value={weather.id}
                    checked={selectedOptions.includes(weather.id)}
                    onChange={handleOptionChange}
                  />
                </label>
              </p>
            );
          })}

        <button type="submit">Submit</button>
      </form>
      {/* <form onSubmit={handleSubmit}>
        {storeData.map((weather) => {
          return (
            <p key={new Date()}>
              <label>{weather.city}</label>
              <input
                type="radio"
                defaultValue={weather.id}
                name={weather.city}
              />
            </p>
          );
        })}
        <button type="submit">Submit</button>
      </form> */}
      <button onClick={handleDownload}>Download File</button>
    </div>
  );
});

export default DownloadButton;
