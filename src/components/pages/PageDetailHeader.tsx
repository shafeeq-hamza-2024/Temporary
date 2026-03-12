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
  MdPeopleOutline,
} from "react-icons/md";
import { useNavigate } from "react-router";
import { useUserProfile } from "@/hooks/profile/useUserProfile";

const categoryConfig: Record<
  PageCategory,
  { label: string; icon: React.ReactNode; color: string; bg: string; border: string }
> = {
  [PageCategory.COMPANY]: {
    label: "Company",
    icon: <MdBusiness size={14} />,
    color: "text-blue-600",
    bg: "bg-blue-50/50",
    border: "border-blue-100",
  },
  [PageCategory.EVENT]: {
    label: "Event",
    icon: <MdEvent size={14} />,
    color: "text-amber-600",
    bg: "bg-amber-50/50",
    border: "border-amber-100",
  },
  [PageCategory.COMMUNITY]: {
    label: "Community",
    icon: <MdGroups size={14} />,
    color: "text-emerald-600",
    bg: "bg-emerald-50/50",
    border: "border-emerald-100",
  },
  [PageCategory.GENERAL]: {
    label: "Page",
    icon: <MdPublic size={14} />,
    color: "text-gray-600",
    bg: "bg-gray-50/50",
    border: "border-gray-100",
  },
};

const PageDetailHeader = ({ page }: { page: PageDetails }) => {
  const navigate = useNavigate();
  const config =
    categoryConfig[page.category] ?? categoryConfig[PageCategory.GENERAL];
  const followMutation = useFollowPage(page.id);
  const unfollowMutation = useUnfollowPage(page.id);
  const isToggling = followMutation.isPending || unfollowMutation.isPending;
  const { data: profile } = useUserProfile();

  const handleFollowToggle = () => {
    if (isToggling) return;

    const action = page.is_following ? unfollowMutation : followMutation;
    toast.promise(action.mutateAsync({ page: page.id }), {
      loading: page.is_following ? "Unfollowing..." : "Following...",
      success: page.is_following
        ? "Unfollowed page"
        : "Now following this page!",
      error: (err: Error) =>
        getApiErrorMessage(
          err,
          `${page.is_following ? "Unfollow" : "Follow"} failed`,
        ),
    });
  };

  const is_owner = page?.owner && profile?.id && page.owner.id === profile.id;

  return (
    <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden group/header">
      {/* Cover Image Section */}
      <div className="w-full h-40 sm:h-56 md:h-64 relative overflow-hidden">
        {page.cover_image_url ? (
          <>
            <img
              src={page.cover_image_url}
              alt={`${page.page_name} cover`}
              className="w-full h-full object-cover transition-transform duration-700 group-hover/header:scale-105"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent" />
          </>
        ) : (
          <div className="w-full h-full bg-linear-to-br from-primary/10 via-primary/5 to-white flex items-center justify-center">
            <div className="w-20 h-20 rounded-full bg-white/40 backdrop-blur-md flex items-center justify-center text-primary/20">
              <MdPublic size={40} />
            </div>
          </div>
        )}
      </div>

      {/* Info Section */}
      <div className="px-6 md:px-8 pb-8 pt-4">
        <div className="flex flex-col md:flex-row md:items-start gap-6 relative">
          {/* Profile Avatar */}
          <div className="relative group/avatar -mt-16 md:-mt-20 shrink-0">
            <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-4xl border-8 border-white shadow-xl shadow-gray-200/50 bg-white overflow-hidden transform transition-transform duration-300 group-hover/avatar:scale-[1.02]">
              {page.profile_image_url ? (
                <img
                  src={page.profile_image_url}
                  alt={page.page_name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-linear-to-br from-primary/10 to-primary/20 flex items-center justify-center text-primary font-black text-4xl">
                  {page.page_name.charAt(0).toUpperCase()}
                </div>
              )}
            </div>
          </div>

          {/* Name + Meta */}
          <div className="flex-1 min-w-0 pt-2">
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span
                className={`inline-flex items-center gap-1.5 text-[10px] font-black uppercase tracking-wider px-3 py-1.5 rounded-xl border ${config.bg} ${config.border} ${config.color}`}
              >
                {config.icon}
                {config.label}
              </span>
              {page.is_following && (
                <span className="text-[10px] font-black text-primary uppercase tracking-widest bg-primary/5 px-3 py-1.5 rounded-xl border border-primary/10">
                  Following
                </span>
              )}
            </div>
            
            <h1 className="text-3xl sm:text-4xl font-black text-gray-900 truncate tracking-tight mb-3">
              {page.page_name}
            </h1>

            <div className="flex flex-wrap items-center gap-5 text-[13px] text-gray-400 font-bold uppercase tracking-tight">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-lg bg-gray-50 text-gray-400">
                  <MdPeopleOutline size={18} />
                </div>
                <span>
                  <strong className="text-gray-900">{page.followers_count}</strong>{" "}
                  {page.followers_count === 1 ? "Follower" : "Followers"}
                </span>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3 shrink-0 md:mb-2">
            {!is_owner && (
              <button
                onClick={handleFollowToggle}
                disabled={isToggling}
                className={`group/btn relative flex items-center gap-2 px-6 py-2.5 rounded-2xl text-sm font-bold transition-all duration-300 ${
                  page.is_following
                    ? "bg-gray-100 text-gray-700 hover:bg-red-50 hover:text-red-600 hover:border-red-100 border border-gray-200"
                    : "bg-primary text-white hover:bg-primary/95 shadow-lg shadow-primary/20"
                } ${isToggling ? "opacity-60 cursor-not-allowed" : "active:scale-95"}`}
              >
                {page.is_following ? (
                  <>
                    <MdPersonRemove size={18} />
                    <span>Unfollow</span>
                  </>
                ) : (
                  <>
                    <MdPersonAdd size={18} />
                    <span>Follow Page</span>
                  </>
                )}
              </button>
            )}
          </div>
        </div>

        {/* Creator Info */}
        {page.owner && (
          <div className="mt-6 pt-5 border-t border-gray-50 flex items-center justify-between">
            <div 
              className="flex items-center gap-3 cursor-pointer group/creator"
              onClick={() => navigate(`/public/users/${page.owner.id}`)}
            >
              <div className="w-8 h-8 rounded-xl bg-gray-100 border border-gray-50 overflow-hidden shrink-0 group-hover/creator:ring-2 ring-primary/20 transition-all">
                {page.owner.profile_image_url ? (
                  <img
                    src={page.owner.profile_image_url}
                    alt={page.owner.first_name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs font-bold uppercase">
                    {page.owner.first_name.charAt(0)}
                  </div>
                )}
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Administrator</span>
                <span className="text-sm font-bold text-gray-700 group-hover:text-primary transition-colors">
                  {page.owner.first_name} {page.owner.last_name}
                </span>
              </div>
            </div>

            <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full bg-gray-50 border border-gray-100 text-[10px] text-gray-400 font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
              Active Member
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PageDetailHeader;
