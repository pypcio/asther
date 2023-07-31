import { useEffect, useState, forwardRef } from "react";
// import servises from "../APIs/servises.js";
//pico bello dziala. Dodaje pogode w zaleznosci od id. Teraz trzeba zrobic UI do tego
const DownloadButton = forwardRef(function DownloadButton(props, ref) {
  //   const [storeData, setData] = useState(null);
  //   const [selectedOptions, setSelectedOptions] = useState([]);
  //   useEffect(() => {
  //     async function getData() {
  //       const result = await servises.getAllLocation();
  //       setData([...result]);
  //     }
  //     getData();
  //   }, []);
  //   const exportJsonFile = (data, fileName) => {
  //     // Create a JSON string from the data
  //     const jsonData = JSON.stringify(data, null, 2);
  //     // Create a Blob object with the JSON data
  //     const blob = new Blob([jsonData], { type: "application/json" });
  //     // Create a URL for the Blob object
  //     const url = URL.createObjectURL(blob);
  //     // Create a link element
  //     const link = document.createElement("a");
  //     link.href = url;
  //     link.download = fileName;
  //     // Append the link to the document body
  //     document.body.appendChild(link);
  //     // Programmatically click the link to trigger the download
  //     link.click();
  //     // Clean up by revoking the URL and removing the link element
  //     URL.revokeObjectURL(url);
  //     document.body.removeChild(link);
  //   };
  //   const handleSubmit = (e) => {
  //     e.preventDefault();
  //     const weatherDownload = storeData.filter((weather) => {
  //       return selectedOptions.includes(weather.id);
  //     });
  //     handleDownload(weatherDownload);
  //     setSelectedOptions([]);
  //     // return weatherDownload;
  //   };
  //   const handleDownload = (data) => {
  //     // const csv = exportToCSV(data);
  //     exportJsonFile(data, `weather_data.json`);
  //   };
  //   const handleOptionChange = (e) => {
  //     const value = e.target.value;
  //     if (e.target.checked) {
  //       setSelectedOptions([...selectedOptions, value]);
  //     } else {
  //       setSelectedOptions(selectedOptions.filter((option) => option !== value));
  //     }
  //   };
  return (
    <div
      id="download-div"
      ref={ref}
      className={`br3 ba shadow-5 b--black-20 mv4 w-100 w-50-m w-25-l mw fade-in bg-white `}
    >
      <div>
        <h2 className="center flex justify-center items-center">
          Comming soon!
        </h2>
      </div>
      {/* <form onSubmit={handleSubmit}>
        <div>
          {!storeData ? (
            <h3>Loading data...</h3>
          ) : (
            <>
              {storeData
                .filter((weather) => weather.city !== undefined)
                .map((weather) => {
                  return (
                    <p
                      key={
                        weather.id + Math.floor(Math.random() * 11).toString()
                      }
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
                })}
              <p>
                <button type="submit">Download JSON</button>
              </p>
            </>
          )}
        </div>
      </form> */}
      {/* <button onClick={handleDownload}>Download File</button> */}
    </div>
  );
});

export default DownloadButton;
