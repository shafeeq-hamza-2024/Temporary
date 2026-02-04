import { useParams } from "react-router";
import { siteURL } from "../../api/api";
import { usePublicUserProfile } from "../../hooks/publicUsers/usePublicUserProfile";
import { useSendFollow } from "../../hooks/follow/usefollowActions";
import { useUnfollow } from "../../hooks/follow/usefollowActions";
import { useOutgoingFollowRequests } from "../../hooks/follow/useOutgoingFollowRequests";
import { useUserFollowers } from "../../hooks/follow/useUserFollowers";


import { Link } from "react-router";

export default function PublicProfile() {
    const { id } = useParams();
    const { data, isLoading } = usePublicUserProfile(id);
    const sendFollow = useSendFollow();
    const unfollow = useUnfollow();
    const DEFAULT_AVATAR = "/images/Avatar.png";
    const authUserId = JSON.parse(localStorage.getItem("user"))?.id;

    const isOwnProfile = Number(id) === authUserId;


    const { data: outgoing = [] } = useOutgoingFollowRequests();
    const { data: followers = [] } = useUserFollowers(id);

    const isRequested = outgoing.some(
        (req) => req.following?.id === Number(id)
    );

    const isFollowing = followers.some(
        (u) => u.id === Number(id)
    );

    const handleFollow = () => {
        sendFollow.mutate(Number(id));
    };

    const handleUnfollow = () => {
        unfollow.mutate(Number(id));
    };


    if (isLoading)
        return (
            <div className="loader-wrapper">
                <div className="orbit-trail-true">
                    <span></span><span></span><span></span>
                </div>
                <p className="mt-3">Loading profile…</p>
            </div>
        );

    const {
        first_name,
        middle_name,
        last_name,
        title,
        profile_image,
        profile_title,
        personal_detail,
        professional_detail,
        education,
        scientific_interest,
    } = data;

    return (
        <div className="container py-4">
            <button
                className="btn btn-outline-secondary mb-3"
                onClick={() => window.history.back()}
            >
                <i className="ri-arrow-left-line me-1"></i> Back
            </button>

            <div className="row g-4">
                {/* ================= LEFT ================= */}
                <div className="col-lg-8">

                    {/* ===== PROFILE HEADER ===== */}
                    <div className="card shadow-sm border-0 mb-4 fade-up">
                        <div className="card-body p-4 d-flex gap-4">

                            {/* PHOTO */}
                            <img
                                src={
                                    profile_image
                                        ? profile_image.startsWith("http")
                                            ? profile_image
                                            : `${siteURL}/${profile_image}`
                                        : DEFAULT_AVATAR
                                }
                                alt="Profile"
                                className="profile-pic rounded-circle shadow"
                                style={{ width: 150, height: 150, objectFit: "cover" }}
                                onError={(e) => {
                                    e.currentTarget.src = DEFAULT_AVATAR;
                                }}
                            />


                            <div className="flex-grow-1">

                                <div className="d-flex align-items-center justify-content-between mb-3">

                                    {/* SOCIAL LINKS */}
                                    <div className="d-flex gap-3 fs-4 text-secondary">
                                        {personal_detail?.research_links?.map((link, idx) => (
                                            <a key={idx} href={link.url} target="_blank" rel="noreferrer">
                                                <i className="ri-links-line"></i>
                                            </a>
                                        ))}

                                        {personal_detail?.linkedin && (
                                            <a href={personal_detail.linkedin} target="_blank" rel="noreferrer">
                                                <i className="ri-linkedin-box-fill"></i>
                                            </a>
                                        )}

                                        {personal_detail?.x_handle && (
                                            <a
                                                href={`https://x.com/${personal_detail.x_handle}`}
                                                target="_blank"
                                                rel="noreferrer"
                                            >
                                                <i className="ri-twitter-x-fill"></i>
                                            </a>
                                        )}
                                    </div>

                                    {/* <Link
                                        to={`/inbox/${id}`}
                                        className="btn btn-dark rounded-pill px-3 d-flex align-items-center gap-1"
                                    >
                                        <i className="ri-send-plane-line me-2"></i>
                                        Message
                                    </Link> */}
                                    {!isOwnProfile && (
                                        <div className="d-flex gap-2">
                                            <Link
                                                to={`/inbox/${id}`}
                                                className="btn btn-dark rounded-pill px-3 d-flex align-items-center gap-1"
                                            >
                                                <i className="ri-send-plane-line me-2"></i>
                                                Message
                                            </Link>

                                            {!isFollowing && !isRequested && (
                                                <button
                                                    className="btn btn-outline-dark rounded-pill px-3"
                                                    onClick={handleFollow}
                                                    disabled={sendFollow.isLoading}
                                                >
                                                    {sendFollow.isLoading ? "Sending…" : "Follow"}
                                                </button>
                                            )}

                                            {isRequested && (
                                                <button
                                                    className="btn btn-secondary rounded-pill px-3"
                                                    disabled
                                                >
                                                    Requested
                                                </button>
                                            )}

                                            {isFollowing && (
                                                <button
                                                    className="btn btn-outline-danger rounded-pill px-3"
                                                    onClick={handleUnfollow}
                                                >
                                                    Unfollow
                                                </button>
                                            )}
                                        </div>
                                    )}


                                </div>

                                {/* NAME */}
                                <h3>
                                    {title && `${title}.`} {first_name} {middle_name} {last_name}
                                </h3>

                                <h6 className="text-muted">{profile_title}</h6>

                                {/* ROLE */}
                                <h6 className="text-muted">
                                    {professional_detail?.current_role}
                                    {professional_detail?.current_organization && (
                                        <> · {professional_detail.current_organization}</>
                                    )}
                                </h6>

                                {/* LOCATION */}
                                {(personal_detail?.city || personal_detail?.country) && (
                                    <div className="text-secondary mt-2">
                                        <i className="ri-map-pin-line me-1"></i>
                                        {personal_detail.city}, {personal_detail.country}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* ===== ABOUT ===== */}
                    <div className="card shadow-sm border-0 fade-up mb-4">
                        <div className="card-header bg-white">
                            <h5 className="mb-0">About</h5>
                        </div>
                        <div className="card-body">
                            <p>{personal_detail?.biosketch || "No bio added yet."}</p>
                        </div>
                    </div>

                    {/* ===== CURRENT POSITION ===== */}
                    {professional_detail && (
                        <div className="card shadow-sm border-0 fade-up mb-4">
                            <div className="card-header bg-white">
                                <h5 className="mb-0">Current Position</h5>
                            </div>
                            <div className="card-body small text-secondary">
                                <strong>{professional_detail.current_role}</strong>
                                {professional_detail.current_organization && (
                                    <> — {professional_detail.current_organization}</>
                                )}

                                {(professional_detail.current_start_month ||
                                    professional_detail.current_start_year) && (
                                        <div className="mt-1">
                                            Since {professional_detail.current_start_month}/
                                            {professional_detail.current_start_year}
                                        </div>
                                    )}

                                {professional_detail.current_description && (
                                    <p className="mt-2">
                                        {professional_detail.current_description}
                                    </p>
                                )}
                            </div>
                        </div>
                    )}

                    {/* ===== EDUCATION ===== */}
                    {/* ===== EDUCATION ===== */}
                    <div className="card shadow-sm border-0 fade-up mb-4">
                        <div className="card-header bg-white">
                            <h5 className="mb-0">Education</h5>
                        </div>

                        <div className="card-body">
                            {education?.length ? (
                                education.map((edu) => (
                                    <div key={edu.id} className="mb-3">
                                        <h6 className="fw-bold mb-1">
                                            {edu.degree}
                                            {edu.course_name && <> — {edu.course_name}</>}
                                        </h6>

                                        <div className="text-muted small">
                                            {(edu.university || edu.institute) && (
                                                <>
                                                    {edu.university || edu.institute}
                                                    {edu.country && <> · {edu.country}</>}
                                                </>
                                            )}
                                        </div>

                                        {(edu.start_year || edu.end_year) && (
                                            <div className="text-muted small">
                                                {edu.start_year} – {edu.end_year || "Present"}
                                            </div>
                                        )}

                                        {/* Research (PhD / PostDoc only) */}
                                        {edu.topic && (
                                            <div className="small mt-1">
                                                <strong>Research:</strong> {edu.topic}
                                            </div>
                                        )}

                                        {edu.research_summary && (
                                            <p className="small text-secondary mt-1">
                                                {edu.research_summary}
                                            </p>
                                        )}
                                    </div>
                                ))
                            ) : (
                                <p className="text-muted">No education added.</p>
                            )}
                        </div>
                    </div>

                    {/* ===== SCIENTIFIC INTERESTS ===== */}
                    {scientific_interest && (
                        <div className="card shadow-sm border-0 fade-up mb-4">
                            <div className="card-header bg-white">
                                <h5 className="mb-0">Scientific Interests</h5>
                            </div>

                            <div className="card-body small text-secondary">

                                {scientific_interest.research_area_of_expertise && (
                                    <p className="mb-2">
                                        <strong>Research Area:</strong><br />
                                        {scientific_interest.research_area_of_expertise}
                                    </p>
                                )}

                                {scientific_interest.major_focus?.length > 0 && (
                                    <p className="mb-2">
                                        <strong>Major Focus:</strong><br />
                                        {scientific_interest.major_focus.join(", ")}
                                    </p>
                                )}

                                {scientific_interest.specific_research_areas?.length > 0 && (
                                    <p className="mb-2">
                                        <strong>Specific Research Areas:</strong><br />
                                        {scientific_interest.specific_research_areas.join(", ")}
                                    </p>
                                )}

                                {scientific_interest.organ_sites?.length > 0 && (
                                    <p className="mb-2">
                                        <strong>Organ Sites:</strong><br />
                                        {scientific_interest.organ_sites.join(", ")}
                                    </p>
                                )}

                                {scientific_interest.additional_research_areas?.length > 0 && (
                                    <p className="mb-0">
                                        <strong>Additional Research Areas:</strong><br />
                                        {scientific_interest.additional_research_areas.join(", ")}
                                    </p>
                                )}

                                {!scientific_interest.research_area_of_expertise &&
                                    !scientific_interest.major_focus?.length &&
                                    !scientific_interest.specific_research_areas?.length &&
                                    !scientific_interest.organ_sites?.length &&
                                    !scientific_interest.additional_research_areas?.length && (
                                        <p className="text-muted mb-0">
                                            No scientific interests added.
                                        </p>
                                    )}
                            </div>
                        </div>
                    )}


                    {/* ===== PAST EXPERIENCE ===== */}
                    <div className="card shadow-sm border-0 fade-up">
                        <div className="card-header bg-white">
                            <h5 className="mb-0">Past Experience</h5>
                        </div>

                        <div className="card-body">
                            {professional_detail?.past_experiences?.length ? (
                                professional_detail.past_experiences.map((exp) => (
                                    <div key={exp.id} className="mb-3">
                                        <h6 className="fw-semibold mb-0">
                                            {exp.role} — {exp.organization}
                                        </h6>

                                        <div className="text-muted small">
                                            {exp.start_month}/{exp.start_year} –{" "}
                                            {exp.end_month}/{exp.end_year}
                                        </div>

                                        {exp.description && (
                                            <p className="small text-secondary mt-1">
                                                {exp.description}
                                            </p>
                                        )}
                                    </div>
                                ))
                            ) : (
                                <p className="text-muted">No past experience added.</p>
                            )}
                        </div>
                    </div>


                </div>

                {/* ================= RIGHT ================= */}
                <div className="col-lg-4">

                    {/* ===== SKILLS ===== */}
                    <div className="card shadow-sm border-0 fade-up mb-4">
                        <div className="card-header bg-white">
                            <h5 className="mb-0">Skills & Languages</h5>
                        </div>
                        <div className="card-body small text-secondary">
                            {professional_detail?.skill_set ? (
                                <p>
                                    <i className="ri-tools-line me-1"></i>
                                    {professional_detail.skill_set}
                                </p>
                            ) : (
                                <p className="text-muted">No skills added.</p>
                            )}

                            {professional_detail?.languages_spoken && (
                                <p>
                                    <i className="ri-translate-2 me-1"></i>
                                    {professional_detail.languages_spoken}
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
}
