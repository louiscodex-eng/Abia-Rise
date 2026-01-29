import React, { useState } from "react";

function PdfViewer() {
  const [pdfUrl, setPdfUrl] = useState(null);

  const fetchPdf = async () => {
    try {
      const res = await fetch("https://your-api.com/getUserPdf"); // your API
      const data = await res.json();

      // Convert base64 to blob
      const byteCharacters = atob(data.pdfBase64);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      const blob = new Blob([byteArray], { type: "application/pdf" });

      // Create object URL for viewing
      const url = URL.createObjectURL(blob);
      setPdfUrl(url);
    } catch (err) {
      console.error("Error fetching PDF:", err);
    }
  };

  const downloadPdf = () => {
    if (!pdfUrl) return;

    const link = document.createElement("a");
    link.href = pdfUrl;
    link.download = "IDCard.pdf"; // file name
    link.click();
  };

  return (
    <div>
      <button onClick={fetchPdf}>Load PDF</button>

      {pdfUrl && (
        <div style={{ marginTop: "20px" }}>
          {/* Display PDF */}
          <iframe
            src={pdfUrl}
            width="600"
            height="800"
            title="PDF Viewer"
          ></iframe>

          {/* Download Button */}
          <div>
            <button onClick={downloadPdf} style={{ marginTop: "10px" }}>
              Download PDF
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default PdfViewer;
