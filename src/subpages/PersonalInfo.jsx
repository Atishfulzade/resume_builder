import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
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
  const [base64String, setBase64String] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        // Set the base64 string to state
        setBase64String(reader.result);
      };
      reader.readAsDataURL(file); // Read the file as data URL (base64)
    }
  };
  const onsubmit = (data) => {
    dispatch(updatePersonalInfo(data)); // Dispatch action to update personal info in Redux store
    data && navigate("/template/work");
  };
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <form onSubmit={handleSubmit(onsubmit)}>
        <Box
          sx={{
            border: "1px solid #eae6e6",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            borderRadius: 2,
            p: 4,
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
              src={base64String || avatar}
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
                onChange={handleFileChange} // Handle file change event
                style={{ display: "none" }} // Hide the input field
              />
              <input
                type="hidden"
                {...register("profilepic")} // Register the input field with react-hook-form
                value={base64String} // Set the value of the hidden input field to the base64 string
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
            <TextField
              label="First Name"
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
              {...register("lastname", { required: true })}
              aria-invalid={errors.lastname ? "true" : "false"}
            />
            {errors.lastname?.type === "required" && (
              <p role="alert" style={{ color: "red" }}>
                Last name is required
              </p>
            )}
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
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Button variant="contained" type="submit">
            Next
          </Button>
        </Box>
      </form>
    </Container>
  );
};

export default PersonalInfo;
