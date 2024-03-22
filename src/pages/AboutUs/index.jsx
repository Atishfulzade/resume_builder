import React from "react";
import { Box, Container, Typography, useMediaQuery } from "@mui/material";
import { underline, contactimg } from "../../assets";
import Share from "../../component/Share";

// AboutUs component
const AboutUs = () => {
  const matches = useMediaQuery("(max-width:600px)");

  return (
    <Container
      maxWidth="lg"
      sx={{
        display: "flex",
        justifyContent: "space-between",
        flexWrap: "wrap",
        flexDirection: "column",
      }}
      style={{ flexDirection: "row" }}
    >
      {/* Left side content */}
      <Box>
        {/* Title */}
        <Typography variant="h2" fontWeight="Bold" marginTop={15}>
          Resume <br /> Builder
        </Typography>
        {/* Underline image */}
        <img src={underline} alt="Underline" className="underline" />
        {/* Description */}
        <Typography marginTop={3} width={matches ? 320 : 500} minWidth={320}>
          &nbsp; Welcome to ResumeBuilder, your premier destination for crafting
          standout resumes with a diverse range of templates tailored to various
          industries and career levels. Our mission is to empower individuals to
          land their dream jobs by providing intuitive customization tools,
          professional designs, and expert advice. With our user-friendly
          interface and unlimited access to resources, you can create a
          personalized resume that reflects your unique skills and aspirations.
          Join us today and elevate your career with ResumeGenius.
        </Typography>
        {/* Share section */}
        <Typography marginTop={3} variant="h5" fontWeight="bold">
          Share with your friends
        </Typography>
        <Share />
      </Box>
      {/* Right side image */}
      <img
        src={contactimg}
        alt="Contact Image"
        className="contact_img"
        style={{ display: matches ? "none" : "" }}
      />
    </Container>
  );
};

export default AboutUs;
