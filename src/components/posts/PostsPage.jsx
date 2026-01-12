import { useState, useRef, use } from "react";

import { Link } from "react-router";
import DOMPurify from "dompurify";

import { usePosts } from "../../hooks/posts/usePosts";
import { useLikePost } from "../../hooks/posts/useLikePost";
import { useBookmarkPost } from "../../hooks/posts/useBookmarkPost";
import { useCommentPost } from "../../hooks/posts/useCommentPost";
import { useCreatePost } from "../../hooks/posts/useCreatePost";
import { Editor } from "@tinymce/tinymce-react";
import { useUserProfile } from "../../hooks/profile/useUserProfile";
import { useResearchNews } from "../../hooks/news/useResearchNews";

import { useNavigate } from "react-router";
import "./PostsPage.css";
import { getOgiMeta } from "../../api/ogiApi";

export default function PostsPage() {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [postType, setPostType] = useState("post"); // post | image | article
  const [form, setForm] = useState({
    title: "",
    content: "",
    files: [],
  });
  const {
    data: news = [],
    isLoading: isNewsLoading,
  } = useResearchNews();

  const {
    data: posts = [],
    isLoading: isPostsLoading,
    isError,
  } = usePosts();

  const { data: profile, isLoading: profileLoading } = useUserProfile();

  const createPost = useCreatePost();
  const [showPreview, setShowPreview] = useState(false);
  const [viewerOpen, setViewerOpen] = useState(false);
  const [viewerImages, setViewerImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);



  const fileRef = useRef(null);


  const likePost = useLikePost();
  const bookmarkPost = useBookmarkPost();
  const commentPost = useCommentPost();

  const [commentText, setCommentText] = useState({});

  const [files, setFiles] = useState([]); // new state for images
  const MAX_IMAGES = 6;

  const handleFileSelect = (e) => {
    const selected = Array.from(e.target.files);

    // Only images
    const imageFiles = selected.filter(file => file.type.startsWith("image/"));

    if (imageFiles.length !== selected.length) {
      alert("Only images are allowed");
    }

    setForm(prev => {
      const combined = [...prev.files, ...imageFiles];

      if (combined.length > 6) {
        alert("Maximum 6 images allowed");
        return combined.slice(0, 6);
      }
      return combined;
    });
  };

  const buildOgHtml = (res) => {
    const og = res.og;

    return `
    <div class="og-card" contenteditable="false"
         style="
           border:1px solid #e5e7eb;
           border-radius:8px;
           overflow:hidden;
           margin:12px 0;
           font-family:Arial,sans-serif;
         ">
      ${og["og:image"] ? `
        <img src="${og["og:image"]}"
             alt="${og["og:title"]}"
             style="width:100%;max-height:220px;object-fit:cover;" />
      ` : ""}

      <div style="padding:12px;">
        <div style="font-size:12px;color:#6b7280;margin-bottom:4px;">
          ${og["og:site_name"] || ""}
        </div>

        <div style="font-size:16px;font-weight:600;margin-bottom:6px;">
          ${og["og:title"]}
        </div>

        <div style="font-size:14px;color:#374151;">
          ${og["og:description"] || ""}
        </div>

        <a href="${res.url}"
           target="_blank"
           style="display:inline-block;margin-top:8px;font-size:13px;color:#2563eb;">
          Read more →
        </a>
      </div>
    </div><p></p>
  `;
  };




  const handleCreatePost = () => {
    if (!form.content?.trim() && form.files.length === 0) return;

    createPost.mutate(
      {
        title: form.title?.trim() || "",
        content: form.content?.trim() || "",
        files: form.files, // <-- array of files
      },
      {
        onSuccess: () => {
          setShowModal(false);
          setForm({ title: "", content: "", files: [] });
        },
      }
    );

  };




  const closeModal = () => {
    setShowModal(false);
    setForm({
      title: "",
      content: "",
      files: [],
    });

  };



  const handleCommentSubmit = (postId) => {
    const text = commentText[postId];
    if (!text?.trim()) return;

    commentPost.mutate(
      { postId, c_content: text },
      {
        onSuccess: () =>
          setCommentText((prev) => ({ ...prev, [postId]: "" })),
      }
    );
  };





  {/* NEWS */ }
  {/* POSTS LOADING */ }
  {
    isPostsLoading && (
      <div className="text-center py-5">Loading posts...</div>
    )
  }

  {/* NEWS LOADING */ }
  {
    isNewsLoading && (
      <div className="small text-muted">Loading research news...</div>
    )
  }



  if (isError) {
    return (
      <div className="text-danger text-center py-5">
        Failed to load posts
      </div>
    );
  }




  return (
    <div className="container-fluid py-4" style={{ background: "#f3f2ef" }}>
      <div className="container">
        <div className="row g-4">

          {/* ================= LEFT SIDEBAR ================= */}
          <div className="col-lg-3 d-none d-lg-block">
            <div className="card border-0 shadow-sm rounded-4 mb-3 profile-card">

              <div className="card-body text-center">

                {/* PROFILE IMAGE */}
                {profile?.profile_image ? (
                  <img
                    src={profile.profile_image}
                    className="rounded-circle mb-2"
                    width="80"
                    height="80"
                    style={{ objectFit: "cover" }}
                    alt="Profile"
                  />
                ) : (
                  <div
                    className="rounded-circle bg-secondary text-white d-flex align-items-center justify-content-center mx-auto mb-2"
                    style={{ width: 80, height: 80, fontSize: 28 }}
                  >
                    {profile?.first_name?.[0]}
                    {profile?.last_name?.[0]}
                  </div>
                )}

                {/* FULL NAME */}
                <h6 className="fw-semibold mb-1 fs-6">

                  {profileLoading
                    ? "Loading..."
                    : `${profile?.first_name || ""} ${profile?.middle_name || ""} ${profile?.last_name || ""}`}
                </h6>

                {/* PROFILE TITLE */}
                {profile?.profile_title && (
                  <small className="text-muted d-block mt-1">
                    {profile.profile_title}
                  </small>
                )}

                <hr className="my-2" />

                {/* CURRENT ROLE */}
                <div className="role-box mt-1">
                  {profile?.professional_detail?.current_role && (
                    <div className="fw-medium">
                      {profile.professional_detail.current_role}
                    </div>
                  )}
                  {profile?.professional_detail?.current_organization && (
                    <div className="small text-muted">
                      {profile.professional_detail.current_organization}
                    </div>
                  )}
                </div>


                {/* CTA */}
                <Link
                  to="/user/profile"
                  className="btn btn-outline-primary btn-sm w-100 mt-"
                >
                  View Profile
                </Link>
              </div>
            </div>
          </div>


          {/* ================= MAIN FEED ================= */}


          {/* CREATE POST (UI ONLY) */}
          <div className="col-lg-6">
            <div style={{ maxWidth: "720px" }} className="mx-auto">

              {/* CREATE POST */}
              <div className="card border-0 shadow-sm rounded-4 mb-4">
                <div className="card-body">
                  <div className="d-flex gap-3 mb-3">
                    {profile?.profile_image ? (
                      <img
                        src={profile.profile_image}
                        className="rounded-circle"
                        width="48"
                        height="48"
                        style={{ objectFit: "cover" }}
                        alt="Profile"
                      />
                    ) : (
                      <div
                        className="rounded-circle bg-secondary text-white d-flex align-items-center justify-content-center"
                        style={{ width: 48, height: 48, fontWeight: 600 }}
                      >
                        {profile?.first_name?.[0]}
                        {profile?.last_name?.[0]}
                      </div>
                    )}

                    <input
                      className="form-control rounded-pill"
                      placeholder="Start a post"
                      readOnly
                      onClick={() => {
                        setPostType("post");
                        setShowModal(true);
                      }}
                    />

                  </div>

                  <div className="d-flex justify-content-between px-2">
                    <button
                      className="btn btn-light btn-sm"
                      onClick={() => {
                        setPostType("image");
                        setShowModal(true);
                      }}
                    >
                      <i className="ri-image-line text-primary me-1"></i> Photo
                    </button>

                    <button
                      className="btn btn-light btn-sm"
                      onClick={() => {
                        setPostType("article");
                        setShowModal(true);
                      }}
                    >
                      <i className="ri-file-text-line text-warning me-1"></i> Article
                    </button>

                  </div>
                </div>
              </div>



              {/* POSTS */}
              {posts.map((post) => (
                <div
                  key={post.id}
                  className="card border-0 shadow-sm rounded-4 mb-4"
                >
                  <div className="card-body">

                    {/* HEADER */}
                    <div className="d-flex gap-3 mb-2">
                      {post.user.profile_image ? (
                        <img
                          src={post.user.profile_image}
                          className="rounded-circle post-avatar"
                          width="48"
                          height="48"
                          alt="Profile"
                        />

                      ) : (
                        <div
                          className="rounded-circle bg-secondary text-white d-flex align-items-center justify-content-center"
                          style={{ width: 48, height: 48 }}
                        >
                          {post.user.first_name?.[0]}
                          {post.user.last_name?.[0]}
                        </div>
                      )}

                      <div>
                        <div className="fw-semibold">
                          {post.user.first_name} {post.user.last_name}
                        </div>
                        <small className="text-muted">
                          {new Date(post.created_at).toLocaleString()}
                        </small>
                      </div>
                    </div>

                    {/* TITLE */}
                    {post.title && (
                      <h6 className="mt-3">{post.title}</h6>
                    )}

                    {/* CONTENT */}
                    <div
                      className="text-secondary mt-2"
                      dangerouslySetInnerHTML={{
                        __html: DOMPurify.sanitize(post.content || ""),
                      }}
                    />

                    {/* 🔗 LINK PREVIEW (YouTube) */}
                    {post.link_preview?.type === "youtube" && (
                      <a
                        href={post.link_preview.watch_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="youtube-preview-card mt-3 text-decoration-none"
                      >
                        <div className="youtube-thumb-wrapper">
                          <img
                            src={post.link_preview.thumbnail}
                            alt="YouTube preview"
                            className="youtube-thumb"
                          />
                          <div className="youtube-play-btn">▶</div>
                        </div>
                      </a>
                    )}

                    {/* MEDIA */}
                    {/* MEDIA GRID - LinkedIn style */}
                    {post.media?.length > 0 && (
                      <div className="post-media-grid images-4 mt-3">
                        {post.media.slice(0, 4).map((m, idx) => (
                          <div
                            key={m.id}
                            className="media-wrapper"
                            onClick={() => {
                              setViewerImages(post.media.map(i => i.file_url));
                              setCurrentIndex(idx);
                              setViewerOpen(true);
                            }}
                          >
                            <img
                              src={m.file_url}
                              className="post-media-img"
                              alt=""
                            />

                            {/* ✅ OVERLAY ONLY ON 4TH IMAGE IF MORE EXIST */}
                            {idx === 3 && post.media.length > 4 && (
                              <div className="media-overlay">
                                +{post.media.length - 4}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}


                  </div>

                  {/* FOOTER */}
                  <div className="card-body pt-2">

                    <div className="small text-muted mb-2">
                      {post.like_count} likes · {post.comment_count} comments
                    </div>

                    <div className="d-flex border-top pt-2">
                      <button
                        className="btn btn-light btn-sm w-100"
                        disabled={likePost.isLoading}
                        onClick={() => likePost.mutate(post.id)}
                      >
                        <i className="ri-thumb-up-line me-1"></i> Like
                      </button>


                      <button
                        className="btn btn-light btn-sm w-100"
                        onClick={() =>
                          document
                            .getElementById(`comment-${post.id}`)
                            ?.focus()
                        }
                      >
                        <i className="ri-chat-1-line me-1"></i> Comment
                      </button>

                      {/* <button
                        className="btn btn-light btn-sm w-100"
                        onClick={() => bookmarkPost.mutate(post.id)}
                      >
                        <i className="ri-bookmark-line me-1"></i> Save
                      </button> */}

                      <Link
                        to={`/posts/${post.id}`}
                        className="btn btn-light btn-sm w-100"
                      >
                        <i className="ri-eye-line me-1"></i> View
                      </Link>
                    </div>

                    {/* COMMENTS */}
                    <div className="mt-3">
                      <div className="d-flex gap-2">
                        <input
                          id={`comment-${post.id}`}
                          type="text"
                          className="form-control form-control-sm"
                          placeholder="Add a comment..."
                          value={commentText[post.id] || ""}
                          onChange={(e) =>
                            setCommentText((p) => ({
                              ...p,
                              [post.id]: e.target.value,
                            }))
                          }
                          onKeyDown={(e) =>
                            e.key === "Enter" &&
                            handleCommentSubmit(post.id)
                          }
                        />
                        <button
                          className="btn btn-sm btn-primary"
                          onClick={() =>
                            handleCommentSubmit(post.id)
                          }
                        >
                          Post
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>


          {/* ================= RIGHT SIDEBAR ================= */}
          <div className="col-lg-3 d-none d-lg-block">
            <div className="card border-0 shadow-sm rounded-4 p-3 news-card">
              <h6 className="fw-semibold mb-3">Latest News</h6>

              {isNewsLoading && (
                <div className="small text-muted">Loading news...</div>
              )}

              {!isNewsLoading && news.length === 0 && (
                <div className="small text-muted">No news available.</div>
              )}

              <div className="news-list">
                {news.map((item, idx) => (
                  <a
                    key={idx}
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="news-item-card text-decoration-none mb-3"
                  >
                    {/* Image on top */}
                    <img
                      src={item.thumbnail || "https://via.placeholder.com/250x140"}
                      alt={item.title}
                      className="rounded"
                    />



                    {/* Content below */}
                    <div className="news-content mb-2">
                      <div className="fw-semibold text-dark news-title">
                        {item.title}
                      </div>
                      <div className="d-flex justify-content-between align-items-center mt-1">
                        <span className="badge bg-light text-dark small">
                          {item.source || "Unknown"}
                        </span>
                        {item.published_at && (
                          <small className="text-muted">
                            {new Date(item.published_at).toLocaleDateString()}
                          </small>
                        )}
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>







        </div>
      </div>
      {showModal && (
        <div
          className="modal fade show d-block"
          style={{ background: "rgba(0,0,0,0.6)" }}
        >
          <div className="modal-dialog modal-lg modal-dialog-centered">
            <div className="modal-content rounded-4">

              {/* HEADER */}
              <div className="modal-header">
                <h5 className="modal-title text-capitalize">
                  Create {postType === "post" ? "Post" : postType}
                </h5>
                <button
                  className="btn-close"
                  onClick={closeModal}
                />
              </div>

              {/* BODY */}
              <div className="modal-body">

                {/* ARTICLE HEADING */}
                {postType === "article" && (
                  <input
                    className="form-control mb-3"
                    placeholder="Article title"
                    value={form.title}
                    onChange={(e) =>
                      setForm({ ...form, title: e.target.value })
                    }
                  />
                )}

                {/* CONTENT */}

                {/* <Editor
                  apiKey="gzbaq6k6otgk5w4c2vhnm06gksbkpyt5ahllriq2s49rj3ty"
                  value={form.content}
                  onEditorChange={(newValue) =>
                    setForm({ ...form, content: newValue })
                  }
                  init={{
                    height: 350,
                    menubar: false,
plugins: `
  advlist
  autolink
  lists
  link
  image
  charmap
  preview
  anchor
  searchreplace
  visualblocks
  code
  fullscreen
  insertdatetime
  media
  table
  help
  wordcount
`,
toolbar: `
  undo redo |
  formatselect |
  bold italic underline |
  alignleft aligncenter alignright |
  bullist numlist |
  link image media table |
  code preview fullscreen
`

                  }}
                /> */}


                <Editor
                  apiKey="gzbaq6k6otgk5w4c2vhnm06gksbkpyt5ahllriq2s49rj3ty"
                  value={form.content}
                  onEditorChange={(newValue) => {
                    setForm({ ...form, content: newValue });
                  }}
                  init={{
                    height: 400,
                    menubar: false,
                    plugins: `
  advlist
  autolink
  lists
  link
  image
  charmap
  preview
  anchor
  searchreplace
  visualblocks
  code
  fullscreen
  insertdatetime
  media
  table
  help
  wordcount
`,
                    toolbar: `
  undo redo |
  formatselect |
  bold italic underline |
  alignleft aligncenter alignright |
  bullist numlist |
  link image media table |
  code preview fullscreen
`,
                    setup: (editor) => {
                      editor.on("paste", async (e) => {
                        const clipboardData = e.clipboardData || window.clipboardData;

                        if (!clipboardData) return;

                        const pastedText = clipboardData.getData("text/plain");

                        // simple URL check
                        if (!/^https?:\/\//i.test(pastedText)) return;

                        e.preventDefault(); // stop normal paste

                        try {
                          const res = await getOgiMeta(pastedText);

                          const ogHtml = buildOgHtml(res);

                          // 🔹 Insert at cursor (recommended)
                          editor.insertContent(ogHtml);

                          // 🔹 OR prepend at top (uncomment if needed)
                          // editor.setContent(ogHtml + editor.getContent());

                        } catch (err) {
                          console.error("OG fetch failed", err);
                          editor.insertContent(pastedText);
                        }
                      });

                    },
                  }}
                />



                {/* IMAGE UPLOAD */}
                {(postType === "image" || postType === "post") && (
                  <>
                    <button
                      className="btn btn-outline-primary btn-sm"
                      onClick={() => fileRef.current.click()}
                    >
                      <i className="ri-image-add-line me-1"></i> Add Image
                    </button>

                    <input
                      ref={fileRef}
                      type="file"
                      hidden
                      accept="image/*"
                      multiple
                      onChange={(e) =>
                        setForm(prev => {
                          const selected = Array.from(e.target.files);
                          const combined = [...prev.files, ...selected].slice(0, 6);
                          return { ...prev, files: combined };
                        })
                      }
                    />




                    {form.files.length > 0 && (
                      <div className={`post-media-grid images-${form.files.length}`}>
                        {form.files.map((file, idx) => (
                          <img
                            key={idx}
                            src={URL.createObjectURL(file)}
                            alt={`preview-${idx}`}
                            className="post-media-img"
                          />
                        ))}
                      </div>
                    )}

                  </>
                )}
              </div>

              {/* FOOTER */}
              <div className="modal-footer">
                <button
                  className="btn btn-light"
                  onClick={closeModal}

                >
                  Cancel
                </button>

                <button
                  className="btn btn-outline-secondary"
                  disabled={!form.content}
                  onClick={() => setShowPreview(true)}
                >
                  Preview
                </button>


                <button
                  className="btn btn-primary"
                  disabled={createPost.isLoading || (!form.content && !form.files)}
                  onClick={handleCreatePost}
                >
                  {createPost.isLoading ? "Posting..." : "Post"}
                </button>

              </div>

            </div>
          </div>
        </div>
      )}


      {showPreview && (
        <div
          className="modal fade show d-block"
          style={{ background: "rgba(0,0,0,0.7)" }}
        >
          <div className="modal-dialog modal-lg modal-dialog-centered">
            <div className="modal-content rounded-4">

              <div className="modal-header">
                <h5 className="modal-title">Post Preview</h5>
                <button
                  className="btn-close"
                  onClick={() => setShowPreview(false)}
                />
              </div>

              <div className="modal-body">

                {/* ARTICLE TITLE */}
                {postType === "article" && (
                  <h4 className="fw-bold mb-3">{form.title}</h4>
                )}

                {/* ARTICLE CONTENT */}
                <div
                  className="post-content"
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(form.content),
                  }}
                />

                {/* IMAGE PREVIEW */}
                {form.files.length > 0 && (
                  <div
                    className={`post-media-grid images-${form.files.length} mt-3`}
                  >
                    {form.files.map((file, idx) => (
                      <img
                        key={idx}
                        src={URL.createObjectURL(file)}
                        className="post-media-img"
                        alt=""
                      />
                    ))}
                  </div>
                )}
              </div>

              <div className="modal-footer">
                <button
                  className="btn btn-light"
                  onClick={() => setShowPreview(false)}
                >
                  Back
                </button>

                <button
                  className="btn btn-primary"
                  onClick={() => {
                    setShowPreview(false);
                    handleCreatePost();
                  }}
                >
                  Post
                </button>
              </div>

            </div>
          </div>
        </div>
      )}


      {viewerOpen && (
        <div className="image-viewer-backdrop">
          <button
            className="viewer-close"
            onClick={() => setViewerOpen(false)}
          >
            ✕
          </button>

          {currentIndex > 0 && (
            <button
              className="viewer-nav left"
              onClick={() => setCurrentIndex(i => i - 1)}
            >
              ‹
            </button>
          )}

          <img
            src={viewerImages[currentIndex]}
            className="viewer-image"
            alt=""
          />

          {currentIndex < viewerImages.length - 1 && (
            <button
              className="viewer-nav right"
              onClick={() => setCurrentIndex(i => i + 1)}
            >
              ›
            </button>
          )}
        </div>
      )}




    </div>
  );
}
