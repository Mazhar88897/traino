import { Box, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../../store/slice/user";
import { globalStyle } from "../../../styles/globalStyle";
import CustomButton from "../../CustomButton";
import ModalWrapper from "../../ModalWrapper";
import { Logout } from "../../../hooks/globalFunction";
import ReuseModal from "../ReuseModal";

const LogoutModal = ({ open, setOpen }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <ReuseModal
      title={"Are you sure you want to Logout?"}
      open={!!open}
      setOpen={setOpen}
      onConfirm={() => {
        setOpen(false)
        Logout(dispatch, navigate)
      }}
      loader={false}
    />
  );
};
export default LogoutModal;
