import { AllPagesItem, PageCategory } from "@/types/pages/basic.types";
import { useNavigate } from "react-router";
import {
  MdBusiness,
  MdEvent,
  MdGroups,
  MdPublic,
  MdLanguage,
  MdLocationOn,
} from "react-icons/md";

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

const PageCard = ({ page }: { page: AllPagesItem }) => {
  const navigate = useNavigate();
  const config = categoryConfig[page.category] ?? categoryConfig[PageCategory.GENERAL];

  const description =
    page.bio ||
    page.company_bio ||
    page.event_description ||
    page.community_details ||
    null;

  const subtitle =
    page.company_name || page.event_name || null;

  return (
    <div
      onClick={() => navigate(`/pages/${page.id}`)}
      className="group bg-white rounded-xl border border-gray-200 overflow-hidden cursor-pointer hover:shadow-md hover:border-gray-300 transition-all duration-200"
    >
      {/* Cover Image */}
      <div className="w-full h-28 bg-gradient-to-br from-primary/10 to-primary/5 relative overflow-hidden">
        {page.cover_image_url ? (
          <img
            src={page.cover_image_url}
            alt={`${page.page_name} cover`}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <div className="w-12 h-12 rounded-full bg-white/60 flex items-center justify-center text-primary/40">
              {config.icon}
            </div>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col gap-2.5">
        {/* Profile + Name */}
        <div className="flex items-start gap-3 -mt-10 relative z-10">
          <div className="w-14 h-14 rounded-full border-2 border-white shadow-sm bg-white overflow-hidden shrink-0">
            {page.profile_image_url ? (
              <img
                src={page.profile_image_url}
                alt={page.page_name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-primary/10 flex items-center justify-center text-primary font-bold text-lg">
                {page.page_name.charAt(0).toUpperCase()}
              </div>
            )}
          </div>
          <div className="flex flex-col mt-8 min-w-0">
            <h3 className="font-semibold text-gray-900 text-sm truncate group-hover:text-primary transition-colors">
              {page.page_name}
            </h3>
            {subtitle && (
              <p className="text-xs text-gray-500 truncate">{subtitle}</p>
            )}
          </div>
        </div>

        {/* Category Badge */}
        <div className="flex items-center gap-2">
          <span
            className={`inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full border ${config.bg} ${config.color}`}
          >
            {config.icon}
            {config.label}
          </span>
        </div>

        {/* Description */}
        {description && (
          <p className="text-xs text-gray-600 line-clamp-2 leading-relaxed">
            {description}
          </p>
        )}

        {/* Footer Metadata */}
        <div className="flex items-center gap-3 pt-1 border-t border-gray-100 text-gray-400">
          {page.website && (
            <span className="inline-flex items-center gap-1 text-[11px] truncate max-w-[120px]">
              <MdLanguage size={12} />
              {page.website.replace(/^https?:\/\//, "")}
            </span>
          )}
          {page.country && (
            <span className="inline-flex items-center gap-1 text-[11px]">
              <MdLocationOn size={12} />
              {page.country}
            </span>
          )}
          {!page.website && !page.country && (
            <span className="text-[11px]">
              {new Date(page.created_at).toLocaleDateString()}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default PageCard;
