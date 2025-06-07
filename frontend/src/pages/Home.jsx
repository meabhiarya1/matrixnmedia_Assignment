import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPublicPosts } from "../features/posts/postsSlice";
import PostCard from "../components/PostCard";
import { Link } from "react-router-dom";

export default function Home() {
  const dispatch = useDispatch();
  const { publicPosts, loading, error, token } = useSelector(
    (state) => state.posts
  );

  console.log(token);

  useEffect(() => {
    dispatch(fetchPublicPosts());
  }, [dispatch]);

  return (
    <div className="container mx-auto p-4">
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Public Blog Posts</h1>
        {!token   && (
          <div>
            <Link to="/login" className="mr-4 text-blue-600 hover:underline">
              Login
            </Link>
            <Link to="/register" className="text-blue-600 hover:underline">
              Register
            </Link>
          </div>
        )}
      </header>
      {loading && <p>Loading posts...</p>}
      {error && <p className="text-red-600">{error}</p>}
      {publicPosts.length === 0 && <p>No posts available.</p>}
      {publicPosts.map((post) => (
        <PostCard key={post._id} post={post} />
      ))}
    </div>
  );
}
