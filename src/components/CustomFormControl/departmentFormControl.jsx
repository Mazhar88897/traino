import { useDispatch, useSelector } from "react-redux";
import CustomFormControl from ".";
import { selectUser, updateUserData } from "../../store/slice/user";
import { useNavigate, useParams } from "react-router-dom";
import { getDepartments } from "../../services/departments";
import { getDepartmentsById } from "../../services/myLearnings";
import { useEffect, useState } from "react";
import { Padding } from "@mui/icons-material";

const DepartmentFormControl = ({
  value,
  setValue,
  customHandleChange = () => {},
  isAssign,
  nested,
}) => {
  const { id: paramsId } = useParams();
  const [departmentData, setDepartmentData] = useState([]);
  const [val, setVal] = useState(
    !!departmentData?.length ? (isAssign ? [1] : 1) : false
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [array, setArray] = useState(
    !!departmentData?.length ? [...departmentData] : []
  );
  const {
    access,
    departments,
    isSuperAdmin,
    isAdmin,
    company_id,
    isUser,
    member_id,
    id,
  } = useSelector(selectUser);
  const departmentGet = async () => {
    let companyId = isSuperAdmin ? paramsId : company_id;
    if ((isSuperAdmin && !!id) || isAdmin) {
      if (departments?.id != companyId && companyId) {
        const res = await getDepartments(dispatch, navigate, access, companyId);
        if (!!res?.data) {
          let departments = res?.data;
          departments.id = companyId;
          dispatch(updateUserData({ departments }));
          setDepartmentData(res?.data?.results);
          setArray(!!res?.data?.results?.length ? [...res?.data?.results] : []);
          setVal(!!res?.data?.results?.length ? (isAssign ? [1] : 1) : false);
        }
      } else {
        setDepartmentData(departments?.results);
        setArray(
          !!departments?.results?.length ? [...departments?.results] : []
        );
        setVal(!!departments?.results?.length ? (isAssign ? [1] : 1) : false);
      }
    } else {
      const res = await getDepartmentsById(
        dispatch,
        navigate,
        access,
        member_id
      );
      let departments = res?.data;
      departments.id = companyId;
      dispatch(updateUserData({ departments }));
      setDepartmentData(departments?.results);
      setArray(!!res?.data?.results?.length ? [...res?.data?.results] : []);
      setVal(!!res?.data?.results?.length ? (isAssign ? [1] : 1) : false);
    }
  };

  const handleChange = (e, item, index) => {
    const tempVal = e?.target?.value;
    if (isAssign) {
      customHandleChange(item);
      setVal((prev) =>
        !!prev?.length
          ? prev?.includes(index)
            ? prev
            : // prev?.filter((item2) => item2 != index)
              [...prev, index]
          : [index]
      );
    } else {
      setValue(array[tempVal - 1]?.id);
      setVal(tempVal);
    }
  };

  useEffect(() => {
    departmentGet();
  }, []);

  return (
    <CustomFormControl
      disable={!array?.length}
      placeholder={!array?.length && "No Department"}
      multi={isAssign}
      sx={{
        display: "flex",
        minWidth: { xs: "160px !important", xl: "200px !important" },
        maxWidth: { xs: "160px !important", xl: "200px !important" },
      }}
      selectSx={{
        height: { xs: "30px", xl: "50px" },
        color: "#4B4B4B",
        fontFamily: "Rubik",
        // height: "30px",
        fontSize: { xs: "12px", xl: "16px" },
        fontWeight: "400",
        textTransform: "capitalize",
      }}
      value={val}
      handleChange={handleChange}
      menuSx={{
        height: { xs: "30px", xl: "50px" },
        // height: "30px",
        color: "#4B4B4B",
        fontFamily: "Rubik",
        fontSize: { xs: "12px", xl: "16px" },
        fontWeight: "400",
        textTransform: "capitalize",
      }}
      array={array}
      objectKey={!!array?.length && "name"}
      isDepart={true}
    />
  );
};
export default DepartmentFormControl;
