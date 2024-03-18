import React, { useState } from "react";
import {
  Button,
  Typography,
  Box,
  Container,
  TextField,
  Divider,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const Education = () => {
  const [educationDetails, setEducationDetails] = useState([
    { institution: "", degree: "", year: "" },
  ]);

  // Function to handle changes in education details
  const handleChange = (index, event) => {
    const { name, value } = event.target;
    const updatedEducationDetails = [...educationDetails];
    updatedEducationDetails[index][name] = value;
    setEducationDetails(updatedEducationDetails);
    console.log(educationDetails);
  };

  // Function to add a new education detail section
  const addEducation = () => {
    setEducationDetails([
      ...educationDetails,
      { institution: "", degree: "", year: "" },
    ]);
  };

  const navigate = useNavigate();

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box
        sx={{
          border: "1px solid #eae6e6",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          borderRadius: 2,
          p: 4,
        }}
      >
        <Typography variant="h5" fontWeight="bold" color="#222" gutterBottom>
          Education Details
        </Typography>
        <Divider sx={{ width: "80%", my: 2 }} />

        {/* Education Detail Sections */}
        {educationDetails.map((education, index) => (
          <Box
            key={index}
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
              width: "100%",
              mt: 7,
            }}
          >
            <Typography variant="subtitle1">Education {index + 1}</Typography>
            <Divider />
            <TextField
              required
              label="Type"
              name="institution"
              value={education.institution}
              onChange={(event) => handleChange(index, event)}
              placeholder="Post Graduation"
            />
            <TextField
              required
              label="Degree"
              name="degree"
              value={education.degree}
              onChange={(event) => handleChange(index, event)}
            />
            <TextField
              required
              label="Passing Year"
              name="year"
              type="number"
              value={education.year}
              onChange={(event) => handleChange(index, event)}
            />
          </Box>
        ))}

        {/* Button to add new education detail section */}
        <Button
          variant="contained"
          style={{
            display: educationDetails.length < 3 ? "block" : "none",
            marginTop: 12,
          }}
          onClick={addEducation}
        >
          Add Education
        </Button>
      </Box>

      {/* Divider */}
      <Divider sx={{ my: 4 }} />

      {/* Navigation Buttons */}
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Button
          color="error"
          variant="contained"
          onClick={() => navigate("/template/work")}
        >
          Back
        </Button>
        <Button variant="contained" onClick={() => navigate("/template/skill")}>
          Next
        </Button>
      </Box>
    </Container>
  );
};

export default Education;
