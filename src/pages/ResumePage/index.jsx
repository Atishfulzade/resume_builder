import { Container, Typography } from "@mui/material";
import React from "react";
import res from "../../assets/fourth.png";
const MyTemplate = () => {
  const previousResume = [res, res];
  return (
    <Container maxWidth="lg">
      <div
        style={{ display: "flex", justifyContent: "flex-start", gap: "20px" }}
      >
        {previousResume.length < 1 ? (
          <Typography variant="h4" marginTop={10}>
            You have no saved resume
          </Typography>
        ) : (
          previousResume.map((resume) => (
            <img
              src={resume}
              style={{
                marginTop: "100px",
                height: "450px",
                width: "350px",
                objectFit: "contain",
                border: "1px solid gray",
              }}
            ></img>
          ))
        )}
      </div>
    </Container>
  );
};

export default MyTemplate;
