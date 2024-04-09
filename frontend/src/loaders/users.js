const fetchUsers = async () => {
  return fetch("/api/users");
};

export default fetchUsers;
