import React, { useState } from 'react'

/**
 * 비밀번호 유효성을 검증하는 커스텀 훅
 */
const usePasswordValidation = () => {
  const [password, setPassword] = useState("");
  const [isValidPassword, setIsValidPassword] = useState(false);

  const passwordRegex = /^(?=.*[A-Za-z])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;

  const validatePassword = (password: string) => {
    return passwordRegex.test(password);
  }

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    const valid = validatePassword(newPassword);
    setIsValidPassword(valid);
  }

  return {
    password, isValidPassword, setPassword, handlePasswordChange
  }
}

export default usePasswordValidation
