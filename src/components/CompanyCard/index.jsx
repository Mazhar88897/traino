import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Box, Tooltip, Typography } from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectdrawer } from "../../store/slice/drawer";
import { globalStyle } from "../../styles/globalStyle";
import { IMAGES } from "../../theme";
import { Style } from "./style";
import { useNavigate } from "react-router-dom";
import DeleteModal from "../Modals/Delete";
import { deleteCompany, getCompanyById } from "../../services/companies";
import toast from "react-hot-toast";
import { selectUser, updateUserData } from "../../store/slice/user";
import CustomMenu from "../CustomMenu";
import useWindowDimensions from "../../hooks/windowDimensions";


const CompanyCard = ({
  data,
  onClick = () => { },
  sx = {},
  isEditeable = true,
  isDeleteHidden,
  setCompanies,
  deleteCompanyFunc,
}) => {
  const { access, company } = useSelector(selectUser);
  const { drawer } = useSelector(selectdrawer);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const [isDrawerOpen, setIsDrawerOpen] = useState(drawer)
  const { width } = useWindowDimensions();

  useEffect(() => {
    setIsDrawerOpen(drawer)
  },[drawer])

  const navigate = useNavigate();
  const { id, name, logo } = data || {};
  const defaultImageUrl = useMemo(() => {
    return IMAGES.companyLogo;
  }, []);


  const removeCompany = async () => {
    await deleteCompany(dispatch, navigate, id, access);
    setCompanies((prev) => {
      let data = {
        ...prev,
        results: prev?.results?.filter((val) => val.id !== id),
      };
      dispatch(updateUserData({ company: data }));
      return data;
    });
    setOpen(false);
    toast.success("Company has been successfully deleted");
  };
  const onEditClick = async () => {
    let formData = {}
    const companyData = company?.results
    let ind = companyData?.findIndex((item) => item?.id == id)
    if (!companyData[ind]?.edit) {
      formData = await getCompanyById(dispatch, navigate, access, id);
      formData.data.edit = true
      dispatch(updateUserData({ company: { results: [...companyData?.slice(0, ind), formData?.data, ...companyData?.slice(ind + 1)] } }))
    }
    else formData.data = companyData[ind]
    navigate(`/company/update/${id}`, { state: { data: formData?.data } });
  };

  return (
    <>
      <Box sx={{ ...Style.card(isDrawerOpen, width), ...sx }}>
        <Box
          onClick={onClick}
          component={"img"}
          src={!logo ? defaultImageUrl : logo}
          sx={Style.img(logo, isDrawerOpen, width)}
        />
        <Box sx={{ display: "flex", justifyContent: "space-between", p: "18px 20px", borderTop: "1px solid #D8D8D8" }}>
          <Tooltip title={name}>
            <Typography sx={Style.name} onClick={onClick}>
              {name}
            </Typography>
          </Tooltip>
          {isEditeable && <CustomMenu itemSx={{ display: 'flex', gap: 1.5 }} options={[
            { icon: <Box component={"img"} src={IMAGES.edit} sx={Style.buttonIcon} />, option: 'Edit', handleClick: onEditClick },
            { icon: <Box component={"img"} src={IMAGES.delete} sx={Style.buttonIcon} />, option: 'Delete', handleClick: () => setOpen(true) }
          ]} />}
        </Box>
      </Box>
      <DeleteModal
        onConfirm={deleteCompanyFunc || removeCompany}
        onClose={() => setOpen(false)}
        open={open}
        setOpen={setOpen}
        loading={loading}
        component={"company"}
      />
    </>
  );
};

export default CompanyCard;
