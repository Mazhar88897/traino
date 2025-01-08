import { Box, Typography } from "@mui/material";
import { globalStyle } from "../../../styles/globalStyle";
import CustomButton from "../../CustomButton";
import ModalWrapper from "../../ModalWrapper";

const ReuseModal = ({ open, setOpen, onConfirm, title, loader = false }) => {
  return (
    <ModalWrapper
      sx={{ maxWidth: { xs: "400px", sm: "590px" } }}
      open={open}
      setOpen={setOpen}
    >
      <Box sx={{ px: "22px" }}>
        {" "}
        <Typography sx={globalStyle.subHeading}>{title}</Typography>
      </Box>

      <Box
        sx={{
          width: "100%",
          px: "25px",
          maxWidth: { xs: "280px", sm: "380px" },
          display: "flex",
          gap: "15px",
          mt: { xs: 0, sm: 1.5 },
          mb: { xs: 2, sm: 3 },
        }}
      >
        <CustomButton
          onClick={onConfirm}
          color="secondary"
          sx={{
            width: "50%",
            letterSpacing: "1px",
            color: "#3447D4",
            background: "#fff",
          }}
          buttonText={"Yes"}
          loading={loader}
        />
        <CustomButton
          onClick={() => setOpen(false)}
          color="secondary"
          sx={{ width: "50%", letterSpacing: "1px" }}
          buttonText={"No"}
        />
      </Box>
    </ModalWrapper>
  );
};
export default ReuseModal;
