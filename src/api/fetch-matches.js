import "dotenv/config";

export const fetchMatches = async () => {
  try {
    const response = await fetch(`${process.env.ROOT_URL}/api/events-to-bet`);
    return await response.json();
  } catch (error) {
    console.log(error);
  }
};
