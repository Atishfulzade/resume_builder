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
    profileInfo: useSelector((state) => state.profile),
    savaInfo: useSelector((state) => state.save),
    pdfPreview: useSelector((state) => state.pdfPreview),
  };
  const selectedTemplate = useSelector(
    (state) => state.templateInfo.selectedTemplate
  );

  const generateBlob = (base64Data) => {
    const byteCharacters = atob(base64Data.split(",")[1]);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    return new Blob([byteArray], { type: "application/pdf" });
  };

  const downloadPDF = (blob, filename) => {
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const onSubmit = (data) => {
    dispatch(updateSave(data));
    saveResumeToLocalArray(resumeData);
    let pdfBase64;
    if (selectedTemplate === "template1") {
      pdfBase64 = generatePDF1(resumeData);
    } else if (selectedTemplate === "template2") {
      pdfBase64 = generatePDF2(resumeData);
    } else {
      console.log("Template not found");
    }

    dispatch(setPdfData(pdfBase64));
    toast.success("File downloaded successfully");

    if (data.save) {
      const pdfBlob = generateBlob(pdfBase64);
      downloadPDF(pdfBlob, `${data.save}.pdf`);
    }
  };

  const saveResumeToLocalArray = (resumeData) => {
    try {
      let resumes = JSON.parse(localStorage.getItem("resumes")) || [];
      resumes.push(resumeData);
      const serializedResumes = JSON.stringify(resumes);
      localStorage.setItem("resumes", serializedResumes);
      console.log("Resume saved to local storage.");
    } catch (error) {
      console.error("Error saving resume to local storage:", error);
    }
  };

  useEffect(() => {
    let pdfBase64;
    if (selectedTemplate === "template1") {
      pdfBase64 = generatePDF1(resumeData);
    } else if (selectedTemplate === "template2") {
      pdfBase64 = generatePDF2(resumeData);
    } else {
      console.log("Template not found");
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
