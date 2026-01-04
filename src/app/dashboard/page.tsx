import { getUser } from "../auth/actions/auth";
import Dashboard from "./components/Dashboard";

async function dashboard() {
  const user = await getUser();

  return <Dashboard username={user?.username} />;
}

export default dashboard;
