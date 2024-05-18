import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Document, Page, pdfjs } from "react-pdf";
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
import { generatePDF1 } from "../../ResumeTemp/Resume1";
import { generatePDF2 } from "../../ResumeTemp/Resume2";
import { generatePDF3 } from "../../ResumeTemp/Resume3";
import { generatePDF4 } from "../../ResumeTemp/Resume4";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

function PdfPreview() {
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const matches = useMediaQuery("(max-width:600px)");

  const pdfData = useSelector((state) => state.pdfPreview.pdfData);
  const selectedTemplate = useSelector(
    (state) => state.templateInfo.selectedTemplate
  );

  const resumeData = {
    personalInfo: useSelector((state) => state.personalInfo),
    educationInfo: useSelector((state) => state.education),
    workInfo: useSelector((state) => state.work),
    skillInfo: useSelector((state) => state.keyskill),
    profileInfo: useSelector((state) => state.profile),
    saveInfo: useSelector((state) => state.save),
    pdfPreview: useSelector((state) => state.pdfPreview),
  };

  // Convert base64 PDF data to a Blob
  const generateBlob = (base64Data) => {
    const byteCharacters = atob(base64Data.split(",")[1]);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    return new Blob([byteArray], { type: "application/pdf" });
  };

  // Download the PDF file
  const downloadPDF = (blob, filename) => {
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
  };

  // Handle form submission to save PDF
  const onSubmit = (data) => {
    dispatch(updateSave(data));
    saveResumeToLocalArray(resumeData);

    let pdfBase64;
    switch (selectedTemplate) {
      case "template1":
        pdfBase64 = generatePDF1(resumeData);
        break;
      case "template2":
        pdfBase64 = generatePDF2(resumeData);
        break;
      case "template3":
        pdfBase64 = generatePDF3(resumeData);
        break;
      case "template4":
        pdfBase64 = generatePDF4(resumeData);
        break;
      default:
        console.log("Select template");
        return;
    }

    dispatch(setPdfData(pdfBase64));
    toast.success("File downloaded successfully");

    if (data.save) {
      const pdfBlob = generateBlob(pdfBase64);
      downloadPDF(pdfBlob, `${data.save}.pdf`);
    }
  };

  // Save resume data to local storage
  const saveResumeToLocalArray = (resumeData) => {
    try {
      const resumes = JSON.parse(localStorage.getItem("resumes")) || [];
      resumes.push(resumeData);
      localStorage.setItem("resumes", JSON.stringify(resumes));
      console.log("Resume saved to local storage.");
    } catch (error) {
      console.error("Error saving resume to local storage:", error);
    }
  };

  // Generate PDF preview on component mount and when template changes
  useEffect(() => {
    let pdfBase64;
    switch (selectedTemplate) {
      case "template1":
        pdfBase64 = generatePDF1(resumeData);
        break;
      case "template2":
        pdfBase64 = generatePDF2(resumeData);
        break;
      case "template3":
        pdfBase64 = generatePDF3(resumeData);
        break;
      case "template4":
        pdfBase64 = generatePDF4(resumeData);
        break;
      default:
        console.log("Select template");
        return;
    }
    dispatch(setPdfData(pdfBase64));
  }, [dispatch, selectedTemplate]);

  return (
    <Container maxWidth="lg">
      <Grid container spacing={2} marginTop={12}>
        <Grid item xs={12} md={6}>
          <Typography variant="h6">Preview</Typography>
          <Box border="1px solid #ccc">
            {pdfData && (
              <Document file={pdfData}>
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
          <form onSubmit={handleSubmit(onSubmit)}>
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
