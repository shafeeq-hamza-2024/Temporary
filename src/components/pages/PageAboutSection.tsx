import { PageDetails, PageCategory } from "@/types/pages/basic.types";
import {
  MdLanguage,
  MdLocationOn,
  MdBusiness,
  MdCalendarToday,
  MdInfoOutline,
  MdAssignment,
  MdLocalOffer,
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
    <div className="bg-white rounded-3xl border border-gray-100 p-6 shadow-sm space-y-6">
      <div className="flex items-center gap-2.5 mb-2">
        <div className="p-2 rounded-xl bg-gray-50 text-gray-400">
          <MdInfoOutline size={20} />
        </div>
        <h2 className="font-bold text-gray-900 text-lg tracking-tight">
          About
        </h2>
      </div>

      <div className="space-y-6">
        {/* Bio / Description */}
        {description && (
          <div className="relative">
            <p className="text-sm text-gray-600 leading-relaxed font-medium">
              {description}
            </p>
          </div>
        )}

        {/* Info Grid */}
        <div className="space-y-4 pt-2">
          {/* Category Specific Info */}
          {page.category === PageCategory.COMPANY && (
            <>
              {page.company_name && (
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-blue-500 shrink-0">
                    <MdBusiness size={18} />
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Company Name</span>
                    <span className="text-sm font-semibold text-gray-700 truncate">{page.company_name}</span>
                  </div>
                </div>
              )}
              {page.official_website && (
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-500 shrink-0">
                    <MdLanguage size={18} />
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Official Website</span>
                    <a
                      href={
                        page.official_website.startsWith("http")
                          ? page.official_website
                          : `https://${page.official_website}`
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-semibold text-primary hover:underline truncate"
                    >
                      {page.official_website.replace(/^https?:\/\//, "")}
                    </a>
                  </div>
                </div>
              )}
              {page.cin && (
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center text-gray-500 shrink-0">
                    <MdAssignment size={18} />
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">CIN Number</span>
                    <span className="text-sm font-semibold text-gray-700 truncate">{page.cin}</span>
                  </div>
                </div>
              )}
            </>
          )}

          {page.category === PageCategory.EVENT && page.event_name && (
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-amber-50 flex items-center justify-center text-amber-500 shrink-0">
                <MdCalendarToday size={18} />
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Event Title</span>
                <span className="text-sm font-semibold text-gray-700 truncate">{page.event_name}</span>
              </div>
            </div>
          )}

          {page.category === PageCategory.EVENT &&
            page.tags &&
            page.tags.length > 0 && (
              <div className="flex flex-col gap-2">
                 <div className="flex items-center gap-2 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                   <MdLocalOffer size={12} />
                   <span>Tags</span>
                 </div>
                <div className="flex flex-wrap gap-2">
                  {page.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="text-[11px] font-bold bg-gray-50 text-gray-600 px-3 py-1 rounded-lg border border-gray-100"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

          {/* General Details */}
          {page.website && (
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-500 shrink-0">
                <MdLanguage size={18} />
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Website</span>
                <a
                  href={
                    page.website.startsWith("http")
                      ? page.website
                      : `https://${page.website}`
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-semibold text-primary hover:underline truncate"
                >
                  {page.website.replace(/^https?:\/\//, "")}
                </a>
              </div>
            </div>
          )}

          {(page.country || page.state) && (
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-500 shrink-0">
                <MdLocationOn size={18} />
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Location</span>
                <span className="text-sm font-semibold text-gray-700 truncate">
                  {[page.state, page.country].filter(Boolean).join(", ")}
                  {page.zip && ` (${page.zip})`}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Footer Info */}
        <div className="pt-5 mt-2 border-t border-gray-50">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-[11px] text-gray-400 font-bold uppercase tracking-tight">
              <MdCalendarToday size={14} className="text-gray-300" />
              <span>Joined {new Date(page.created_at).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}</span>
            </div>
            <div className="w-1.5 h-1.5 rounded-full bg-primary/20" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageAboutSection;
