import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../api/axios";

// Fetch public posts (for Home page)
export const fetchPublicPosts = createAsyncThunk(
  "posts/fetchPublicPosts",
  async () => {
    const response = await axios.get("/posts/public");
    return response.data;
  }
);

// Fetch user posts (Dashboard)
export const fetchUserPosts = createAsyncThunk(
  "posts/fetchUserPosts",
  async () => {
    const response = await axios.get("/posts", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return response.data;
  }
);

// Fetch single post by id (PostDetails)
export const fetchPostById = createAsyncThunk(
  "posts/fetchPostById",
  async (id) => {
    const response = await axios.get(`/posts/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return response.data;
  }
);

// Create post
export const createPost = createAsyncThunk(
  "posts/createPost",
  async (postData) => {
    const response = await axios.post("/posts", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      postData,
    });
    return response.data;
  }
);

// Update post
export const updatePost = createAsyncThunk(
  "posts/updatePost",
  async ({ id, postData }) => {
    const response = await axios.put(`/posts/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      postData,
    });
    return response.data;
  }
);

// Delete post
export const deletePost = createAsyncThunk("posts/deletePost", async (id) => {
  await axios.delete(`/posts/${id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return id;
});

// Add comment to post (public, no auth required)
export const addComment = createAsyncThunk(
  "posts/addComment",
  async ({ id, commentData }) => {
    const response = await axios.post(`/posts/${id}/comments`, commentData);
    return response.data;
  }
);

const postsSlice = createSlice({
  name: "posts",
  initialState: {
    publicPosts: [],
    userPosts: [],
    selectedPost: null,
    loading: false,
    error: null,
    token: localStorage.getItem("token") || null,
  },
  reducers: {
    clearSelectedPost(state) {
      state.selectedPost = null;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchPublicPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPublicPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.publicPosts = action.payload;
      })
      .addCase(fetchPublicPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchUserPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.userPosts = action.payload;
      })
      .addCase(fetchUserPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchPostById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPostById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedPost = action.payload;
      })
      .addCase(fetchPostById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(createPost.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.loading = false;
        state.userPosts.push(action.payload);
      })
      .addCase(createPost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(updatePost.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.userPosts.findIndex(
          (post) => post._id === action.payload._id
        );
        if (index !== -1) {
          state.userPosts[index] = action.payload;
        }
      })
      .addCase(updatePost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(deletePost.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.loading = false;
        state.userPosts = state.userPosts.filter(
          (post) => post._id !== action.payload
        );
      })
      .addCase(deletePost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addComment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addComment.fulfilled, (state, action) => {
        state.loading = false;
        // Update selectedPost comments if it matches
        if (
          state.selectedPost &&
          state.selectedPost._id === action.payload._id
        ) {
          state.selectedPost = action.payload;
        }
      })
      .addCase(addComment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { clearSelectedPost } = postsSlice.actions;
export default postsSlice.reducer;
