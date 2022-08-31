import { useState, useEffect, useContext, FC } from 'react';
import LogInForm from "./LogInForm";
import SignUpForm from "./SignUpForm";
import { Dialog, DialogTitle, DialogContent, Backdrop, CircularProgress } from "@mui/material";
import { UserContext } from './UserContext';

const AccountDialog: FC = () => {
  const { isLogInDialogOpen, setIsLogInDialogOpen } = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const [isSignUpDialogOpen, setIsSignUpDialogOpen] = useState(false);

  useEffect(() => {
    isSignUpDialogOpen && setIsLogInDialogOpen(false);
  }, [isSignUpDialogOpen]);

  useEffect(() => {
    isLogInDialogOpen && setIsSignUpDialogOpen(false);
  }, [isLogInDialogOpen]);

  const closeDialog = (): void => {
    isLogInDialogOpen && setIsLogInDialogOpen(false);
    isSignUpDialogOpen && setIsSignUpDialogOpen(false)
  };
  console.log(isLogInDialogOpen, isSignUpDialogOpen)
  return (
    <Dialog
      open={isLogInDialogOpen || isSignUpDialogOpen}
      keepMounted
      onClose={closeDialog}
      className="account-dialog"
    >
      <DialogTitle>
        {isLogInDialogOpen ? "Log in" : "Create an Account"}
      </DialogTitle>
      <DialogContent className="dialog-content">
        {isLogInDialogOpen ?
          <LogInForm
            isOpen={isLogInDialogOpen}
            setIsSignUpDialogOpen={setIsSignUpDialogOpen}
            setLoading={setLoading}
          /> :
          <SignUpForm setLoading={setLoading} />
        }
      </DialogContent>
      <Backdrop
        open={loading}
        className="backdrop"
      >
        <CircularProgress />
      </Backdrop>
    </Dialog>
  );
};

export default AccountDialog;