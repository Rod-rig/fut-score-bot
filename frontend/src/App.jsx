import { Link, Outlet } from "react-router-dom";

const App = () => {
  return (
    <>
      <div>
        <Link to="/">Головна</Link>
      </div>
      <Outlet />
    </>
  );
};

export default App;
