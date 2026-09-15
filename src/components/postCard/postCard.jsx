// src/components/postCard/postCard.jsx
import { useContext, useState } from "react";
import {
  Heart,
  MessageCircle,
  Share2,
  Bookmark,
  Globe2,
  Send,
  MoreHorizontal,
  Pencil,
  Trash2,
  Check,
  X as XIcon,
} from "lucide-react";
import axios from "axios";
import { toast } from "sonner";
import { UserContext } from "../../context/user.context";
import EditPostModal from "../EditPostModal/EditPostModal";

export default function PostCard({ postDetails, currentUserId, onPostDeleted, onPostUpdated }) {
  const { token } = useContext(UserContext);
  const {
    _id,
    likesCount,
    privacy,
    commentsCount,
    sharesCount,
    image,
    body,
    user,
    topComment,
    bookmarked,
  } = postDetails;

  const [menuOpen, setMenuOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  // Bookmark state
  const [isBookmarked, setIsBookmarked] = useState(bookmarked);
  const [isBookmarking, setIsBookmarking] = useState(false);

  // Comment state
  const [comment, setComment] = useState(topComment);
  const [commentLiked, setCommentLiked] = useState(
    topComment ? topComment.likes?.includes(currentUserId) : false
  );
  const [commentLikesCount, setCommentLikesCount] = useState(topComment?.likes?.length || 0);
  const [isEditingComment, setIsEditingComment] = useState(false);
  const [editCommentText, setEditCommentText] = useState(topComment?.content || "");
  const [isCommentMenuOpen, setIsCommentMenuOpen] = useState(false);
  const [isDeletingComment, setIsDeletingComment] = useState(false);

  const isOwner = user._id === currentUserId;
  const isCommentOwner = comment?.commentCreator?._id === currentUserId;

  async function handleDelete() {
    const confirmed = window.confirm("Are you sure you want to delete this post?");
    if (!confirmed) return;

    setIsDeleting(true);
    try {
      await axios.request({
        url: `https://route-posts.routemisr.com/posts/${_id}`,
        method: "DELETE",
        headers: { authorization: `Bearer ${token}` },
      });
      toast.success("Post deleted");
      onPostDeleted?.(_id);
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Failed to delete post");
    } finally {
      setIsDeleting(false);
      setMenuOpen(false);
    }
  }

  async function toggleBookmark() {
    setIsBookmarking(true);
    const nextValue = !isBookmarked;
    setIsBookmarked(nextValue); // optimistic update
    try {
      await axios.request({
        url: `https://route-posts.routemisr.com/posts/${_id}/bookmark`,
        method: "PATCH",
        headers: { authorization: `Bearer ${token}` },
      });
    } catch (error) {
      console.log(error);
      setIsBookmarked(!nextValue); // revert on failure
      toast.error(error.response?.data?.message || "Failed to update bookmark");
    } finally {
      setIsBookmarking(false);
    }
  }

  async function toggleCommentLike() {
    const nextLiked = !commentLiked;
    setCommentLiked(nextLiked);
    setCommentLikesCount((prev) => (nextLiked ? prev + 1 : prev - 1));
    try {
      await axios.request({
        url: `https://route-posts.routemisr.com/comments/likes/${comment._id}`,
        method: "PATCH",
        headers: { authorization: `Bearer ${token}` },
      });
    } catch (error) {
      console.log(error);
      setCommentLiked(!nextLiked);
      setCommentLikesCount((prev) => (!nextLiked ? prev + 1 : prev - 1));
      toast.error(error.response?.data?.message || "Failed to update like");
    }
  }

  async function handleUpdateComment() {
    if (!editCommentText.trim()) return;
    try {
      const { data } = await axios.request({
        url: `https://route-posts.routemisr.com/comments/${comment._id}`,
        method: "PUT",
        headers: { authorization: `Bearer ${token}` },
        data: { content: editCommentText },
      });
      setComment((prev) => ({ ...prev, content: data.data.comment.content }));
      toast.success("Comment updated");
      setIsEditingComment(false);
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Failed to update comment");
    }
  }

  async function handleDeleteComment() {
    const confirmed = window.confirm("Are you sure you want to delete this comment?");
    if (!confirmed) return;

    setIsDeletingComment(true);
    try {
      await axios.request({
        url: `https://route-posts.routemisr.com/comments/${comment._id}`,
        method: "DELETE",
        headers: { authorization: `Bearer ${token}` },
      });
      toast.success("Comment deleted");
      setComment(null);
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Failed to delete comment");
    } finally {
      setIsDeletingComment(false);
      setIsCommentMenuOpen(false);
    }
  }

  return (
    <article className="w-full min-w-lg max-w-xl rounded-2xl border border-stone-200 bg-white overflow-hidden">
      {/* Header */}
      <div className="flex items-start gap-3 px-5 pt-5">
        <img
          src={user.photo}
          alt={user.name}
          className="h-11 w-11 rounded-full object-cover ring-2 ring-teal-700/10"
        />
        <div className="flex-1 min-w-0">
          <div className="flex items-baseline gap-1.5">
            <h3 className="font-semibold text-stone-900 truncate">{user.name}</h3>
            <span className="text-stone-400 text-sm truncate">@{user.username}</span>
          </div>
          <div className="flex items-center gap-1.5 text-stone-400 text-xs mt-0.5">
            <span>2h</span>
            <span>·</span>
            <Globe2 size={12} strokeWidth={2} />
            <span>{privacy}</span>
          </div>
        </div>

        {/* Owner menu */}
        {isOwner && (
          <div className="relative">
            <button
              onClick={() => setMenuOpen((prev) => !prev)}
              className="p-1.5 rounded-lg text-stone-400 hover:bg-stone-50 transition-colors"
            >
              <MoreHorizontal size={18} strokeWidth={2} />
            </button>

            {menuOpen && (
              <>
                <div className="fixed inset-0 z-10" onClick={() => setMenuOpen(false)} />
                <div className="absolute right-0 top-9 z-20 w-40 rounded-xl border border-stone-200 bg-white shadow-lg overflow-hidden">
                  <button
                    onClick={() => {
                      setIsEditOpen(true);
                      setMenuOpen(false);
                    }}
                    className="flex items-center gap-2 w-full px-3.5 py-2.5 text-sm text-stone-700 hover:bg-stone-50 transition-colors"
                  >
                    <Pencil size={15} strokeWidth={2} />
                    Edit post
                  </button>
                  <button
                    onClick={handleDelete}
                    disabled={isDeleting}
                    className="flex items-center gap-2 w-full px-3.5 py-2.5 text-sm text-rose-600 hover:bg-rose-50 transition-colors"
                  >
                    <Trash2 size={15} strokeWidth={2} />
                    {isDeleting ? "Deleting..." : "Delete post"}
                  </button>
                </div>
              </>
            )}
          </div>
        )}
      </div>

      {/* Body */}
      <div className="px-5 pt-3">
        <p className="text-stone-800 text-[15px] leading-relaxed">{body}</p>
      </div>

      {/* Post photo (only if the post has one) */}
      {image && (
        <div className="mt-3 mx-5 rounded-xl overflow-hidden border border-stone-100">
          <img src={image} alt="Post attachment" className="w-full h-72 object-cover" />
        </div>
      )}

      {/* Stats row */}
      <div className="flex items-center gap-3 px-5 mt-4 text-xs text-stone-400">
        <span>{likesCount} likes</span>
        <span>{commentsCount} comments</span>
        <span>{sharesCount} shares</span>
      </div>

      <div className="h-px bg-stone-100 mx-5 mt-3" />

      {/* Action bar */}
      <div className="flex items-center justify-between px-5 py-2">
        <div className="flex items-center gap-1">
          <button className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm text-stone-500 hover:bg-stone-50 transition-colors">
            <Heart size={17} strokeWidth={2} />
            Like
          </button>
          <button className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm text-stone-500 hover:bg-stone-50 transition-colors">
            <MessageCircle size={17} strokeWidth={2} />
            Comment
          </button>
          <button className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm text-stone-500 hover:bg-stone-50 transition-colors">
            <Share2 size={17} strokeWidth={2} />
            Share
          </button>
        </div>
        <button
          onClick={toggleBookmark}
          disabled={isBookmarking}
          className="p-2 rounded-lg text-stone-400 hover:bg-stone-50 transition-colors"
        >
          <Bookmark
            size={17}
            strokeWidth={2}
            className={isBookmarked ? "fill-teal-700 text-teal-700" : ""}
          />
        </button>
      </div>

      <div className="h-px bg-stone-100 mx-5" />

      {/* Top comment preview */}
      {comment && (
        <div className="flex items-start gap-2 px-5 pb-3 pt-3">
          <img
            src={comment.commentCreator.photo}
            alt={comment.commentCreator.name}
            className="h-7 w-7 rounded-full object-cover"
          />
          <div className="flex-1">
            <div className="bg-stone-50 rounded-2xl px-3.5 py-2">
              <div className="flex items-start justify-between gap-2">
                <span className="text-sm font-medium text-stone-800">
                  {comment.commentCreator.name}
                </span>

                {isCommentOwner && !isEditingComment && (
                  <div className="relative shrink-0">
                    <button
                      onClick={() => setIsCommentMenuOpen((prev) => !prev)}
                      className="text-stone-400 hover:text-stone-600 transition-colors"
                    >
                      <MoreHorizontal size={14} strokeWidth={2} />
                    </button>
                    {isCommentMenuOpen && (
                      <>
                        <div
                          className="fixed inset-0 z-10"
                          onClick={() => setIsCommentMenuOpen(false)}
                        />
                        <div className="absolute right-0 top-5 z-20 w-32 rounded-lg border border-stone-200 bg-white shadow-lg overflow-hidden">
                          <button
                            onClick={() => {
                              setIsEditingComment(true);
                              setIsCommentMenuOpen(false);
                            }}
                            className="flex items-center gap-1.5 w-full px-3 py-2 text-xs text-stone-700 hover:bg-stone-50 transition-colors"
                          >
                            <Pencil size={12} strokeWidth={2} />
                            Edit
                          </button>
                          <button
                            onClick={handleDeleteComment}
                            disabled={isDeletingComment}
                            className="flex items-center gap-1.5 w-full px-3 py-2 text-xs text-rose-600 hover:bg-rose-50 transition-colors"
                          >
                            <Trash2 size={12} strokeWidth={2} />
                            Delete
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                )}
              </div>

              {isEditingComment ? (
                <div className="mt-1">
                  <input
                    value={editCommentText}
                    onChange={(e) => setEditCommentText(e.target.value)}
                    className="w-full bg-white border border-stone-200 rounded-lg px-2 py-1 text-sm text-stone-700 outline-none focus:border-teal-700/40"
                    autoFocus
                  />
                  <div className="flex items-center gap-1 mt-1.5">
                    <button
                      onClick={handleUpdateComment}
                      className="flex items-center gap-1 px-2 py-1 rounded-md bg-teal-700 text-white text-xs hover:bg-teal-800 transition-colors"
                    >
                      <Check size={12} strokeWidth={2} />
                      Save
                    </button>
                    <button
                      onClick={() => {
                        setIsEditingComment(false);
                        setEditCommentText(comment.content);
                      }}
                      className="flex items-center gap-1 px-2 py-1 rounded-md bg-stone-100 text-stone-600 text-xs hover:bg-stone-200 transition-colors"
                    >
                      <XIcon size={12} strokeWidth={2} />
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <p className="text-sm text-stone-600">{comment.content}</p>
              )}
            </div>

            {!isEditingComment && (
              <div className="flex items-center gap-3 mt-1 px-1">
                <button
                  onClick={toggleCommentLike}
                  className="flex items-center gap-1 text-xs text-stone-400 hover:text-stone-600 transition-colors"
                >
                  <Heart
                    size={12}
                    strokeWidth={2}
                    className={commentLiked ? "fill-rose-500 text-rose-500" : ""}
                  />
                  {commentLikesCount > 0 && commentLikesCount}
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Comment input */}
      <div className="flex items-center gap-2 px-5 pb-5">
        <img
          src="https://pub-3cba56bacf9f4965bbb0989e07dada12.r2.dev/linkedPosts/default-profile.png"
          alt="You"
          className="h-7 w-7 rounded-full object-cover"
        />
        <div className="flex-1 flex items-center gap-2 bg-stone-50 rounded-full pl-4 pr-1.5 py-1.5 border border-transparent focus-within:border-teal-700/20">
          <input
            type="text"
            placeholder="Write a comment..."
            className="flex-1 bg-transparent text-sm text-stone-700 placeholder:text-stone-400 outline-none"
          />
          <button className="h-7 w-7 flex items-center justify-center rounded-full bg-teal-700 text-white hover:bg-teal-800 transition-colors shrink-0">
            <Send size={14} strokeWidth={2} />
          </button>
        </div>
      </div>

      <EditPostModal
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        post={postDetails}
        onPostUpdated={onPostUpdated}
      />
    </article>
  );
}