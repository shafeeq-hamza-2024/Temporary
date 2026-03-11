import { Link } from "react-router";
import "./ParticipantsList.css";

export default function ParticipantsList({ members }) {
  return (
    <div className="container py-4">
      <h3 className="mb-4 fw-bold">Participants</h3>

      <div className="participants-grid">
        {members
          .filter((m) => m.role === "participant")
          .map((m, i) => {
            const user = m.user;
            const name = `${user.first_name} ${user.last_name}`;

            return (
              <Link
                key={m.id}
                to={`/participants/${user.id}`}
                className="participant-card fade-item text-decoration-none"
                style={{ animationDelay: `${i * 0.06}s` }}
              >
                <img
                  src={
                    user.profile_image ||
                    `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}`
                  }
                  alt={name}
                  className="participant-avatar"
                />

                <div className="mt-3 text-center">
                  <h6 className="fw-bold mb-1 text-dark">{name}</h6>

                  {user.profile_title && (
                    <div className="text-muted small">{user.profile_title}</div>
                  )}
                  {/* <Badge variant="success" label={m.role.toUpperCase()} /> */}

                  {/* <div className="mt-2">
                    {user.is_verified && (
                      <span className="badge bg-success me-1">Verified</span>
                    )}

                    {user.is_verified_lite && !user.is_verified && (
                      <span className="badge bg-secondary">Lite Verified</span>
                    )}
                  </div> */}

                  <span className={"text-green-600"}>{m.role}</span>
                </div>
              </Link>
            );
          })}
      </div>
    </div>
  );
}
