import { useState } from "react";
import { useLoaderData, useNavigation, Form, Link } from "react-router-dom";
import Divider from "@components/Divider";
import Flag from "@components/Flag";

const Predict = () => {
  const events = useLoaderData();
  const navigation = useNavigation();
  const [hasValue, setHasValue] = useState(false);

  return navigation.state === "loading" ? (
    <div>Завантаження...</div>
  ) : events.length ? (
    <Form
      method="post"
      onChange={() => setHasValue(true)}
      onSubmit={() => setHasValue(false)}
    >
      <Divider />
      <table>
        <tbody>
          {events.map((e) => {
            return (
              <tr key={e.id}>
                <td>
                  <Link to={`/event/${e.id}`}>{e.id}</Link>
                </td>
                <td>{new Date(e.startDate).toLocaleString()}</td>
                <td></td>
                <td>{e.tournament}</td>
                <td></td>
                <td>
                  <Flag name={e.flagHome} />
                </td>
                <td>{e.home}</td>
                <td>
                  <select name={e.id} defaultValue="">
                    <option disabled value="">
                      -- select an option --
                    </option>
                    <option value="0:0">0-0 = {e.odd.zeroZero} pts</option>
                    <option value="1:1">1-1 = {e.odd.oneOne} pts</option>
                    <option value="2:2">2-2 = {e.odd.twoTwo} pts</option>
                    <option value="1:0">1-0 = {e.odd.oneZero} pts</option>
                    <option value="2:0">2-0 = {e.odd.twoZero} pts</option>
                    <option value="3:0">3-0 = {e.odd.threeZero} pts</option>
                    <option value="2:1">2-1 = {e.odd.twoOne} pts</option>
                    <option value="3:1">3-1 = {e.odd.threeOne} pts</option>
                    <option value="3:2">3-2 = {e.odd.threeTwo} pts</option>
                    <option value="0:1">0-1 = {e.odd.zeroOne} pts</option>
                    <option value="0:2">0-2 = {e.odd.zeroTwo} pts</option>
                    <option value="0:3">0-3 = {e.odd.zeroThree} pts</option>
                    <option value="1:2">1-2 = {e.odd.oneTwo} pts</option>
                    <option value="1:3">1-3 = {e.odd.oneThree} pts</option>
                    <option value="2:3">2-3 = {e.odd.twoThree} pts</option>
                    <option value="Any Other">
                      Any other = {e.odd.anyOther} pts
                    </option>
                  </select>
                </td>
                <td>{e.away}</td>
                <td>
                  <Flag name={e.flagAway} />
                </td>
              </tr>
            );
          })}
          <tr>
            <td colSpan={5}>
              <button type="submit" disabled={!hasValue}>
                Send
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </Form>
  ) : (
    <div>
      <Divider />
      Predictions are not available now. Please come back later
    </div>
  );
};

export default Predict;
