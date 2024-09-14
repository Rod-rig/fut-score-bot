const sendPrediction = async ({ request }) => {
  return Object.fromEntries(await request.formData());
};

export default sendPrediction;
