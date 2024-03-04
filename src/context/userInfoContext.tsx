"use client";
import { createContext, useState } from "react";

interface UserContextType {
    userId: string;
    changeId: (userId: string) => void;
    email: string;
    changeEmail: (email: string) => void;
    profileUrl: string;
    changeProfileUrl: (profileUrl: string) => void;
    accountType: string;
    changeAccountType: (accountType: string) => void;
    phoneNumber: string;
    changePhoneNumber: (phoneNumber: string) => void;
}

export const UserContext = createContext<UserContextType>({
    userId: "",
    changeId: () => {},
    email: "",
    changeEmail: () => {},
    profileUrl: "",
    changeProfileUrl: () => {},
    accountType: "",
    changeAccountType: () => {},
    phoneNumber: "",
    changePhoneNumber: () => {},
});

export function UserInfoProvider({ children }: { children: React.ReactNode }) {
    const [userId, setUserId] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [profileUrl, setProfileUrl] = useState<string>("");
    const [accountType, setAccountType] = useState<string>("");
    const [phoneNumber, setPhoneNumber] = useState<string>("");

    const changeId = (userId: string) => {
        setUserId(userId);
    };

    const changeEmail = (email: string) => {
        setEmail(email);
    };

    const changeProfileUrl = (profileUrl: string) => {
        setProfileUrl(profileUrl);
    };

    const changeAccountType = (accountType: string) => {
        setAccountType(accountType);
    };

    const changePhoneNumber = (phoneNumber: string) => {
        setPhoneNumber(phoneNumber);
    };

    return (
        <UserContext.Provider value={{ userId, changeId, email, changeEmail, profileUrl, changeProfileUrl, accountType, changeAccountType, phoneNumber, changePhoneNumber, }} > {children} </UserContext.Provider>
    );

}