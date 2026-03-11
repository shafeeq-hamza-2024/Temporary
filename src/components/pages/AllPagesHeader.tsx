import { PagesSort } from "@/types/pages/basic.types";
import { GrAdd } from "react-icons/gr";
import { MdSearch } from "react-icons/md";
const AllPagesHeader = ({
  search,
  setSearch,
  sort,
  setSort,
  setOpenFilter,
  setOpenCreate,
}: {
  search: string;
  setSearch: (search: string) => void;
  sort: PagesSort;
  setSort: (sort: PagesSort) => void;
  setOpenFilter: (open: boolean) => void;
  setOpenCreate: (open: boolean) => void;
}) => {
  return (
    <div className="w-full border bg-white p-2 grid grid-cols-12 rounded-lg gap-1">
      <div className="col-span-8 lg:col-span-10 flex justify-start items-center gap-2 border rounded-lg px-2">
        <MdSearch />
        <input
          type="text"
          placeholder="Search by page's name"
          className="p-2 border-none focus:border-none focus:ring-0 focus:outline-none w-full"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* <button
        className="col-span-4  border rounded-lg px-2 bg-primary text-white flex justify-center items-center gap-2"
        onClick={() => setOpenFilter(true)}
      >
        <GrFilter /> Filter
      </button>
      <button
        className="col-span-4  border rounded-lg px-2 bg-primary text-white flex justify-center items-center gap-2"
        onClick={() =>
          setSort(sort === PagesSort.ASC ? PagesSort.DESC : PagesSort.ASC)
        }
      >
        {sort === PagesSort.ASC ? (
          <RiSortAlphabetAsc />
        ) : (
          <RiSortAlphabetDesc />
        )}
        Sort
      </button> */}
      <button
        className="col-span-4 lg:col-span-2 border rounded-lg px-2 bg-primary text-white flex justify-center items-center gap-2"
        onClick={() => setOpenCreate(true)}
      >
        <GrAdd />
        Add
        <div className="hidden sm:block"> Page</div>
      </button>
    </div>
  );
};

export default AllPagesHeader;
