import { Link, useLoaderData, useNavigation } from "react-router-dom";
import Flag from "@components/Flag";
import Divider from "@components/Divider";
import { getResult, calcBalance } from "@/pages/User/utils";
import { odds } from "@/constants/odds";

const Event = () => {
  const event = useLoaderData();
  const navigation = useNavigation();
  const isFinished = Boolean(event.score);

  return navigation.state === "loading" ? (
    <div>Завантаження...</div>
  ) : (
    <>
      <h1>
        <Flag name={event.flagHome} size={70} /> {event.home}{" "}
        {isFinished ? event.score : "-"} {event.away}{" "}
        <Flag name={event.flagAway} size={70} />
      </h1>
      <Divider />
      <div>ID: {event.id}</div>
      <div>Status: {event.status}</div>
      <div>Country: {event.country}</div>
      <div>Start at: {new Date(event.startDate).toLocaleString()}</div>
      <div>Tournament: {event.tournament}</div>
      <div>Number of predictions: {event.predictions.length}</div>
      <div>Odds:</div>
      <div>
        <table>
          <tbody>
            {Object.keys(odds).map((key) => (
              <tr key={key}>
                <td>
                  <b>{odds[key]}</b>
                </td>
                <td></td>
                <td>{event.odd[key]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Divider />
      <h2>Predictions</h2>
      <table>
        <tbody>
          {event.predictions.map((p) => {
            return (
              <tr key={p.id}>
                <td>{new Date(p.updatedAt).toLocaleString()}</td>
                <td></td>
                <td>
                  <Link to={`/users/${p.userId}`}>
                    {p.user.username ? p.user.username : p.user.firstName}
                  </Link>
                </td>
                <td>{p.value}</td>
                <td>
                  {isFinished
                    ? getResult(event.score) === getResult(p.value)
                      ? "✅"
                      : "❌"
                    : ""}
                </td>
                <td>
                  {isFinished ? calcBalance({ ...p, event }, 0, 100) : ""}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export default Event;
