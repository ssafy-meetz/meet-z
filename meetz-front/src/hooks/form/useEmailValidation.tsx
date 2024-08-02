import { useState } from "react";

/**
 * 이메일 유효성을 검증하는 커스텀 훅
 */
const useEmailValidation = () => {
  const [email, setEmail] = useState("");
  const [isValidEmail, setIsValidEmail] = useState(false);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const validateEamil = (email: string) => {
    return emailRegex.test(email);
  }

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newEmail = e.target.value;
    setEmail(newEmail);
    setIsValidEmail(validateEamil(newEmail));
  }

  return {
    email, isValidEmail, handleEmailChange
  }
}

export default useEmailValidation