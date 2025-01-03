import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Box,
  FormControl,
  FormControlLabel,
  IconButton,
  InputAdornment,
  OutlinedInput,
  TextField,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import * as Yup from "yup";
import {
  CustomButton,
  CustomPhone,
  ValidationError,
} from "../../../components";
import CreateableSelect from "../../../components/SelctMenu/createableSelect";
import { formikValidation } from "../../../hooks/globalFunction";
import { selectdrawer } from "../../../store/slice/drawer";
import {
  addTeamMember,
  selectUser,
  updateTeamList,
  updateUserData,
} from "../../../store/slice/user";
import { COLORS, IMAGES } from "../../../theme";
import { createUser, updateUser } from "./helper";
import { Style } from "./style";
import "./style.css";

const CreateUserForm = ({ userRole, setOpen, data = {}, setData }) => {
  const { id } = useParams();
  const [isDisable, setIsDisable] = useState(true);
  const [phone, setPhone] = useState(data?.phone || "");
  const companyId = id;
  const isEdit = data?.id;
  const disabledStyle = {
    background: isEdit
      ? `${COLORS.disableGrey} !important`
      : `${COLORS.white} !important`,
    cursor: isEdit ? "not-allowed !important" : "unset !important",
  };
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    access,
    isAdmin,
    isSuperAdmin,
    company_id,
    departments,
    user,
    admin,
  } = useSelector(selectUser);
  const teams = userRole == "User" ? user : admin;
  const { drawer } = useSelector(selectdrawer);
  const [loading, setLoading] = useState(false);
  const createUserSchema = isEdit
    ? {}
    : {
      email: Yup.string().email().required("Required!"),
      password: Yup.string()
        .required("Required!")
        .matches(
          /^(?=.*\d)^(?=.{8,16}$)(?=.*[`~!@#$%^&*()\-\+_=\{\}\[\]|\\:;"'<>,.?\/])/,
          "Password must contain at least one digit, one special character and length should be between 8 to 16 characters"
        ),
    };
  const tempDepart =
    data?.departments_names &&
    departments?.results?.filter((item) =>
      data?.departments_names?.includes(item?.name)
    );
  const formik = useFormik({
    initialValues: {
      first_name: data?.first_name || "",
      last_name: data?.last_name || "",
      role: data?.role || (isSuperAdmin ? "Admin" : "User"),
      email: data?.email || "",
      password: !!data?.id ? "*********" : "",
    },
    validationSchema: Yup.object().shape({
      first_name: Yup.string().required("Required!"),
      last_name: Yup.string().required("Required!"),
      department:
        userRole == "User" && Yup.array().required("Required!").min(1),
      ...createUserSchema,
    }),
    onSubmit: async (values, { resetForm }) => {
      let tempDepartments = [];
      if (!!values?.department?.length)
        values?.department?.map((item) => {
          tempDepartments?.push(item?.value);
        });
      const { department, ...others } = values;
      const valuesData = {
        ...others,
        department_ids: tempDepartments || null,
        phone: phone,
        role: userRole,
      };
      let updateData = {
        first_name: values.first_name,
        last_name: values.last_name,
        department_ids: tempDepartments,
        company: companyId || company_id,
      };
      if (!!phone) updateData.phone = phone;
      setLoading(true);
      if (!!data?.user_update_key || !!data?.admin_update_key || data?.id) {
        const res = await updateUser(
          updateData,
          access,
          data?.user_update_key || data?.admin_update_key || data?.id,
          dispatch,
          navigate,
          userRole === "User"
        );
        if (res?.id) {
          resetForm();
          let tempData = { ...res };
          Object?.entries(res)?.map((item) => {
            if (
              item[0] == "first_name" ||
              item[0] == "last_name" ||
              item[0] == "email"
            )
              return (tempData[
                `${userRole == "User" ? "members__" : "admin__"}${item[0]}`
              ] = item[1]);
          });

          let names = [];
          tempData?.departments?.map((item) => names.push(item?.name));
          tempData.departments_names = names;
          dispatch(
            updateTeamList({ role: userRole?.toLowerCase(), data: tempData })
          );
          department &&
            department?.map((item) => {
              let tempDepartments = [...departments?.results];
              let ind = tempDepartments?.findIndex(
                (item2) => item2.id == item?.value
              );
              let data = !!tempDepartments[ind]?.users?.length
                ? tempDepartments[ind]?.users?.includes(tempData?.id)
                  ? [...tempDepartments[ind]?.users]
                  : [...tempDepartments[ind]?.users, tempData?.id]
                : [tempData?.id];
              dispatch(updateUserData({ departments: { results: [...data] } }));
            });
          setOpen(false);
          setData({});
        }
        setLoading(false);
      } else {
        const res = await createUser(
          companyId || company_id,
          valuesData,
          access,
          dispatch,
          navigate
        );
        if (res?.id) {
          resetForm();
          let tempData = { ...res };
          Object?.entries(res)?.map((item) => {
            if (
              item[0] == "first_name" ||
              item[0] == "last_name" ||
              item[0] == "email"
            )
              return (tempData[
                `${userRole == "User" ? "members__" : "admin__"}${item[0]}`
              ] = item[1]);
          });
          let condition =
            teams?.results?.length < 10 ||
            teams?.results?.length == teams?.count;
          let names = [];
          tempData?.departments?.map((item) => names.push(item?.name));
          tempData.departments_names = names;
          dispatch(
            addTeamMember({
              role: userRole?.toLowerCase(),
              data: tempData,
              countOnly: !condition,
            })
          );
          department &&
            department?.map((item) => {
              let tempDepartments = [...departments?.results];
              let ind = tempDepartments?.findIndex(
                (item2) => item2.id == item?.value
              );
              let data = !!tempDepartments[ind]?.users?.length
                ? tempDepartments[ind]?.users?.includes(tempData?.id)
                  ? [...tempDepartments[ind]?.users]
                  : [...tempDepartments[ind]?.users, tempData?.id]
                : [tempData?.id];
              dispatch(updateUserData({ departments: { results: [...data] } }));
            });
          setOpen(false);
          setData({});
          setLoading(false);
        } else {
          setLoading(false);
        }
      }
    },
  });

  useEffect(() => {
    if (!!departments?.id) {
      let tempData = departments?.results
        ?.filter((item) => data?.departments_names?.includes(item?.name))
        ?.map((item) => ({ label: item?.name, value: item?.id }));
      formik.setFieldValue("department", data?.departments_names && tempData);
    }
  }, [departments]);

  const formLeftSidedata = [
    {
      label: "First Name",
      field: (
        <TextField
          sx={Style.textField}
          id="outlined-basic"
          variant="outlined"
          value={formik.values.first_name}
          name="first_name"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
      ),
      name: "first_name",
      isRequired: true,
    },
    {
      label: "Last Name",
      field: (
        <TextField
          sx={Style.textField}
          id="outlined-basic"
          variant="outlined"
          value={formik.values.last_name}
          name="last_name"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
      ),
      isRequired: true,
      name: "last_name",
    },
    {
      label: "Email",
      field: (
        <TextField
          sx={{ ...Style.textField, ...disabledStyle }}
          id="outlined-basic"
          variant="outlined"
          value={formik.values.email}
          name="email"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          disabled={isEdit}
        />
      ),
      name: "email",
      isRequired: true,
    },
    {
      label: "Phone",
      field: (
        <CustomPhone
          inputProps={{ ...Style.textField, ...disabledStyle }}
          country={"pk"}
          enableSearch={true}
          enableAreaCodes={true}
          disableSearchIcon={true}
          autocompleteSearch={true}
          enableClickOutside={true}
          defaultErrorMessage="Invalid Number"
          placeholder="Mobile Number"
          value={phone}
          countryCodeEditable={true}
          onChange={(no) => {
            setPhone(no?.length ? `+${no}` : no);
          }}
          onBlur={formik.handleBlur}
        />
      ),
      isRequired: false,
    },
    {
      label: "Password",
      field: (
        <FormControl sx={{ ...Style.textField, ...disabledStyle }}>
          <OutlinedInput
            sx={{ ...Style.textField, ...disabledStyle }}
            id="outlined-basic"
            disabled={isEdit}
            value={formik.values.password}
            name="password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            type={showPassword ? "text" : "password"}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>
      ),
      name: "password",
      isRequired: true,
    },
    userRole == "User" && {
      label: "Department",
      field: <CreateableSelect formik={formik} />,
      isRequired: !!data?.role ? data?.role === "User" : userRole === "User",
      name: "department",
    },
  ].filter(Boolean);

  useEffect(() => {
    if (userRole == "Admin") {
      const { first_name, last_name } = formik?.values;
      const values = { first_name, last_name };
      const customFormik = { errors: formik?.errors, values: values };
      let check = true;
      let checkNo = 0
      Object?.entries(formik?.initialValues)?.map((item) => {
        if (item[1] !== formik?.values[item[0]]) {
          checkNo += 1
        }
        if (!checkNo) {
          check = false;
        }
        else check = true
      });
      setIsDisable(!(check && !formikValidation(customFormik)) || formikValidation(customFormik))
    } else {
      const { first_name, last_name, email, department, password } =
        formik?.values;
      const formikData = {
        first_name,
        last_name,
        department,
      };
      const customFormik = { errors: formik?.errors, values: formikData };
      let check = true;
      let temp = !!formik?.values?.department?.length && formik?.values?.department?.filter((item) =>
        item?.label === data?.departments_names
      )
      let checkNo = 0
      Object?.entries(formik?.initialValues)?.map((item) => {
        if (item[1] !== formik?.values[item[0]]) {
          checkNo += 1
        }
        if ((!isEdit ||
          (
            !checkNo && (!!temp?.length && formik?.values?.department?.length <= 1)))
        ) {
          check = false;
        }
        else if (!!checkNo) {
          check = true
        }
      });
      setIsDisable(!(check && !formikValidation(customFormik)) || formikValidation(customFormik));
    }
  }, [formik]);

  const checkDisable = () => {
    const labels =
      !!formik?.values?.department?.length &&
      formik?.values?.department?.map((item) => item.label);
    return (
      formik.values.first_name === data?.first_name &&
      formik.values.last_name === data?.last_name &&
      phone === data?.phone &&
      JSON.stringify(data?.departments_names) === JSON.stringify(labels)
    );
  };

  useEffect(() => {
    if (!data?.id) {
      const { first_name, last_name, email, password, department } = formik?.values;
      const data = userRole === "Admin" ? { first_name, last_name, email, password } : { first_name, last_name, email, password, department };
      const customFormik = { errors: formik?.errors, values: data };
      setIsDisable(checkDisable() || formikValidation(customFormik));
    }
  }, [data, formik, phone]);

  const heading =
    userRole === "User"
      ? `${!isEdit ? "Create" : "Update"} user`
      : `${!isEdit ? "Create an" : "Update"} admin`;

  return (
    <Box sx={{ width: "100%" }}>
      <Typography sx={Style.heading}>
        <Box
          component={"img"}
          src={!data?.id ? IMAGES.userPlus : IMAGES.editUser}
          sx={Style.headerIcon}
        />
        <Box component={"span"}>{heading}</Box>
      </Typography>
      <Box sx={Style.formWrapper}>
        <Box component={"form"} sx={Style.form} onSubmit={formik.handleSubmit}>
          <Box sx={Style.formContainer}>
            {/* left hand */}
            <Box sx={Style.formSection}>
              {formLeftSidedata.map(
                ({ label, field, name, isRequired }, index) => {
                  return (
                    <Box sx={Style.createForm} key={index}>
                      <FormControlLabel
                        key={index}
                        sx={Style.fieldsWrapper(drawer)}
                        label={
                          <Typography sx={Style.label(drawer)} variant="body1">
                            {label}
                            {isRequired && (
                              <Box component={"span"} sx={{ color: "red" }}>
                                *
                              </Box>
                            )}
                          </Typography>
                        }
                        control={field}
                      />
                      {formik?.errors?.[name] && formik.touched?.[name] && (
                        <ValidationError error={formik?.errors?.[name]} />
                      )}
                    </Box>
                  );
                }
              )}
            </Box>
            {/* left hand */}
          </Box>

          <Box sx={Style.btnContainer}>
            <CustomButton
              color="secondary"
              buttonText={"Cancel"}
              sx={Style.btnStyle(true)}
              onClick={() => {
                setOpen(false);
                setData({});
              }}
            />
            <CustomButton
              color="secondary"
              buttonText={isEdit ? "Update" : "Create"}
              type="submit"
              loading={loading}
              sx={Style.btnStyle(false)}
              disable={
                !!Object?.values(data)?.length && !!phone?.length
                  ? !!data?.phone && data?.phone == phone && isDisable
                  : isDisable
              }
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default CreateUserForm;
