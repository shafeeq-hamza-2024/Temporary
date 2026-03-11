import { useState, useRef } from "react";
import { useCreatePagePost } from "@/hooks/pages/usePagePosts";
import { getApiErrorMessage } from "@/utils/getApiErrorMessage";
import toast from "react-hot-toast";
import { MdSend, MdAttachFile, MdClose } from "react-icons/md";

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
        loading: "Posting...",
        success: "Post published!",
        error: (err: Error) => getApiErrorMessage(err, "Failed to publish post"),
      },
    ).then(() => {
      setContent("");
      setFiles([]);
    });
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles((prev) => [...prev, ...Array.from(e.target.files!)]);
    }
    // Reset input so same file can be re-selected
    e.target.value = "";
  };

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-3 sm:p-4">
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Write a post for this page..."
        rows={3}
        className="w-full p-2.5 rounded-lg border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm resize-none transition-all"
      />

      {/* File Previews */}
      {files.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-2">
          {files.map((file, i) => (
            <div
              key={i}
              className="relative group w-16 h-16 rounded-lg overflow-hidden border border-gray-200 bg-gray-100"
            >
              {file.type.startsWith("image/") ? (
                <img
                  src={URL.createObjectURL(file)}
                  alt={file.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-[10px] text-gray-500 p-1 text-center break-all">
                  {file.name.split(".").pop()?.toUpperCase()}
                </div>
              )}
              <button
                onClick={() => removeFile(i)}
                className="absolute top-0.5 right-0.5 w-4 h-4 bg-black/60 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <MdClose size={10} className="text-white" />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center justify-between mt-3 pt-2 border-t border-gray-100">
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
            onClick={() => fileInputRef.current?.click()}
            className="inline-flex items-center gap-1.5 text-xs text-gray-500 hover:text-primary px-2.5 py-1.5 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <MdAttachFile size={16} />
            <span className="hidden sm:inline">Attach</span>
          </button>
          {files.length > 0 && (
            <span className="text-xs text-gray-400">
              {files.length} file{files.length > 1 ? "s" : ""}
            </span>
          )}
        </div>

        <button
          onClick={handleSubmit}
          disabled={createMutation.isPending}
          className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium text-white transition-all ${
            createMutation.isPending
              ? "bg-primary/60 cursor-not-allowed"
              : "bg-primary hover:bg-primary/90 shadow-sm"
          }`}
        >
          {createMutation.isPending ? (
            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            <>
              <MdSend size={14} />
              <span>Post</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default CreatePagePost;
