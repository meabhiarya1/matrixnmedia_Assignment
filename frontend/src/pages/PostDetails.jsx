import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchPostById } from "../features/posts/postsSlice";

export default function PostDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { selectedPost: post, loading } = useSelector((state) => state.posts);

  useEffect(() => {
    if (!post || post.length === 0) {
      dispatch(fetchPostById(id));
    }
  }, [post, dispatch]);

  if (loading) return <div className="p-4">Loading...</div>;
  if (!post) return <div className="p-4">Post not found.</div>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-2">{post.title}</h1>
      <p>{post.content}</p>
    </div>
  );
}
