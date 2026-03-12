import CreatePagePost from "@/components/pages/CreatePagePost";
import PageAboutSection from "@/components/pages/PageAboutSection";
import PageDetailHeader from "@/components/pages/PageDetailHeader";
import PagePostCard from "@/components/pages/PagePostCard";
import { usePageDetails } from "@/hooks/pages/usePageDetails";
import { useDeletePagePost, usePagePosts } from "@/hooks/pages/usePagePosts";
import { useUserProfile } from "@/hooks/profile/useUserProfile";
import { getApiErrorMessage } from "@/utils/getApiErrorMessage";
import { useEffect } from "react";
import toast from "react-hot-toast";
import {
  MdArrowBack,
  MdRefresh,
  MdSentimentVeryDissatisfied,
} from "react-icons/md";
import { useNavigate, useParams } from "react-router";

const PageDetailSkeleton = () => (
  <div className="w-full h-full bg-skin/30 animate-pulse overflow-hidden">
    <div className="max-w-7xl mx-auto p-4 sm:p-6 md:p-8 space-y-6">
      {/* Header Skeleton */}
      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden h-72 sm:h-96 relative">
        <div className="w-full h-48 sm:h-64 bg-gray-200" />
        <div className="px-8 pb-6">
          <div className="flex items-end gap-6 -mt-14 sm:-mt-16">
            <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-3xl bg-gray-300 border-8 border-white shadow-lg" />
            <div className="flex-1 pb-2 space-y-3">
              <div className="h-6 bg-gray-200 rounded-full w-48 sm:w-64" />
              <div className="h-4 bg-gray-100 rounded-full w-32 sm:w-40" />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Sidebar Skeleton */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white rounded-3xl border border-gray-100 p-6 space-y-4 shadow-sm">
            <div className="h-5 bg-gray-200 rounded-full w-24 mb-6" />
            <div className="space-y-3">
              <div className="h-3 bg-gray-100 rounded-full w-full" />
              <div className="h-3 bg-gray-100 rounded-full w-5/6" />
              <div className="h-3 bg-gray-100 rounded-full w-4/6" />
            </div>
          </div>
        </div>

        {/* Main Content Skeleton */}
        <div className="lg:col-span-8 space-y-6">
          {[1, 2].map((i) => (
            <div
              key={i}
              className="bg-white rounded-3xl border border-gray-100 p-6 space-y-4 shadow-sm"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-gray-200" />
                <div className="space-y-2">
                  <div className="h-4 bg-gray-200 rounded-full w-32" />
                  <div className="h-3 bg-gray-100 rounded-full w-20" />
                </div>
              </div>
              <div className="space-y-3 pt-2">
                <div className="h-3.5 bg-gray-100 rounded-full w-full" />
                <div className="h-3.5 bg-gray-100 rounded-full w-2/3" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

const ErrorState = ({
  message,
  onRetry,
  onBack,
}: {
  message: string;
  onRetry: () => void;
  onBack: () => void;
}) => (
  <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 text-center">
    <div className="w-24 h-24 rounded-3xl bg-red-50 flex items-center justify-center mb-6">
      <MdSentimentVeryDissatisfied className="text-red-500 text-5xl" />
    </div>
    <h3 className="text-2xl font-bold text-gray-900 mb-2">
      Something went wrong
    </h3>
    <p className="text-gray-500 max-w-md mb-8 leading-relaxed">
      {message ||
        "We couldn't load the page details. Please check your connection or try again later."}
    </p>
    <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
      <button
        onClick={onBack}
        className="flex items-center justify-center gap-2 px-8 py-3 rounded-2xl border border-gray-200 text-gray-700 font-medium hover:bg-gray-50 transition-all active:scale-95"
      >
        <MdArrowBack />
        Go back
      </button>
      <button
        onClick={onRetry}
        className="flex items-center justify-center gap-2 px-8 py-3 rounded-2xl bg-primary text-white font-medium hover:bg-primary/95 shadow-lg shadow-primary/20 transition-all active:scale-95"
      >
        <MdRefresh className="text-xl" />
        Try again
      </button>
    </div>
  </div>
);

const PageDetails = () => {
  const { pageId } = useParams<{ pageId: string }>();
  const navigate = useNavigate();
  const id = Number(pageId);
  const { data: profile } = useUserProfile();

  const {
    data: page,
    isLoading: pageLoading,
    isError: pageError,
    error: pageErr,
    refetch: refetchPage,
  } = usePageDetails(id);

  const is_owner = page?.owner?.id === profile?.id;

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

  if (pageError || !page) {
    return (
      <div className="w-full min-h-screen bg-skin overflow-y-auto">
        <ErrorState
          message={pageErr?.message || "Failed to load page details"}
          onRetry={() => refetchPage()}
          onBack={() => navigate("/pages")}
        />
      </div>
    );
  }

  return (
    <div className="w-full min-h-full bg-gray-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-6 pb-24 space-y-6">
        {/* Navigation Bar */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => navigate("/pages")}
            className="group flex items-center gap-2.5 px-4 py-2 rounded-2xl bg-white border border-gray-100 shadow-xs hover:shadow-md hover:border-primary/20 transition-all duration-300"
          >
            <div className="p-1.5 rounded-xl bg-gray-50 group-hover:bg-primary/10 group-hover:text-primary transition-colors">
              <MdArrowBack size={18} />
            </div>
            <span className="text-sm font-semibold text-gray-600 group-hover:text-primary transition-colors">
              Back to pages
            </span>
          </button>
        </div>

        {/* Content Section */}
        <div className="flex flex-col gap-6">
          {/* Header Card */}
          <div className="transform transition-all duration-500 ease-out translate-y-0 opacity-100">
            <PageDetailHeader page={page} />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Sidebar - Quick info */}
            <aside className="lg:col-span-4 lg:sticky lg:top-6 space-y-6 order-2 lg:order-1">
              <PageAboutSection page={page} />
            </aside>

            {/* Main Content - Feed */}
            <main className="lg:col-span-8 space-y-6 order-1 lg:order-2">
              {/* Creator Section */}
              {is_owner && (
                <div className="transform hover:-translate-y-0.5 transition-transform duration-300">
                  <CreatePagePost pageId={page.id} />
                </div>
              )}

              {/* Feed Meta */}
              <div className="flex items-center justify-between px-1">
                <h3 className="text-lg font-bold text-gray-900">
                  Recent Posts
                </h3>
                <div className="h-px flex-1 mx-4 bg-gray-200 hidden sm:block" />
                <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">
                  {posts?.length || 0} {posts?.length === 1 ? "Post" : "Posts"}
                </span>
              </div>

              {/* Posts Feed */}
              <div className="space-y-6">
                {postsLoading && (
                  <div className="space-y-4">
                    {[1, 2].map((i) => (
                      <div
                        key={i}
                        className="bg-white rounded-3xl border border-gray-100 p-6 animate-pulse"
                      >
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-10 h-10 rounded-2xl bg-gray-100" />
                          <div className="space-y-2">
                            <div className="h-3 bg-gray-100 rounded-full w-24" />
                            <div className="h-2 bg-gray-50 rounded-full w-16" />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div className="h-3 bg-gray-50 rounded-full w-full" />
                          <div className="h-3 bg-gray-50 rounded-full w-2/3" />
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {postsError && (
                  <div className="bg-white rounded-3xl border border-dashed border-gray-200 p-12 text-center">
                    <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
                      <MdSentimentVeryDissatisfied className="text-red-400 text-3xl" />
                    </div>
                    <p className="text-gray-500 font-medium">
                      Unable to load posts at the moment
                    </p>
                    <button
                      onClick={() => window.location.reload()}
                      className="mt-4 text-sm text-primary font-semibold hover:underline"
                    >
                      Try Refreshing
                    </button>
                  </div>
                )}

                {!postsLoading &&
                  !postsError &&
                  posts &&
                  posts.length === 0 && (
                    <div className="bg-white rounded-3xl border border-dashed border-gray-200 p-16 text-center shadow-xs">
                      <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                        <MdRefresh className="text-gray-300 text-3xl animate-spin-slow" />
                      </div>
                      <p className="text-gray-900 font-bold text-lg mb-1">
                        No posts yet
                      </p>
                      <p className="text-gray-500 text-sm max-w-xs mx-auto">
                        There are no updates from this page yet. Check back soon
                        for new content!
                      </p>
                    </div>
                  )}

                {!postsLoading &&
                  !postsError &&
                  posts &&
                  posts.map((post) => (
                    <div
                      key={post.id}
                      className="transform hover:-translate-y-0.5 transition-transform duration-300"
                    >
                      <PagePostCard
                        post={post}
                        page={page}
                        isOwner={is_owner}
                        onDelete={handleDeletePost}
                        isDeleting={deleteMutation.isPending}
                      />
                    </div>
                  ))}
              </div>
            </main>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageDetails;
