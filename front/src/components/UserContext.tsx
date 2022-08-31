import { createContext, useEffect, useState, FC, ReactNode } from "react";
import axios from "axios";
import { UserContextInterface, UserType } from "../types";

const emptyFunction = (): void => { };
const defaultUserContext: UserContextInterface = {
    user: { _id: "", name: "", registrationDate: "", email: "", image: { data: "" } },
    setUser: emptyFunction,
    isLogInDialogOpen: false,
    setIsLogInDialogOpen: emptyFunction,
    setTokenValidation: emptyFunction,
    isAccountImageChanged: false,
    setIsAccountImageChanged: emptyFunction,
    isTokenValidationComplete: false,
}
export const UserContext = createContext<UserContextInterface>(defaultUserContext);
export const WithUserContext: FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<UserType | null>(null);
    const [tokenValidation, setTokenValidation] = useState(true);
    const [isLogInDialogOpen, setIsLogInDialogOpen] = useState(false);
    const [isAccountImageChanged, setIsAccountImageChanged] = useState(false);
    const [isTokenValidationComplete, setIsTokenValidationComplete] = useState(false);

    useEffect(() => {
        tokenValidation &&
            axios
                .get("/api/validate-token")
                .then(({ data }) => {
                    if (data.user) {
                        axios
                            .get(`/api/user/${data.user.id}`)
                            .then(res => {
                                setUser(res.data[0]);
                                setIsTokenValidationComplete(true);
                            })
                            .catch(error => console.error("The error occured: ", error.message));
                    } else {
                        setIsLogInDialogOpen(true);
                        setIsTokenValidationComplete(true);
                    }
                })
                .catch(error => console.error("The error occured: ", error.message));
    }, [tokenValidation, isAccountImageChanged]);

    const value = {
        user,
        setUser,
        isLogInDialogOpen,
        setIsLogInDialogOpen,
        setTokenValidation,
        isAccountImageChanged,
        setIsAccountImageChanged,
        isTokenValidationComplete,
    }
    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    )
};