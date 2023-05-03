import * as React from "react";
import { useState } from "react";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import PersonAdd from "@mui/icons-material/PersonAdd";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";
import LogoutIcon from "@mui/icons-material/Logout";
import auth from "apis/auth";
import user from "apis/user";
import { useHistory } from "react-router-dom";
import DashboardIcon from '@mui/icons-material/Dashboard';

export default function AccountMenu(props) {
  const [anchorEl, setAnchorEl] = useState(null);
  const history = useHistory();
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSignout = () => {
    handleClose();
    auth.signOut();
  };

  const handleAdmin = () => {
    history.push("/museums-page");
    window.location.replace("/admin-page");
  };

  const handleProfile = () => {
    history.push("/museums-page");
    window.location.replace("/profile-page");
  };

  return (
    <div>
      <Box sx={{ height: 40, alignItems: "center", textAlign: "center" }}>
        <Tooltip title="Account settings">
          <IconButton
            style={{
              border: "none",
              outline: "none",
            }}
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
          >
            <Avatar sx={{ width: 40, height: 40 }}>{user.getData().name[0].toUpperCase()}</Avatar>
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <div style={{ padding: "10px" }}>
          <p style={{ marginBottom: "0px" }}>Đăng nhập với</p>
          <p
            style={{
              fontWeight: "bold",
              marginTop: "0px",
              marginBottom: "0px",
            }}
          >
            {user.getData().name}
          </p>
        </div>

        <Box sx={{ height: 2, minWidth: '200px', backgroundColor: "#c4c4c4" }}></Box>

        <MenuItem onClick={handleProfile}>
          <Avatar /> Thông tin
        </MenuItem>
        <Divider />
        {
          parseInt(user.getData().role) === user.UserRole.ADMIN ? <MenuItem onClick={handleAdmin}>
          <DashboardIcon />
          Admin
        </MenuItem> : null
}
        <MenuItem onClick={handleSignout}>
          <LogoutIcon />
          Thoát
        </MenuItem>
      </Menu>
    </div>
  );
}
