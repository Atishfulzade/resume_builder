import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Document, Page, pdfjs } from "react-pdf";
import { generatePDF1 } from "../../ResumeTemp/Resume2";
import { generatePDF2 } from "../../ResumeTemp/Resume1";
import { setPdfData } from "../../store/previewPdfSlice";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { updateSave } from "../../store/saveSlice";
import useMediaQuery from "@mui/material/useMediaQuery";
import {
  Container,
  Grid,
  Typography,
  Box,
  TextField,
  Button,
} from "@mui/material";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

function PdfPreview() {
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const matches = useMediaQuery("(max-width:600px)");
  const pdfData = useSelector((state) => state.pdfPreview.pdfData);
  const resumeData = {
    personalInfo: useSelector((state) => state.personalInfo),
    educationInfo: useSelector((state) => state.education),
    workInfo: useSelector((state) => state.work),
    skillInfo: useSelector((state) => state.keyskill),
    pdfData,
    profileInfo: useSelector((state) => state.profile),
    savaInfo: useSelector((state) => state.save),
  };
  const selectedTemplate = useSelector(
    (state) => state.templateInfo.selectedTemplate
  );

  // Function to generate a Blob from base64 data
  const generateBlob = (base64Data) => {
    const byteCharacters = atob(base64Data.split(",")[1]);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    return new Blob([byteArray], { type: "application/pdf" });
  };

  // Function to trigger the download of the PDF
  const downloadPDF = (blob, filename) => {
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const onsubmit = (data) => {
    dispatch(updateSave(data)); // Dispatch action to update Redux store with the form data
    saveResumeToLocalArray(resumeData);
    // Generate PDF with the provided data
    const pdfBase64 = generatePDF1(resumeData);
    if (selectedTemplate === "template1") {
      // Call function for template 1
      const pdfBase64 = generatePDF2(resumeData);
    } else {
      // Default case
      console.log("Template not found");
    }

    // Set the PDF data in Redux store
    dispatch(setPdfData(pdfBase64));
    toast.success("File downloaded successfully");

    // Trigger the download
    if (data.save) {
      const pdfBlob = generateBlob(pdfBase64);
      downloadPDF(pdfBlob, `${data.save}.pdf`);
    }
  };

  const saveResumeToLocalArray = (resumeData) => {
    try {
      // Retrieve existing resumes from local storage
      let resumes = JSON.parse(localStorage.getItem("resumes")) || [];
      // Add the new resume data to the array
      resumes.push(resumeData);
      // Serialize the updated array to JSON string
      const serializedResumes = JSON.stringify(resumes);
      // Store the serialized array back into local storage
      localStorage.setItem("resumes", serializedResumes);
      console.log("Resume saved to local storage.");
    } catch (error) {
      console.error("Error saving resume to local storage:", error);
    }
  };

  useEffect(() => {
    // Generate PDF when component mounts

    if (selectedTemplate === "template1") {
      // Call function for template 1
      const pdfBase64 = generatePDF1(resumeData);
      dispatch(setPdfData(pdfBase64));
    } else if (selectedTemplate === "template2") {
      // Call function for template 2
      const pdfBase64 = generatePDF2(resumeData);
      dispatch(setPdfData(pdfBase64));
    } else {
      // Default case
    }
  }, [dispatch]);

  return (
    <Container maxWidth="lg">
      <Grid container spacing={2} marginTop={12}>
        <Grid item xs={12} md={6}>
          <Typography variant="h6">Preview</Typography>
          <Box border="1px solid #ccc">
            {pdfData && (
              <Document
                file={pdfData} // Pass the PDF Base64 string as file prop
              >
                <Page
                  pageNumber={1}
                  renderAnnotationLayer={false}
                  renderTextLayer={false}
                  width={matches ? 345 : 567}
                />
              </Document>
            )}
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <form onSubmit={handleSubmit(onsubmit)}>
            <Typography variant="h6">Save PDF</Typography>
            <Box>
              <Typography>Create file name</Typography>

              <TextField variant="outlined" fullWidth {...register("save")} />
            </Box>
            <Box marginTop={2}>
              <Button variant="contained" color="primary" type="submit">
                Save
              </Button>
            </Box>
          </form>
        </Grid>
      </Grid>
    </Container>
  );
}

export default PdfPreview;
