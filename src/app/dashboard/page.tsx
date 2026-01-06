import { getUser } from "../auth/actions/auth";
import DashboardPage from "./components/Dashboard";

async function dashboard() {
  const user = await getUser();

  return <DashboardPage username={user?.username} />;
}

export default dashboard;
