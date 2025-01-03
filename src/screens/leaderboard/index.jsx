import { Box, FormControl, IconButton, InputBase, MenuItem, Pagination, Paper, Select, Typography } from "@mui/material"
import Stack from '@mui/material/Stack';
import { TopBanner } from "../../components"
import LeaderBoardTable from "../dashboard/components/leaderBoardTable"
import Layout from "../../layout/MainLayout";
import { useNavigate } from "react-router-dom";
import { FiUsers } from "react-icons/fi";
import { IMAGES } from "../../theme";
import { useState } from "react";
import DepartmentFormControl from "../../components/CustomFormControl/departmentFormControl";
import CustomFormControl from "../../components/CustomFormControl";
import { Style } from "../dashboard/style";
import CustomPagination from "../../components/CustomPagination";

const Leaderboard = () => {
    const navigate = useNavigate()
    const [days, setDays] = useState(1);
    const [selectedDepart, setSelectedDepart] = useState(1);

    const handleChange = (event) => {
        setDays(event.target.value);
    };

    const handleDepartChange = (event) => {
        setSelectedDepart(event.target.value);
    };

    const headingData = [
        {
            name: `Dashboard >`,
            handleNavigate: () => navigate(`/dashboard`),
        },
        {
            name: `Leaderboard`
        },
    ]

    return (
        <Layout>
            <TopBanner headingData={headingData} />
            <Typography sx={Style.leaderBoardHeading}>Leaderboard</Typography>
            <Typography sx={Style.leaderBoardText}>See the latest rankings and challenge yourself to reach the top!</Typography>
            <Box sx={Style.contentContainer}>
                <Box sx={Style.contentContainerChild}>
                    <Box sx={Style.userDetailContainer}>
                        <FiUsers style={Style.userIcon} />
                        <Typography sx={Style.userNo}>21 Trainees</Typography>
                    </Box>
                    <Box sx={Style.paperFormContainer}>
                        <Paper 
                        // component="form" 
                        sx={Style.paperForm}>
                            <IconButton type="button" sx={Style.searchContainer} aria-label="search">
                                <Box component={"img"} src={IMAGES.search} sx={Style.searchIcon} />
                            </IconButton>
                            <InputBase
                                sx={Style.inputBase}
                                placeholder={`Search here..`}
                                inputProps={{ "aria-label": "Search" }}
                            />
                        </Paper>
                    </Box>
                </Box>
                <Box sx={Style.formControls}>
                    <DepartmentFormControl value={selectedDepart} setValue={setSelectedDepart} handleChange={handleDepartChange} />
                    <CustomFormControl
                        sx={Style.dayFormControl}
                        selectSx={Style.dayFormControlSelect}
                        value={days}
                        handleChange={handleChange}
                        menuSx={Style.dayFormControlMenu}
                        array={['This Week', 'Sep 02 - Sep 09', 'Sep 09 - Sep 17', 'Sep 17 - Sep 24']}
                    />
                </Box>
            </Box>
            <LeaderBoardTable />
            <CustomPagination />
        </Layout>
    )
}
export default Leaderboard