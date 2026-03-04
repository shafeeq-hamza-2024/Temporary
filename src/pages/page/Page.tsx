import FilterDialog from "@/components/pages/FilterDialog";
import { PagesFilter, PagesSort } from "@/types/pages/basic.types";
import { useState } from "react";
import { GrAdd, GrFilter } from "react-icons/gr";
import { MdSearch } from "react-icons/md";
import { RiSortAlphabetAsc, RiSortAlphabetDesc } from "react-icons/ri";
import { useSearchParams } from "react-router";
import CreateNewPage from "@/components/pages/CreateNewPage";

const Page = () => {
  const [searchParams, _] = useSearchParams();
  const typeFilter = searchParams.get("type");
  console.log(typeFilter);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<PagesFilter>(PagesFilter.ALL);
  const [openFilter, setOpenFilter] = useState<boolean>(false);
  const [openCreate, setOpenCreate] = useState<boolean>(false);
  const [sort, setSort] = useState<PagesSort>(PagesSort.ASC);

  return (
    <>
      <div className="w-full h-full bg-skin p-2">
        <div className="w-full border bg-white p-2 grid grid-cols-12 rounded-lg gap-2">
          <div className="col-span-9 flex justify-start items-center gap-2 border rounded-lg px-2">
            <MdSearch />
            <input
              type="text"
              placeholder="Search by page's name"
              className="p-2 border-none focus:border-none focus:ring-0 focus:outline-none w-full"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <button
            className="col-span-1 border rounded-lg px-2 bg-primary text-white flex justify-center items-center gap-2"
            onClick={() => setOpenFilter(true)}
          >
            <GrFilter /> Filter
          </button>
          <button
            className="col-span-1 border rounded-lg px-2 bg-primary text-white flex justify-center items-center gap-2"
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
          </button>
          <button
            className="col-span-1 border rounded-lg px-2 bg-primary text-white flex justify-center items-center gap-2"
            onClick={() => setOpenCreate(true)}
          >
            <GrAdd /> Add Page
          </button>
        </div>
      </div>
      <FilterDialog
        open={openFilter}
        setOpen={(value: boolean) => setOpenFilter(value)}
        value={filter}
        setValue={(value: PagesFilter) => setFilter(value)}
      />
      <CreateNewPage open={openCreate} setOpen={setOpenCreate} />
    </>
  );
};

export default Page;
