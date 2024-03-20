import React, { useState } from "react";
import { updateSkill } from "../store/keySkillSlice";
import { useDispatch } from "react-redux";
import {
  Button,
  Typography,
  Box,
  Container,
  TextField,
  Divider,
  Grid,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const KeySkill = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const [addSkills, setAddSkills] = useState([{ skill: "" }]);

  const handleAddSkill = () => {
    setAddSkills([...addSkills, { skill: "" }]);
  };

  const handleChange = (index, e) => {
    const updatedSkills = [...addSkills];
    updatedSkills[index].skill = e.target.value;
    setAddSkills(updatedSkills);
  };

  const onSubmit = (data) => {
    dispatch(updateSkill(data));
    data && navigate("/preview");
  };

  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <form onSubmit={handleSubmit(onSubmit)}>
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
            {addSkills.map((skill, index) => (
              <Grid item xs={12} sm={6} key={index}>
                <TextField
                  required
                  fullWidth
                  {...register(`skills[${index}].skill`, { required: true })}
                  value={skill.skill}
                  onChange={(e) => handleChange(index, e)}
                  id={`outlined-required-${index}`}
                  label="Add Skill"
                  variant="outlined"
                />
              </Grid>
            ))}
          </Grid>
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddSkill}
            style={{
              display: addSkills.length < 5 ? "block" : "none",
              marginTop: 13,
            }}
          >
            Add Skill
          </Button>
        </Box>

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
      </form>
    </Container>
  );
};

export default KeySkill;
