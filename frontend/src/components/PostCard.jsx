import React from "react";
import { Link } from "react-router-dom";

export default function PostCard({ post, onEdit, onDelete }) {
  return (
    <div className="border p-4 rounded shadow mb-4">
      <h3 className="font-semibold text-xl">{post.title}</h3>
      <p className="text-gray-600">By: {post.author?.name || "Unknown"}</p>
      <div className="mt-2 flex gap-2">
        <Link
          to={`/posts/${post._id}`}
          className="text-blue-600 hover:underline"
        >
          View Details
        </Link>
        {onEdit && (
          <button
            onClick={() => onEdit(post)}
            className="text-green-600 hover:underline"
          >
            Edit
          </button>
        )}
        {onDelete && (
          <button
            onClick={() => onDelete(post._id)}
            className="text-red-600 hover:underline"
          >
            Delete
          </button>
        )}
      </div>
    </div>
  );
}
