import React from "react";
import CreateUserForm from "../../../screens/companies/createUser/CreateUserForm";
import ModalWrapper from "../../ModalWrapper";
import { Style } from "./style";

const CreateUserAdminModal = ({ open, setOpen, userRole, data, setData }) => {
  return (
    <ModalWrapper open={!!open} setOpen={setOpen} sx={Style.wrapper}>
      <CreateUserForm
        userRole={userRole}
        setOpen={setOpen}
        data={data}
        setData={setData}
      />
    </ModalWrapper>
  );
};
export default CreateUserAdminModal;
