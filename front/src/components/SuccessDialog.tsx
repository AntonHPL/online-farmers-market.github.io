import { FC } from "react";
import {
  Button,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Dialog,
} from "@mui/material";
import { DialogInterface } from "../types";

const SuccessDialog: FC<DialogInterface> = ({ open, closeDialog }) => {
  return (
    <Dialog
      open={open}
      keepMounted
      onClose={closeDialog}
      aria-describedby="alert-dialog-slide-description"
      className="success-dialog"
    >
      <DialogTitle>
        Congratulations!
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-slide-description">
          Your Ad was successfully created!
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={closeDialog}>
          OK
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default SuccessDialog;