import { Box, Typography } from "@mui/material"
import { Style } from "./style"

const CustomTabs = ({tabs, presentTab, setPresentTab, sx }) => {
    return(
        <Box sx={{...Style.linksContainer, ...sx}}>
        {tabs?.map((item, index) =>
          <Typography sx={presentTab === item?.id ? { ...Style.links, ...Style.activeLink } :
            Style.links} onClick={() => setPresentTab(item?.id)}>{item?.name}</Typography>
        )}
      </Box>

    )
}
export default CustomTabs