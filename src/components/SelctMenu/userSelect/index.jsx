import {
  Box,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getDepartmentUsers } from "../../../services/companies";
import { selectUser } from "../../../store/slice/user";
import { IMAGES } from "../../../theme";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const UserSelect = ({ user, setUser, department, editItem, userData, setUserData }) => {
  const [tempUsers, setTempUsers] = useState([]);
  const handleChange = (item) => {
    const value = item
    if (!user?.includes("all") && value?.id === "all") {
      let tempData = [];
      userData?.results?.map((item) => {
        tempData?.push(item?.id);
      });
      setUser(tempData);
    }
    else if (user?.includes("all") && !value?.id === "all") {
      setUser([]);
    } else {
      setUser((prev) =>
        !!prev?.length ?
          !!prev?.includes(value?.id) ?
            prev?.filter((item2) => item2 !== value?.id) :
            [...prev, value?.id] :
          [value?.id]
      )
    }

  };

  const { access, company_id } = useSelector(selectUser);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { id, docId } = useParams();

  const getUser = async (id) => {
    const { data } = await getDepartmentUsers(dispatch, navigate, id, access);
    let temp = [...department?.data];
    let tempUserData = { ...userData };
    temp = temp?.map((item) => {
      let temp1 = { ...item };
      let users = [];
      tempUserData?.departments?.length
        ? !tempUserData?.departments?.includes(id) &&
        tempUserData?.departments?.push(id)
        : (tempUserData.departments = [id]);
      temp1?.users?.map((item2, index2) => {
        data?.results?.map((item3) => {
          if (item2?.includes(item3?.id)) {
            users.push(item3);
            let tempItem = { ...item3 };
            if (!!tempUserData?.results) {
              let ind = tempUserData?.results?.findIndex(
                (item) => item?.id == item3?.id
              );
              tempItem.departId =
                ind == -1
                  ? [id]
                  : !tempUserData?.results[ind].departId?.includes(id)
                    ? [...tempUserData?.results[ind].departId, id]
                    : [...tempUserData?.results[ind].departId];
              tempUserData.results = !tempUserData?.results?.length
                ? [tempItem]
                : ind == -1
                  ? [...tempUserData?.results, tempItem]
                  : [
                    ...tempUserData?.results.slice(0, ind),
                    tempItem,
                    ...tempUserData?.results.slice(ind + 1),
                  ];
            } else {
              tempItem.departId = [id];
              tempUserData.results = [tempItem];
            }
          }
        });
      });
      temp1.users = users;
      return temp1;
    });
    setTempUsers(tempUserData);
    setUserData(tempUserData);
  };
  useEffect(() => {
    let departId = !!department?.data?.length && department?.data[department?.data?.length - 1]?.id;
    let tempData = { ...tempUsers };
    let tempUserData = { ...userData };
    if (
      !!department?.data?.length &&
      !tempUsers?.departments?.includes(departId) && !!departId?.length
    )
      getUser(departId);
    else if (department?.status == "remove") {
      tempUserData.results = tempUserData?.results?.map((item) => {
        if (item.id !== "all") {
          item.departId = item?.departId?.filter(
            (item2) =>
              department?.data?.findIndex((item3) => item2 === item3?.id) !== -1
          );
        }
        return item;
      });
      tempUserData.results = tempUserData?.results?.filter(
        (item) => (tempUserData?.results?.length != 1 && item.id === "all") || item?.departId?.length > 0
      );
      tempUserData.departments = tempUserData?.departments?.filter(
        (item, index) => item != departId
      );
      setUserData(tempUserData);
    } else {
      let array = [];
      tempData?.results?.map((item, index) => {
        let ind = tempUserData?.results?.findIndex(
          (item2) => item2?.id == item?.id
        );
        let departInd = item?.departId?.findIndex((item2) => item2 == departId);
        let tempItem = { ...tempUserData?.results[ind] };
        let userDepartInd = tempItem?.departId?.findIndex(
          (item2) => item2 == departId
        );
        if (departInd == -1 && ind != -1) {
          tempItem?.departId?.push(departId);
          array.push(tempItem);
        } else if (ind == -1) {
          let temp = { ...item };
          temp.departId = [departId];
          array.push(temp);
        }
      });
      setUserData((prev) => {
        let data = { ...prev, results: array };
        return data;
      });
    }
  }, [department?.data?.length]);


  return (
    <Box sx={{
      color: "#1F1F1F", display: 'flex', gap: '24px', mt: 4.5,
      flexWrap: 'wrap',
      flexDirection: { xs: 'column', sm: 'row' },
      alignItems: { xs: 'center', sm: 'start' },
      height: '100%'
    }}>
      {!!userData?.results?.length ? userData?.results?.map((item, index) =>
        <Box sx={{
          display: 'flex',
          alignItems: 'center',
          p: "12px 24px",
          gap: '18px',
          width: 'calc(33.33% - 16px)',
          minWidth: '220px',
          maxWidth:  '300px',
          height: '72px',
          borderRadius: '7px',
          border: user?.includes(item?.id) ? '1px solid #3447D4' : "none",
          background: '#FFF',
          boxShadow: '0px 4px 39px 0px rgba(81, 69, 159, 0.08)',
          cursor: 'pointer',
          position: 'relative'
        }}
          onClick={() => handleChange(item)}
        >
          {!!user?.includes(item?.id) && <Box component={"img"} src={IMAGES.tick2} sx={{ width: '26px', height: '26px', position: "absolute", top: '-12px', right: '-6.5px' }} />}
          <Box sx={{
            width: '47px',
            height: '47px',
            borderRadius: '27px',
          }} component={"img"} src={index % 3 === 0 ? IMAGES.notification1 : index % 3 === 1 ? IMAGES.notification3 : IMAGES.notification4} />
          <Typography sx={{
            color: '#1F1F1F',
            fontFamily: 'Rubik',
            fontSize: '20px',
            fontWeight: '400',
            width: '100%',
            height: '30px',
            lineHeight: '30px',
            display: 'inline',
            wordBreak: 'break-all',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}>{item?.first_name + " " + item?.last_name}</Typography>
        </Box>
      ) :
        <Box sx={{ display: 'flex', flexGrow: 1, flex: 1, height: '100%', alignItems: 'center', justifyContent: 'center' }}>
          <Typography sx={{
            color: '#1F1F1F',
            fontFamily: 'Rubik',
            fontSize: {xs: '14px', sm: '16px', md: '20px'},
            fontWeight: '400',
            textAlign: 'center'
          }}>Please select department to assign users</Typography>
        </Box>
      }
    </Box>
  );
};

export default UserSelect;
