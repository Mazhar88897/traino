import { Box, Typography } from "@mui/material";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import { globalStyle } from "../../../styles/globalStyle";
import ModalWrapper from "../../ModalWrapper";
import { IMAGES } from "../../../theme";

const ViewUsers = ({ open, setOpen, data }) => {
  let tempData = !!data?.length && [...data]
  if (!!tempData?.length)
    tempData.unshift({ id: "ID", name: "NAME" })
  const handleClose = () => {
    setOpen(false)
  }
  return (
    <ModalWrapper sx={{ borderRadius: 1, maxWidth: '350px', p: 2 }} open={!!open} setOpen={setOpen}
      onClose={handleClose} isCloseAble={true} crossIcon={true} closeSx={{ position: 'absolute', top: '30px', right: '16px', background: '#F6F6F6', width: '30px', height: '30px', fontSize: '22px', pt: '2px' }}
    >
      <TableContainer sx={{ height: "300px", padding: "0 !important" }}>
        <Table sx={{ padding: "0 !important" }}>
          <TableBody>
            {!!tempData?.length ?
              tempData?.map((item, index) => {
                return (
                  <TableRow
                    key={index}
                    sx={{
                      borderBottom: index != tempData?.length-1 ? '1px solid #EDF2F6' : "0"
                    }}
                  >
                    <TableCell sx={{
                      color: !!index ? "#3A3F51" : '#1F1F1F', fontFamily: 'Rubik', fontSize: !!index ? '14px' : "16px", fontWeight: !!index ? '500' : '400',
                      lineHeight: '24px', letterSpacing: '0.16px',
                      border: '0'
                    }}>
                      {!index ? 'No' : index}
                    </TableCell>

                    <TableCell sx={{ display: 'flex', alignItems: 'center',
                      border: '0', gap: 1 }}>
                      {!!index && <Box component={"img"} src={IMAGES.notification1} sx={{ width: '30px', height: '30px', borderRadius: '100px' }} />}
                      <Typography component={"tspan"} sx={
                        {
                          color: '#1F1F1F',
                          fontFamily: 'Rubik',
                          fontSize: !!index ? '14px' : '16px',
                          fontWeight: '400',
                          pl: !!index ? '0' : 2.5
                        }
                      }>
                        {!index ? "Trainees" : `${item?.first_name} ${item?.last_name}`}
                      </Typography>
                    </TableCell>
                  </TableRow>
                )
              }
              ) :
              <Box sx={{ ...globalStyle.headingMain, display: 'flex', alignItems: 'center', justifyContent: 'center', height: '200px' }}>
                <Typography sx={{ ...globalStyle.headingMain, color: 'black !important', width: '280px', textAlign: 'center', fontSize: "22px", fontWeight: "700", display: 'flex', justifyContent: 'center' }}>No User Assigned</Typography>
              </Box>
            }
          </TableBody>
        </Table>
      </TableContainer>
    </ModalWrapper>
  );
};
export default ViewUsers;
