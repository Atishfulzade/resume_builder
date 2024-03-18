import * as React from "react";
import { NavLink, Outlet } from "react-router-dom";

export default function VerticalTabs() {
  const stopNavigating = (e) => {
    e.preventDefault();
  };
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
            height: "500px",
            width: "400px",
            gap: "8px",
            borderRight: "1px solid #e7dede",
            paddingTop: "20px",
            paddingLeft: "2px",
            paddingRight: "15px",
          }}
        >
          {/* NavLink for Personal Info tab */}
          <NavLink
            to="/template/personal_info"
            style={{
              textDecoration: "none",
              fontSize: "20px",
              color: "#111",
              padding: "10px 10px",
            }}
          >
            Personal Info
          </NavLink>
          {/* NavLink for Work tab */}
          <NavLink
            to="/template/work"
            style={{
              textDecoration: "none",
              fontSize: "20px",
              whiteSpace: "none",
              color: "#111",
              padding: "10px 10px",
            }}
            onClick={stopNavigating}
          >
            Work Experience
          </NavLink>
          {/* NavLink for Education tab */}
          <NavLink
            to="/template/education"
            style={{
              textDecoration: "none",
              color: "#111",
              fontSize: "20px",
              padding: "10px 10px",
            }}
            onClick={stopNavigating}
          >
            Education
          </NavLink>

          {/* NavLink for Key Skill tab */}
          <NavLink
            to="/template/skill"
            style={{
              textDecoration: "none",
              color: "#111",
              fontSize: "20px",
              paddingLeft: "50px",
              padding: "10px 10px",
            }}
            onClick={stopNavigating}
          >
            Key Skill
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
