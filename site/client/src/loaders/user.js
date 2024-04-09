const fetchUser = async ({ params }) => {
  return fetch(`/api/user/${params.userId}`);
};

export default fetchUser;
