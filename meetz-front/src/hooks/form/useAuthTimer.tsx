import { useState, useEffect, useCallback } from 'react';

interface UseTimer {
    time: number;
    isActive: boolean;
    setTime: React.Dispatch<React.SetStateAction<number>>;
    setIsActive: React.Dispatch<React.SetStateAction<boolean>>;
    startTimer: () => void;
    stopTimer: () => void;
}

const useAuthTimer = (initialTime: number = 120): UseTimer => {
    const [time, setTime] = useState<number>(initialTime);
    const [isActive, setIsActive] = useState<boolean>(false);

    useEffect(() => {
        let timer: NodeJS.Timeout;
        if (isActive && time > 0) {
            timer = setInterval(() => {
                setTime(prevTime => prevTime - 1);
            }, 1000);
        } else if (time === 0) {
            setIsActive(false);
        }

        return () => clearInterval(timer);
    }, [isActive, time]);

    const startTimer = useCallback(() => {
        setIsActive(true);
    }, []);

    const stopTimer = useCallback(() => {
        setIsActive(false);
    }, []);

    return {
        time,
        isActive,
        setTime,
        setIsActive,
        startTimer,
        stopTimer,
    };
};

export default useAuthTimer;
