import { useState, useEffect, useRef, FC } from "react";
import { TextField, IconButton } from "@mui/material";
import { CaptchaPropsInterface } from "../types";
import ReplayIcon from "@mui/icons-material/Replay";

const Captcha: FC<CaptchaPropsInterface> = ({
    captchaEntered,
    setCaptchaEntered,
    setCaptchaCreated,
    errorFound,
    resetErrors,
    captchaReload
}) => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const getCaptcha = (): void => {
        if (canvasRef.current) {
            setCaptchaEntered("");
            const pen = canvasRef.current.getContext("2d");
            let captcha = Math.random().toString(36).substring(2, 10);
            const maxLength = captcha.length;
            const index1 = Math.floor(Math.random() * maxLength);
            const index2 = Math.floor(Math.random() * (maxLength - 1));
            let captchaModified = (
                captcha.substring(0, index1 - 1) +
                captcha[index1].toUpperCase() +
                captcha.substring(index1 + 1, maxLength)
            ).substring(0, index2 - 1) +
                captcha[index2].toUpperCase() +
                captcha.substring(index2 + 1, maxLength);
            setCaptchaCreated(captchaModified);
            captcha = captchaModified.split("").join(" ");
            if (pen) {
                pen.font = "24px Georgia";
                pen.fillStyle = "grey";
                pen.fillRect(0, 0, 180, 40);
                pen.fillStyle = "orange";
                pen.fillText(captcha, 15, 30);
            };
        };
    };

    useEffect(() => {
        getCaptcha();
    }, [captchaReload]);

    return (
        <div className="captcha-container">
            <div className="half-width-field">
                <canvas
                    ref={canvasRef}
                    height={40}
                    width={180}
                >
                </canvas>
                <IconButton
                    size="small"
                    onClick={getCaptcha}
                >
                    <ReplayIcon />
                </IconButton>
            </div>
            <div className="half-width-field">
                <TextField
                    autoComplete="off"
                    type="text"
                    size="small"
                    error={!!errorFound("captcha")}
                    onChange={e => {
                        resetErrors("captcha");
                        setCaptchaEntered(e.target.value)
                    }}
                    value={captchaEntered}
                    placeholder="Enter the Captcha..."
                    helperText={errorFound("captcha")?.errorText}
                />
            </div>
        </div>
    );
};

export default Captcha;