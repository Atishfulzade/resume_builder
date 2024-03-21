import React, { useState } from "react";
import {
  Button,
  Typography,
  Container,
  Box,
  TextField,
  Divider,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { updatework } from "../store/workSlice";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const Work = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [workDetails, setWorkDetails] = useState([
    { jobtitle: "", company: "", startyear: "", endYear: "" },
  ]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const addWork = () => {
    setWorkDetails([
      ...workDetails,
      { jobtitle: "", company: "", startyear: "", endYear: "" },
    ]);
  };

  const handleChange = (index, e) => {
    const { name, value } = e.target;
    const updatedWorkDetails = [...workDetails];
    updatedWorkDetails[index][name] = value;
    setWorkDetails(updatedWorkDetails);
  };

  const onsubmit = (e) => {
    dispatch(updatework(workDetails));
    navigate("/template/education");
    toast.success("Work updated successfully");
  };

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
            Work Experience
          </Typography>

          {workDetails.map((workDetail, index) => (
            <Box
              sx={{ mt: 5, display: "flex", flexDirection: "column", gap: 3 }}
              key={index}
            >
              {/* Work Experience Section */}
              <Typography variant="subtitle1">
                Experience {index + 1}
              </Typography>
              <Divider sx={{ width: "100%" }} />
              <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                <TextField
                  required
                  label="Job Title"
                  name="jobtitle"
                  value={workDetail.jobtitle}
                  onChange={(e) => handleChange(index, e)}
                />
                <TextField
                  required
                  label="Organization Name"
                  name="company"
                  value={workDetail.company}
                  onChange={(e) => handleChange(index, e)}
                />
                <Box sx={{ display: "flex", gap: 2 }}>
                  <TextField
                    required
                    label="Start Year"
                    type="number"
                    name="startyear"
                    value={workDetail.startyear}
                    onChange={(e) => handleChange(index, e)}
                  />
                  <TextField
                    required
                    label="End Year"
                    type="number"
                    name="endYear"
                    value={workDetail.endYear}
                    onChange={(e) => handleChange(index, e)}
                  />
                </Box>
              </Box>
            </Box>
          ))}

          {/* Button to add new work experience */}
          <Button
            variant="contained"
            style={{
              display: workDetails.length < 3 ? "block" : "none",
              marginTop: 12,
            }}
            sx={{ mt: 3 }}
            onClick={addWork}
          >
            Add Experience
          </Button>
        </Box>

        <Divider sx={{ my: 4 }} />

        {/* Navigation buttons */}
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Button
            color="error"
            variant="contained"
            onClick={() => navigate("/template/personal_info")}
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

export default Work;
