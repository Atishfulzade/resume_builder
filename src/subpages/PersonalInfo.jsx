import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { setProfilePic } from "../store/profileSlice";
import toast from "react-hot-toast";
import { updatePersonalInfo } from "../store/personalInfoSlice";
import {
  Button,
  Container,
  Typography,
  TextField,
  Box,
  Avatar,
} from "@mui/material";

import { useNavigate } from "react-router-dom";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { avatar } from "../assets";
const PersonalInfo = () => {
  const [infoData, setInfoData] = useState({});
  const [getProfilePic, setGetProfilePic] = useState("");
  const [profilePicUrl, setProfilePicUrl] = useState(""); // Renamed state variable
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const personalInfo = useSelector((state) => state.personalInfo);
  const profilePicData = useSelector((state) => state.profile);
  const selectedTemplate = useSelector((state) => state.templateInfo);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  useEffect(() => {
    // Fetch profile picture data from Redux store
    setGetProfilePic(profilePicData);
    // Set profile picture URL
    setProfilePicUrl(profilePicData.profilePic);
  }, [profilePicData]);
  useEffect(() => {
    setInfoData(personalInfo);
    setValue("firstname", personalInfo.firstname || "");
    setValue("lastname", personalInfo.lastname || "");
    setValue("email", personalInfo.email || "");
    setValue("subtitle", personalInfo.subtitle || "");
    setValue("contactnumber", personalInfo.contactnumber || "");
    setValue("address", personalInfo.address || "");
    setValue("city", personalInfo.city || "");
    setValue("state", personalInfo.state || "");
    setValue("postalcode", personalInfo.postalcode || "");
    setValue("objective", personalInfo.objective || "");
  }, [personalInfo, setValue]);
  const handleFileChange = async (event) => {
    const file = await event.target.files[0];
    const reader = new FileReader();

    reader.onload = async () => {
      const base64String = reader.result;
      setProfilePicUrl(base64String); // Update the profile picture URL in the state
      dispatch(setProfilePic(base64String)); // Dispatch action to update Redux store with the profile picture URL
    };

    reader.readAsDataURL(file);
  };

  const onsubmit = (data) => {
    dispatch(updatePersonalInfo(data)); // Dispatch action to update personal info in Redux store
    navigate("/template/work");
    toast.success("Personal info updated");
  };

  return (
    <Container maxWidth="lg" style={{ padding: "2px", paddingBottom: "30px" }}>
      <form onSubmit={handleSubmit(onsubmit)}>
        <Box
          sx={{
            border: "1px solid #eae6e6",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            borderRadius: 2,
            p: 1,
          }}
        >
          <Typography variant="h5" fontWeight="bold" color="#222" gutterBottom>
            Personal Information
          </Typography>

          {/* Avatar and Upload Button */}
          <Box
            sx={{
              position: "relative",
              width: "100%",
              display: "flex",
              alignItems: "center",
              gap: "30px",
            }}
          >
            <Avatar
              src={profilePicUrl || profilePicData.profilePic || avatar}
              alt="User Avatar"
              sx={{ width: 120, height: 120 }}
            />
            {selectedTemplate.selectedTemplate === "template2" ||
            selectedTemplate.selectedTemplate === "template4" ? (
              "This template has no need of profile picture"
            ) : (
              <Button
                component="label"
                variant="contained"
                startIcon={<CloudUploadIcon />}
                sx={{ position: "relative", height: "100%" }}
              >
                Upload Profile
                <input
                  type="file"
                  onChange={handleFileChange}
                  style={{ display: "none" }}
                />
              </Button>
            )}
          </Box>
          {/* Form Fields */}
          <Box
            sx={{
              mt: 5,
              display: "flex",
              flexDirection: "column",
              gap: 3,
              width: "100%",
            }}
          >
            <Box display="flex" gap={2} sx={{ width: "100%" }}>
              <TextField
                label="First Name"
                style={{ width: "50%" }}
                {...register("firstname", { required: true })}
                aria-invalid={errors.firstname ? "true" : "false"}
                value={infoData.firstname || ""}
                onChange={(e) =>
                  setInfoData({ ...infoData, firstname: e.target.value })
                }
              />
              {errors.firstname?.type === "required" && (
                <p role="alert" style={{ color: "red" }}>
                  First name is required
                </p>
              )}
              <TextField
                label="Last Name"
                style={{ width: "50%" }}
                {...register("lastname", { required: true })}
                aria-invalid={errors.lastname ? "true" : "false"}
              />
              {errors.lastname?.type === "required" && (
                <p role="alert" style={{ color: "red" }}>
                  Last name is required
                </p>
              )}
            </Box>
            <TextField
              label="Email Address"
              type="email"
              {...register("email", { required: true })}
              aria-invalid={errors.email ? "true" : "false"}
            />
            {errors.email && (
              <p role="alert" color="red">
                {errors.email.message}
              </p>
            )}
            <TextField
              label="Subtitle"
              placeholder="Full Stack Developer"
              {...register("subtitle", { required: true })}
            />
            <TextField
              label="Mobile Number"
              type="number"
              {...register("contactnumber", { required: true })}
            />
            <TextField
              label="Address"
              {...register("address", { required: true })}
            />
            <Box sx={{ display: "flex", gap: 2 }}>
              <TextField
                label="City"
                {...register("city", { required: true })}
              />
              <TextField
                label="State"
                {...register("state", { required: true })}
              />
              <TextField
                label="Postal Code"
                type="number"
                {...register("postalcode", { required: true })}
              />
            </Box>
            <TextField
              label="Objective"
              fullWidth
              multiline
              rows={4}
              {...register("objective", { required: true })}
              value={infoData.objective || ""}
              onChange={(e) =>
                setInfoData({ ...infoData, objective: e.target.value })
              }
            />
          </Box>
        </Box>

        {/* Divider */}
        <Box sx={{ my: 4 }}>
          <hr
            style={{
              border: "none",
              borderTop: "1px solid #eae6e6",
              width: "100%",
            }}
          />
        </Box>

        {/* Navigation Buttons */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            paddingRight: "30px",
          }}
        >
          <Button variant="contained" type="submit">
            Next
          </Button>
        </Box>
      </form>
    </Container>
  );
};

export default PersonalInfo;
