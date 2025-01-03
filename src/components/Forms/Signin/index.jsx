import {
  Box,
  Button,
  Checkbox,
  FormControl,
  IconButton,
  InputAdornment,
  OutlinedInput,
  Typography,
} from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import { useFormik } from "formik";
import React from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import {
  formikValidation,
  getAllData,
  handleError,
} from "../../../hooks/globalFunction";
import { signIn } from "../../../services/auth";
import { selectUser, updateUserData } from "../../../store/slice/user";
import CustomButton from "../../CustomButton";
import ValidationError from "../../ValidationError";
import { Style } from "../style";
import { MdOutlineVisibility, MdOutlineVisibilityOff } from "react-icons/md";
import { FcGoogle } from "react-icons/fc";
import useWindowDimensions from "../../../hooks/windowDimensions";
import { useEffect } from "react";
// useEffect(() => {
//   const savedValues = JSON.parse(localStorage.getItem("rememberMe"));
//   if (savedValues) {
//     formik.setValues(savedValues);
//     formik.submitForm();
//     setIsChecked(true);
//     // formik.handleSubmit();
//   }
// }, []);
const SignInFrom = () => {
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [isChecked, setIsChecked] = React.useState(false);
  const navigate = useNavigate();
  const user = useSelector(selectUser);
  const { height, width } = useWindowDimensions();
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  useEffect(() => {
    const savedValues = JSON.parse(localStorage.getItem("rememberMe"));
    if (savedValues) {
      formik.setValues(savedValues);
      setIsChecked(true);
      // Automatically submit the form
      // formik.submitForm();
    }
  }, []);
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object().shape({
      email: Yup.string().email().required("Required!"),
      password: Yup.string().required("Required!"),
    }),
    onSubmit: async (values, { resetForm }) => {
      setLoading(true);
      const { email, password } = values;
      console.log("Form Submitted", values);

      if (isChecked) {
        // Save email and password to localStorage
        localStorage.setItem("rememberMe", JSON.stringify(values));
      } else {
        // Clear localStorage if "Remember Me" is unchecked
        localStorage.removeItem("rememberMe");
      }

      try {
        const { data } = await signIn(dispatch, navigate, { email, password });
        dispatch(
          updateUserData({
            ...data?.user,
            refresh: data?.token.refresh,
            access: data?.token.access,
          })
        );
        localStorage.setItem("refresh", data?.token.refresh);
        localStorage.setItem("access", data?.token.access);
        localStorage.setItem("refreshTime", Date.now());
        localStorage.setItem("accessTime", Date.now());
        await getAllData(
          navigate,
          data?.token?.refresh,
          setLoading,
          dispatch,
          user,
          true
        );
        navigate("/dashboard");
        resetForm();
      } catch (err) {
        setLoading(false);
        toast.error(handleError({ error: "" }, err?.response?.data));
      }
    },
  });

  return (
    <Box sx={[Style.formSection, Style.columnContainer]}>
      {/* <Typography sx={Style.redirectText}>
        <Typography component={"span"} sx={{...Style.redirectText, mt: '0 !important', mr: '0 !important'}}>
          Don’t have an account?
        </Typography>
        <Button
          variant={'secondary'}
          sx={Style.redirect}
        >
          Sign up
        </Button>
      </Typography> */}
      <Box
        component="form"
        sx={Style.form}
        noValidate
        autoComplete="off"
        onSubmit={formik.handleSubmit}
      >
        <Typography sx={Style.heading}>
          <Typography sx={Style.heading(height, width)} component={"span"}>
            Welcome to
          </Typography>
          <Typography sx={Style.traino(height, width)} component={"span"}>
            <Typography sx={Style.traino(height, width)} component={"span"}>
              Traino
            </Typography>
            <Typography sx={Style.ai(height, width)} component={"span"}>
              .ai
            </Typography>
          </Typography>
        </Typography>
        <Typography sx={Style.loginInfo(height, width)}>
          Please login details below to using the app
        </Typography>
        <FormControl
          sx={{ ...Style.formControl, m: "44px 0 12px 0" }}
          variant="outlined"
        >
          <InputLabel htmlFor="email" sx={Style.inputLabel}>
            Email
          </InputLabel>
          <OutlinedInput
            sx={Style.outlineInput}
            id="email"
            type={"text"}
            label="Email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik?.errors?.email && formik.touched.email && (
            <ValidationError error={formik?.errors?.email} />
          )}
        </FormControl>
        <FormControl
          sx={{ ...Style.formControl, m: "8px 0 0" }}
          variant="outlined"
        >
          <InputLabel htmlFor="password" sx={Style.inputLabel}>
            Password
          </InputLabel>
          <OutlinedInput
            id="password"
            type={showPassword ? "text" : "password"}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  edge="end"
                >
                  {showPassword ? (
                    <MdOutlineVisibility />
                  ) : (
                    <MdOutlineVisibilityOff />
                  )}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            sx={Style.outlineInput}
          />
          {formik?.errors?.password && formik.touched.password && (
            <ValidationError error={formik?.errors?.password} />
          )}
        </FormControl>
        <Box sx={Style.rememberForgetMain}>
          <Box sx={Style.rememberBox} onClick={() => setIsChecked(!isChecked)}>
            <Checkbox
              sx={Style.checkbox}
              size="medium"
              checked={isChecked}
              onChange={() => {
                setIsChecked(!isChecked);
                // alert(formik.values.email);
              }}
            />
            <Typography component={"label"} sx={Style.remember}>
              Remember me
            </Typography>
          </Box>
          <Typography
            onClick={() => navigate("/forget-password")}
            sx={Style.forgetPassword}
          >
            Forgot Password?
          </Typography>
        </Box>
        <CustomButton
          sx={Style.button(height)}
          typSx={Style.buttonText}
          buttonText={"Login"}
          type={"submit"}
          loading={loading}
          disable={formikValidation(formik)}
        />
        {/* <Typography sx={{ display: 'flex', width: "100%", alignItems: 'center', justifyContent: 'center', gap: '20px', mt: 1 }}>
          <Box component={"span"} sx={Style.bordered} />
          <Typography component={"span"} sx={Style.or}>
            OR
          </Typography>
          <Box component={"span"} sx={Style.bordered} />
        </Typography>
        <Button sx={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer', mt: 1 }}>
          <FcGoogle size={21} />
          <Typography component={"span"} sx={Style.googlePara}>
            Continue with google
          </Typography>
        </Button> */}
      </Box>
    </Box>
  );
};

export default SignInFrom;
