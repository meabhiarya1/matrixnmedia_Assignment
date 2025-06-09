import { useDispatch } from "react-redux";
import { deletePost, updatePost } from "../features/posts/postsSlice";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import EditPostModal from "./EditPostModal";

export default function PostCard({ post }) {
  const [editModalOpen, setEditModalOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleDelete = (postId) => {
    dispatch(deletePost(postId));
  };

  const handleEdit = (postId, postData) => {
    dispatch(updatePost({ id: postId, postData }));
    setEditModalOpen(false);
  };

  return (
    // <div className="border p-4 rounded shadow mb-4">
    //   <h3 className="font-semibold text-xl">{post.title}</h3>
    //   <p className="text-gray-600">{post.content.substring(0, 100)}</p>
    //   <p className="text-gray-600">By: {post.author?.name || "Unknown"}</p>
    //   <div className="mt-2 flex gap-2">
    //     <Link
    //       to={`/posts/${post._id}`}
    //       className="text-blue-600 hover:underline"
    //     >
    //       View Details
    //     </Link>
    //     {
    //       <button
    //         onClick={() => setEditModalOpen(true)}
    //         className="text-green-600 hover:underline"
    //       >
    //         Edit
    //       </button>
    //     }
    //     {
    //       <button
    //         onClick={() => handleDelete(post._id)}
    //         className="text-red-600 hover:underline"
    //       >
    //         Delete
    //       </button>
    //     }
    //   </div>
    //   {editModalOpen && (
    //     <EditPostModal
    //       isOpen={editModalOpen}
    //       onClose={() => setEditModalOpen(false)}
    //       post={post}
    //       onSave={(postData) => handleEdit(post._id, postData)}
    //     />
    //   )}
    // </div>
    <div
      class="relative h-[18em] w-[30em] border-2 border-[rgba(75,30,133,0.5)] rounded-[1.5em] bg-gradient-to-br from-[rgba(75,30,133,1)] via-purple-700/80 to-[rgba(75,30,133,0.2)] 
    text-white font-nunito p-[1.5em] flex justify-center items-left flex-col gap-[1em] backdrop-blur-[12px] hover:shadow-2xl hover:shadow-purple-500/30 transition-all duration-500 group/card hover:-translate-y-1"
    >
      <div class="absolute inset-0 bg-gradient-to-br from-purple-600/30 via-fuchsia-500/20 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-500 rounded-[1.5em]"></div>
      <div class="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,50,190,0.1),transparent_60%)] group-hover/card:animate-pulse"></div>

      <div class="relative z-10 transition-transform duration-300 group-hover/card:translate-y-[-2px] space-y-3">
        <h1 class="text-[2.2em] font-bold bg-gradient-to-r from-white via-purple-100 to-purple-200 bg-clip-text text-transparent">
          {post.title}
        </h1>
        <p class="text-[0.9em] text-purple-100/90 leading-relaxed font-light">
          {`${post.content.substring(0, 100)}...`}
        </p>
      </div>

      <div className="relative z-10 flex items-center justify-between mt-4 ">
        <button
          class="relative h-fit w-fit px-[1.4em] py-[0.7em] mt-2 border-[1px] border-purple-300/30 rounded-full flex justify-center items-center gap-[0.7em] overflow-hidden group/btn hover:border-purple-300/50 hover:shadow-lg hover:shadow-purple-500/20 active:scale-95 transition-all duration-300 backdrop-blur-[12px] bg-purple-500/10 cursor-pointer"
          onClick={() => navigate(`/posts/${post._id}`)}
        >
          <div class="absolute inset-0 bg-gradient-to-r from-purple-600/40 via-fuchsia-500/40 to-purple-600/40 translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-700"></div>
          <p class="relative z-10 font-medium tracking-wide">Explore Now</p>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="2"
            stroke="currentColor"
            class="relative z-10 w-5 h-5 group-hover/btn:translate-x-[10%] transition-transform duration-300"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
            ></path>
          </svg>
        </button>
        <button
          class="relative h-fit w-fit px-[1.4em] py-[0.7em] mt-2 border-[1px] border-purple-300/30 rounded-full flex justify-center items-center gap-[0.7em] overflow-hidden group/btn hover:border-purple-300/50 hover:shadow-lg hover:shadow-purple-500/20 active:scale-95 transition-all duration-300 backdrop-blur-[12px] bg-purple-500/10 cursor-pointer"
          onClick={() => setEditModalOpen(true)}
        >
          <div class="absolute inset-0 bg-gradient-to-r from-purple-600/40 via-fuchsia-500/40 to-purple-600/40 translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-700"></div>
          <p class="relative z-10 font-medium tracking-wide">Edit</p>
        </button>
        <button
          class="relative h-fit w-fit px-[1.4em] py-[0.7em] mt-2 border-[1px] border-purple-300/30 rounded-full flex justify-center items-center gap-[0.7em] overflow-hidden group/btn hover:border-purple-300/50 hover:shadow-lg hover:shadow-purple-500/20 active:scale-95 transition-all duration-300 backdrop-blur-[12px] bg-purple-500/10 cursor-pointer"
          onClick={() => handleDelete(post._id)}
        >
          <div class="absolute inset-0 bg-gradient-to-r from-purple-600/40 via-fuchsia-500/40 to-purple-600/40 translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-700"></div>
          <p class="relative z-10 font-medium tracking-wide">Delete</p>
        </button>
      </div>
      {/* {editModalOpen && (
        <EditPostModal
          isOpen={editModalOpen}
          onClose={() => setEditModalOpen(false)}
          post={post}
          onSave={(postData) => handleEdit(post._id, postData)}
        />
      )} */}
    </div>
  );
}
