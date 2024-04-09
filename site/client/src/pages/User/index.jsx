import { useEffect, useState } from "react";
import { useLoaderData, useNavigation } from "react-router-dom";
import Loader from "@components/Loader";
import Divider from "@components/Divider";
import {
  calcBalance,
  filterNullScore,
  getFlag,
  isAnyOther,
  isAnyOtherScore,
  isCorrect1X2,
} from "@/pages/User/utils";

const User = () => {
  const [roi, setRoi] = useState(0);
  const stake = 100;
  let balance = 0;
  const user = useLoaderData();
  const navigation = useNavigation();
  const predictions = user.predictions.filter(filterNullScore);
  const isCorrectPrediction = (p) =>
    p.value === p.event.score ||
    (isAnyOther(p.value) && isAnyOtherScore(p.event.score));
  const exactScoreCount = predictions.reduce(
    (acc, curr) => acc + (isCorrectPrediction(curr) ? 1 : 0),
    0,
  );
  const oneXTwoCount = predictions.reduce(
    (acc, curr) =>
      acc + (!isAnyOther(curr.value) && isCorrect1X2(curr) ? 1 : 0),
    0,
  );
  const notAnyOtherPredictions = user.predictions.filter(
    (p) => p.event.score && !isAnyOther(p.value),
  );

  useEffect(() => {
    setRoi(Math.round((balance / notAnyOtherPredictions.length) * 100) / 100);
  }, [balance, notAnyOtherPredictions.length]);

  return navigation.state === "loading" ? (
    <Loader />
  ) : user.predictions.length > 0 ? (
    <div>
      <h2>Hello #{user.username} 👋</h2>
      <Divider />
      <div>
        <div>
          Exact score count:{" "}
          <b>
            {exactScoreCount}/{predictions.length}
          </b>
        </div>
        <div>
          Exact score win percentage:{" "}
          <b>
            {Math.round((exactScoreCount / predictions.length) * 10000) / 100}%
          </b>
        </div>
        <div>
          1X2 count:{" "}
          <b>
            {oneXTwoCount}/{notAnyOtherPredictions.length}
          </b>
        </div>
        <div>
          1X2 win percentage:{" "}
          <b>
            {Math.round(
              (oneXTwoCount / notAnyOtherPredictions.length) * 10000,
            ) / 100}
            %
          </b>
        </div>
        <div>
          ROI: <b>{roi}%</b>
        </div>
      </div>
      <Divider />
      <table cellPadding="2">
        <thead>
          <tr>
            <th>#️⃣</th>
            <th>📅 Date</th>
            <th>🏆 Tournament</th>
            <th>🏠 Home</th>
            <th>Score</th>
            <th>✈️ Away</th>
            <th>🔮 Prediction</th>
            <th>Result</th>
            <th>1x2 result</th>
            <th>Balance (1X2)</th>
            <th>Income (1X2)</th>
          </tr>
        </thead>
        <tbody>
          {predictions.map((p, index) => {
            const newBalance = calcBalance(p, balance, stake);
            const income = newBalance - balance;
            balance = newBalance;
            return (
              <tr key={p.id}>
                <td>{index + 1}</td>
                <td>{new Date(p.event.startDate).toLocaleDateString()}</td>
                <td>{p.event.tournament}</td>
                <td>
                  <img
                    src={getFlag(p.event.flagHome)}
                    alt={p.event.flagHome}
                    width={20}
                  />{" "}
                  {p.event.home}
                </td>
                <td>{p.event.score}</td>
                <td>
                  {p.event.away}{" "}
                  <img
                    src={getFlag(p.event.flagAway)}
                    alt={p.event.flagAway}
                    width={20}
                  />
                </td>
                <td>{p.value}</td>
                <td>{isCorrectPrediction(p) ? "✅" : "❌"}</td>
                <td>
                  {isAnyOther(p.value) ? "🤷‍♂️" : isCorrect1X2(p) ? "✅" : "❌"}
                </td>
                <td>{balance}</td>
                <td>{income}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  ) : (
    <div>Відсутні прогнози поточного користувача</div>
  );
};

export default User;
