import React, { useEffect } from "react";
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
  const onsubmit = (data) => {
    dispatch(updateSave(data));
    // Dispatch action to update Redux store with the PDF data
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
