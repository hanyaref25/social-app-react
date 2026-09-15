import { Bell, CircleUser, House, LogOut, Settings, SquarePen, Zap } from "lucide-react";
import { NavLink } from "react-router";

import { useContext, useState } from "react";
import { UserContext } from "../../context/user.context";
import CreatePostModal from "../createPostModal/createPostModal";

export default function Sidebar() {
    const { userInfo, token } = useContext(UserContext);
    const [isCreatePostOpen, setIsCreatePostOpen] = useState(false);

    function logout() {
        localStorage.removeItem("token" , "userInfo");
        window.location.href = "/login";
    }


  return (
    <>
      <aside className="bg-slate-900 fixed top-0 left-0 bottom-0 w-64 flex flex-col">
        {/* Logo */}
        <div className="flex items-center gap-2.5 px-5 pt-5 pb-4">
          <div className="h-9 w-9 rounded-lg bg-white flex items-center justify-center shrink-0">
            <Zap size={18} strokeWidth={2} className="text-slate-900 fill-slate-900" />
          </div>
          <div>
            <p className="font-semibold text-white leading-tight">Pulse</p>
            <p className="text-xs text-slate-400 leading-tight">social network</p>
          </div>
        </div>

        {/* Create post */}
        <div className="px-4">
          <button
            onClick={() => setIsCreatePostOpen(true)}
            className="w-full flex items-center justify-center gap-2 py-2.5 rounded-full bg-white text-sm font-medium text-slate-900 hover:bg-slate-100 transition-colors"
          >
            <SquarePen size={16} strokeWidth={2} />
            Create post
          </button>
        </div>

        {/* Menu */}
        <div className="px-4 mt-6">
          <p className="px-3 text-xs font-medium text-slate-500 tracking-wide mb-2">MENU</p>
          <ul className="space-y-1">
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `flex items-center gap-2.5 py-2 px-3 rounded-lg text-sm font-medium border-l-2 transition-colors ${
                    isActive
                      ? "bg-slate-800 text-white border-white"
                      : "text-slate-400 border-transparent hover:bg-slate-800/60 hover:text-slate-200"
                  }`
                }
              >
                <House size={17} strokeWidth={2} />
                <span>Home</span>
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/notification"
                className={({ isActive }) =>
                  `flex items-center justify-between py-2 px-3 rounded-lg text-sm font-medium border-l-2 transition-colors ${
                    isActive
                      ? "bg-slate-800 text-white border-white"
                      : "text-slate-400 border-transparent hover:bg-slate-800/60 hover:text-slate-200"
                  }`
                }
              >
                <span className="flex items-center gap-2.5">
                  <Bell size={17} strokeWidth={2} />
                  <span>Notifications</span>
                </span>
                <span className="h-5 w-5 flex items-center justify-center rounded-full bg-teal-600 text-white text-xs">
                  3
                </span>
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/profile"
                className={({ isActive }) =>
                  `flex items-center gap-2.5 py-2 px-3 rounded-lg text-sm font-medium border-l-2 transition-colors ${
                    isActive
                      ? "bg-slate-800 text-white border-white"
                      : "text-slate-400 border-transparent hover:bg-slate-800/60 hover:text-slate-200"
                  }`
                }
              >
                <CircleUser size={17} strokeWidth={2} />
                <span>Profile</span>
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/settings"
                className={({ isActive }) =>
                  `flex items-center gap-2.5 py-2 px-3 rounded-lg text-sm font-medium border-l-2 transition-colors ${
                    isActive
                      ? "bg-slate-800 text-white border-white"
                      : "text-slate-400 border-transparent hover:bg-slate-800/60 hover:text-slate-200"
                  }`
                }
              >
                <Settings size={17} strokeWidth={2} />
                <span>Settings</span>
              </NavLink>
            </li>
          </ul>
        </div>

        {/* User card - pinned to bottom */}
        <div className="mt-auto border-t border-slate-800 px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="relative shrink-0">
              <img
                src="https://pub-3cba56bacf9f4965bbb0989e07dada12.r2.dev/linkedPosts/default-profile.png"
                alt="rana"
                className="h-9 w-9 rounded-full object-cover"
              />
              <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-green-500 ring-2 ring-slate-900" />
            </div>
            <div className="min-w-0">
              <p className="text-sm font-medium text-white truncate">{userInfo?.name}</p>
              <p className="text-xs text-slate-400 truncate">@{userInfo?.username}</p>
            </div>
          </div>
          <button className="p-1.5 rounded-lg text-slate-400 hover:bg-slate-800 hover:text-white transition-colors shrink-0" onClick={logout}>
            <LogOut size={16} strokeWidth={2} />
          </button>
        </div>
      </aside>

      <CreatePostModal
        isOpen={isCreatePostOpen}
        onClose={() => setIsCreatePostOpen(false)}
        userInfo={userInfo}
      />
    </>
  );
}