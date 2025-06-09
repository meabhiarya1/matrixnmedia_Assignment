import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPublicPosts } from "../features/posts/postsSlice";
import PostCard from "../components/PostCard";
import { Link, useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { publicPosts, loading, error, token } = useSelector(
    (state) => state.posts
  );

  useEffect(() => {
    dispatch(fetchPublicPosts());
  }, [dispatch]);

  return (
    <div className="container mx-auto p-4 ">
      {/* <header className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Public Blog Posts</h1>
        {!token && (
          <div>
            <Link to="/login" className="mr-4 text-blue-600 hover:underline">
              Login
            </Link>
            <Link to="/register" className="text-blue-600 hover:underline">
              Register
            </Link>
          </div>
        )}
      </header> */}
      <header class="flex shadow-md py-4 px-4 sm:px-10 bg-white min-h-[70px] tracking-wide relative z-50">
        <div class="flex flex-wrap items-center justify-between gap-5 w-full">
          <span class="max-sm:hidden">
            <Link
              to="/"
              class="text-2xl font-bold text-blue-700 hover:text-blue-800 transition-colors"
            >
              Blogs
            </Link>
          </span>

          <div
            id="collapseMenu"
            class="max-lg:hidden lg:!block max-lg:before:fixed max-lg:before:bg-black max-lg:before:opacity-50 max-lg:before:inset-0 max-lg:before:z-50"
          >
            <ul class="lg:flex gap-x-4 max-lg:space-y-3 max-lg:fixed max-lg:bg-white max-lg:w-1/2 max-lg:min-w-[300px] max-lg:top-0 max-lg:left-0 max-lg:p-6 max-lg:h-full max-lg:shadow-md max-lg:overflow-auto z-50">
              <li class="max-lg:border-b max-lg:border-gray-300 max-lg:py-3 px-3">
                <Link
                  to="/"
                  class="hover:text-blue-700 text-blue-700 block font-medium text-[15px]"
                >
                  Home
                </Link>
              </li>

              <li class="max-lg:border-b max-lg:border-gray-300 max-lg:py-3 px-3">
                <Link
                  to="/dashboard"
                  class="hover:text-blue-700 text-slate-900 block font-medium text-[15px]"
                >
                  Blog
                </Link>
              </li>
              <li class="max-lg:border-b max-lg:border-gray-300 max-lg:py-3 px-3">
                <a
                  href="javascript:void(0)"
                  class="hover:text-blue-700 text-slate-900 block font-medium text-[15px]"
                >
                  About
                </a>
              </li>
              <li class="max-lg:border-b max-lg:border-gray-300 max-lg:py-3 px-3">
                <a
                  href="javascript:void(0)"
                  class="hover:text-blue-700 text-slate-900 block font-medium text-[15px]"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {!token && (
            <div class="flex max-lg:ml-auto space-x-4">
              <button
                className="px-4 py-2 text-sm rounded-full font-medium cursor-pointer tracking-wide text-slate-900 border border-gray-400 bg-transparent hover:bg-gray-50 transition-all"
                onClick={() => navigate("/login")}
              >
                Login
              </button>
              <button
                class="px-4 py-2 text-sm rounded-full font-medium cursor-pointer tracking-wide text-white border border-blue-600 bg-blue-600 hover:bg-blue-700 transition-all"
                onClick={() => navigate("/register")}
              >
                Sign up
              </button>
            </div>
          )}
        </div>
      </header>
      <div className="mt-6 flex mx-2 gap-4 flex-wrap justify-evenly my-4">
        {loading && <p>Loading posts...</p>}
        {/* {error && <p className="text-red-600">{error}</p>} */}
        {publicPosts.length === 0 && <p>No posts available.</p>}
        {publicPosts.map((post) => (
          <PostCard key={post._id} post={post} />
        ))}
      </div>
    </div>
  );
}
