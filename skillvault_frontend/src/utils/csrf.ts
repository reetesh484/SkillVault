export const getCSRFToken = () => {
  const name = "csrftoken=";
  const cookies = document.cookie.split("; ");
  for (let cookie of cookies) {
    cookie = cookie.trim();
    if (cookie.startsWith(name)) {
      return cookie.substring(name.length);
    }
  }
  return null;
};
