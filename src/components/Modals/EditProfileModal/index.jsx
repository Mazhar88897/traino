import React from "react";
import EditProfileForm from "../../Forms/EditProfile";
import ModalWrapper from "../../ModalWrapper";

const EditProfileModal = ({ open, setOpen }) => {
  return (
    <ModalWrapper open={open} setOpen={setOpen} crossIcon>
      <EditProfileForm setOpen={setOpen} />
    </ModalWrapper>
  );
};

export default EditProfileModal;
