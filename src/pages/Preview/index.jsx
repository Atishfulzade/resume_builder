import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Document, Page, pdfjs } from "react-pdf";
import { generatePDF } from "../../ResumeTemp/Resume1";
import { setPdfData } from "../../store/pdfPreviewSlice";
import { useForm } from "react-hook-form";
import { updateSave } from "../../store/saveSlice";
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
  const [mainResume, setMainResume] = useState({});
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();

  const pdfData = useSelector((state) => state.pdfPreview.pdfData);
  const personalInfo = useSelector((state) => state.personalInfo);
  const educationInfo = useSelector((state) => state.education);
  const workInfo = useSelector((state) => state.work);
  const skillInfo = useSelector((state) => state.keyskill);
  const profileInfo = useSelector((state) => state.profile);
  const savaInfo = useSelector((state) => state.save);
  const resumeData = {
    personalInfo,
    educationInfo,
    workInfo,
    skillInfo,
    profileInfo,
    savaInfo,
  };
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
    saveResumeToLocalStorage(resumeData);
    // Generate PDF with the provided data
    const pdfBase64 = generatePDF(resumeData);

    // Set the PDF data in Redux store
    dispatch(setPdfData(pdfBase64));

    // Trigger the download
    if (data.save) {
      const pdfBlob = generateBlob(pdfBase64);
      downloadPDF(pdfBlob, `${data.save}.pdf`);
    }
  };

  const saveResumeToLocalStorage = (resumeData) => {
    try {
      // Serialize the resume data to JSON string
      const serializedData = JSON.stringify(resumeData);
      // Store the serialized data in local storage
      localStorage.setItem("resume", serializedData);
      console.log("Resume data saved to local storage.");
    } catch (error) {
      console.error("Error saving resume data to local storage:", error);
    }
  };

  useEffect(() => {
    // Generate PDF when component mounts
    const pdfBase64 = generatePDF(resumeData);
    dispatch(setPdfData(pdfBase64));
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
                  width={567}
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
