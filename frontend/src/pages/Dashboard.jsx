import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserPosts } from "../features/posts/postsSlice";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const dispatch = useDispatch();
  const {
    userPosts: posts,
    loading,
    error,
  } = useSelector((state) => state.posts);

  useEffect(() => {
    dispatch(fetchUserPosts());
  }, [dispatch]);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      {loading && <p>Loading posts...</p>}
      {error && <p className="text-red-600">{error}</p>}
      <div className="space-y-4">
        {posts?.map((post) => (
          <Link to={`/posts/${post._id}`} key={post._id}>
            <div className="p-4 border rounded shadow hover:bg-gray-100">
              <h2 className="font-semibold text-lg">{post.title}</h2>
              <p>{post.content.substring(0, 100)}...</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
