import { Box, Pagination, Stack } from "@mui/material"
import { Style } from "./Style"

const CustomPagination = ({count, siblingCount, spacing, currentPage, handleChange}) => {
    return (
        <Box sx={Style.paginationContainer}>
            <Stack spacing={spacing || 2}>
                <Pagination
                    siblingCount={ siblingCount || 0}
                    count={typeof count === "number" ? count : 10} variant="outlined" shape="rounded"
                    page={currentPage || 1}
                    sx={Style.pagination}
                    onChange={handleChange} 
                />
            </Stack>
        </Box>

    )
}
export default CustomPagination