import React, { useState } from "react";
import CompanyWrapper from "../summary/CompanyWrapper";
import CreateUserForm from "./CreateUserForm";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { IMAGES } from "../../../theme";
import { useSelector } from "react-redux";
import { selectUser } from "../../../store/slice/user";

const CreateUser = () => {
  const { id, user_id } = useParams();
  const state = useLocation()?.state;
  const data = state?.data || {};
  const { isSuperAdmin } = useSelector(selectUser);
  const [userRole, setUserRole] = useState(data?.role || (isSuperAdmin ? "Admin" : "User"))
  const navigate = useNavigate()
  
  return (
    <CompanyWrapper
      heading={`${user_id ? "Update" : "Create"} Admin / User`}
      topBannerIcon={IMAGES.companies}
      topBannerHeading={ isSuperAdmin ? "Companies" : "My Teams"}
      handleBack={() => isSuperAdmin ? navigate(`/company/${id}/`, {state}) : navigate(`/my-teams`)}
    >
      <CreateUserForm userRole={userRole} setUserRole={setUserRole}/>
    </CompanyWrapper>
  );
};

export default CreateUser;
