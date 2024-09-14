import { Link, Outlet } from "react-router-dom";

const App = () => {
  return (
    <>
      <div>
        <Link to="/">{`<Home>`}</Link>{" "}
        {/*<Link to="/predict/449442235">{`<Send prediction>`}</Link>*/}
      </div>
      <Outlet />
    </>
  );
};

export default App;
