// src/components/handshakes/HandshakesComponent.jsx
import { useState, useMemo, useEffect } from "react";
import "./HandshakesComponent.css";
import { useGetMyHandshakes } from "../../hooks/handshake/useGetMyHandshakes";
import { useNavigate } from "react-router";
import { useUpdateHandshakeStatus } from "../../hooks/handshake/useUpdateHandshake";

import { useCreateHandshake } from "../../hooks/handshake/useCreateHandshake";
import { useCancelHandshake } from "../../hooks/handshake/useCancelHandshake";

export default function HandshakesComponent() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("user"));
    setUser(stored);
  }, []);

  const { data: handshakes = [] } = useGetMyHandshakes();

  const { cancelMut, undoCreateMut } = useCancelHandshake();
  const { mutate: updateHandshakeStatus } = useUpdateHandshakeStatus();

  const [tab, setTab] = useState("all");
  
  const navigate = useNavigate();

  const [message, setMessage] = useState({
    type: "",
    text: "",
    undoHandshake: null,
  });


  const [confirmModal, setConfirmModal] = useState({
    show: false,
    handshake: null,
  });


  const tabs = ["all", "pending", "accepted", "rejected"];

  const normalized = useMemo(() => {
    if (!handshakes) return [];

    return handshakes.map((h) => {
      // your backend provides sender_details / receiver_details
      const amSender = h.sender === user?.id || h.sender === user?.id; // safe check

      const senderInfo = h.sender_details || {};
      const receiverInfo = h.receiver_details || {};

      const name = amSender
        ? `${receiverInfo.name || ""}`.trim()
        : `${senderInfo.name || ""}`.trim();

      const avatar = amSender
        ? (receiverInfo.profile_image || receiverInfo.profile_image) // if your serializer builds absolute URI
        : (senderInfo.profile_image || senderInfo.profile_image);

      // map status legacy -> maintain 'rejected' label UI if backend returns 'declined'
      let status = h.status;
      if (status === "declined") status = "rejected";
      if (status === "cancelled") status = "cancelled";

      return {
        id: h.id,
        status,
        created_at: (h.created_at || "").split("T")[0] || "",
        receiver: {
          id: amSender ? h.receiver : h.sender,
          name: name || (amSender ? receiverInfo.name : senderInfo.name) || "Unknown",
          title: "",
          avatar: avatar || "https://i.pravatar.cc/100",
        },
        sender: {
          id: h.sender,
        },
        raw: h,
      };
    });
  }, [handshakes, user]);

  const filtered = tab === "all" ? normalized : normalized.filter((h) => h.status === tab);

  // Cancel flow with undo
  const handleCancel = (handshake) => {
    setConfirmModal({ show: true, handshake });
  };


  const confirmCancel = () => {
    const handshake = confirmModal.handshake;

    cancelMut.mutate(handshake.id, {
      onSuccess: () => {
        setMessage({
          type: "warning",
          text: "Handshake canceled. Click undo to restore.",
          undoHandshake: handshake,
        });
      },
      onError: (err) => {
        setMessage({
          type: "danger",
          text: err?.response?.data?.detail || "Failed to cancel handshake",
        });
      },
    });

    setConfirmModal({ show: false, handshake: null });
  };

  const undoCancel = () => {
    if (!message.undoHandshake) return;

    const receiverId = message.undoHandshake.raw.receiver;
    undoCreateMut.mutate({ receiver_id: receiverId });

    setMessage({
      type: "success",
      text: "Handshake restored successfully.",
      undoHandshake: null,
    });

  };



  const handleAccept = (id) => {
    updateHandshakeStatus({ id, status: "accepted" });
  };
  const handleReject = (id) => {
    updateHandshakeStatus({ id, status: "declined" });
  };

  return (
    <>
      {/* <div className="event-bar-fullwidth py-3 mb-4">
        <div className="container d-flex gap-2 flex-wrap">
          {events.map((ev) => (
            <div
              key={ev.id}
              className={`event-pill ${selectedEvent === ev.id ? "active" : ""}`}
              onClick={() => setSelectedEvent(ev.id)}
            >
              {ev.name}
            </div>
          ))}
        </div>
      </div> */}

      <div className="container py-4 handshakes-page">
        <div className="row">
          <div className="col-md-9 col-lg-9">
            {message.text && (
              <div className={`alert alert-${message.type} alert-dismissible fade show`}>
                <div className="d-flex justify-content-between align-items-center">
                  <span>{message.text}</span>

                  {message.undoHandshake && (
                    <button className="btn btn-sm btn-outline-dark ms-3" onClick={undoCancel}>
                      Undo
                    </button>
                  )}
                </div>

                <button
                  className="btn-close"
                  onClick={() =>
                    setMessage({ type: "", text: "", undoHandshake: null })
                  }

                />
              </div>
            )}

            <h3 className="mb-4 fw-bold">Handshakes</h3>

            <div className="handshake-tabs mb-4 d-flex gap-4">
              {tabs.map((t) => (
                <button
                  key={t}
                  className={`tab-btn ${tab === t ? "active" : ""}`}
                  onClick={() => setTab(t)}
                >
                  {t.charAt(0).toUpperCase() + t.slice(1)}
                </button>
              ))}
            </div>

            <div className="list-group">
              {filtered.map((h) => (
                <div key={h.id} className="list-group-item handshake-item d-flex align-items-center">
                  <img src={h.receiver.avatar} className="avatar me-3" alt={h.receiver.name} />

                  <div className="flex-grow-1">
                    <div className="fw-bold">{h.receiver.name}</div>
                    {h.receiver.title && <div className="text-muted small">{h.receiver.title}</div>}
                    <div className="text-muted small">Sent on: {h.created_at}</div>
                  </div>

                  <span className={`status-badge status-${h.status}`}>{h.status.toUpperCase()}</span>

                  <button
                    className="btn btn-sm btn-outline-dark rounded-pill ms-3 px-3 d-flex align-items-center gap-1"
                    onClick={() => {
                      if (user?.role === "speaker") {
                        navigate(`/participants/${h?.receiver?.id}`);
                      } else {
                        navigate(`/speakers/${h?.receiver?.id}`);
                      }
                    }}
                  >
                    <i className="ri-user-line"></i> View Profile
                  </button>

                  {user?.role === "user" && h.status === "pending" && (
                    <button
                      className="btn btn-sm btn-outline-danger rounded-pill ms-2 px-3 d-flex align-items-center gap-1"
                      onClick={() => handleCancel(h)}
                    >
                      <i className="ri-close-circle-line"></i> Cancel
                    </button>
                  )}

                  {user?.role === "speaker" && h.status === "pending" && (
                    <div className="d-flex align-items-center gap-2 ms-2">
                      <button className="btn btn-sm btn-outline-success rounded-pill px-3" onClick={() => handleAccept(h.id)}>
                        <i className="ri-check-line"></i> Accept
                      </button>
                      <button className="btn btn-sm btn-outline-danger rounded-pill px-3" onClick={() => handleReject(h.id)}>
                        <i className="ri-close-line"></i> Reject
                      </button>
                    </div>
                  )}
                </div>
              ))}

              {filtered.length === 0 && (
                <div className="text-center py-5 text-muted">No {tab} handshakes found.</div>
              )}
            </div>
          </div>
        </div>
        {confirmModal.show && (
          <div className="modal fade show d-block" style={{ background: "rgba(0,0,0,.5)" }}>
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Cancel Handshake</h5>
                  <button
                    className="btn-close"
                    onClick={() => setConfirmModal({ show: false, handshake: null })}
                  />
                </div>

                <div className="modal-body">
                  Are you sure you want to cancel this handshake request?
                </div>

                <div className="modal-footer">
                  <button
                    className="btn btn-secondary"
                    onClick={() => setConfirmModal({ show: false, handshake: null })}
                  >
                    No
                  </button>
                  <button className="btn btn-danger" onClick={confirmCancel}>
                    Yes, Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </>
  );
}
