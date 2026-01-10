import { getUser } from "../actions/auth/auth";
import DashboardPage from "./components/Dashboard";

async function dashboard() {
  const user = await getUser();

  return <DashboardPage username={user?.username} />;
}

export default dashboard;
