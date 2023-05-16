function DownloadButton({ data }) {
  // console.log("pobierz", data);
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
    // console.log("pobierz", data);
    const header = Object.keys(data[0]).join(",");
    const csv = data.map((row) =>
      Object.values(row)
        .map((value) => `"${value}"`)
        .join(",")
    );
    csv.unshift(header);
    return csv.join("\n");
  };

  const handleDownload = () => {
    const csv = exportToCSV(data);
    downloadCSV(csv, `weather_data.csv`);
  };

  return <button onClick={handleDownload}>Download File</button>;
}

export default DownloadButton;
