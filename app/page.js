"use client";

import { useState } from "react";

export default function Home() {
  // PDF → Image
  const [pdfFile, setPdfFile] = useState(null);
  const [pdfLoading, setPdfLoading] = useState(false);
  const [pdfDrag, setPdfDrag] = useState(false);

  // Image → PDF
  const [images, setImages] = useState([]);
  const [imgLoading, setImgLoading] = useState(false);
  const [imgDrag, setImgDrag] = useState(false);

  // ---------- PDF → IMAGE ----------
  const handlePdfSubmit = async (e) => {
    e.preventDefault();
    if (!pdfFile) return alert("Select a PDF");

    const formData = new FormData();
    formData.append("pdf", pdfFile);

    try {
      setPdfLoading(true);

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/pdf-to-image`, {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Conversion failed");

      const blob = await res.blob();
      download(blob, "images.zip");
    } catch (err) {
      alert(err.message);
    } finally {
      setPdfLoading(false);
    } setPdfFile(null)
  };

  // ---------- IMAGE → PDF ----------
  const handleImgSubmit = async (e) => {
    e.preventDefault();
    if (!images.length) return alert("Select images");

    const formData = new FormData();

    Array.from(images).forEach((image) => {
      formData.append("images", image);
    });

    try {
      setImgLoading(true);

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/image-to-pdf`, {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Conversion failed");

      const blob = await res.blob();
      download(blob, "output.pdf");
    } catch (err) {
      alert(err.message);
    } finally {
      setImgLoading(false);
    } setImages([])
  };

  const download = (blob, filename) => {
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

  return (
    <>
      {/* Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "PDF Lover",
            url: "https://pdf.olivez.in",
            applicationCategory: "Utility",
            featureList: [
              "Image to PDF Converter",
              "PDF to Image Converter",
            ],
            operatingSystem: "All",
          }),
        }}
      />

      <main className="page">

        <div className="navbar">
          <h1 className="title">PDF LOVER</h1>
        </div>

        <div className="container">
          {/* IMAGE → PDF */}
          <div className="card green">
            <h2>Convert Image to PDF</h2>

            <form onSubmit={handleImgSubmit} className="form">
              <div
                className={`dropzone ${imgDrag ? "active" : ""}`}
                onDragOver={(e) => { e.preventDefault(); setImgDrag(true); }}
                onDragLeave={() => setImgDrag(false)}
                onDrop={(e) => {
                  e.preventDefault();
                  setImgDrag(false);
                  setImages(e.dataTransfer.files);
                }}
              >
                <input
                  type="file"
                  accept="image/png, image/jpeg"
                  multiple
                  hidden
                  id="imgInput"
                  onChange={(e) => setImages(e.target.files)}
                />
                <label htmlFor="imgInput">
                  {images.length
                    ? `${images.length} images selected`
                    : "Drop images or click"}
                </label>
              </div>

              <button className="green-btn" disabled={imgLoading}>
                {imgLoading ? "Converting..." : "Convert"}
              </button>
            </form>
          </div>

          <p>Convert images to PDF online in seconds. Upload multiple JPG or PNG images and merge them into a single high-quality PDF with original resolution preserved. No registration, no watermarks, and fully mobile-friendly.</p>

          <hr />

          {/* PDF → IMAGE */}
          <div className="card">
            <h2>Convert PDF to Image</h2>

            <form onSubmit={handlePdfSubmit} className="form">
              <div
                className={`dropzone ${pdfDrag ? "active" : ""}`}
                onDragOver={(e) => { e.preventDefault(); setPdfDrag(true); }}
                onDragLeave={() => setPdfDrag(false)}
                onDrop={(e) => {
                  e.preventDefault();
                  setPdfDrag(false);
                  setPdfFile(e.dataTransfer.files[0]);
                }}
              >
                <input
                  type="file"
                  accept="application/pdf"
                  hidden
                  id="pdfInput"
                  onChange={(e) => setPdfFile(e.target.files[0])}
                />
                <label htmlFor="pdfInput">
                  {pdfFile ? pdfFile.name : "Drop PDF or click"}
                </label>
              </div>

              <button disabled={pdfLoading}>
                {pdfLoading ? "Converting..." : "Convert"}
              </button>
            </form>
          </div>

          <p>Convert PDF pages to images online effortlessly. Upload a PDF and download high-quality JPG images for each page in seconds. Fast processing, secure handling, and no account required.</p>

        </div>
      </main>
    </>
  );
}
