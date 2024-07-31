import React, { useState } from 'react'

/**
 * 비밀번호 유효성을 검증하는 커스텀 훅
 */
const usePasswordValidation = () => {
    const [password, setPassword] = useState("");
    const [isValidPassword, setIsValidPassword] = useState(false);

    const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*-?_]).{8,16}$/;

    const validatePassword = (password: string) => {
        return passwordRegex.test(password);
    }

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newPassword = e.target.value;
        console.log('Password:', newPassword); // 비밀번호 입력값을 확인합니다.
        setPassword(newPassword);
        const valid = validatePassword(newPassword);
        console.log('Is Valid:', valid); // 유효성 검사 결과를 확인합니다.
        setIsValidPassword(valid);
    }

    return {
        password, isValidPassword, handlePasswordChange
    }
}

export default usePasswordValidation
