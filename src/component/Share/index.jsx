import React from "react";
import FacebookIcon from "@mui/icons-material/Facebook";
import TelegramIcon from "@mui/icons-material/Telegram";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import XIcon from "@mui/icons-material/X";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import {
  FacebookShareButton,
  TelegramShareButton,
  WhatsappShareButton,
  EmailShareButton,
  TwitterShareButton,
  LinkedinShareButton,
} from "react-share";

// Share component
const Share = () => {
  // Content to be shared
  const shareText =
    "Your premier destination for crafting standout resumes with a diverse range of templates tailored to various industries and career levels. Our mission is to empower individuals to land their dream jobs by providing intuitive customization tools, professional designs, and expert advice. With our user-friendly interface and unlimited access to resources, you can create a personalized resume that reflects your unique skills and aspirations. Join us today and elevate your career with ResumeBuilder";

  // Your website URL
  const websiteUrl = "https://resume-builder-blush-beta.vercel.app/";

  return (
    <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
      {/* Facebook share button */}
      <FacebookShareButton url={websiteUrl} quote={shareText}>
        <FacebookIcon fontSize="large" color="primary" />
      </FacebookShareButton>
      {/* LinkedIn share button */}
      <LinkedinShareButton url={websiteUrl} title={shareText}>
        <LinkedInIcon fontSize="large" color="primary" />
      </LinkedinShareButton>
      {/* WhatsApp share button */}
      <WhatsappShareButton url={websiteUrl} title={shareText}>
        <WhatsAppIcon fontSize="large" color="success" />
      </WhatsappShareButton>
      {/* Twitter share button (not implemented) */}
      <TwitterShareButton url={websiteUrl} title={shareText}>
        <XIcon fontSize="large" />
      </TwitterShareButton>
      {/* Telegram share button */}
      <TelegramShareButton url={websiteUrl} title={shareText}>
        <TelegramIcon fontSize="large" color="primary" />
      </TelegramShareButton>
      {/* Email share button */}
      <EmailShareButton subject="Resume Builder" body={shareText}>
        <MailOutlineIcon fontSize="large" color="action" />
      </EmailShareButton>
    </div>
  );
};

export default Share;
