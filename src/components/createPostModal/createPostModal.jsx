// src/components/CreatePostModal/CreatePostModal.jsx
import { useContext, useState } from "react";
import { X, Image, Globe2, Smile } from "lucide-react";
import axios from "axios";
import { toast } from "sonner";
import { UserContext } from "../../context/user.context";

export default function CreatePostModal({ isOpen, onClose, userInfo, onPostCreated }) {
  const { token } = useContext(UserContext);
  const [caption, setCaption] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  function handleImageChange(e) {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  }

  function removeImage() {
    setImageFile(null);
    setImagePreview(null);
  }

  function resetForm() {
    setCaption("");
    setImageFile(null);
    setImagePreview(null);
  }

  async function handleSubmit() {
    if (!caption.trim() && !imageFile) return;

    setIsSubmitting(true);
    try {
      const formData = new FormData();
      formData.append("body", caption);
      if (imageFile) {
        formData.append("image", imageFile);
      }

      const options = {
        url: "https://route-posts.routemisr.com/posts",
        method: "POST",
        headers: {
          authorization: `Bearer ${token}`,
        },
        data: formData,
      };

      const { data } = await axios.request(options);
      toast.success("Post created successfully");
      resetForm();
      onPostCreated?.(data.data.post);
      onClose();
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
      <div className="bg-white rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-center relative px-4 py-3.5 border-b border-stone-200">
          <h2 className="font-semibold text-stone-900">Create post</h2>
          <button
            onClick={onClose}
            className="absolute right-4 h-8 w-8 flex items-center justify-center rounded-full bg-stone-100 text-stone-500 hover:bg-stone-200 transition-colors"
          >
            <X size={16} strokeWidth={2} />
          </button>
        </div>

        {/* User row */}
        <div className="flex items-center gap-3 px-4 pt-4">
          <img
            src={userInfo?.photo}
            alt={userInfo?.name}
            className="h-10 w-10 rounded-full object-cover"
          />
          <div>
            <p className="text-sm font-semibold text-stone-900">{userInfo?.name}</p>
            <button className="flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-stone-100 text-xs text-stone-600">
              <Globe2 size={12} strokeWidth={2} />
              Public
            </button>
          </div>
        </div>

        {/* Caption */}
        <div className="px-4 pt-3">
          <textarea
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            placeholder={`What's on your mind, ${userInfo?.name || ""}?`}
            rows={imagePreview ? 2 : 5}
            className="w-full resize-none outline-none text-[15px] text-stone-800 placeholder:text-stone-400"
            autoFocus
          />
        </div>

        {/* Image preview */}
        {imagePreview && (
          <div className="relative mx-4 mt-2 rounded-xl overflow-hidden border border-stone-200">
            <img src={imagePreview} alt="Selected" className="w-full max-h-80 object-cover" />
            <button
              onClick={removeImage}
              className="absolute top-2 right-2 h-8 w-8 flex items-center justify-center rounded-full bg-black/60 text-white hover:bg-black/80 transition-colors"
            >
              <X size={16} strokeWidth={2} />
            </button>
          </div>
        )}

        {/* Add to post */}
        <div className="flex items-center justify-between mx-4 mt-4 px-4 py-3 rounded-xl border border-stone-200">
          <span className="text-sm font-medium text-stone-700">Add to your post</span>
          <div className="flex items-center gap-1">
            <label className="h-9 w-9 flex items-center justify-center rounded-full hover:bg-stone-100 text-green-600 cursor-pointer transition-colors">
              <Image size={20} strokeWidth={2} />
              <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
            </label>
            <button className="h-9 w-9 flex items-center justify-center rounded-full hover:bg-stone-100 text-amber-500 transition-colors">
              <Smile size={20} strokeWidth={2} />
            </button>
          </div>
        </div>

        {/* Submit */}
        <div className="px-4 py-4">
          <button
            onClick={handleSubmit}
            disabled={(!caption.trim() && !imageFile) || isSubmitting}
            className="w-full py-2.5 rounded-lg bg-teal-700 text-white font-medium text-sm hover:bg-teal-800 disabled:bg-stone-200 disabled:text-stone-400 transition-colors"
          >
            {isSubmitting ? "Posting..." : "Post"}
          </button>
        </div>
      </div>
    </div>
  );
}