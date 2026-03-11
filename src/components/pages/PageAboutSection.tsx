import { PageDetails, PageCategory } from "@/types/pages/basic.types";
import {
  MdLanguage,
  MdLocationOn,
  MdBusiness,
  MdCalendarToday,
  MdInfo,
} from "react-icons/md";

const PageAboutSection = ({ page }: { page: PageDetails }) => {
  const description =
    page.bio ||
    page.company_bio ||
    page.event_description ||
    page.community_details ||
    null;

  const hasDetails =
    description ||
    page.website ||
    page.country ||
    page.state ||
    page.company_name ||
    page.official_website ||
    page.event_name ||
    page.cin;

  if (!hasDetails) return null;

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-5">
      <h2 className="font-semibold text-gray-900 text-base mb-3 flex items-center gap-2">
        <MdInfo size={18} className="text-gray-400" />
        About
      </h2>

      <div className="flex flex-col gap-3">
        {/* Bio / Description */}
        {description && (
          <p className="text-sm text-gray-600 leading-relaxed">{description}</p>
        )}

        {/* Category Specific Info */}
        {page.category === PageCategory.COMPANY && (
          <div className="flex flex-col gap-2">
            {page.company_name && (
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <MdBusiness size={16} className="text-gray-400 shrink-0" />
                <span className="truncate">{page.company_name}</span>
              </div>
            )}
            {page.official_website && (
              <div className="flex items-center gap-2 text-sm">
                <MdLanguage size={16} className="text-gray-400 shrink-0" />
                <a
                  href={
                    page.official_website.startsWith("http")
                      ? page.official_website
                      : `https://${page.official_website}`
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline truncate"
                >
                  {page.official_website.replace(/^https?:\/\//, "")}
                </a>
              </div>
            )}
            {page.cin && (
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <span className="text-xs font-medium text-gray-400 shrink-0">
                  CIN
                </span>
                <span className="truncate">{page.cin}</span>
              </div>
            )}
          </div>
        )}

        {page.category === PageCategory.EVENT && page.event_name && (
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <MdCalendarToday size={16} className="text-gray-400 shrink-0" />
            <span className="truncate">{page.event_name}</span>
          </div>
        )}

        {page.category === PageCategory.EVENT &&
          page.tags &&
          page.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {page.tags.map((tag, i) => (
                <span
                  key={i}
                  className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

        {/* General Details */}
        {page.website && (
          <div className="flex items-center gap-2 text-sm">
            <MdLanguage size={16} className="text-gray-400 shrink-0" />
            <a
              href={
                page.website.startsWith("http")
                  ? page.website
                  : `https://${page.website}`
              }
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline truncate"
            >
              {page.website.replace(/^https?:\/\//, "")}
            </a>
          </div>
        )}

        {(page.country || page.state) && (
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <MdLocationOn size={16} className="text-gray-400 shrink-0" />
            <span className="truncate">
              {[page.state, page.country].filter(Boolean).join(", ")}
              {page.zip && ` - ${page.zip}`}
            </span>
          </div>
        )}

        {/* Created Date */}
        <div className="flex items-center gap-2 text-xs text-gray-400 pt-2 border-t border-gray-100">
          <MdCalendarToday size={14} />
          <span>Created {new Date(page.created_at).toLocaleDateString()}</span>
        </div>
      </div>
    </div>
  );
};

export default PageAboutSection;
