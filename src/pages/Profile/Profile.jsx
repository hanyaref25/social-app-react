// src/pages/Profile/Profile.jsx
import {
  Mail,
  Users,
  Cake,
  Calendar,
  Link2,
  Grid3x3,
  Bookmark,
  Info,
  Share2,
} from "lucide-react";
import { useContext } from "react";
import { UserContext } from "../../context/user.context";

export default function Profile() {
  const { userInfo } = useContext(UserContext);

  if (!userInfo) {
    return;
  }

  return (
    <div className="w-full max-w-5xl mx-auto py-10 px-4">
      {/* Cover + avatar + name */}
      <div className="rounded-2xl border border-stone-200 bg-white overflow-hidden">
        <div className="h-40 bg-gradient-to-br from-teal-700 to-teal-900" />
        <div className="px-6">
          <div className="flex items-end justify-between -mt-12">
            <img
              src={userInfo.photo}
              alt="hany"
              className="h-24 w-24 rounded-full object-cover ring-4 ring-white"
            />
            <button className="mb-2 px-4 py-2 rounded-lg border border-stone-200 text-sm font-medium text-stone-700 hover:bg-stone-50 transition-colors">
              Edit profile
            </button>
          </div>

          <div className="mt-3">
            <h1 className="text-xl font-semibold text-stone-900">
              {userInfo.name}
            </h1>
            <span className="text-stone-400 text-sm">@{userInfo.username}</span>
          </div>

          {/* Meta row */}
          <div className="flex flex-wrap items-center gap-4 mt-3 text-xs text-stone-400">
            <div className="flex items-center gap-1.5">
              <Mail size={13} strokeWidth={2} />
              <span>{userInfo.email}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Users size={13} strokeWidth={2} />
              <span>{userInfo.gender}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Cake size={13} strokeWidth={2} />
              <span>
                Born {new Date(userInfo.dateOfBirth).toLocaleDateString}
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <Calendar size={13} strokeWidth={2} />
              <span>
                Joined {new Date(userInfo.createdAt).toLocaleDateString}
              </span>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-3 mt-5 pb-6">
            <div className="rounded-xl border border-stone-200 py-4 text-center">
              <p className="text-xl font-semibold text-stone-900">
                {userInfo.followersCount}
              </p>
              <p className="text-xs text-stone-400 mt-0.5">Followers</p>
            </div>
            <div className="rounded-xl border border-stone-200 py-4 text-center">
              <p className="text-xl font-semibold text-stone-900">
                {userInfo.followingCount}
              </p>
              <p className="text-xs text-stone-400 mt-0.5">Following</p>
            </div>
            <div className="rounded-xl border border-stone-200 py-4 text-center">
              <p className="text-xl font-semibold text-stone-900">
                {userInfo.bookmarksCount}
              </p>
              <p className="text-xs text-stone-400 mt-0.5">Bookmarks</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-6 mt-6 border-b border-stone-200">
        <button className="flex items-center gap-2 px-1 pb-3 text-sm font-medium text-teal-700 border-b-2 border-teal-700">
          <Grid3x3 size={15} strokeWidth={2} />
          Posts
        </button>
        <button className="flex items-center gap-2 px-1 pb-3 text-sm font-medium text-stone-400 hover:text-stone-600 transition-colors">
          <Bookmark size={15} strokeWidth={2} />
          Bookmarks
          <span className="text-xs bg-stone-100 text-stone-500 rounded-full px-1.5 py-0.5">
            0
          </span>
        </button>
        <button className="flex items-center gap-2 px-1 pb-3 text-sm font-medium text-stone-400 hover:text-stone-600 transition-colors">
          <Info size={15} strokeWidth={2} />
          About
        </button>
      </div>

      {/* Content grid */}
      <div className="grid grid-cols-1 md:grid-cols-[320px_1fr] gap-4 mt-4">
        {/* Left column */}
        <div className="space-y-4">
          {/* Intro card */}
          <div className="rounded-2xl border border-stone-200 bg-white p-5">
            <h3 className="font-semibold text-stone-900 mb-4">Intro</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-stone-400">Username</span>
                <span className="text-stone-700">@hanyaref33222</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-stone-400">Email</span>
                <span className="text-stone-700">hanyaref2525@gmail.com</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-stone-400">Gender</span>
                <span className="text-stone-700">Male</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-stone-400">Birthday</span>
                <span className="text-stone-700">Sep 2, 2026</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-stone-400">Member since</span>
                <span className="text-stone-700">Sep 4, 2026</span>
              </div>
            </div>
            <button className="flex items-center justify-center gap-2 w-full mt-5 py-2 rounded-lg border border-stone-200 text-sm text-stone-600 hover:bg-stone-50 transition-colors">
              <Link2 size={14} strokeWidth={2} />
              Copy profile link
            </button>
          </div>

          {/* Followers card */}
          <div className="rounded-2xl border border-stone-200 bg-white p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-stone-900">Followers</h3>
              <span className="text-xs text-stone-400">0</span>
            </div>
            <p className="text-sm text-stone-400">No followers yet.</p>
          </div>

          {/* Following card */}
          <div className="rounded-2xl border border-stone-200 bg-white p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-stone-900">Following</h3>
              <span className="text-xs text-stone-400">1</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <img
                  src="https://pub-3cba56bacf9f4965bbb0989e07dada12.r2.dev/linkedPosts/default-profile.png"
                  alt="following user"
                  className="h-9 w-9 rounded-full object-cover"
                />
                <div>
                  <p className="text-sm font-medium text-stone-800">
                    Route Academy
                  </p>
                  <p className="text-xs text-stone-400">@route</p>
                </div>
              </div>
              <button className="px-3 py-1.5 rounded-lg bg-stone-100 text-xs font-medium text-stone-600 hover:bg-stone-200 transition-colors">
                Following
              </button>
            </div>
          </div>
        </div>

        {/* Right column */}
        <div className="space-y-4">
          {/* Composer */}
          <div className="rounded-2xl border border-stone-200 bg-white p-4">
            <div className="flex items-center gap-3">
              <img
                src="https://pub-3cba56bacf9f4965bbb0989e07dada12.r2.dev/linkedPosts/default-profile.png"
                alt="hany"
                className="h-9 w-9 rounded-full object-cover"
              />
              <input
                type="text"
                placeholder="What's on your mind, hany?"
                className="flex-1 bg-stone-50 rounded-full px-4 py-2.5 text-sm text-stone-700 placeholder:text-stone-400 outline-none border border-transparent focus-within:border-teal-700/20"
              />
              <button className="h-9 w-9 flex items-center justify-center rounded-full bg-teal-700 text-white hover:bg-teal-800 transition-colors shrink-0">
                <Share2 size={15} strokeWidth={2} />
              </button>
            </div>
          </div>

          {/* Empty state */}
          <div className="rounded-2xl border border-stone-200 bg-white flex flex-col items-center justify-center text-center py-16 px-6">
            <div className="h-12 w-12 rounded-xl bg-stone-100 flex items-center justify-center mb-4">
              <Grid3x3 size={20} strokeWidth={2} className="text-stone-400" />
            </div>
            <h3 className="font-semibold text-stone-900">No posts yet</h3>
            <p className="text-sm text-stone-400 mt-1">
              When hany shares something, it will show up right here.
            </p>
            <button className="mt-5 px-4 py-2 rounded-lg bg-stone-900 text-white text-sm font-medium hover:bg-stone-800 transition-colors">
              Create your first post
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
