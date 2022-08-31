import { useContext, FC } from 'react';
import { Dialog, DialogActions, DialogTitle, DialogContent, DialogContentText, TextField, Button } from "@mui/material";
import { FirstMessageDialogPropsInterface } from '../types';
import axios from 'axios';
import { UserContext } from './UserContext';
import { AccountCircle } from '@mui/icons-material';

const FirstMessageDialog: FC<FirstMessageDialogPropsInterface> = ({
  open,
  closeDialog,
  seller,
  messageText,
  setMessageText,
  paramsId,
  ad
}) => {
  const { user } = useContext(UserContext);
  const sendMessage = () => {
    const creationDate = new Date().toISOString();
    axios
      .post("/api/chat", {
        adId: paramsId,
        creationDate,
        messages: [{ senderId: user?._id, message: messageText, creationDate }],
        participants: [{ name: user?.name, id: user?._id }, { name: ad?.textInfo.sellerName, id: ad?.textInfo.sellerId }],
      })
      .then(() => {
        setMessageText("");
        closeDialog();
      })
      .catch(error => {
        console.error("The error occured: ", error.message);
        closeDialog();
      });
  };

  return (
    <Dialog
      open={open}
      keepMounted
      onClose={closeDialog}
      aria-describedby="alert-dialog-slide-description"
      className="first-message-dialog"
    >
      <DialogTitle>
        {seller &&
          <div className="seller-info">
            <div className="seller-account-image">
              {seller.image ?
                <img src={`data:image/png;base64,${seller.image.data}`} /> :
                <AccountCircle />
              }
            </div>
            {seller.name}
          </div>
        }
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-slide-description">
          <TextField
            required
            type="text"
            size="small"
            variant="outlined"
            value={messageText}
            autoComplete="off"
            placeholder="Enter your Message"
            onChange={e => setMessageText(e.target.value)}
            // className="form_row"
            multiline
            rows={4}
          />
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={closeDialog}>
          Quit
        </Button>
        <Button
          disabled={!messageText}
          onClick={sendMessage}>
          Send
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default FirstMessageDialog;
