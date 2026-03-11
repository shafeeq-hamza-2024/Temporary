import { PageDetails, PageCategory } from "@/types/pages/basic.types";
import { useFollowPage, useUnfollowPage } from "@/hooks/pages/usePageFollow";
import { getApiErrorMessage } from "@/utils/getApiErrorMessage";
import toast from "react-hot-toast";
import {
  MdBusiness,
  MdEvent,
  MdGroups,
  MdPublic,
  MdPersonAdd,
  MdPersonRemove,
} from "react-icons/md";
import { useNavigate } from "react-router";

const categoryConfig: Record<
  PageCategory,
  { label: string; icon: React.ReactNode; color: string; bg: string }
> = {
  [PageCategory.COMPANY]: {
    label: "Company",
    icon: <MdBusiness size={14} />,
    color: "text-blue-700",
    bg: "bg-blue-50 border-blue-200",
  },
  [PageCategory.EVENT]: {
    label: "Event",
    icon: <MdEvent size={14} />,
    color: "text-amber-700",
    bg: "bg-amber-50 border-amber-200",
  },
  [PageCategory.COMMUNITY]: {
    label: "Community",
    icon: <MdGroups size={14} />,
    color: "text-green-700",
    bg: "bg-green-50 border-green-200",
  },
  [PageCategory.GENERAL]: {
    label: "General",
    icon: <MdPublic size={14} />,
    color: "text-gray-700",
    bg: "bg-gray-50 border-gray-200",
  },
};

const PageDetailHeader = ({ page }: { page: PageDetails }) => {
  const navigate = useNavigate();
  const config =
    categoryConfig[page.category] ?? categoryConfig[PageCategory.GENERAL];
  const followMutation = useFollowPage(page.id);
  const unfollowMutation = useUnfollowPage(page.id);
  const isToggling = followMutation.isPending || unfollowMutation.isPending;

  const handleFollowToggle = () => {
    if (isToggling) return;

    const action = page.is_following ? unfollowMutation : followMutation;
    toast.promise(action.mutateAsync({ page: page.id }), {
      loading: page.is_following ? "Unfollowing..." : "Following...",
      success: page.is_following
        ? "Unfollowed page"
        : "Now following this page!",
      error: (err: Error) =>
        getApiErrorMessage(err, `${page.is_following ? "Unfollow" : "Follow"} failed`),
    });
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      {/* Cover Image */}
      <div className="w-full h-36 sm:h-48 md:h-56 bg-linear-to-br from-primary/15 to-primary/5 relative">
        {page.cover_image_url ? (
          <img
            src={page.cover_image_url}
            alt={`${page.page_name} cover`}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <div className="w-16 h-16 rounded-full bg-white/50 flex items-center justify-center text-primary/30">
              {config.icon}
            </div>
          </div>
        )}
      </div>

      {/* Info Section */}
      <div className="px-4 sm:px-6 pb-4">
        <div className="flex flex-col sm:flex-row sm:items-end gap-3 sm:gap-4 -mt-10 sm:-mt-12">
          {/* Profile Avatar */}
          <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full border-4 border-white shadow-md bg-white overflow-hidden shrink-0">
            {page.profile_image_url ? (
              <img
                src={page.profile_image_url}
                alt={page.page_name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-primary/10 flex items-center justify-center text-primary font-bold text-2xl sm:text-3xl">
                {page.page_name.charAt(0).toUpperCase()}
              </div>
            )}
          </div>

          {/* Name + Meta */}
          <div className="flex-1 min-w-0 pb-1">
            <h1 className="text-lg sm:text-xl font-bold text-gray-900 truncate">
              {page.page_name}
            </h1>
            <div className="flex flex-wrap items-center gap-2 mt-1">
              <span
                className={`inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full border ${config.bg} ${config.color}`}
              >
                {config.icon}
                {config.label}
              </span>
              <span className="text-xs text-gray-500">
                {page.followers_count}{" "}
                {page.followers_count === 1 ? "follower" : "followers"}
              </span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={handleFollowToggle}
              disabled={isToggling}
              className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                page.is_following
                  ? "bg-gray-100 text-gray-700 hover:bg-red-50 hover:text-red-600 border border-gray-200"
                  : "bg-primary text-white hover:bg-primary/90 shadow-sm"
              } ${isToggling ? "opacity-60 cursor-not-allowed" : ""}`}
            >
              {page.is_following ? (
                <>
                  <MdPersonRemove size={16} />
                  <span className="hidden sm:inline">Following</span>
                </>
              ) : (
                <>
                  <MdPersonAdd size={16} />
                  <span className="hidden sm:inline">Follow</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Owner Info */}
        {page.owner && (
          <div className="mt-3 pt-3 border-t border-gray-100 flex items-center gap-2">
            <div
              className="w-6 h-6 rounded-full bg-gray-200 overflow-hidden shrink-0 cursor-pointer"
              onClick={() => navigate(`/public/users/${page.owner.id}`)}
            >
              {page.owner.profile_image_url && (
                <img
                  src={page.owner.profile_image_url}
                  alt={page.owner.first_name}
                  className="w-full h-full object-cover"
                />
              )}
            </div>
            <span className="text-xs text-gray-500">
              Created by{" "}
              <span
                className="font-medium text-gray-700 hover:text-primary cursor-pointer"
                onClick={() => navigate(`/public/users/${page.owner.id}`)}
              >
                {page.owner.first_name} {page.owner.last_name}
              </span>
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default PageDetailHeader;
