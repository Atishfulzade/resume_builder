import React, { useState } from "react";
import { jsPDF } from "jspdf";
import { Document, Page, pdfjs } from "react-pdf";
import { useSelector } from "react-redux";
const PdfPreview = () => {
  const personalInfo = useSelector((state) => state.personal);
  console.log(personalInfo[0]);
  return (
    <div style={{ marginTop: "100px", background: "red" }}>
      <p>hello</p>
      <h1>{personalInfo[0]?.firstname}</h1>
    </div>
  );
};

export default PdfPreview;
