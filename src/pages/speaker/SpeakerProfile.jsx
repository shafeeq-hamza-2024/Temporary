import { Link, useParams } from "react-router";
import "./SpeakerProfile.css";
import { useEffect, useMemo, useState } from "react";
import useFakeHandshake from "../../hooks/useFakeHandshake";
import { useSpeaker } from "../../hooks/speakers/useSpeaker";
import { useGetMyHandshakes } from "../../hooks/handshake/useGetMyHandshakes";

import { useCreateHandshake } from "../../hooks/handshake/useCreateHandshake";
import AsyncButton from "../../components/ui/AsyncButton";
import { useCancelHandshake } from "../../hooks/handshake/useCancelHandshake";
import { useSpeakerPrograms } from "../../hooks/programs/useSpeakerProgram";
import { usePublicUserProfile } from "../../hooks/publicUsers/usePublicUserProfile";

//const user = JSON.parse(localStorage.getItem("user")) || {};




export default function SpeakerProfile() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const u = JSON.parse(localStorage.getItem("user"));
    setUser(u);
  }, []);

  const DEFAULT_AVATAR = "/images/Avatar.png";

  const { id } = useParams();

  const { data: programs = [], isLoading: programsLoading } =
    useSpeakerPrograms(id);

  const { loading, sendRequest } = useFakeHandshake();

  const [activeTab, setActiveTab] = useState("profile");

  const { mutate, isPending } = useCreateHandshake();

  const ch = useCreateHandshake();

  const { cancelMut } = useCancelHandshake();

  const [selectedYear, setSelectedYear] = useState(null);
  const createHandshake = (receiver_id) => {
    mutate({ receiver_id });
  };

  const { data: speakerData, isLoading, error } = useSpeaker(id);
  const [speaker, setSpeaker] = useState(null);


  const { data: handshakes } = useGetMyHandshakes();


  const cancelHandshake = (id) => {
    cancelMut.mutate(id);
  };



  const handshake = useMemo(() => {
    if (!speaker || !handshakes) return { status: "none" };

    return (
      handshakes.find(
        (h) =>
          (h.sender === user?.id && h.receiver === speaker.id) ||
          (h.receiver === user?.id && h.sender === speaker.id)
      ) || { status: "none" }
    );
  }, [speaker, handshakes, user]);

  const programsByYear = useMemo(() => {
    const grouped = {};

    programs.forEach((p) => {
      const year = new Date(p.date).getFullYear();
      if (!grouped[year]) grouped[year] = [];
      grouped[year].push(p);
    });

    // Sort each year by date ascending
    Object.keys(grouped).forEach((year) => {
      grouped[year].sort(
        (a, b) => new Date(a.date) - new Date(b.date)
      );
    });

    return grouped;
  }, [programs]);


 const years = Object.keys(programsByYear).sort((a, b) => b - a);




  useEffect(() => {
    if (years.length && !selectedYear) {
      setSelectedYear(Number(years[0]));
    }
  }, [years, selectedYear]);


  useEffect(() => {
    if (speakerData) {
      setSpeaker({
        ...speakerData,                // DB values
        handshake_status: "none",      // override demo
        bio: `Dr. Frost is a leading researcher in artificial intelligence 
                    focusing on deep learning, neural architecture search, 
                    and computational ethics.`,
        expertise: ["Artificial Intelligence", "Neural Networks", "Ethics in AI"],
        socials: {
          linkedin: "#",
          twitter: "#",
          website: "#",
        },
        sessions_2026: [
          {
            topic: "Future of AI Ethics in a Hyper-Automated World",
            date: "12 Dec",
            day: "Thursday",
            start: "10:00 AM",
            end: "11:30 AM",
            venue: "Innovation Hall A"
          },
          {
            topic: "Neural Architecture Search – Beyond Deep Learning",
            date: "13 Dec",
            day: "Friday",
            start: "3:00 PM",
            end: "4:30 PM",
            venue: "Tech Theatre B"
          }
        ],
        handshakes: [
          {
            name: "Dr. Irene Schultz",
            title: "Lead Computational Neuroscientist, Max Planck Institute",
            photo: "https://i.pravatar.cc/300?img=47",
            status: "accepted",
          },
          {
            name: "Dr. Karan Vyas",
            title: "Molecular Biologist, Cambridge University",
            photo: "https://i.pravatar.cc/300?img=41",
            status: "pending",
          },
          {
            name: "Prof. Maya Rangan",
            title: "Quantum Scientist, IISc",
            photo: "https://i.pravatar.cc/300?img=32",
            status: "pending",
          },
        ]
      });
    }
  }, [speakerData]);



  // -----------------------------------
  // REQUEST HANDSHAKE
  // -----------------------------------
  const requestHandshake = async () => {

    const newStatus = await sendRequest();
    setSpeaker(prev => ({ ...prev, handshake_status: newStatus }));
  };

  // -----------------------------------
  // HANDSHAKE UI
  // -----------------------------------
  const renderHandshakeSection = () => {
    if (isPending) {
      return (
        <div className="handshake-loader px-2 py-2">
          <span></span><span></span><span></span>
        </div>
      );
    }

    switch (handshake.status) {
      // case "none":
      //   return (
      //     <button
      //       className="btn btn-primary px-4"
      //       disabled={isPending}
      //       onClick={() => createHandshake(speaker.id)}
      //     >
      //       Send Handshake
      //     </button>
      //   );

      case "pending":
        return (
          <div className="d-flex flex-column">
            <button className="btn text-success bg-success-subtle px-4 py-2 rounded-pill fw-semibold">
              <i className="ri-check-line fs-5"></i>
              Handshake Requested
            </button>

            <small className="text-muted mt-2">
              Sent on {handshake.created_at}
            </small>

            <small
              className="text-danger mt-1"
              style={{ cursor: "pointer", textDecoration: "underline" }}
              onClick={() => cancelHandshake(handshake.id)}
            >
              Undo Request
            </small>
          </div>
        );

      case "accepted":
        return (
          <div className="d-inline-flex align-items-center gap-2 px-3 py-1 rounded-pill border border-success text-success bg-success-subtle small">
            <i className="ri-check-line"></i>
            <span>Request <strong>accepted</strong></span>
          </div>
        );

      case "rejected":
        return (
          <div className="d-inline-flex align-items-center gap-2 px-3 py-1 rounded-pill border border-danger text-danger bg-danger-subtle small">
            <i className="ri-close-circle-fill"></i>
            <span>Request <strong>rejected</strong></span>
          </div>
        );

      default:
        return (
          <button
            className="btn btn-primary"
            onClick={() => createHandshake(speaker.id)}
          >
            Send Handshake
          </button>
        );
    }
  };
   

  



  // ERROR
  if (error) {
    return (
      <div className="status-screen d-flex flex-column justify-content-center align-items-center">
        <i className="ri-error-warning-line status-error-icon"></i>
        <p className="text-danger fs-5 mt-2">Unable to load speaker.</p>
        <small className="text-muted">Please try again later.</small>
      </div>
    );
  }

  // MAIN LOADING
  if (isLoading) {
    return (
      <div className="loader-wrapper">
        <div className="orbit-trail-true">
          <span></span><span></span><span></span><span></span>
        </div>
        <p className="status-text mt-4">Loading speaker profile…</p>
      </div>
    );
  }

  // SPEAKER NOT YET AVAILABLE (data empty)
  if (!speaker) {
    return (
      <div className="status-screen d-flex flex-column justify-content-center align-items-center">
        <div className="status-spinner"></div>
        <p className="mt-3 text-muted fs-5">Preparing profile...</p>
      </div>
    );
  }



  return (
    <div className="container py-4">
      {/* BACK BUTTON */}
      <button className="btn btn-outline-secondary mb-3" onClick={() => window.history.back()}>
        <i className="ri-arrow-left-line me-1"></i> Back
      </button>
      <div className="row">
        {/* -----------------------------------
            LEFT MAIN PROFILE CONTENT
        ----------------------------------- */}
        <div className="col-md-8">

          {/* ---------- TABS ---------- */}
          <ul className="nav nav-tabs modern-tabs mb-4">
            <li className="nav-item">
              <button
                className={`nav-link ${activeTab === "profile" ? "active" : ""}`}
                onClick={() => setActiveTab("profile")}
              >
                Profile
              </button>
            </li>



            <li className="nav-item">
              <button
                className={`nav-link ${activeTab === "programs" ? "active" : ""}`}
                onClick={() => setActiveTab("programs")}
              >
                GATC Programs
              </button>
            </li>
          </ul>


          {/* ---------- TAB PANELS ---------- */}
          {activeTab === "profile" && <>
            {/* HEADER */}
            <div className="card shadow-sm border-0 mb-4 fade-up fade-delay-1">
              <div className="card-body p-4 d-flex align-items-start gap-4">

                {/* LEFT — PHOTO */}
                <img
                  src={
                    speaker.profile_image
                      ? speaker.profile_image.startsWith("http")
                        ? speaker.profile_image
                        : `${siteURL}/${speaker.profile_image}`
                      : DEFAULT_AVATAR
                  }
                  alt="speaker"
                  className="rounded-circle shadow"
                  style={{
                    width: "150px",
                    height: "150px",
                    objectFit: "cover",
                  }}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = DEFAULT_AVATAR;
                  }}
                />

                {/* RIGHT — EVERYTHING ELSE */}
                <div className="flex-grow-1">

                  {/* SOCIAL + HANDSHAKE */}
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <div className="d-flex gap-3 fs-4 text-secondary">
                      <a href={speaker.socials.linkedin} className="text-decoration-none text-dark">
                        <i className="ri-linkedin-box-fill"></i>
                      </a>

                      <a href={speaker.socials.twitter} className="text-decoration-none text-dark">
                        <i className="ri-twitter-x-fill"></i>
                      </a>

                      <a href={speaker.socials.website} className="text-decoration-none text-dark">
                        <i className="ri-global-line"></i>
                      </a>
                    </div>

                    {user?.role == "user" && <div key={handshake.id || handshake.status}>
                      {renderHandshakeSection()}
                    </div>}
                  </div>

                  {/* NAME */}
                  <h3 className="mb-1">
                    {speaker.first_name} {speaker.last_name}
                  </h3>

                  {/* TITLE */}
                  <h6 className="text-muted">{speaker.title}</h6>

                  {/* LOCATION + ID */}
                  <div className="mt-3 d-flex gap-3 text-secondary flex-wrap">
                    <span>
                      <i className="ri-map-pin-line me-1"></i>
                      La Jolla, California, USA
                    </span>

                    <span>
                      <i className="ri-profile-line me-1"></i>
                      ID: {id}
                    </span>
                  </div>




                  {/* INLINE EXPERTISE */}
                  <div className="mt-3 d-flex flex-wrap gap-2">
                    {speaker.expertise?.map((item, index) => (
                      <span
                        key={index}
                        className="badge bg-primary px-3 py-2"
                        style={{ fontSize: "0.85rem" }}
                      >
                        {item}
                      </span>
                    ))}
                  </div>

                </div>

              </div>
            </div>






            {/* BIO */}
            <div className="card shadow-sm border-0 mb-4 fade-up fade-delay-2">
              <div className="card-header bg-white">
                <h5 className="mb-0">About</h5>
              </div>
              <div className="card-body">
                <p className="text-secondary" style={{ lineHeight: "1.7" }}>
                  {speaker.bio}
                </p>
              </div>
            </div>

            {/* SESSIONS / PROGRAMS */}
            <div className="card shadow-sm border-0 fade-up fade-delay-5 mb-4">
              <div className="card-header bg-white d-flex justify-content-between align-items-center">
                <h5 className="mb-0">Programs at GATC</h5>
              </div>

              <div className="card-body">

                {/* ---- YEAR SELECTOR ---- */}
                <div className="mb-3 d-flex gap-2 flex-wrap">
                  {years.map((year) => (
                    <button
                      key={year}
                      className={`btn ${year === selectedYear ? "btn-primary" : "btn-outline-primary"
                        } btn-sm`}
                      onClick={() => setSelectedYear(year)}
                    >
                      GATC {year}
                    </button>
                  ))}
                </div>

                {/* ---- SESSIONS FOR SELECTED YEAR ---- */}
                {programsByYear[selectedYear]?.length ? (
                  programsByYear[selectedYear].map((p) => (
                    <div
                      key={p.id}
                      className="session-card p-3 rounded border d-flex align-items-center gap-4"
                    >
                      <div className="text-center px-3">
                        <div className="fw-bold fs-5">
                          {new Date(p.date).getDate()}
                        </div>
                        <div className="text-muted small">
                          {new Date(p.date).toLocaleDateString("en-IN", {
                            month: "short",
                          })}
                        </div>
                      </div>

                      <div className="vr" />

                      <div className="flex-grow-1">
                        <h6 className="mb-1">{p.topic}</h6>

                        <div className="text-muted small">
                          <i className="ri-time-line me-1"></i>
                          {p.start_time} – {p.end_time}
                        </div>

                        <div className="text-muted small">
                          <i className="ri-map-pin-2-line me-1"></i>
                          {p.venue}
                        </div>
                      </div>

                      <i className="ri-mic-2-line fs-3 text-primary"></i>
                    </div>
                  ))
                ) : (
                  <p className="text-muted mb-0">No programs available.</p>
                )}

              </div>
            </div>


          </>}

          {activeTab === "programs" && <>

            {/* SESSIONS / PROGRAMS */}
            <div className="card shadow-sm border-0 fade-up fade-delay-5 mb-4">
              <div className="card-header bg-white d-flex justify-content-between align-items-center">
                <h5 className="mb-0">Programs at GATC</h5>
              </div>

              <div className="card-body">

                {/* ---- YEAR SELECTOR ---- */}
                <div className="mb-3 d-flex gap-2 flex-wrap">
                  {years.map((year) => (
                    <button
                      key={year}
                      className={`btn ${year === selectedYear ? "btn-primary" : "btn-outline-primary"
                        } btn-sm`}
                      onClick={() => setSelectedYear(year)}
                    >
                      GATC {year}
                    </button>
                  ))}
                </div>

                {/* ---- SESSIONS FOR SELECTED YEAR ---- */}
                {programsByYear[selectedYear]?.length ? (
                  programsByYear[selectedYear].map((p) => (
                    <div
                      key={p.id}
                      className="session-card p-3 rounded border d-flex align-items-center gap-4"
                    >
                      <div className="text-center px-3">
                        <div className="fw-bold fs-5">
                          {new Date(p.date).getDate()}
                        </div>
                        <div className="text-muted small">
                          {new Date(p.date).toLocaleDateString("en-IN", {
                            month: "short",
                          })}
                        </div>
                      </div>

                      <div className="vr" />

                      <div className="flex-grow-1">
                        <h6 className="mb-1">{p.topic}</h6>

                        <div className="text-muted small">
                          <i className="ri-time-line me-1"></i>
                          {p.start_time} – {p.end_time}
                        </div>

                        <div className="text-muted small">
                          <i className="ri-map-pin-2-line me-1"></i>
                          {p.venue}
                        </div>
                      </div>

                      <i className="ri-mic-2-line fs-3 text-primary"></i>
                    </div>
                  ))
                ) : (
                  <p className="text-muted mb-0">No programs available.</p>
                )}

              </div>
            </div>
          </>}










        </div>

        {/* -----------------------------------
            RIGHT SIDEBAR COLUMN
        ----------------------------------- */}
        <div className="col-md-4">

          {/* POSTS */}


          {/* HANDSHAKES SECTION */}


          {/* SIMILAR PROFILES */}


          {/* QUICK ACTIONS */}
          <div className="card shadow-sm border-0 mb-4 fade-up fade-delay-4">
            <div className="card-header bg-white">
              <h6 className="mb-0">Quick Actions</h6>
            </div>
            <div className="card-body d-grid gap-2">
              <Link
                to={`/inbox/${speaker.id}`}
                className="btn btn-outline-primary w-100"
              >
                <i className="ri-send-plane-line me-2"></i>
                Message
              </Link>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}