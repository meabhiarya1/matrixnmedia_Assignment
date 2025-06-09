import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createPost, fetchUserPosts } from "../features/posts/postsSlice";
import CreatePostModal from "../components/CreatePostModal";
import PostCard from "../components/PostCard";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    userPosts: posts,
    loading,
    error,
  } = useSelector((state) => state.posts);

  useEffect(() => {
    dispatch(fetchUserPosts());
  }, [dispatch]);

  const handleSave = (postData) => {
    dispatch(createPost(postData));
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-6">
        {" "}
        <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
        {/* <button
          className="text-2xl font-bold mb-4 cursor-pointer bg-amber-200 "
          onClick={() => setOpenCreateModal(true)}
        >
          Create Post
        </button> */}
        <div className="flex space-x-4">
          <button
            onClick={() => setOpenCreateModal(true)}
            className="cursor-pointer bg-gradient-to-b from-indigo-500 to-indigo-600 shadow-[0px_4px_32px_0_rgba(99,102,241,.70)] px-6 py-3 rounded-xl border-[1px] border-slate-500 text-white font-medium group"
          >
            <div className="relative overflow-hidden">
              <p className="group-hover:-translate-y-7 duration-[1.125s] ease-[cubic-bezier(0.19,1,0.22,1)]">
                Create Post
              </p>
              <p className="absolute top-7 left-0 group-hover:top-0 duration-[1.125s] ease-[cubic-bezier(0.19,1,0.22,1)]">
                Create Post
              </p>
            </div>
          </button>
          <button
            onClick={() => {
              localStorage.removeItem("token");
              navigate("/login");
            }}
            className="cursor-pointer bg-gradient-to-b from-red-500 to-red-900 shadow-[0px_4px_32px_0_rgba(99,102,241,.70)] px-6 py-3 rounded-xl border-[1px] border-slate-100 text-white font-medium group"
          >
            <div className="relative overflow-hidden">
              <p className="group-hover:-translate-y-7 duration-[1.125s] ease-[cubic-bezier(0.19,1,0.22,1)]">
                Logout
              </p>
              <p className="absolute top-7 left-0 group-hover:top-0 duration-[1.125s] ease-[cubic-bezier(0.19,1,0.22,1)]">
                Logout
              </p>
            </div>
          </button>
        </div>
      </div>
      {loading && <p>Loading posts...</p>}
      {error && <p className="text-red-600">{error}</p>}
      <div className="space-y-4">
        {posts?.map((post) => (
          <PostCard key={post._id} post={post} />
        ))}
        {posts.length === 0 && <p>No posts available.</p>}
      </div>

      {openCreateModal && (
        <CreatePostModal
          onSave={(postData) => handleSave(postData)}
          onClose={() => setOpenCreateModal(false)}
        />
      )}
    </div>
  );
}
