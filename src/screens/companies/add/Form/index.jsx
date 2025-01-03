import {
  Autocomplete,
  Box,
  Button,
  FormControlLabel,
  TextField,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";
import React, { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import * as Yup from "yup";
import {
  CustomButton,
  DiscardChangesModal,
  ValidationError,
} from "../../../../components";
import CustomPhone from "../../../../components/CustomPhone";
import {
  formikValidation,
  handleError,
} from "../../../../hooks/globalFunction";
import { createCompany, updateCompany } from "../../../../services/companies";
import { selectdrawer } from "../../../../store/slice/drawer";
import { selectUser, updateUserData } from "../../../../store/slice/user";
import { globalStyle } from "../../../../styles/globalStyle";
import { countries } from "../lib";
import { Style } from "./style";
import AddIcon from "@mui/icons-material/Add";
import { IMAGES } from "../../../../theme";

const AddCompanyForm = ({ selectedFile, setSelectedFile, imgPath }) => {
  const { id } = useParams();
  const user = useSelector(selectUser);
  const { access, company } = useSelector(selectUser);
  const { drawer } = useSelector(selectdrawer);
  const [open, setOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(true);
  const data = useLocation()?.state?.data;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(true);
  let {
    company_id,
    logo,
    name,
    country,
    phone,
    address,
    city,
    fax,
    state_or_province,
    zip_code,
    website_url,
  } = data || {};
  const [countryVal, setCountryVal] = useState(
    (country &&
      countries?.filter((item, index) => item?.code === country)[0]?.name) ||
    ""
  );

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const HandleSubmit = async (resetForm) => {
    try {
      const formDataObj = new FormData();
      Object.entries(values)
        .filter(([key, val]) => key !== "country" && key !== "logo")
        .map(([key, value]) => {
          formDataObj.append(key, value);
        });
      if (selectedFile && typeof selectedFile !== "string") {
        formDataObj.append("logo", selectedFile);
      }
      formDataObj.append("country", values?.country?.code || values?.country);
      if (id) {
        const { data } = await updateCompany(
          dispatch,
          navigate,
          formDataObj,
          id,
          access
        );
        let tempCompany = { ...company };
        let ind = tempCompany?.results?.findIndex((item) => item?.id === id);
        let results = [...tempCompany?.results];
        results[ind] = { ...data };
        tempCompany.results = results;
        dispatch(updateUserData({ company: tempCompany }));
        toast.success("Company updated successfully.");
      } else {
        const { data } = await createCompany(
          dispatch,
          navigate,
          formDataObj,
          access
        );
        let tempCompany = { ...company };
        let results = tempCompany?.results?.length ? [...tempCompany?.results] : [];
        results.push(data);
        tempCompany.results = results;
        dispatch(updateUserData({ company: tempCompany }));
        toast.success("Company created successfully.");
      }
      resetForm();
      navigate(-1);
      setLoading(false);
    } catch (err) {
      setError(err?.response?.data);
      toast.error(handleError(values, err?.response?.data));
      setLoading(false);
    }
  };
  const {
    values,
    handleSubmit,
    errors,
    handleBlur,
    handleChange,
    touched,
    setFieldValue,
  } = useFormik({
    initialValues: {
      company_id: company_id || "",
      name: name || "",
      country: country || "",
      phone: phone || "",
      address: address || "",
      city: city || "",
      fax: fax || "",
      state_or_province: state_or_province || "",
      zip_code: zip_code || "",
      website_url: website_url || "",
    },
    validationSchema: Yup.object().shape({
      name: Yup.string().trim().required("Required!"),
      country: Yup.string().trim().required("Required!"),
      address: Yup.string().trim().required("Required!"),
      city: Yup.string().trim().required("Required!"),
      state_or_province: Yup.string().trim().required("Required!"),
      zip_code: Yup.string().trim().required("Required!"),
    }),
    onSubmit: async (e, { resetForm }) => {
      setLoading(true);
      await HandleSubmit(resetForm);
    },
  });

  useEffect(() => {
    if (!isOpen) {
      setError(false);
    }
    setIsOpen(false);
  }, [values, imgPath]);

  let reqValues = {};
  Object?.entries(values)
    ?.filter(
      (item) =>
        item[0] != "fax" && item[0] != "website_url" && item[0] != "company_id" && item[0] != "phone"
    )
    ?.map((item2, index) => (reqValues[item2[0]] = item2[1]));


  const fileInputRef = useRef(null);

  const handleFileChange = (event) => {
    setSelectedFile(null);
    const selectedFile = event.target.files[0];
    setSelectedFile(selectedFile);
  };


  const formLeftSidedata = [
    {
      name: "name",
      label: "Company",
      field: (
        <TextField
          sx={Style.textField}
          id="outlined-basic"
          variant="outlined"
          value={values?.name}
          name="name"
          onChange={handleChange}
          onBlur={handleBlur}
        />
      ),
      isRequired: true,
    },
    {
      name: "company_id",
      label: "Company ID",
      field: (
        <TextField
          sx={Style.textField}
          id="outlined-basic"
          variant="outlined"
          value={values?.company_id}
          name="company_id"
          onChange={handleChange}
          onBlur={handleBlur}
        />
      ),
      isRequired: false,
    },
    {
      name: "country",
      label: "Country",
      field: (
        <Autocomplete
          onChange={(event, newValue) => {
            setFieldValue("country", newValue?.code);
            setCountryVal(newValue);
          }}
          id="country"
          options={countries}
          sx={Style.textField}
          renderInput={(params) => <TextField {...params} />}
          value={countryVal}
          name="country"
          onBlur={handleBlur}
        />
      ),
      isRequired: true,
    },
    {
      name: "phone",
      label: "Phone",
      field: (
        <CustomPhone
          inputProps={{ ...Style.textField }}
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
            setFieldValue("phone", !!no?.length ? `+${no}` : no);
          }}
          onBlur={handleBlur}
        />
      ),
      isRequired: false,
    },
    {
      name: "address",
      label: "Address",
      field: (
        <TextField
          sx={Style.textField}
          id="outlined-basic"
          variant="outlined"
          value={values?.address}
          name="address"
          onChange={handleChange}
          onBlur={handleBlur}
        />
      ),
      isRequired: true,
    },
    {
      name: "fax",
      label: "Fax",
      field: (
        <TextField
          sx={Style.textField}
          id="outlined-basic"
          variant="outlined"
          value={values?.fax}
          name="fax"
          onChange={handleChange}
          onBlur={handleBlur}
        />
      ),
    },
    {
      name: "city",
      label: "City",
      field: (
        <TextField
          sx={Style.textField}
          id="outlined-basic"
          variant="outlined"
          value={values?.city}
          name="city"
          onChange={handleChange}
          onBlur={handleBlur}
        />
      ),
      isRequired: true,
    },
    {
      name: "website_url",
      label: "Website URL",
      field: (
        <TextField
          sx={Style.textField}
          id="outlined-basic"
          variant="outlined"
          value={values?.website_url}
          name="website_url"
          onChange={handleChange}
          onBlur={handleBlur}
        />
      ),
    },
    {
      name: "state_or_province",
      label: "State/Province",
      field: (
        <TextField
          sx={Style.textField}
          onChange={handleChange}
          onBlur={handleBlur}
          id="outlined-basic"
          variant="outlined"
          name={"state_or_province"}
          value={values?.state_or_province}
        />
      ),
      isRequired: true,
    },
    {
      name: "zip_code",
      label: "Zip/Postal Code",
      field: (
        <TextField
          sx={Style.textField}
          id="outlined-basic"
          variant="outlined"
          value={values?.zip_code}
          name="zip_code"
          onChange={handleChange}
          onBlur={handleBlur}
        />
      ),
      isRequired: true,
    },
  ];

  let imgpath =
    selectedFile && typeof selectedFile == "object"
      ? URL.createObjectURL(selectedFile)
      : selectedFile?.includes("http://localhost:8000")
        ? selectedFile.replace(
          "http://localhost:8000",
          "https://tqkvr2f3-8000.inc1.devtunnels.ms"
        )
        : selectedFile;

  return (
    <Box sx={{ width: "100%" }}>
      {/* <Typography sx={globalStyle.subHeading}>Company Information</Typography> */}
      <Box sx={Style.formWrapper}>
        <Box sx={{ width: { xs: '100%', md: '18%' }, minWidth: '80px', maxWidth: { md: '195px' }, display: 'flex', alignItems: 'start' }}>
          {/* {selectedFile ? (
            <>
              <img
                src={imgpath || data?.logo}
                alt="Selected File"
                style={{ width: "105px", height: "105px", maxHeight: '105px', marginLeft: '40px', marginRight: '40px' }}
                onClick={() => fileInputRef.current.click()}
              />
              <Box
                component={"input"}
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                style={{ display: "none" }}
              />
            </>
          ) : (
            <Button
              onClick={() => fileInputRef.current.click()}
              sx={Style.addLogoBtn}
            >
              <>
                <AddIcon
                  style={{
                    width: "30px",
                    height: "30px",
                    m: 0,
                    cursor: "pointer",
                  }}
                />
                Add Company logo here
                <Box
                  component={"input"}
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  style={{ display: "none" }}
                />
              </>
            </Button>
          )} */}
          <Box sx={{
            width: { xs: '100%', md: '80%' },
          maxWidth:  '105px',
            minWidth: '60px',
            objectFit: 'contain',
            margin: { xs: '25px auto 0', md: '40px auto 0' },
            position: 'relative',
          }}
          >
            <Box component={"img"} src={
              imgpath || data?.logo || IMAGES.roundImg
            } sx={{ width: '100%', height: '100%', borderRadius: '100%', objectFit: 'cover', aspectRatio: '1/1', minHeight: '100px' }} />
            <Box component={"img"} src={IMAGES.roundEdit2} sx={{
              width: '26px',
              height: '26px',
              position: 'absolute',
              bottom: '36px',
              right: { xs: '3px', sm: '6px', md: "10px", lg: '13px' },
              p: "7px",
              background: '#fff',
              borderRadius: '15px',
              boxSizing: 'border-box',
              overflow: 'visible',
              boxShadow: '0px 1px 4px rgba(26, 15, 1, 0.12)',
              cursor: 'pointer'
            }}
              onClick={() => fileInputRef.current.click()}
            />
            <Typography sx={{...Style.label(drawer), mt: 1.25}} variant="body1">
              Company Logo
              {/* {isRequired && ( */}
                <Box component={"span"} sx={{ color: "#D92D20" }}>
                  *
                </Box>
              {/* )} */}
            </Typography>
            <Box
              component={"input"}
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              style={{ display: "none" }}
            />
          </Box>
        </Box>
        <Box component={"form"} sx={Style.form} onSubmit={handleSubmit}>
          <Box sx={Style.formContainer}>
            {/* left hand */}
            <Box sx={Style.formSection}>
              {formLeftSidedata.map(
                ({ label, field, name, isRequired }, index) => {
                  return (
                    <Box sx={Style.formBox}>
                      <FormControlLabel
                        key={index}
                        sx={Style.fieldsWrapper(drawer)}
                        label={
                          <Typography sx={Style.label(drawer)} variant="body1">
                            {label}
                            {isRequired && (
                              <Box component={"span"} sx={{ color: "#D92D20" }}>
                                *
                              </Box>
                            )}
                          </Typography>
                        }
                        control={field}
                      />
                      {errors?.[name] && touched?.[name] && (
                        <ValidationError error={errors?.[name]} />
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
              sx={{ width: 'calc(50% - 12px)', maxWidth: '195px', height: '44px', borderRadius: '4px', background: '#FFF', color: '#3447D4' }}
              color="secondary"
              buttonText={"Cancel"}
              onClick={() => setOpen(true)}
            />
            <CustomButton
              sx={{ width: 'calc(50% - 12px)', maxWidth: '195px', height: '44px', borderRadius: '4px' }}
              color="secondary"
              buttonText={"Save"}
              type="submit"
              disable={(formikValidation({ errors, values: reqValues }) || error) || !selectedFile}
              loading={loading}
            />
          </Box>
        </Box>
      </Box>
      <DiscardChangesModal
        open={open}
        setOpen={setOpen}
        onConfirm={() => navigate(-1)}
      />
    </Box>
  );
};

export default AddCompanyForm;
