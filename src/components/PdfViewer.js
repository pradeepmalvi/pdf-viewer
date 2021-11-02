import React, { useState } from "react";
import { pdfjs, Document, Page } from "react-pdf";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const PdfViewer = () => {
  const [pdf, setPdf] = useState(null);
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  function removeTextLayerOffset() {
    const textLayers = document.querySelectorAll(
      ".react-pdf__Page__textContent"
    );
    textLayers.forEach((layer) => {
      const { style } = layer;
      style.color = "unset";
    });

    const canvasLayer = document.querySelectorAll(".react-pdf__Page__canvas");
    canvasLayer.forEach((layer) => {
      const { style } = layer;
      style.visibility = "hidden";
    });
  }

  const uploadPdf = (e) => {
    setPdf(e.target.files[0]);
  };

  return (
    <>
      <input type="file" onChange={uploadPdf} />
      <div className="pdf-viewer" style={{ width: "50%", margin: "0 auto" }}>
        {pdf && (
          <>
            <div>
              <Document file={pdf} onLoadSuccess={onDocumentLoadSuccess}>
                <Page
                  onLoadSuccess={removeTextLayerOffset}
                  pageNumber={pageNumber}
                />
              </Document>
              <p>
                Page {pageNumber} of {numPages}
              </p>
            </div>{" "}
            <button onClick={() => setPageNumber(pageNumber - 1)}>
              Prev page
            </button>
            <button onClick={() => setPageNumber(pageNumber + 1)}>
              Next page
            </button>
          </>
        )}
      </div>
    </>
  );
};

export default PdfViewer;
