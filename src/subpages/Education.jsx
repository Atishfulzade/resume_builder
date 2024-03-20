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
import { useForm } from "react-hook-form";
import { updateEducation } from "../store/educationSlice";
import { useDispatch } from "react-redux";
const Education = () => {
  const [educationDetails, setEducationDetails] = useState([
    { institution: "", degree: "", startYear: "", endYear: "" },
  ]);
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onSubmit = (data) => {
    dispatch(updateEducation(data));
    data && navigate("/template/skill");
  };

  const addEducation = () => {
    setEducationDetails([
      ...educationDetails,
      { institution: "", degree: "", startYear: "", endYear: "" },
    ]);
  };

  const handleInputChange = (index, name, value) => {
    const updatedEducationDetails = [...educationDetails];
    updatedEducationDetails[index][name] = value;
    setEducationDetails(updatedEducationDetails);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <form onSubmit={handleSubmit(onSubmit)}>
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
                label="Institution"
                name="institution"
                onChange={(e) =>
                  handleInputChange(index, "institution", e.target.value)
                }
                {...register(`education[${index}].institution`, {
                  required: true,
                })}
              />
              <TextField
                required
                label="Degree"
                name="degree"
                onChange={(e) =>
                  handleInputChange(index, "degree", e.target.value)
                }
                {...register(`education[${index}].degree`, { required: true })}
              />
              <Box display="flex" gap={2}>
                <TextField
                  required
                  label="Start Year"
                  name="startYear"
                  type="number"
                  onChange={(e) =>
                    handleInputChange(index, "startYear", e.target.value)
                  }
                  style={{ width: "50%" }}
                  {...register(`education[${index}].startYear`, {
                    required: true,
                  })}
                />
                <TextField
                  required
                  label="End Year"
                  name="endYear"
                  type="number"
                  onChange={(e) =>
                    handleInputChange(index, "endYear", e.target.value)
                  }
                  style={{ width: "50%" }}
                  {...register(`education[${index}].endYear`, {
                    required: true,
                  })}
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
