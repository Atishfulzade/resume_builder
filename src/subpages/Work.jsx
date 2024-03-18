import React, { useState } from "react";
import {
  Button,
  Typography,
  Container,
  Box,
  TextField,
  Divider,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const Work = () => {
  const navigate = useNavigate();
  const [workDetail, setWorkDetail] = useState([
    { jobtitle: "", organization: "", startyear: "", endYear: "" },
  ]);

  const addWork = () => {
    setWorkDetail([
      ...workDetail,
      { jobtitle: "", organization: "", startyear: "", endYear: "" },
    ]);
  };

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
          Work Experience
        </Typography>

        {workDetail.map((workDetail, index) => (
          <Box
            sx={{ mt: 5, display: "flex", flexDirection: "column", gap: 3 }}
            key={index}
          >
            {/* Work Experience Section 1 */}
            <Typography variant="subtitle1">Experience {index + 1}</Typography>
            <Divider sx={{ width: "100%" }} />
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <TextField required label="Job Title" />
              <TextField required label="Organization Name" />
              <Box sx={{ display: "flex", gap: 2 }}>
                <TextField required label="Start Year" type="number" />
                <TextField required label="End Year" type="number" />
              </Box>
            </Box>
          </Box>
        ))}
        {/* Button to add new work experience */}
        <Button
          variant="contained"
          style={{
            display: workDetail.length < 3 ? "block" : "none",
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
        <Button
          variant="contained"
          onClick={() => navigate("/template/education")}
        >
          Next
        </Button>
      </Box>
    </Container>
  );
};

export default Work;
