import { Box, Typography } from "@mui/material";
import { globalStyle } from "../../../styles/globalStyle";
import CustomButton from "../../CustomButton";
import ModalWrapper from "../../ModalWrapper";
import ReuseModal from "../ReuseModal";

const DeleteModal = ({ open, setOpen, onConfirm, onClose, loading, component, isTable }) => {
  return (
    <ReuseModal
      title={`Are you sure you want to ${isTable ? 'remove' : 'delete'} this ${component}?`}
      open={!!open}
      setOpen={setOpen}
      onConfirm={() => {
        setOpen(false)
        onConfirm()
      }}
      loader={loading}
    />
  );
};
export default DeleteModal;
