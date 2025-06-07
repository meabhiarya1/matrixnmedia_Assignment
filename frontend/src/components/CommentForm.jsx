import React, { useState } from "react";

export default function CommentForm({ onSubmit }) {
  const [name, setName] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ name, content });
    setName("");
    setContent("");
  };

  return (
    <form onSubmit={handleSubmit} className="border-t pt-4 mt-4">
      <h4 className="font-semibold mb-2">Add Comment</h4>
      <input
        required
        placeholder="Your name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="border p-2 w-full mb-2"
      />
      <textarea
        required
        placeholder="Comment"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="border p-2 w-full mb-2"
      />
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Submit
      </button>
    </form>
  );
}
