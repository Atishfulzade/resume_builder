import * as React from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useMediaQuery } from "@mui/material";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import WorkIcon from "@mui/icons-material/Work";
import SchoolIcon from "@mui/icons-material/School";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";

export default function VerticalTabs() {
  const matches = useMediaQuery("(max-width:600px)");
  const navigate = useNavigate();

  React.useEffect(() => {
    // Redirect to the default route on component mount
    navigate("/template/personal_info");
  }, []);

  return (
    <>
      {/* Container for tabs and content */}
      <div style={{ display: "flex" }}>
        {/* Container for tabs */}
        <div
          style={{
            position: "relative",
            left: "0",
            display: "flex",
            marginTop: "50px",
            flexDirection: "column",
            height: "100vh",
            width: matches ? "fit-content" : "300px", // Set width dynamically
            gap: "8px",
            borderRight: "1px solid #e7dede",
            paddingTop: "20px",
            paddingLeft: "2px",
            paddingRight: "5px",
          }}
        >
          {/* NavLink for Personal Info tab */}
          <NavLink
            to="/template/personal_info"
            style={{
              textDecoration: "none",
              fontSize: "20px",
              color: "#404040",
              padding: "10px 10px",
            }}
          >
            {matches ? <PersonAddAlt1Icon /> : "Personal Info"}
          </NavLink>
          {/* NavLink for Work tab */}
          <NavLink
            to="/template/work"
            style={{
              textDecoration: "none",
              fontSize: "20px",
              whiteSpace: "none",
              color: "#404040",
              padding: "10px 10px",
            }}
          >
            {matches ? <WorkIcon /> : "Work Experience"}
          </NavLink>
          {/* NavLink for Education tab */}
          <NavLink
            to="/template/education"
            style={{
              textDecoration: "none",
              color: "#404040",
              fontSize: "20px",
              padding: "10px 10px",
            }}
          >
            {matches ? <SchoolIcon /> : "Education"}
          </NavLink>

          {/* NavLink for Key Skill tab */}
          <NavLink
            to="/template/skill"
            style={{
              textDecoration: "none",
              color: "#404040",
              fontSize: "20px",
              paddingLeft: "50px",
              padding: "10px 10px",
            }}
          >
            {matches ? <WorkspacePremiumIcon /> : "Key Skill"}
          </NavLink>
        </div>
        {/* Container for content */}
        <div
          style={{
            marginTop: "80px",
            color: "#111",
            height: "100%",
            width: "100%",
          }}
        >
          {/* Outlet to render nested routes */}
          <Outlet />
        </div>
      </div>
    </>
  );
}
