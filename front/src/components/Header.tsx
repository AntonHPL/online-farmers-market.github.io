import { useState, useEffect, useContext, FC, MouseEvent } from "react";
import { useNavigate } from "react-router-dom";
import { AppBar, Menu, MenuItem, Toolbar, Box, Button, IconButton } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { UserContext } from "./UserContext";
import AccountDialog from "./AccountDialog";
import axios from "axios";

import logo from "../images/logo.png";

const Header: FC = () => {
  const { user, setUser, setIsLogInDialogOpen } = useContext(UserContext);
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
  // const [menu, setMenu] = useState(null);

  const [accountImage, setAccountImage] = useState("");

  const isMenuOpen = !!anchorEl;
  // const isMobileMenuOpen = !!mobileMoreAnchorEl;

  const navigate = useNavigate();

  const openMenu = (e: MouseEvent<HTMLButtonElement>): void => setAnchorEl(e.currentTarget);
  const handleMobileMenuClose = (): void => {
    setMobileMoreAnchorEl(null);
  };

  const closeMenu = (): void => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const logout = (): void => {
    axios
      .get("/api/log-out")
      .then(() => {
        closeMenu();
        setUser(null);
        setIsLogInDialogOpen(true);
      })
      .catch(error => {
        console.error("The error occured: ", error.message);
        closeMenu();
      });
  };

  useEffect(() => {
    user && user.image && setAccountImage(user.image.data);
  }, [user])
  // const handleMobileMenuOpen = (event) => {
  //   setMobileMoreAnchorEl(event.currentTarget);
  // };

  // useEffect(() => {
  //   axios.get("/api/menu")
  //     .then(({ data }) => setMenu(data));
  // }, []);

  const open = (path: string, outletTitle: string): void => {
    closeMenu();
    navigate(`/profile/${path}`);
    localStorage.setItem("outletTitle", outletTitle);
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      // transformOrigin = {{
      //   vertical: "top",
      //   horizontal: "right",
      // }}
      open={isMenuOpen}
      onClose={closeMenu}
    >
      <MenuItem
        onClick={() => {
          if (user) {
            localStorage.setItem("outletTitle", "My Profile");
            navigate("/profile/general-info");
          } else {
            setIsLogInDialogOpen(true);
          }
          closeMenu();
        }}
      >
        My Profile
      </MenuItem>
      <MenuItem onClick={() => open("ads", "My Ads")}>
        My Ads
      </MenuItem>
      <MenuItem onClick={() => open("chats", "My Chats")}>
        My Chats
      </MenuItem>
      <MenuItem onClick={logout}>
        Log out
      </MenuItem>
    </Menu>
  );

  // const mobileMenuId = "primary-search-account-menu-mobile";
  // const renderMobileMenu = (
  //   <Menu
  //     anchorEl = {mobileMoreAnchorEl}
  //     anchorOrigin = {{
  //       vertical: "top",
  //       horizontal: "right",
  //     }}
  //     id={mobileMenuId}
  //     keepMounted
  //     transformOrigin={{
  //       vertical: "top",
  //       horizontal: "right",
  //     }}
  //     open={isMobileMenuOpen}
  //     onClose={handleMobileMenuClose}
  //   >
  //     <MenuItem>
  //       <IconButton size="large" aria-label="show 4 new mails" color="inherit">
  //         <Badge badgeContent={4} color="error">
  //           <MailIcon />
  //         </Badge>
  //       </IconButton>
  //       <p>Messages</p>
  //     </MenuItem>
  //     <MenuItem>
  //       <IconButton
  //         size="large"
  //         aria-label="show 17 new notifications"
  //         color="inherit"
  //       >
  //         <Badge badgeContent={17} color="error">
  //           <NotificationsIcon />
  //         </Badge>
  //       </IconButton>
  //       <p>Notifications</p>
  //     </MenuItem>
  //     <MenuItem onClick={openMenu}>
  //       <IconButton
  //         size="large"
  //         aria-label="account of current user"
  //         aria-controls="primary-search-account-menu"
  //         aria-haspopup="true"
  //         color="inherit"
  //       >
  //         <AccountCircle />
  //       </IconButton>
  //       <p>Profile</p>
  //     </MenuItem>
  //   </Menu>
  // );

  return (
    <div className="header-container">
      <AppBar position="static">
        <Toolbar>
          <div
            className="logo"
            onClick={() => window.location.href = "/"}
          >
            <img
              src={logo}
              alt="logo"
            />
          </div>
          <Box sx={{ flexGrow: 1 }} />
          <IconButton
            size="large"
            color="inherit"
            onClick={() => user ?
              navigate("/new-advertisement") :
              setIsLogInDialogOpen(true)
            }
          >
            <AddCircleOutlineIcon />
          </IconButton>
          {user ?
            <Button
              size="large"
              aria-label="current_user_account"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={openMenu}
              color="inherit"
              endIcon={
                <div className="account-image">
                  {user.image ?
                    <img src={`data:image/png;base64,${accountImage}`} /> :
                    <AccountCircle />
                  }
                </div>
              }
              className="profile-button"
            >
              {user.name}
            </Button> :
            <IconButton
              size="large"
              edge="end"
              aria-label="current_user_account"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={() => setIsLogInDialogOpen(true)}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          }
          {/* <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box> */}
        </Toolbar>
      </AppBar>
      {/* {renderMobileMenu} */}
      {user && renderMenu}
      <AccountDialog />
    </div>
  );
}

export default Header;