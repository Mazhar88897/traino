import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Box,
  FormControl,
  IconButton,
  InputAdornment,
  OutlinedInput,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";
import React, { useEffect } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { handleError } from "../../../hooks/globalFunction";
import { changePassword, updateAdminData } from "../../../services/auth";
import { selectUser, updateUserData } from "../../../store/slice/user";
import CustomButton from "../../CustomButton";
import ValidationError from "../../ValidationError";
import { Style } from "../style";
import 'react-toastify/dist/ReactToastify.css';

const EditProfileForm = ({ setOpen }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { first_name, last_name, access } = useSelector(selectUser);
  const [showPassword, setShowPassword] = React.useState({
    currentPassword: false,
    password: false,
  });

  const [loading, setLoading] = React.useState(false);
  const formik = useFormik({
    initialValues: {
      firstName: first_name,
      lastName: last_name,
      currentPassword: "",
      password: "",
    },
    validationSchema: Yup.object().shape({
      firstName: Yup.string(),
      lastName: Yup.string(),
      currentPassword: Yup.string(),
      password: Yup.string(),
    }),
    onSubmit: async (values, { resetForm }) => {
      const {
        firstName,
        lastName,
        password,
        currentPassword,
      } = values;

      const updateProfileData = {
        first_name: firstName,
        last_name: lastName,
      };
      const newPasswordData = {
        current_password: currentPassword,
        new_password: password,
        re_new_password: password,
      };
      if (!(firstName === first_name && lastName === last_name)) {
        setLoading(true);
        await updateAdminData(dispatch, navigate, updateProfileData, access)
          .then((res) => {
            dispatch(
              updateUserData({
                ...res.data,
              })
            );
            toast.success("Profile updated successfully");
            setLoading(false);
            setOpen(false);
          })
          .catch((err) => {
            toast.error(handleError(updateProfileData, err?.response?.data));
            setLoading(false);
          });
      }
      if (!!currentPassword && !!password) {
        setLoading(true);
        await changePassword(dispatch, navigate, newPasswordData, access)
          .then(async(res) => {
            toast.success("password changed successfully");
            await formik.setFieldValue("currentPassword", "")
            await formik.setFieldValue("password", "")
            setLoading(false);
            setOpen(false);
          })
          .catch((err) => {
            toast.error(handleError(newPasswordData, err?.response?.data));
            setLoading(false);
          });
      }
    },
  });

  const hasErrors = !!Object.values(formik.errors || []).length;
  const isNameChanged =
    formik.values.firstName === first_name &&
    formik.values.lastName === last_name;
  const isPasswordChanged =
    formik.values.currentPassword &&
    formik.values.password 

  const disabled =
    hasErrors || (!hasErrors && isNameChanged && !isPasswordChanged);

  return (
    <Box sx={{ ...Style.formSection, width: "100%", px: 0 }}>
      <Box
        component="form"
        sx={Style.form}
        noValidate
        autoComplete="off"
        onSubmit={formik.handleSubmit}
      >
        <Box sx={Style.container}>
          <Box sx={Style.inputContainer}>
            <Typography sx={Style.editFormLabel}>
              First Name
              <Box component={"span"} sx={{ color: "red" }}>
                *
              </Box>
            </Typography>
            <FormControl
              sx={{ ...Style.formControl, mt: "7px" }}
              variant="outlined"
            >
              <OutlinedInput
                id="firstName"
                type={"text"}
                placeholder="First Name"
                name="firstName"
                value={formik.values.firstName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik?.errors?.firstName && formik.touched.firstName && (
                <ValidationError error={formik?.errors?.firstName} />
              )}
            </FormControl>
          </Box>
          <Box sx={Style.inputContainer}>
            <Typography sx={Style.editFormLabel}>
              Last Name
              <Box component={"span"} sx={{ color: "red" }}>
                *
              </Box>
            </Typography>
            <FormControl
              sx={{ ...Style.formControl, mt: "7px" }}
              variant="outlined"
            >
              <OutlinedInput
                id="lastName"
                type={"text"}
                placeholder="Last Name"
                name="lastName"
                value={formik.values.lastName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik?.errors?.lastName && formik.touched.lastName && (
                <ValidationError error={formik?.errors?.lastName} />
              )}
            </FormControl>
          </Box>
        </Box>
        <Typography sx={Style.changePasswordTittle}>Change Password</Typography>
        <Box sx={Style.container}>
          <Box sx={Style.inputContainer}>
            <Typography sx={Style.editFormLabel}>
              Current Password
              <Box component={"span"} sx={{ color: "red" }}>
                *
              </Box>
            </Typography>
            <FormControl
              sx={{
                ...Style.formControl,
                mt: "7px",
              }}
              variant="outlined"
            >
              <OutlinedInput
                id="currPassword"
                type={showPassword.currentPassword ? "text" : "password"}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() =>
                        setShowPassword((prevState) => ({
                          ...prevState,
                          currentPassword: !prevState.currentPassword,
                        }))
                      }
                      edge="end"
                    >
                      {showPassword.currentPassword ? (
                        <VisibilityOff />
                      ) : (
                        <Visibility />
                      )}
                    </IconButton>
                  </InputAdornment>
                }
                placeholder="Current Password"
                name="currentPassword"
                value={formik.values.currentPassword}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik?.errors?.currentPassword &&
                formik.touched.currentPassword && (
                  <ValidationError error={formik?.errors?.currentPassword} />
                )}
            </FormControl>
          </Box>
          <Box sx={Style.inputContainer}>
            <Typography sx={Style.editFormLabel}>
              New Password
              <Box component={"span"} sx={{ color: "red" }}>
                *
              </Box>
            </Typography>
            <FormControl
              sx={{ ...Style.formControl, mt: "7px" }}
              variant="outlined"
            >
              <OutlinedInput
                id="password"
                type={showPassword.password ? "text" : "password"}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() =>
                        setShowPassword((prevState) => ({
                          ...prevState,
                          password: !prevState.password,
                        }))
                      }
                      edge="end"
                    >
                      {showPassword.password ? (
                        <VisibilityOff />
                      ) : (
                        <Visibility />
                      )}
                    </IconButton>
                  </InputAdornment>
                }
                placeholder="Password"
                name="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik?.errors?.password && formik.touched.password && (
                <ValidationError error={formik?.errors?.password} />
              )}
            </FormControl>
          </Box>
        </Box>
        <CustomButton
          sx={Style.btn}
          buttonText={"Update"}
          type={"submit"}
          loading={loading}
          disable={disabled}
        />
      </Box>
    </Box>
  );
};
export default EditProfileForm;
