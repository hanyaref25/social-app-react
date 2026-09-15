import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/user.context";
import axios from "axios";
import PostCard from "../../components/postCard/postCard";

export default function Home() {
  const { token, userInfo } = useContext(UserContext);
  const [posts, setPosts] = useState(null);

  async function getHomeFeed() {
    const options = {
      url: "https://route-posts.routemisr.com/posts/",
      method: "GET",
      headers: { authorization: `Bearer ${token}` },
    };
    const { data } = await axios.request(options);
    setPosts(data.data.posts);
  }

  function handlePostDeleted(deletedId) {
    setPosts((prev) => prev.filter((post) => post._id !== deletedId));
  }

  function handlePostUpdated(updatedPost) {
    setPosts((prev) =>
      prev.map((post) => (post._id === updatedPost._id ? updatedPost : post))
    );
  }

  useEffect(() => {
    getHomeFeed();
  }, []);

  return (
    <div className="mx-auto w-fit py-10">
      {posts ? (
        <div className="space-y-6">
          {posts.map((post) => (
            <PostCard
              key={post._id}
              postDetails={post}
              currentUserId={userInfo?._id}
              onPostDeleted={handlePostDeleted}
              onPostUpdated={handlePostUpdated}
            />
          ))}
        </div>
      ) : (
        <h2>Loading...</h2>
      )}
    </div>
  );
}