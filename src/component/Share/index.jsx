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
const Share = () => {
  const title =
    "Your premier destination for crafting standout resumes with a diverse range of templates tailored to various industries and career levels. Our mission is to empower individuals to land their dream jobs by providing intuitive customization tools, professional designs, and expert advice. With our user-friendly interface and unlimited access to resources, you can create a personalized resume that reflects your unique skills and aspirations. Join us today and elevate your career with ResumeBuilder";
  return (
    <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
      <FacebookShareButton
        url="https://www.facebook.com/sharer/sharer.php?"
        title={title}
      >
        <FacebookIcon fontSize="large" color="primary" />
      </FacebookShareButton>
      <LinkedinShareButton
        url={`https://www.linkedin.com/shareArticle?mini=true&title=Your%resume%builder&summary=${title}&source=LinkedIn`}
        title={title}
      >
        <LinkedInIcon fontSize="large" color="primary" />
      </LinkedinShareButton>
      <WhatsappShareButton url={`whatsapp://send?text=${title}`} title={title}>
        <WhatsAppIcon fontSize="large" color="success" />
      </WhatsappShareButton>
      <TwitterShareButton url="http://twitter.com/share" title={title}>
        <XIcon fontSize="large" />
      </TwitterShareButton>
      <TelegramShareButton
        url="{`https://telegram.me/share/url?url=http://atishulzade.com&text=${title}`}"
        title={title}
      >
        <TelegramIcon fontSize="large" color="primary" />
      </TelegramShareButton>
      <EmailShareButton title={title}>
        <MailOutlineIcon fontSize="large" color="action" />
      </EmailShareButton>
    </div>
  );
};

export default Share;
