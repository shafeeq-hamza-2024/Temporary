import { PagePost, PageDetails } from "@/types/pages/basic.types";
import { MdDelete, MdAccessTime, MdVerifiedUser } from "react-icons/md";
import { useNavigate } from "react-router";

type PagePostCardProps = {
  post: PagePost;
  isOwner: boolean;
  onDelete?: (postId: number) => void;
  page: PageDetails;
  isDeleting?: boolean;
};

const PagePostCard = ({
  post,
  isOwner,
  onDelete,
  page,
  isDeleting,
}: PagePostCardProps) => {
  const navigate = useNavigate();

  const timeAgo = (dateStr: string): string => {
    const diff = Date.now() - new Date(dateStr).getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 1) return "Just now";
    if (mins < 60) return `${mins}m ago`;
    const hrs = Math.floor(mins / 60);
    if (hrs < 24) return `${hrs}h ago`;
    const days = Math.floor(hrs / 24);
    if (days < 7) return `${days}d ago`;
    return new Date(dateStr).toLocaleDateString();
  };

  return (
    <div className="bg-white rounded-3xl border border-gray-100 overflow-hidden shadow-xs hover:shadow-md transition-shadow duration-300">
      {/* Post Header */}
      <div className="flex items-start justify-between p-4 sm:p-6 gap-2 sm:gap-4">
        <div className="flex items-center gap-3 sm:gap-4 min-w-0 flex-1">
          {/* Page Avatar */}
          <div
            className="w-10 h-10 sm:w-14 sm:h-14 rounded-2xl bg-gray-50 overflow-hidden shrink-0 shadow-sm border border-gray-100 cursor-pointer transform hover:scale-105 transition-transform duration-200"
            onClick={() => page?.id && navigate(`/pages/${page.id}`)}
          >
            {page?.profile_image_url ? (
              <img
                src={page.profile_image_url}
                alt={page.page_name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-linear-to-br from-primary/10 to-primary/20 flex items-center justify-center text-primary font-black text-lg sm:text-xl">
                {page?.page_name?.charAt(0) ||
                  post.created_by.first_name.charAt(0)}
              </div>
            )}
          </div>

          {/* Names Meta */}
          <div className="flex flex-col min-w-0 flex-1">
            <div className="flex items-center gap-1 sm:gap-2 leading-tight min-w-0">
              <span
                className="text-[14px] sm:text-lg font-black text-gray-900 truncate cursor-pointer hover:text-primary transition-colors tracking-tight block"
                onClick={() => page?.id && navigate(`/pages/${page.id}`)}
              >
                {page?.page_name || "Page Post"}
              </span>
              <MdVerifiedUser className="text-primary text-[14px] sm:text-base shrink-0" title="Verified Page" />
            </div>

            <div className="flex flex-wrap items-center gap-x-1 sm:gap-x-2 gap-y-0.5 mt-0.5 sm:mt-1 px-0.5 sm:px-1 min-w-0">
               <div className="flex items-center gap-1 sm:gap-1.5 cursor-pointer group/user min-w-0 max-w-full" onClick={() => navigate(`/public/users/${post.created_by.id}`)}>
                  <span className="text-[11px] sm:text-[12px] font-bold text-gray-500 group-hover:text-primary transition-colors truncate">
                    {post.created_by.first_name} {post.created_by.last_name}
                  </span>
                  <span className="text-[9px] sm:text-[10px] font-black text-blue-500 uppercase tracking-widest bg-blue-50 px-1 sm:px-1.5 py-0.5 rounded-md border border-blue-100/50 shrink-0">
                    Admin
                  </span>
               </div>
               <span className="text-gray-300 hidden sm:block shrink-0">•</span>
               <div className="flex items-center gap-0.5 sm:gap-1 text-[10px] sm:text-[11px] font-bold text-gray-400 shrink-0">
                  <MdAccessTime size={11} className="sm:text-[12px]" />
                  <span>{timeAgo(post.created_at)}</span>
               </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-1 shrink-0 ml-1 sm:ml-3">
          {isOwner && onDelete && (
            <button
              onClick={() => onDelete(post.id)}
              disabled={isDeleting}
              className="p-2.5 rounded-2xl text-gray-400 hover:text-red-500 hover:bg-red-50 hover:shadow-xs transition-all disabled:opacity-50 active:scale-95"
              title="Delete post"
            >
              <MdDelete size={20} />
            </button>
          )}
        </div>
      </div>

      {/* Content */}
      {post.content && (
        <div className="px-5 sm:px-6 pb-5">
          <p className="text-sm sm:text-[15px] text-gray-700 leading-relaxed whitespace-pre-wrap font-medium">
            {post.content}
          </p>
        </div>
      )}

      {/* Media Gallery */}
      {post.media && post.media.length > 0 && (
        <div
          className={`px-5 sm:px-6 pb-6 pt-1 grid gap-2 ${
            post.media.length === 1
              ? "grid-cols-1"
              : post.media.length === 2
                ? "grid-cols-2"
                : "grid-cols-2"
          }`}
        >
          {post.media.slice(0, 4).map((mediaItem, i) => (
            <div
              key={mediaItem.id || i}
              className={`relative overflow-hidden bg-gray-50 rounded-2xl border border-gray-100 ring-4 ring-white shadow-xs ${
                post.media.length === 1
                  ? "max-h-[450px]"
                  : post.media.length === 3 && i === 0
                    ? "row-span-2"
                    : "aspect-square"
              }`}
            >
              {mediaItem.is_video ? (
                <video
                  src={mediaItem.file_url}
                  className="w-full h-full object-cover"
                  controls
                  preload="metadata"
                />
              ) : (
                <img
                  src={mediaItem.file_url}
                  alt={`Post media ${i + 1}`}
                  className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                />
              )}
              {i === 3 && post.media.length > 4 && (
                <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px] flex items-center justify-center pointer-events-none">
                  <span className="text-white font-black text-2xl tracking-tighter">
                    +{post.media.length - 4}
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PagePostCard;
