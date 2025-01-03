import {
  Box,
  Checkbox,
  FormControl,
  InputLabel,
  ListItemText,
  MenuItem,
  Select,
} from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import React, { useEffect, useState } from "react";
import { InView } from "react-intersection-observer";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getDepartments } from "../../../services/departments";
import { selectUser, updateUserData } from "../../../store/slice/user";
import { onScroll } from "../helper";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 6.5 + ITEM_PADDING_TOP,
      width: 170,
      padding: 0
    },
  },
};

const DepartmentSelect = ({
  sx = () => { },
  department,
  setDepartment,
  selectedDepartment,
  editItem,
  assignedDepartments,
  setAssignedDepartments,
  noLabel
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { departments, access, company_id } = useSelector(selectUser);
  const getDepart = async () => {
    const { data } = await getDepartments(
      dispatch,
      navigate,
      access,
      company_id
    );
    let tempDepartData = data;
    tempDepartData.id = company_id;
    dispatch(updateUserData({ departments: data }));
  };
  useEffect(() => {
    getDepart();
  }, []);
  const [loading, setLoading] = useState(true);
  const handlClick = (val) => {
    if (!!editItem || val.id !== selectedDepartment?.id)
      setDepartment((prev) => {
        let data = prev?.data?.some((value) => value?.id === val?.id)
          ? prev?.data?.filter((el) => el?.id !== val?.id)
          : [...prev?.data, val];
        return {
          data,
          status: data?.length > department?.data?.length ? "add" : "remove",
        };
      });
    setAssignedDepartments((prev) => {
      console.log(prev)
      return prev.some((value) => value.id === val.id)
        ? prev.filter((el) => el.id !== val.id)
        : [...prev, val];
    });
  };
  return (
    <>
      {!departments?.results?.length && !assignedDepartments?.length ? (
        <Box sx={{ textAlign: "center", my: 1 }}>
          <CircularProgress size={20} />
        </Box>
      ) : (
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label" sx={{lineHeight: '18px'}}>{!noLabel ? "Department" : ""}</InputLabel>
          <Select
            sx={{
              width: "100%",
              mb: "16px",
              ...sx,
            }}
            labelId="demo-multiple-chip-label"
            id="demo-multiple-chip"
            multiple
            value={assignedDepartments}
            displayEmpty={!!noLabel}
            renderValue={(selected) => {
              if(selected?.length > 0 || !noLabel ) 
                return selected?.map((item) => item.name)?.join(", ");
              else 
                return <em style={{color: '#A9A9A9', fontSize: '18px', fontFamily: 'Rubik'}}>Select Department</em>;
            }}
            MenuProps={MenuProps}
            label={!noLabel ? "Department" : ""}
          >
            {departments?.results?.map((val, index) => (
              <MenuItem
                sx={{ p: 0, "& .Mui-checked": {color: '#FFF'} }}
                key={(val, index)}
                value={val}
                onClick={() => handlClick(val)}
                >
                <Checkbox
                  checked={assignedDepartments?.some((el) => el.id === val.id)}
                  disabled={!editItem && selectedDepartment?.id === val?.id}
                />
                <ListItemText primary={val?.name} />
              </MenuItem>
            ))}
            {loading && (
              <InView
                onChange={(view, entry) => {
                  if (!departments?.next) setLoading(false);
                  else if (view)
                    onScroll(
                      navigate,
                      departments,
                      access,
                      dispatch,
                      setLoading,
                      company_id
                    );
                }}
              >
                <MenuItem
                  value=""
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    height: "50px",
                  }}
                >
                  <CircularProgress />
                </MenuItem>
              </InView>
            )}
          </Select>
        </FormControl>
      )}
    </>
  );
};

export default DepartmentSelect;
