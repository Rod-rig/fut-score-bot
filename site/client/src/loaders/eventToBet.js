const fetchEventsToBet = async ({ params }) => {
  return fetch(`/api/events-to-bet/${params.userId}`);
};

export default fetchEventsToBet;
