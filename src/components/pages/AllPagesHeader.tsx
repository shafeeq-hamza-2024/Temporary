import { PagesFilter } from "@/types/pages/basic.types";
import { GrAdd } from "react-icons/gr";
import { MdSearch } from "react-icons/md";

const AllPagesHeader = ({
  search,
  setSearch,
  filter,
  setFilter,
  setOpenCreate,
}: {
  search: string;
  setSearch: (search: string) => void;
  filter: PagesFilter;
  setFilter: (filter: PagesFilter) => void;
  setOpenCreate: (open: boolean) => void;
}) => {
  return (
    <div className="w-full flex flex-col gap-4 mb-2">
      {/* Top Header - Title & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
            Pages
          </h1>
          <p className="text-sm text-gray-500 mt-0.5">
            Discover and connect with companies, events, and communities
          </p>
        </div>

        <button
          onClick={() => setOpenCreate(true)}
          className="inline-flex items-center justify-center gap-1.5 px-4 py-2 bg-primary text-white font-medium rounded-xl hover:bg-primary/90 transition-all shadow-sm active:scale-[0.98] shrink-0 w-full sm:w-auto"
        >
          <GrAdd size={16} />
          <span>Create Page</span>
        </button>
      </div>

      {/* Control Bar - Tabs & Search */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 bg-white p-2 rounded-xl border border-gray-200 shadow-sm">
        {/* Tabs */}
        <div className="flex bg-gray-100/80 p-1 rounded-lg w-full md:w-auto overflow-x-auto no-scrollbar">
          <button
            onClick={() => setFilter(PagesFilter.ALL)}
            className={`flex-1 md:flex-none px-4 py-1.5 text-sm font-medium rounded-md transition-all whitespace-nowrap ${
              filter === PagesFilter.ALL
                ? "bg-primary text-white shadow-sm"
                : "bg-white text-black hover:bg-black/5"
            }`}
          >
            All Pages
          </button>
          <button
            onClick={() => setFilter(PagesFilter.MY_PAGES)}
            className={`flex-1 md:flex-none px-4 py-1.5 text-sm font-medium rounded-md transition-all whitespace-nowrap ${
              filter === PagesFilter.MY_PAGES
                ? "bg-primary text-white shadow-sm"
                : "bg-white text-black hover:bg-black/5"
            }`}
          >
            My Pages
          </button>
        </div>

        {/* Search */}
        <div className="relative group w-full md:w-72">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <MdSearch className="h-5 w-5 text-gray-400 group-focus-within:text-primary transition-colors" />
          </div>
          <input
            type="text"
            placeholder="Search pages..."
            className="block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-lg bg-gray-50 focus:bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all placeholder:text-gray-400"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};

export default AllPagesHeader;
