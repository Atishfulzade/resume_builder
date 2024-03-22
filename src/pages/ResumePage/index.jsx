import React, { useEffect, useState } from "react";
import { Box, Container, IconButton } from "@mui/material";
import { Document, Page, pdfjs } from "react-pdf";
import EditIcon from "@mui/icons-material/Edit";
import toast from "react-hot-toast";
import DeleteIcon from "@mui/icons-material/Delete";

// Set worker source for pdfjs
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const MyTemplate = () => {
  const [resumeData, setResumeData] = useState([]);

  useEffect(() => {
    const getAllResumesFromLocalStorage = () => {
      try {
        // Retrieve resumes array from local storage
        const serializedResumes = localStorage.getItem("resumes");
        // Deserialize the array back to its original format
        const resumes = JSON.parse(serializedResumes) || [];
        console.log("Retrieved all resumes from local storage.");
        return resumes;
      } catch (error) {
        console.error("Error retrieving resumes from local storage:", error);
        return [];
      }
    };
    setResumeData(getAllResumesFromLocalStorage());
  }, []);

  const deleteResumeFromLocalStorage = (indexToDelete) => {
    try {
      // Retrieve resumes array from local storage
      const serializedResumes = localStorage.getItem("resumes");
      // Deserialize the array back to its original format
      let resumes = JSON.parse(serializedResumes) || [];

      // Check if the index to delete is valid
      if (indexToDelete >= 0 && indexToDelete < resumes.length) {
        // Remove the desired resume from the array
        resumes.splice(indexToDelete, 1);

        // Update local storage with the modified array
        localStorage.setItem("resumes", JSON.stringify(resumes));

        console.log("Resume deleted successfully.");
        // Update state to reflect the changes
        setResumeData(resumes);
      } else {
        console.error("Invalid index to delete.");
      }
    } catch (error) {
      console.error("Error deleting resume from local storage:", error);
    }
    toast.success("Resume deleted successfully.");
  };

  return (
    <Container maxWidth="lg">
      <div
        style={{
          display: "flex",
          justifyContent: "flex-start",
          gap: "20px",
          marginTop: "100px",
          flexWrap: "wrap",
        }}
      >
        {resumeData.length < 1 ? (
          <h3
            style={{ textAlign: "center", width: "100%", marginTop: "200px" }}
          >
            Resume not available
          </h3>
        ) : (
          resumeData &&
          resumeData.map((data, index) => (
            <Box border="1px solid #404040" position="relative" key={index}>
              <Document file={data.pdfData}>
                <Page
                  pageNumber={1}
                  renderAnnotationLayer={false}
                  renderTextLayer={false}
                  width={345}
                />
              </Document>
              <Box
                display="flex"
                justifyContent="flex-end"
                bgcolor="#ffffff"
                padding={1}
                position="absolute"
                width="80px"
                right={0}
                borderRadius="20px 0 0 20px"
                bottom="10px"
              >
                <IconButton
                  color="error"
                  variant="contained"
                  onClick={() => {
                    deleteResumeFromLocalStorage(index);
                  }}
                >
                  <DeleteIcon />
                </IconButton>
              </Box>
            </Box>
          ))
        )}
      </div>
    </Container>
  );
};

export default MyTemplate;
