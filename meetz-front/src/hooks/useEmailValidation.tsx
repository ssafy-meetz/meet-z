import { useState } from "react";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const useEmailValidation = () => {
    const [email, setEmail] = useState("");
    const [isValid, setIsValid] = useState(false);

    const validateEamil = (email: string) => {
        return emailRegex.test(email);
    }

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newEmail = e.target.value;
        setEmail(newEmail);
        setIsValid(validateEamil(newEmail));
    }

    return {
        email, isValid, handleEmailChange
    }
}

export default useEmailValidation