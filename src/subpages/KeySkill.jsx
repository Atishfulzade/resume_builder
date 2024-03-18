import React, { useState } from "react";

import {
  Button,
  Typography,
  Box,
  Container,
  TextField,
  Divider,
  Grid,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const KeySkill = () => {
  const navigate = useNavigate();
  const [addSkill, setAddSkill] = useState([]);
  const handleAddSkill = () => {
    setAddSkill([...addSkill, []]);
  };

  return (
    <>
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Box
          sx={{
            border: "1px solid #eae6e6",

            borderRadius: 2,
            p: 4,
            minHeight: "75vh",
          }}
        >
          <Typography
            variant="h5"
            fontWeight="bold"
            color="text.primary"
            mb={3}
          >
            Key Skills
          </Typography>
          <Divider sx={{ mb: 5 }} />
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="outlined-required"
                label="Add Skill"
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="outlined-required"
                label="Add Skill"
                variant="outlined"
              />
            </Grid>

            {addSkill.map((skill) => (
              <Grid
                item
                xs={12}
                sm={6}
                style={{
                  gap: "20px",
                }}
              >
                <TextField
                  fullWidth
                  id="outlined-required"
                  label="Add Skill"
                  variant="outlined"
                />
              </Grid>
            ))}

            <Grid item xs={12} sm={6}></Grid>
          </Grid>
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddSkill}
            style={{
              display: addSkill.length < 3 ? "block" : "none",
              marginTop: 13,
            }}
          >
            Add Skill
          </Button>
        </Box>
      </Container>
      <Divider sx={{ my: 3 }} />
      <Box sx={{ display: "flex", justifyContent: "space-between", p: 2 }}>
        <Button
          variant="contained"
          color="error"
          onClick={() => navigate("/template/education")}
        >
          Back
        </Button>
        <Button variant="contained" type="submit">
          Preview
        </Button>
      </Box>
    </>
  );
};

export default KeySkill;
