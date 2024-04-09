import "dotenv/config";

export const fetchHistory = async (id) => {
  try {
    const response = await fetch(
      `${process.env.ROOT_URL}/api/predictions/${id}`,
    );
    return await response.json();
  } catch (error) {
    console.log(error);
  }
};
