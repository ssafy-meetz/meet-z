import { useState } from "react";

const usePhoneValidation = () => {
    const [phone, setPhone] = useState("");
    const [isValidPhone, setIsValidPhone] = useState(false);

    const phoneRegex = /^01\d{8,9}$/;

    const validatePhone = (phone: string) => {
        return phoneRegex.test(phone.replace(/-/g, ''));
    }

    const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newPhone = e.target.value;
        setPhone(newPhone);
        setIsValidPhone(validatePhone(newPhone));
    }

    return {
        phone, isValidPhone, handlePhoneChange
    }
}

export default usePhoneValidation