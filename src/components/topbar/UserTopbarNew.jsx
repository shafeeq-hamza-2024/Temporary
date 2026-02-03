import { Link } from 'react-router';
import './UserTopbar.css';
import useLogout from "../../hooks/logout";
import { useQueryClient } from "@tanstack/react-query";
import NotificationBell from "../notifications/NotificationBell";
//import useAuthUser from "../../hooks/auth/useAuthUser";
import { useUserProfile } from "../../hooks/profile/useUserProfile";
import { siteURL } from '../../api/api';
import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router';
import { useSearchPublicUsers } from '../../hooks/publicUsers/useSearchPublicUsers';
import useDebounce from '../../hooks/useDebounce';







export default function UserTopbarNew() {


  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const searchRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setSearch("");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const debouncedSearch = useDebounce(search, 400);

  const {
    data: results = [],
    isLoading,
  } = useSearchPublicUsers(debouncedSearch);



  const logout = useLogout();

  //const { data: user } = useAuthUser(); // 👈 get user info
  const { data: user, isLoading: uLoading } = useUserProfile();
  // const user = JSON.parse(localStorage.getItem("user"));


  const queryClient = useQueryClient();
  const reload = () => {
    queryClient.invalidateQueries();
  }
  return (
    <header className="user-topbar shadow-sm">
      <div className="container-fluid d-flex align-items-center justify-content-between">

        {/* Left */}
        <div className="d-flex align-items-center gap-2">

          <Link className="navbar-brand fw-bold" to="/user" style={{ "fontSize": "22px" }}>
            <img src="/images/MyNeuron-Logo.png" style={{ width: "200px", height: "50px", objectFit: "contain" }} />
          </Link>
        </div>

        {/* Center */}
        <div className="flex-grow-1 d-flex justify-content-center">
          <div
            className="search-wrapper position-relative"
            ref={searchRef}
          >


            <div className="search-box d-flex align-items-center">
              <i className="ri-search-line me-2"></i>
              <input
                type="text"
                placeholder="Search users..."
                className="form-control border-0 shadow-none"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            {search && (
              <div className="search-dropdown">
                {isLoading && (
                  <div className="search-loading d-flex align-items-center gap-2">
                    <span className="spinner-border spinner-border-sm"></span>
                    Searching users…
                  </div>
                )}


                {!isLoading && results.length === 0 && (
                  <div className="search-empty">No users found</div>
                )}

                {results.map((user) => (
                  <div
                    key={user.id}
                    className="search-item"
                    onClick={() => {
                      setSearch("");
                      navigate(`/public/users/${user.id}`);
                    }}
                  >
                    {user.profile_image ? (
                      <img src={user.profile_image} alt="avatar" />
                    ) : (
                      <div className="search-avatar-fallback">
                        {user.first_name?.[0]}
                        {user.last_name?.[0]}
                      </div>
                    )}

                    <div>
                      <div className="search-user-name">
                        {user.first_name} {user.middle_name} {user.last_name}
                      </div>
                      <div className="search-user-title">
                        {user.profile_title}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

          </div>
        </div>


        {/* Right */}
        <div className="d-flex align-items-center gap-3">

          {/* <button
            className="btn btn-light rounded-circle icon-btn"
            onClick={() => {
              reload();
              const btn = document.querySelector(".icon-btn");
              btn.classList.add("spin-once");

              setTimeout(() => btn.classList.remove("spin-once"), 600);
            }}
            title="Refresh Page"
          >
            <i className="ri-refresh-line"></i>
          </button> */}


          <Link to="/user" className="btn btn-light rounded-circle icon-btn">
            <i className="ri-home-5-line fs-4"></i>
          </Link>

          <Link to="/posts" className="btn btn-light rounded-circle icon-btn">
            <i className="ri-pulse-line text-dark fs-4"></i>
          </Link>

          <Link to="/my-bookshelf" className="btn btn-light rounded-circle icon-btn">
            <i className="ri-book-open-line fs-4"></i>
          </Link>

          <Link to="/inbox" className="btn btn-light rounded-circle icon-btn">
            <i className="ri-message-3-line fs-4"></i>
          </Link>


          <NotificationBell />

          {/* Profile + Name */}
          <div className="dropdown">
            <button
              className="btn d-flex align-items-center gap-2"
              data-bs-toggle="dropdown"
            >
              {user?.profile_image ? (
                <img
                  src={`${user.profile_image}`}
                  className="rounded-circle avatar"
                  alt="Profile"
                />
              ) : (
                <div
                  className="rounded-circle avatar"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "#61b561",
                    color: "#fff",
                    fontSize: "14px",
                    fontWeight: "600",
                    textTransform: "uppercase",
                  }}
                >
                  {`${user?.first_name?.[0] || ""}${user?.last_name?.[0] || ""}`}
                </div>
              )}



              {/* Show user name */}
              <div className="d-flex flex-column text-start lh-1">
                <span className="fw-semibold">{user?.first_name} {user?.last_name}</span>
                <small className="text-muted" >{user?.profile_title}</small>
              </div>

              <i className="ri-arrow-down-s-line"></i>
            </button>

            <ul className="dropdown-menu dropdown-menu-end shadow-sm">
              <li>
                <Link className="dropdown-item" to="user/profile">
                  Profile
                </Link>
              </li>

              <li>
                <Link className="dropdown-item" to="/settings">
                  Settings
                </Link>
              </li>

              <li><hr className="dropdown-divider" /></li>

              <li>
                <button className="dropdown-item text-danger" onClick={logout}>
                  Logout
                </button>
              </li>
            </ul>

          </div>
        </div>
      </div>
    </header>
  );
}