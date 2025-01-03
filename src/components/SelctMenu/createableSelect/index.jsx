import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { components } from "react-select";
import CreatableSelect from "react-select/creatable";
import { handleError } from "../../../hooks/globalFunction";
import {
  createDepartments,
  getDepartments,
} from "../../../services/departments";
import {
  addDepartment,
  selectUser,
  updateUserData,
} from "../../../store/slice/user";
import CustomButton from "../../CustomButton";
import { InView } from "react-intersection-observer";
import { onScroll } from "../helper";
import { useNavigate, useParams } from "react-router-dom";
import { Style } from "./Style";

const createOption = ({ id, name }) => ({
  label: name,
  value: id,
});

const CreateableSelect = ({ formik }) => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { departments, access, company_id, isAdmin, role } =
    useSelector(selectUser);
  const [newOptionValue, setNewOtionValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [options, setOptions] = useState(
    departments?.results?.map(({ name, id }) => ({
      label: name,
      value: id,
    }))
  );
  const [loading, setLoading] = useState(false);

  const departmentGet = async () => {
    setLoading(true);
    const res = await getDepartments(
      dispatch,
      navigate,
      access,
      company_id || id
    );
    if (!!res?.data) {
      let data = { ...res?.data };
      data.id = id || company_id;
      dispatch(
        updateUserData({
          departments: data,
          role: role,
        })
      );
    }
    setLoading(false);
  };

  useEffect(() => {
    let tempId = id || company_id;
    if (departments?.id != tempId) departmentGet();
  }, []);

  const [value, setValue] = useState(formik?.values?.department || []);
  const handleCreate = async () => {
    const data = { name: newOptionValue, company: company_id || id };
    try {
      setIsLoading(true);
      const departments = await createDepartments(
        dispatch,
        navigate,
        data,
        access
      );
      const newOption = createOption(departments?.data);
      setIsLoading(false);
      dispatch(addDepartment(departments.data));
      setValue((prev = []) => {
        let data = [...prev, newOption]
        formik.setFieldValue("department", data);
        setOptions(data);
        return data
      });
      setNewOtionValue("");
      toast.success("Department has successfully created");
      setIsLoading(false);
    } catch (err) {
      toast.error(handleError(data, err?.response?.data));
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setOptions(
      departments?.results?.map(({ name, id }) => ({ label: name, value: id }))
    );
  }, [departments]);

  useEffect(() => {
    let department = formik?.values?.department;
    if (!!department) setValue(department);
  }, [formik?.values]);

  const customStyles = {
    container: (provided) => ({
      ...provided,
      width: "100%",
    }),
    control: (base) => ({
      ...base,
      padding: "9px",
      minHeight: "32px",
      boxShadow: "0",
      "&:hover": {
        border: "1px solid #10194B !important ",
      },
      "& .css-1u9des2-indicatorSeparator": {
        display: "none"
      },
      "& .css-1p3m7a8-multiValue": {
        color: "#313131"
      },
      "& .css-1hb7zxy-IndicatorsContainer": {
        "& .css-tj5bde-Svg": {
          width: 25,
          height: 25,
          color: "#2D374852"
        }
      }
    }),
    menuList: (base) => ({
      ...base,
      maxHeight: "150px",
      color: "#000 !important",
      "&::-webkit-scrollbar": {
        width: "0px",
      },
    }),
    noOptionsMessage: (base) => ({
      ...base,
      cursor: "default",
    }),
  };

  const NoOptionsMessage = (props) => {
    return (
      <components.NoOptionsMessage {...props}>
        <Box
          sx={Style.optionContainer}
        >
          <Box
            sx={Style.newOption}
          >
            {newOptionValue}
          </Box>
          <CustomButton
            buttonText="Add"
            sx={Style.button}
            onClick={handleCreate}
          />
        </Box>
      </components.NoOptionsMessage>
    );
  };
  const Option = (props) => {
    const { innerRef, ...otherProps } = props;
    return (
      <components.Option {...otherProps}>
        {options[options?.length - 1]?.label === props.label ? (
          <InView
            onChange={(view) => {
              if (view)
                onScroll(
                  navigate,
                  departments,
                  access,
                  dispatch,
                  setIsLoading,
                  company_id
                );
            }}
          >
            <Box>{props.label}</Box>
          </InView>
        ) : (
          <Box>{props.label}</Box>
        )}
      </components.Option>
    );
  };
  const handleChange = (newValue) => {
    setValue(newValue);
    formik.setFieldValue("department", newValue);
  };
  return (
    <CreatableSelect
      components={{ NoOptionsMessage, Option }}
      getNewOptionData={(val) => setNewOtionValue(val || "")}
      isMulti
      styles={customStyles}
      isClearable
      isDisabled={isLoading}
      isLoading={isLoading}
      onChange={handleChange}
      onCreateOption={handleCreate}
      options={options}
      value={value}
    />
  );
};

export default CreateableSelect;
