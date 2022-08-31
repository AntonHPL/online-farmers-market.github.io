import { FC } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from "@mui/material";
import { ChatDeletionDialogPropsInterface } from '../types';
import axios from 'axios';

const ChatDeletionDialog: FC<ChatDeletionDialogPropsInterface> = ({ dialog, closeDialog, getChatsData }) => {
  return (
    <Dialog
      open={dialog.open}
      keepMounted
      onClose={closeDialog}
      aria-describedby="alert-dialog-slide-description"
      className="chat-deletion-dialog"
    >
      <DialogTitle>
        Are you sure you want to delete this Dialog?
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-slide-description">
          Please keep in mind that the Dialog will be deleted for your Interlocutor as well.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={closeDialog}>
          Cancel
        </Button>
        <Button onClick={() => {
          axios
            .delete(`/api/chat/${dialog.chatId}`)
            .then(() => {
              getChatsData();
              closeDialog();
            })
            .catch(error => {
              closeDialog();
              console.error("The error occured: ", error.message);
            })
        }}>
          OK
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ChatDeletionDialog;