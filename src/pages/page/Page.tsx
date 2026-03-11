import FilterDialog from "@/components/pages/FilterDialog";
import PageCard from "@/components/pages/PageCard";
import { PagesFilter, PagesSort } from "@/types/pages/basic.types";
import { useEffect, useMemo, useState } from "react";
import { getApiErrorMessage } from "@/utils/getApiErrorMessage";
import toast from "react-hot-toast";

import { useSearchParams } from "react-router";
import CreateNewPage from "@/components/pages/CreateNewPage";
import AllPagesHeader from "@/components/pages/AllPagesHeader";
import { usePages, useMyPages } from "@/hooks/pages/usePages";

const PageSkeleton = () => (
  <div className="bg-white rounded-xl border border-gray-200 overflow-hidden animate-pulse">
    <div className="w-full h-28 bg-gray-200" />
    <div className="p-4 flex flex-col gap-3">
      <div className="flex items-start gap-3 -mt-10">
        <div className="w-14 h-14 rounded-full bg-gray-200 border-2 border-white shrink-0" />
        <div className="flex flex-col gap-1.5 mt-8 w-full">
          <div className="h-4 bg-gray-200 rounded w-3/4" />
          <div className="h-3 bg-gray-100 rounded w-1/2" />
        </div>
      </div>
      <div className="h-5 bg-gray-100 rounded-full w-20" />
      <div className="h-3 bg-gray-100 rounded w-full" />
      <div className="h-3 bg-gray-100 rounded w-2/3" />
    </div>
  </div>
);

const Page = () => {
  const [searchParams, _] = useSearchParams();
  const typeFilter = searchParams.get("type");
  console.log(typeFilter);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<PagesFilter>(PagesFilter.ALL);
  const [openFilter, setOpenFilter] = useState<boolean>(false);
  const [openCreate, setOpenCreate] = useState<boolean>(false);
  const [sort, setSort] = useState<PagesSort>(PagesSort.ASC);

  const isMyPages = filter === PagesFilter.MY_PAGES;
  const allPagesQuery = usePages();
  const myPagesQuery = useMyPages();

  const activeQuery = isMyPages ? myPagesQuery : allPagesQuery;
  const { data: pages, isLoading, isError, error, refetch } = activeQuery;

  useEffect(() => {
    if (isError && error) {
      toast.error(getApiErrorMessage(error, "Failed to load pages"));
    }
  }, [isError, error]);

  const filteredPages = useMemo(() => {
    if (!pages) return [];

    let result = [...pages];

    // Search filter
    if (search.trim()) {
      const searchLower = search.trim().toLowerCase();
      result = result.filter((p) =>
        p.page_name.toLowerCase().includes(searchLower),
      );
    }

    // Sort
    result.sort((a, b) => {
      const comparison = a.page_name.localeCompare(b.page_name);
      return sort === PagesSort.ASC ? comparison : -comparison;
    });

    return result;
  }, [pages, search, sort]);

  return (
    <>
      <div className="w-full h-full bg-skin p-2 flex flex-col gap-2">
        <AllPagesHeader
          search={search}
          setSearch={setSearch}
          sort={sort}
          setSort={(value: PagesSort) => setSort(value)}
          setOpenFilter={setOpenFilter}
          setOpenCreate={setOpenCreate}
        />

        <div className="w-full flex-1 overflow-y-auto">
          {/* Loading State */}
          {isLoading && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-2">
              {Array.from({ length: 8 }).map((_, i) => (
                <PageSkeleton key={i} />
              ))}
            </div>
          )}

          {/* Error State */}
          {isError && (
            <div className="flex flex-col items-center justify-center py-20 gap-3">
              <div className="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center">
                <span className="text-red-500 text-2xl">!</span>
              </div>
              <p className="text-gray-600 font-medium">Failed to load pages</p>
              <p className="text-sm text-gray-400">
                {error?.message || "Something went wrong"}
              </p>
              <button
                onClick={() => refetch()}
                className="mt-2 px-4 py-2 bg-primary text-white rounded-lg text-sm hover:bg-primary/90 transition-colors"
              >
                Try Again
              </button>
            </div>
          )}

          {/* Empty State */}
          {!isLoading && !isError && filteredPages.length === 0 && (
            <div className="flex flex-col items-center justify-center py-20 gap-3">
              <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center">
                <span className="text-gray-400 text-2xl">📄</span>
              </div>
              <p className="text-gray-600 font-medium">
                {search.trim() ? "No pages match your search" : "No pages yet"}
              </p>
              <p className="text-sm text-gray-400">
                {search.trim()
                  ? "Try a different search term"
                  : "Create your first page to get started"}
              </p>
              {!search.trim() && (
                <button
                  onClick={() => setOpenCreate(true)}
                  className="mt-2 px-4 py-2 bg-primary text-white rounded-lg text-sm hover:bg-primary/90 transition-colors"
                >
                  Create Page
                </button>
              )}
            </div>
          )}

          {/* Pages Grid */}
          {!isLoading && !isError && filteredPages.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-2">
              {filteredPages.map((page) => (
                <PageCard key={page.id} page={page} />
              ))}
            </div>
          )}
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
