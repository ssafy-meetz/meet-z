const fetchUserData = () => {
  const role = window.sessionStorage.getItem('rl');
  const expireAt = window.sessionStorage.getItem('ea');
  const accessToken = window.sessionStorage.getItem('atk');

  return { role, expireAt, accessToken };
}

export default fetchUserData