import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { setProfilePic } from "../store/profileSlice";
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
import avatar from "../assets/user.png";

const PersonalInfo = () => {
  const [profilePicUrl, setProfilePicUrl] = useState(""); // Renamed state variable
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

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
              src={profilePicUrl || avatar}
              alt="User Avatar"
              sx={{ width: 120, height: 120 }}
            />
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
