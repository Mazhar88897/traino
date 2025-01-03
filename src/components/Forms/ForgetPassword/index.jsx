import { Box, Button, FormControl, OutlinedInput, Typography } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import { useFormik } from "formik";
import React from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { formikValidation, handleError } from "../../../hooks/globalFunction";
import useWindowDimensions from "../../../hooks/windowDimensions";
import { forgetPassword } from "../../../services/auth";
import { IMAGES } from "../../../theme";
import CustomButton from "../../CustomButton";
import ValidationError from "../../ValidationError";
import { Style } from "../style";

const ForgetPasswordForm = () => {
  const { width } = useWindowDimensions();
  const [loading, setLoading] = React.useState(false);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: Yup.object().shape({
      email: Yup.string().email().required("Required!"),
    }),
    onSubmit: async (values, { resetForm }) => {
      setLoading(true);
      const { email } = values;
      await forgetPassword({
        email,
      })
        .then((res) => {
          resetForm();
          toast.success(
            "Reset password link has been sent to your provided email!"
          );
          setLoading(false);
        })
        .catch((err) => {
          setLoading(false);
          toast.error(handleError(values, err?.response?.data));
        });
    },
  });

  return (
    <Box sx={[Style.formSection, Style.columnContainer]}>
      {width < 500 && (
        <Box sx={Style.logoContainer}>
          <Box component={"img"} src={IMAGES.logo} sx={Style.logo} />
        </Box>
      )}

      <Typography sx={Style.redirectText}>
        Remember password?{" "}
        <Button
          variant={'secondary'}
          onClick={() => navigate("/signIn")}
          sx={Style.redirect}
        >
          Log in
        </Button>
      </Typography>

      <Box
        component="form"
        sx={Style.form}
        noValidate
        autoComplete="off"
        onSubmit={formik.handleSubmit}
      >
        <Typography sx={Style.heading}>
          <Typography sx={Style.heading} component={"span"}>Forgot</Typography>
          <Typography component={"span"} sx={Style.password}>Password</Typography>
        </Typography>
        <Typography sx={Style.subHeading}>
          Don’t worry! It happens. Please enter the email associated with your account.
        </Typography>
        <FormControl sx={{ width: "100%", mt: '50px' }} variant="outlined">
          <InputLabel htmlFor="email">Enter your email</InputLabel>
          <OutlinedInput
            id="email"
            type={"text"}
            label="Enter your email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik?.errors?.email && formik?.touched?.email && (
            <ValidationError error={formik?.errors?.email} />
          )}
        </FormControl>
        <CustomButton
          buttonText={"SEND EMAIL"}
          sx={{ width: "100%", borderRadius: '4px', backgroundColor: "#3447D4", mt: '30px' }}
          typSx={{
            fontFamily: 'Rubik',
            fontSize: '16px',
            fontWeight: '500',
          }}
          type={"submit"}
          loading={loading}
          disable={formikValidation(formik)}
        />
     </Box>
    </Box>
  );
};

export default ForgetPasswordForm;
