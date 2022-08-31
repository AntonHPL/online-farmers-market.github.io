import { useState, useEffect, FC } from "react";
import {
  Breadcrumbs,
  Link,
  Typography,
} from "@mui/material";
import { Outlet, useNavigate } from "react-router-dom";
import { ProfileContextInterface } from "../types";
import ConfirmationDialog from "./ConfirmationDialog";

const Profile: FC = () => {
  // const { user, isAccountImageChanged, setIsAccountImageChanged } = useContext(UserContext);
  const defaultOutletTitle = "My Profile";
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [changingAccountImage, setChangingAccountImage] = useState(false);
  const closeDialog = () => setIsDialogOpen(false);
  const outletTitle = localStorage.getItem("outletTitle");
  const navigate = useNavigate();

  const outletContext: ProfileContextInterface = {
    changingAccountImage,
    closeDialog,
    outletTitle,
    setIsDialogOpen,
  };

  // useEffect(() => {
  //   localStorage.getItem("ad-id_selected") ? setOutletTitle("My Chats") : setOutletTitle(defaultOutletTitle);
  // }, []);

  // useEffect(() => {

  //   outletTitle &&
  //     navigate(
  //       outletTitle === defaultOutletTitle ?
  //         "/profile/general-info" :
  //         outletTitle === "My Ads" ?
  //           "/profile/ads" :
  //           outletTitle === "My Chats" ?
  //             "/profile/chats" :
  //             "/"
  //     );
  // }, [outletTitle]);

  return (
    <div className="profile-container">
      {outletTitle !== defaultOutletTitle &&
        <Breadcrumbs aria-label="breadcrumb">
          <Link
            underline="hover"
            color="inherit"
            onClick={() => {
              localStorage.setItem("outletTitle", "My Profile");
              navigate("/profile/general-info");
            }}
          >
            My Profile
          </Link>
          <Typography color="text.primary">
            {outletTitle}
          </Typography>
        </Breadcrumbs>
      }
      <Typography variant="h4">
        {outletTitle}
      </Typography>
      <Outlet context={outletContext} />
      <ConfirmationDialog
        open={isDialogOpen}
        closeDialog={closeDialog}
        changingAccountImage={changingAccountImage}
        setChangingAccountImage={setChangingAccountImage}
      />
    </div>
  );
};

export default Profile;