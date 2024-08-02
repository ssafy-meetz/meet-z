import { useState, useEffect } from 'react';

const useMonth = () => {
  const [thisMonth, setThisMonth] = useState(new Date().getMonth() + 1);
  const [nextMonth, setNextMonth] = useState(thisMonth + 1);
  const [beforeMonth, setBeforeMonth] = useState(thisMonth - 1);

  useEffect(() => {
    setNextMonth(thisMonth === 12 ? 1 : thisMonth + 1);
    setBeforeMonth(thisMonth === 1 ? 12 : thisMonth - 1);
  }, [thisMonth]);

  return { thisMonth, nextMonth, beforeMonth };
};

export default useMonth;
