import React, { useState } from "react";
import {
  Button,
  Typography,
  Box,
  Container,
  TextField,
  Divider,
} from "@mui/material";
import { useMediaQuery } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
const Education = () => {
  const [educationDetails, setEducationDetails] = useState([
    { type: "", university: "", degree: "", year: "" },
  ]);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  // Function to handle changes in education details
  const onsubmit = (index, event) => {
    const { name, value } = event.target;
    const updatedEducationDetails = [...educationDetails];
    updatedEducationDetails[index][name] = value;
    setEducationDetails(updatedEducationDetails);
    console.log(educationDetails);
  };
  const matches = useMediaQuery("(max-width:600px)");

  // Function to add a new education detail section
  const addEducation = () => {
    setEducationDetails([
      ...educationDetails,
      { institution: "", degree: "", startyear: "", lastyear: "" },
    ]);
  };

  const navigate = useNavigate();

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <form onSubmit={handleSubmit(onsubmit)}>
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
                {...register("type", { required: true })}
                placeholder="Post Graduation"
              />
              <TextField
                required
                label="University"
                name="university"
                placeholder="ABC university"
                {...register("university", { required: true })}
              />
              <TextField
                required
                label="Degree"
                name="degree"
                {...register("degree", { required: true })}
                placeholder="Bachelor of Engineering"
              />
              <Box display="flex" gap={2}>
                <TextField
                  required
                  label="Start Year"
                  name="startYear"
                  type="number"
                  {...register("passingyear", { required: true })}
                />
                <TextField
                  required
                  label="End Year"
                  name="endyear"
                  type="number"
                  {...register("passingyear", { required: true })}
                />
              </Box>
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
          <Button variant="contained" type="submit">
            Next
          </Button>
        </Box>
      </form>
    </Container>
  );
};

export default Education;
