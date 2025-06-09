import { useDispatch } from "react-redux";
import { deletePost, updatePost } from "../features/posts/postsSlice";
import { Link } from "react-router-dom";
import { useState } from "react";
import EditPostModal from "./EditPostModal"; // Assuming you have an EditPostModal component

export default function PostCard({ post }) {
  const [editModalOpen, setEditModalOpen] = useState(false);
  const dispatch = useDispatch();

  const handleDelete = (postId) => {
    dispatch(deletePost(postId));
  };

  const handleEdit = (postId, postData) => {
    dispatch(updatePost({ id: postId, postData }));
    setEditModalOpen(false);
  };

  return (
    <div className="border p-4 rounded shadow mb-4">
      {console.log(post)}
      <h3 className="font-semibold text-xl">{post.title}</h3>
      <p className="text-gray-600">By: {post.author?.name || "Unknown"}</p>
      <div className="mt-2 flex gap-2">
        <Link
          to={`/posts/${post._id}`}
          className="text-blue-600 hover:underline"
        >
          View Details
        </Link>
        {
          <button
            onClick={() => setEditModalOpen(true)}
            className="text-green-600 hover:underline"
          >
            Edit
          </button>
        }
        {
          <button
            onClick={() => handleDelete(post._id)}
            className="text-red-600 hover:underline"
          >
            Delete
          </button>
        }
      </div>
      {editModalOpen && (
        <EditPostModal
          isOpen={editModalOpen}
          onClose={() => setEditModalOpen(false)}
          post={post}
          onSave={(postData) => handleEdit(post._id, postData)}
        />
      )}
    </div>
  );
}
