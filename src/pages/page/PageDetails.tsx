import { useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { usePageDetails } from "@/hooks/pages/usePageDetails";
import { usePagePosts, useDeletePagePost } from "@/hooks/pages/usePagePosts";
import PageDetailHeader from "@/components/pages/PageDetailHeader";
import PageAboutSection from "@/components/pages/PageAboutSection";
import PagePostCard from "@/components/pages/PagePostCard";
import CreatePagePost from "@/components/pages/CreatePagePost";
import { getApiErrorMessage } from "@/utils/getApiErrorMessage";
import toast from "react-hot-toast";
import { MdArrowBack } from "react-icons/md";

const PageDetailSkeleton = () => (
  <div className="max-w-3xl mx-auto flex flex-col gap-4 p-2 sm:p-4 animate-pulse">
    {/* Cover */}
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      <div className="w-full h-48 bg-gray-200" />
      <div className="px-6 pb-4">
        <div className="flex items-end gap-4 -mt-12">
          <div className="w-24 h-24 rounded-full bg-gray-200 border-4 border-white" />
          <div className="flex flex-col gap-2 pb-1 flex-1">
            <div className="h-5 bg-gray-200 rounded w-48" />
            <div className="h-3 bg-gray-100 rounded w-32" />
          </div>
        </div>
      </div>
    </div>
    {/* About */}
    <div className="bg-white rounded-xl border border-gray-200 p-5">
      <div className="h-4 bg-gray-200 rounded w-20 mb-3" />
      <div className="h-3 bg-gray-100 rounded w-full mb-2" />
      <div className="h-3 bg-gray-100 rounded w-3/4" />
    </div>
    {/* Posts */}
    {[1, 2].map((i) => (
      <div key={i} className="bg-white rounded-xl border border-gray-200 p-4">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-9 h-9 rounded-full bg-gray-200" />
          <div className="flex flex-col gap-1">
            <div className="h-3 bg-gray-200 rounded w-28" />
            <div className="h-2 bg-gray-100 rounded w-16" />
          </div>
        </div>
        <div className="h-3 bg-gray-100 rounded w-full mb-1" />
        <div className="h-3 bg-gray-100 rounded w-2/3" />
      </div>
    ))}
  </div>
);

const PageDetails = () => {
  const { pageId } = useParams<{ pageId: string }>();
  const navigate = useNavigate();
  const id = Number(pageId);

  const {
    data: page,
    isLoading: pageLoading,
    isError: pageError,
    error: pageErr,
    refetch: refetchPage,
  } = usePageDetails(id);

  const {
    data: posts,
    isLoading: postsLoading,
    isError: postsError,
  } = usePagePosts(id);

  const deleteMutation = useDeletePagePost(id);

  useEffect(() => {
    if (pageError && pageErr) {
      toast.error(getApiErrorMessage(pageErr, "Failed to load page"));
    }
  }, [pageError, pageErr]);

  useEffect(() => {
    if (postsError) {
      toast.error("Failed to load posts. Try refreshing.");
    }
  }, [postsError]);

  const handleDeletePost = (postId: number) => {
    if (!confirm("Delete this post?")) return;

    toast.promise(deleteMutation.mutateAsync(postId), {
      loading: "Deleting post...",
      success: "Post deleted",
      error: (err) => getApiErrorMessage(err, "Failed to delete post"),
    });
  };

  if (pageLoading) return <PageDetailSkeleton />;

  if (pageError) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-3">
        <div className="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center">
          <span className="text-red-500 text-2xl">!</span>
        </div>
        <p className="text-gray-600 font-medium">Failed to load page</p>
        <p className="text-sm text-gray-400">
          {pageErr?.message || "Something went wrong"}
        </p>
        <div className="flex gap-2">
          <button
            onClick={() => navigate("/pages")}
            className="px-4 py-2 border border-gray-200 rounded-lg text-sm hover:bg-gray-50 transition-colors"
          >
            Go Back
          </button>
          <button
            onClick={() => refetchPage()}
            className="px-4 py-2 bg-primary text-white rounded-lg text-sm hover:bg-primary/90 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!page) return null;

  return (
    <div className="w-full h-full bg-skin overflow-y-auto">
      <div className="max-w-3xl mx-auto flex flex-col gap-4 p-2 sm:p-4">
        {/* Back Button */}
        <button
          onClick={() => navigate("/pages")}
          className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700 w-fit transition-colors"
        >
          <MdArrowBack size={18} />
          <span>Back to pages</span>
        </button>

        {/* Header */}
        <PageDetailHeader page={page} />

        {/* Two Column Layout on large screens */}
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Sidebar - About */}
          <div className="w-full lg:w-80 shrink-0">
            <div className="lg:sticky lg:top-4">
              <PageAboutSection page={page} />
            </div>
          </div>

          {/* Main - Posts */}
          <div className="flex-1 flex flex-col gap-4 min-w-0">
            {/* Post Composer */}
            <CreatePagePost pageId={page.id} />

            {/* Posts Feed */}
            {postsLoading && (
              <div className="flex flex-col gap-3">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="bg-white rounded-xl border border-gray-200 p-4 animate-pulse"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-9 h-9 rounded-full bg-gray-200" />
                      <div className="flex flex-col gap-1">
                        <div className="h-3 bg-gray-200 rounded w-28" />
                        <div className="h-2 bg-gray-100 rounded w-16" />
                      </div>
                    </div>
                    <div className="h-3 bg-gray-100 rounded w-full mb-1" />
                    <div className="h-3 bg-gray-100 rounded w-2/3" />
                  </div>
                ))}
              </div>
            )}

            {postsError && (
              <div className="bg-white rounded-xl border border-gray-200 p-6 text-center">
                <p className="text-sm text-gray-500">
                  Failed to load posts. Try refreshing the page.
                </p>
              </div>
            )}

            {!postsLoading && !postsError && posts && posts.length === 0 && (
              <div className="bg-white rounded-xl border border-gray-200 p-8 text-center">
                <p className="text-gray-500 text-sm">
                  No posts yet. Be the first to post!
                </p>
              </div>
            )}

            {!postsLoading &&
              !postsError &&
              posts &&
              posts.map((post) => (
                <PagePostCard
                  key={post.id}
                  post={post}
                  onDelete={handleDeletePost}
                  isDeleting={deleteMutation.isPending}
                />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageDetails;
