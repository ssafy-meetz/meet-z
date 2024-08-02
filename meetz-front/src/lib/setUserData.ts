const setUserData = (role: string, expireAt: string, accessToken: string) => {
  window.sessionStorage.setItem('rl', role);
  window.sessionStorage.setItem('ea', expireAt);
  window.sessionStorage.setItem('atk', accessToken);
}

export default setUserData;