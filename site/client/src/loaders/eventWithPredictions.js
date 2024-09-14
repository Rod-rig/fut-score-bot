const fetchEventWithPredictions = async ({ params }) => {
  return fetch(`/api/event-predictions/${params.eventId}`);
};

export default fetchEventWithPredictions;
