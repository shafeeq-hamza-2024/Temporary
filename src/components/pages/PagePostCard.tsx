import { PagePost } from "@/types/pages/basic.types";
import { MdDelete } from "react-icons/md";
import { useNavigate } from "react-router";

type PagePostCardProps = {
  post: PagePost;
  onDelete?: (postId: number) => void;
  isDeleting?: boolean;
};

const PagePostCard = ({ post, onDelete, isDeleting }: PagePostCardProps) => {
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
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      {/* Post Header */}
      <div className="flex items-center justify-between p-3 sm:p-4">
        <div
          className="flex items-center gap-2.5 min-w-0 cursor-pointer"
          onClick={() => navigate(`/public/users/${post.created_by.id}`)}
        >
          <div className="w-9 h-9 rounded-full bg-gray-200 overflow-hidden shrink-0">
            {post.created_by.profile_image_url ? (
              <img
                src={post.created_by.profile_image_url}
                alt={post.created_by.first_name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-primary/10 flex items-center justify-center text-primary font-semibold text-sm">
                {post.created_by.first_name.charAt(0)}
              </div>
            )}
          </div>
          <div className="min-w-0">
            <p className="text-sm font-semibold text-gray-900 truncate hover:text-primary transition-colors">
              {post.created_by.first_name} {post.created_by.last_name}
            </p>
            <p className="text-[11px] text-gray-400">{timeAgo(post.created_at)}</p>
          </div>
        </div>

        {onDelete && (
          <button
            onClick={() => onDelete(post.id)}
            disabled={isDeleting}
            className="p-1.5 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 transition-all disabled:opacity-50"
            title="Delete post"
          >
            <MdDelete size={18} />
          </button>
        )}
      </div>

      {/* Content */}
      {post.content && (
        <div className="px-3 sm:px-4 pb-3">
          <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap break-words">
            {post.content}
          </p>
        </div>
      )}

      {/* Media Gallery */}
      {post.media && post.media.length > 0 && (
        <div
          className={`grid gap-0.5 ${
            post.media.length === 1
              ? "grid-cols-1"
              : post.media.length === 2
                ? "grid-cols-2"
                : "grid-cols-2"
          }`}
        >
          {post.media.slice(0, 4).map((url, i) => (
            <div
              key={i}
              className={`relative overflow-hidden bg-gray-100 ${
                post.media.length === 1
                  ? "max-h-96"
                  : post.media.length === 3 && i === 0
                    ? "row-span-2"
                    : ""
              }`}
            >
              <img
                src={url}
                alt={`Post media ${i + 1}`}
                className="w-full h-full object-cover"
                loading="lazy"
              />
              {i === 3 && post.media.length > 4 && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                  <span className="text-white font-bold text-lg">
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
