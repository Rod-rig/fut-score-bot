import { Link, useLoaderData, useNavigation } from "react-router-dom";

const UserList = () => {
  const users = useLoaderData();
  const navigation = useNavigation();
  const sortedUsers = users.sort((a, b) =>
    a.results.total < b.results.total ? 1 : -1,
  );
  return navigation.state === "loading" ? (
    <div>Завантаження...</div>
  ) : (
    <table>
      <thead>
        <tr>
          <th>#</th>
          <th>Username</th>
          <th>Total</th>
        </tr>
      </thead>
      <tbody>
        {sortedUsers.map((user, index) => (
          <tr key={user.id}>
            <td>{index + 1}</td>
            <td>
              <Link to={`/users/${user.id}`}>{user.username}</Link>
            </td>
            <td>{user.results.total}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default UserList;
