export const fetchMatches = async () => {
  return fetch(`${process.env.ROOT_URL}/matches`)
    .then((response) => response.json())
    .catch((error) => {
      console.log("Couldn't fetch matches: ", error);
    });
};
