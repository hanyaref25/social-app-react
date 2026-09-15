import { Outlet } from "react-router";
import Sidebar from "../Sidebar/Sidebar";
export default function Layout() {
  return (
    <>
      <div className="">
        <Sidebar />
        <main className="ml-72">
          <Outlet />
        </main>
      </div>
    </>
  );
}
