export const getUserInitials = (firstName: string, lastName: string | null) => {
  const fn = firstName ?? "";
  const ln = lastName ?? "";

  if (fn && ln) {
    return `${fn[0]}${ln[0]}`.toUpperCase();
  }

  if (fn) {
    return fn.slice(0, 2).toUpperCase();
  }

  return "";
};
