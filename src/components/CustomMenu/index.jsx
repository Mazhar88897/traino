import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Box, Typography } from '@mui/material';

const ITEM_HEIGHT = 48;

const CustomMenu = ({ options, icon, itemSx }) => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        event?.stopPropagation()
        setAnchorEl(event.currentTarget);
    };
    const handleClose = (e) => {
        e?.stopPropagation()
        setAnchorEl(null);
    };

    const handleSelect = (e, handleItemClick = () => { }) => {
        e?.stopPropagation()
        setAnchorEl(null);
        handleItemClick()
    };

    return (
        <Box>
            <IconButton
                aria-label="more"
                id="long-button"
                aria-controls={open ? 'long-menu' : undefined}
                aria-expanded={open ? 'true' : undefined}
                aria-haspopup="true"
                onClick={handleClick}
                sx={{ width: '18px !important', height: '15px !important', padding: '8px' }}
            >
                {icon ? icon : <MoreVertIcon style={{ width: '18px !important', height: '15px !important' }} />}
            </IconButton>
            <Menu
                id="long-menu"
                MenuListProps={{
                    'aria-labelledby': 'long-button',
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                slotProps={{
                    paper: {
                        style: {
                            maxHeight: ITEM_HEIGHT * 4.5,
                            width: '20ch',
                        },
                    },
                }}
                sx={{
                    "& .MuiSvgIcon-root": {
                        width: '18px !important', height: '15px !important',
                        background: 'aqua !important'
                }}}
            >
                {options.map((item) => (
                    <MenuItem key={item?.option} onClick={(e) => handleSelect(e, item?.handleClick)} sx={{...itemSx, "&:hover": {background: 'inherit'}}}>
                        {item?.icon}
                        <Typography sx={{
                            color: '#1F1F1F',
                            fontFamily: 'Rubik',
                            fontSize: '14px',
                            fontWeight: '400',
                        }}>
                            {item?.option}
                        </Typography>
                    </MenuItem>
                ))}
            </Menu>
        </Box>
    );
}

export default CustomMenu