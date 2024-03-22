import React from "react";
import { Button, Container } from "@mui/material";
import { Typography } from "@mui/material";
import img1 from "../../assets/first.webp";
import img2 from "../../assets/second.webp";
import img3 from "../../assets/third.svg";
import img4 from "../../assets/fourth.webp";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updateSelectedTemplate } from "../../store/templateSlice";
const ResumeTemplate = () => {
  const myResumeTemp = [
    { title: "template1", url: img1, needProfilePic: true },
    { title: "template2", url: img2, needProfilePic: true },
    { title: "template3", url: img3, needProfilePic: true },
    { title: "template4", url: img4, needProfilePic: true },
  ];
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const chooseTemplate = (templateId) => {
    dispatch(updateSelectedTemplate(templateId)); // Dispatch action to update selected template
    navigate("/template");
  };
  return (
    <Container maxWidth="lg">
      <Typography variant="h3" marginTop={15} gutterBottom>
        Template
      </Typography>
      <Typography variant="p" gutterBottom>
        Select a template to get started
      </Typography>

      <div className="template">
        {myResumeTemp.map((item, index) => (
          <div className="resumetemplate" key={index}>
            <div className="top">
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
            <img src={item.url} alt="Template " />
          </div>
        ))}
      </div>
    </Container>
  );
};

export default ResumeTemplate;
