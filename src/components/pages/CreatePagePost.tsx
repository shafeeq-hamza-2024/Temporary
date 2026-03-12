import { useState, useRef } from "react";
import { useCreatePagePost } from "@/hooks/pages/usePagePosts";
import { getApiErrorMessage } from "@/utils/getApiErrorMessage";
import toast from "react-hot-toast";
import { MdSend, MdAttachFile, MdClose, MdEmojiEmotions } from "react-icons/md";

const CreatePagePost = ({ pageId }: { pageId: number }) => {
  const [content, setContent] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const createMutation = useCreatePagePost(pageId);

  const handleSubmit = () => {
    const trimmed = content.trim();
    if (!trimmed && files.length === 0) {
      toast.error("Please write something or attach media.");
      return;
    }

    toast.promise(
      createMutation.mutateAsync({
        page: pageId,
        content: trimmed,
        files: files.length > 0 ? files : undefined,
      }),
      {
        loading: "Publishing your post...",
        success: "Post published successfully!",
        error: (err: Error) => getApiErrorMessage(err, "Failed to publish post"),
      },
    ).then(() => {
      setContent("");
      setFiles([]);
    });
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files);
      setFiles((prev) => [...prev, ...newFiles]);
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="bg-white rounded-4xl border border-gray-100 p-5 sm:p-6 shadow-sm group/composer focus-within:shadow-md transition-all duration-300">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-8 h-8 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
           <MdEmojiEmotions size={20} />
        </div>
        <span className="text-sm font-black text-gray-900 tracking-tight uppercase">New Post</span>
      </div>

      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="What's on your mind? Share an update..."
        rows={3}
        className="w-full px-4 py-3 rounded-2xl border border-gray-100 bg-gray-50/50 focus:outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary/30 focus:bg-white text-[15px] font-medium text-gray-700 resize-none transition-all placeholder:text-gray-400"
      />

      {/* File Previews */}
      {files.length > 0 && (
        <div className="flex flex-wrap gap-2.5 mt-4 px-1">
          {files.map((file, i) => (
            <div
              key={i}
              className="relative group w-20 h-20 rounded-2xl overflow-hidden border border-gray-100 bg-gray-50 ring-2 ring-white shadow-xs transform hover:scale-105 transition-transform"
            >
              {file.type.startsWith("image/") ? (
                <img
                  src={URL.createObjectURL(file)}
                  alt={file.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center text-[10px] text-gray-400 font-bold p-1 text-center break-all">
                  <MdAttachFile size={20} className="mb-1" />
                  {file.name.split(".").pop()?.toUpperCase()}
                </div>
              )}
              <button
                type="button"
                onClick={() => removeFile(i)}
                className="absolute top-1 right-1 w-6 h-6 border-none bg-black/40 backdrop-blur-md rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-500/80"
              >
                <MdClose size={14} className="text-white" />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center justify-between mt-5 pt-4 border-t border-gray-50">
        <div className="flex items-center gap-2">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileSelect}
            multiple
            accept="image/*,video/*"
            className="hidden"
          />
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="inline-flex items-center gap-2 bg-transparent text-xs font-black text-gray-500 hover:text-primary px-4 py-2 rounded-xl hover:bg-primary/5 border border-transparent hover:border-primary/10 uppercase tracking-widest transition-all"
          >
            <MdAttachFile size={18} />
            <span className="hidden sm:inline">Add Media</span>
          </button>
          
          {files.length > 0 && (
            <div className="px-3 py-1 rounded-lg bg-gray-50 border border-gray-100 text-[10px] font-bold text-gray-400 animate-in fade-in slide-in-from-left-2">
              {files.length} {files.length > 1 ? "Files" : "File"} Selected
            </div>
          )}
        </div>

        <button
          onClick={handleSubmit}
          disabled={createMutation.isPending}
          className={`relative group/btn overflow-hidden inline-flex items-center gap-2 px-8 py-2.5 rounded-2xl text-sm font-black text-white transition-all ${
            createMutation.isPending
              ? "bg-primary/60 cursor-not-allowed"
              : "bg-primary hover:bg-primary/95 shadow-lg shadow-primary/20 active:scale-95"
          }`}
        >
          {createMutation.isPending ? (
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            <>
              <span className="relative z-10 uppercase tracking-widest">Post</span>
              <MdSend size={16} className="relative z-10 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default CreatePagePost;
