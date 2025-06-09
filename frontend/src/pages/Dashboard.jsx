import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createPost, fetchUserPosts } from "../features/posts/postsSlice";
import CreatePostModal from "../components/CreatePostModal";
import PostCard from "../components/PostCard";

export default function Dashboard() {
  const [openCreateModal, setOpenCreateModal] = useState(false);
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
        <button
          className="text-2xl font-bold mb-4 cursor-pointer bg-amber-200 "
          onClick={() => setOpenCreateModal(true)}
        >
          Create Post
        </button>
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
