import React from "react";
import { Button, Container } from "@mui/material";
import { Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { myResumeTemp } from "../../Constant.js";
import { updateSelectedTemplate } from "../../store/templateSlice";

// ResumeTemplate component
const ResumeTemplate = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Function to choose a template
  const chooseTemplate = (templateId) => {
    dispatch(updateSelectedTemplate(templateId)); // Dispatch action to update selected template
    navigate("/template");
  };

  return (
    <Container maxWidth="lg">
      {/* Title */}
      <Typography variant="h3" marginTop={15} gutterBottom>
        Template
      </Typography>
      {/* Description */}
      <Typography variant="p" gutterBottom>
        Select a template to get started
      </Typography>

      {/* Template selection */}
      <div className="template">
        {myResumeTemp.map((item, index) => (
          <div className="resumetemplate" key={index}>
            <div className="top">
              {/* Button to use template */}
              <Button
                variant="contained"
                color="primary"
                onClick={() => {
                  chooseTemplate(item.title);
                }}
              >
                Use template
              </Button>
            </div>
            {/* Template image */}
            <img src={item.url} alt="Template" />
          </div>
        ))}
      </div>
    </Container>
  );
};

export default ResumeTemplate;
