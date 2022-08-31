import { useState, useContext, FC, FormEvent } from 'react';
import { Button, TextField, Link, Alert, Tooltip } from '@mui/material';
import Captcha from './Captcha';
import { UserContext } from "./UserContext";
import { SignUpFormPropsInterface, SignUpFormInputsInterface, ErrorInterface, ErrorsInterface } from "../types";
import axios from "axios";

const SignUpForm: FC<SignUpFormPropsInterface> = ({ setLoading }) => {
  const emptyInputs: SignUpFormInputsInterface = {
    name: "",
    email: "",
    password: "",
  };
  const [inputs, setInputs] = useState<SignUpFormInputsInterface>(emptyInputs);
  const [reenteredPassword, setReenteredPassword] = useState("");
  const [errors, setErrors] = useState<ErrorsInterface | null>(null);
  const [signUpError, setSignUpError] = useState("");
  const [captchaCreated, setCaptchaCreated] = useState("");
  const [captchaEntered, setCaptchaEntered] = useState("");
  const [captchaReload, setCaptchaReload] = useState(false);
  const [isSubmitButtonDisabled, setIsSubmitButtonDisabled] = useState(false);

  const { setIsLogInDialogOpen } = useContext(UserContext);
  const passwordRegExp = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/g;

  const errorFound = (field: string): ErrorInterface | undefined => {
    if (errors) {
      let result: ErrorInterface | undefined;
      Object
        .entries(errors)
        .map(([key, value]) => {
          if (["name", "email", "password"].includes(field)) {
            result = errors.inputs.find((el: ErrorInterface): boolean => el.field === field)
          } else if (key === field) {
            result = value;
          }
        });
      return result;
    };
  };

  const resetErrors = (field: string): void => {
    errors &&
      Object
        .keys(errors)
        .map(key => {
          if (["name", "email", "password"].includes(field)) {
            setErrors((prev: ErrorsInterface | null): ErrorsInterface => {
              return {
                ...prev, inputs: prev?.inputs.filter(el => el.field !== field) || []
              };
            });
          } else if (key === field) {
            delete errors[key as keyof ErrorsInterface];
          };
        });
  };

  const onSubmit = (e: FormEvent): void => {
    e.preventDefault();
    const errorsData: ErrorsInterface = {
      inputs: [],
    };
    let errorText: string;
    Object.entries(inputs).map(([key, value]) => {
      if (!value) {
        switch (key) {
          case "name": errorText = "The Name Field is empty."; break;
          case "email": errorText = "The Email Field is empty."; break;
          case "password": errorText = "The Password Field is empty."; break;
        };
        errorsData.inputs.push({ field: key, errorText: errorText });
      };
    });
    if (!passwordRegExp.test(inputs.password)) {
      errorsData.inputs.push({ field: "password", errorText: "The password is not valid." })
    }
    if (inputs.password !== reenteredPassword) {
      errorsData.reenteredPassword = {
        field: "reenteredPassword",
        errorText: "The Passwords do not match.",
      };
    };
    if (captchaEntered === "") {
      errorsData.captcha = {
        field: "captcha",
        errorText: "The Captcha Field is empty.",
      }
    } else if (captchaEntered !== captchaCreated) {
      errorsData.captcha = {
        field: "captcha",
        errorText: "Incorrect value. Try again.",
      };
      setCaptchaReload(!captchaReload);
    };
    setErrors(errorsData);
    if (!errorsData.inputs.length && !errorsData.reenteredPassword && !errorsData.captcha) {
      setLoading(true);
      axios
        .post("/api/sign-up", {
          name: inputs.name,
          email: inputs.email,
          password: inputs.password,
        })
        .then(() => setLoading(false))
        .catch(error => {
          setSignUpError(error.response.data);
          setIsSubmitButtonDisabled(true);
          setLoading(false);
        })
    };
  };

  return (
    <form
      onSubmit={onSubmit}
      encType="multipart/form-data"
      className="sign-up-form"
    >
      <TextField
        error={!!errorFound("name")}
        type="text"
        size="small"
        variant="outlined"
        value={inputs.name}
        autoComplete="off"
        placeholder="Enter your Name..."
        helperText={errorFound("name")?.errorText || ""}
        onChange={e => {
          resetErrors("name");
          setInputs({ ...inputs, name: e.target.value });
        }}
        className="form-row"
      />
      <TextField
        error={!!errorFound("email")}
        type="email"
        size="small"
        variant="outlined"
        value={inputs.email}
        autoComplete="off"
        placeholder="Enter your Email..."
        helperText={errorFound("email")?.errorText || ""}
        onChange={e => {
          resetErrors("email");
          setInputs({ ...inputs, email: e.target.value });
          if (signUpError) {
            setIsSubmitButtonDisabled(false);
            setSignUpError("");
          }
        }}
        className="form-row"
      />
      <Tooltip title="A password must contain minimum 8 characters, at least one letter and one number.">
        <TextField
          error={!!errorFound("password")}
          type="password"
          size="small"
          variant="outlined"
          value={inputs.password}
          autoComplete="off"
          placeholder="Create a Password..."
          helperText={errorFound("password")?.errorText || ""}
          onChange={e => {
            resetErrors("password");
            setInputs({ ...inputs, password: e.target.value });
          }}
          className="form-row"
        />
      </Tooltip>
      <TextField
        type="password"
        size="small"
        variant="outlined"
        value={reenteredPassword}
        autoComplete="off"
        placeholder="Confirm the Password..."
        onChange={e => {
          resetErrors("reenteredPassword");
          setReenteredPassword(e.target.value);
        }}
        error={!!errorFound("reenteredPassword")}
        helperText={errorFound("reenteredPassword")?.errorText || ""}
        className="form-row"
      />
      <Captcha
        captchaEntered={captchaEntered}
        setCaptchaEntered={setCaptchaEntered}
        setCaptchaCreated={setCaptchaCreated}
        errorFound={errorFound}
        resetErrors={resetErrors}
        captchaReload={captchaReload}
      />
      {signUpError &&
        <Alert
          severity="error"
          className="alert"
        >
          {signUpError}
        </Alert>
      }
      <Button
        type="submit"
        variant="contained"
        disabled={isSubmitButtonDisabled}
      >
        Continue
      </Button>
      <p className="prompt">
        Already have an Account?&nbsp;
        <Link
          onClick={() => setIsLogInDialogOpen(true)}
          underline="hover"
        >
          Log in.
        </Link>
      </p>
    </form >
  );
};

export default SignUpForm;