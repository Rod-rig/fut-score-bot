const sendPrediction = async ({ request, params }) => {
  const data = Object.fromEntries(await request.formData());

  if (Object.keys(data).length) {
    await fetch("/api/prediction-batch", {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify({
        userId: params.userId,
        events: data,
      }),
    });
  }

  return null;
};

export default sendPrediction;
