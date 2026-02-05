import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router";
import "./UserSidebar.css";
import useLogout from "../../hooks/logout";
import { useUser } from "../../hooks/users/useUsers";

export default function UserSidebar() {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const userId = storedUser?.id;

  const { data: user, isLoading } = useUser(userId);
  const [isOpen, setIsOpen] = useState(false);


  const isVerified = user?.is_verified === true;
  const isVerifiedLite = user?.is_verified_lite === true;

  const nav = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;
  const logout = useLogout();

  // OPEN/CLOSE DROPDOWNS
  const [openMap, setOpenMap] = useState({});
  const toggle = (label) =>
    setOpenMap((old) => ({ ...old, [label]: !old[label] }));


  // MENU TREE
  const menuTree = [
    {
      label: "Dashboard",
      icon: "ri-dashboard-line",
      color: "#0d6efd",
      path: "/user",
    },


    {
      label: "GATC",
      icon: "ri-building-4-line",
      color: "#0abde3",
      children: [
        // Always visible
        { label: "GATC Lite (M&M)-NISER", path: "/gatclite" },
        ...(isVerifiedLite
          ? [
            
            { label: "Dashboard", path: "/gatc/dashboard" },
            { label: "Programs", path: "/gatc/program" },
            { label: "Speakers", path: "/gatc/speakers" },
            // { label: "Participants", path: "/gatc/participants" },
            { label: "My Handshakes", path: "/handshakes" },
          ]
          : []),

  // Divider
    { type: "divider" },


        { label: "GATC 2026", path: "/gatc2026" },

        // 🔐 Visible ONLY after payment verification
        ...(isVerified
          ? [
            
            { label: "Dashboard", path: "/gatc/dashboard" },
            { label: "Programs", path: "/gatc/program" },
            { label: "Speakers", path: "/gatc/speakers" },
            // { label: "Participants", path: "/gatc/participants" },
            { label: "My Handshakes", path: "/handshakes" },
          ]
          : []),
      ],
    },

    // {
    //   label: "Profile",
    //   icon: "ri-user-3-line",
    //   color: "#6f42c1",
    //   path: "/user/profile",
    // },
    // {
    //   label: "Messages",
    //   icon: "ri-message-3-line",
    //   color: "#20c997",
    //   path: "/inbox",
    // },

    // My Neuron
    // {
    //   label: "My Neuron",
    //   icon: "ri-brain-line",
    //   color: "#ff8c00",
    //   children: [
    //     { label: "My Handshakes", path: "/handshakes" },
    //     // { label: "My Bookmarks", path: "/my-bookmarks" },
    //   ],
    // },

    {
      label: "My Bookshelf",
      icon: "ri-book-shelf-line",
      color: "#b5651d",
      path: "/my-bookshelf",
    },
    // {
    //   label: "Plasma Search",
    //   icon: "ri-search-eye-line",
    //   color: "#d63384",
    //   path: "/scholar",
    // },
    {
      label: "Impulse",
      icon: "ri-flashlight-line",
      color: "#0d6efd",
      path: "/posts",
    },

    // GATC


    // Divider
    { type: "divider" },

    // {
    //   label: "Logout",
    //   icon: "ri-logout-box-line",
    //   color: "red",
    //   path: "/logout",
    // },
  ];

  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    }
  }, [user]);


  // AUTO-OPEN ANY PARENT WHOSE CHILD MATCHES THE URL
  useEffect(() => {
    const openState = {};

    menuTree.forEach((item) => {
      if (!item.children) return;

      const childMatch = item.children.some(
        (c) => currentPath.startsWith(c.path)
      );

      if (childMatch) openState[item.label] = true;
    });

    setOpenMap((prev) => ({ ...prev, ...openState }));
  }, [currentPath]);

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("sidebar-open");
    } else {
      document.body.classList.remove("sidebar-open");
    }
  }, [isOpen]);



  if (isLoading) return null; // or loader



  return (
    <>
      {/* HAMBURGER (MOBILE ONLY) */}
      <button
        className="sidebar-toggle d-lg-none"
        onClick={() => setIsOpen(true)}
        aria-label="Open menu"
      >
        <i className="ri-menu-line"></i>
      </button>

      {/* OVERLAY */}
      <div
        className={`sidebar-overlay ${isOpen ? "show" : ""}`}
        onClick={() => setIsOpen(false)}
      />

      {/* SIDEBAR */}
      <aside className={`sidebar p-3 ${isOpen ? "open" : ""}`}>
        <h5 className="text-muted mb-4">Menu</h5>

        <ul className="list-unstyled">
          {menuTree.map((item, i) => (
            <MenuItem
              key={item.label || `divider-${i}`}
              item={item}
              nav={nav}
              openMap={openMap}
              toggle={toggle}
              currentPath={currentPath}
              closeSidebar={() => setIsOpen(false)}   // 👈 important
            />
          ))}
        </ul>
      </aside>
    </>
  );

}

/* ======================================================
   RECURSIVE MENU ITEM COMPONENT
====================================================== */
function MenuItem({ item, nav, openMap, toggle, currentPath, closeSidebar }) {
  const logout = useLogout();
  // Divider Row
  if (item.type === "divider") {
    return <hr className="sidebar-divider" />;
  }

  const hasChildren = Array.isArray(item.children);
  const isOpen = openMap[item.label] || false;

  // Active exact match
  const isActive = item.path === currentPath;

  // Active if any child matches URL prefix
  const isParentActive =
    hasChildren &&
    item.children.some((c) => currentPath.startsWith(c.path));

  return (
    <>
      <li
        className={`sidebar-item d-flex align-items-center mb-2 
          ${isActive ? "active" : ""} 
          ${isParentActive ? "active-parent" : ""}
        `}
        onClick={() => {
          if (item.label === "Logout") {
            logout();
            closeSidebar?.();
            return;
          }

          if (hasChildren) {
            toggle(item.label);
          } else {
            nav(item.path);
            closeSidebar?.();     // ✅ close on mobile
          }
        }}



      >
        {/* Icon */}
        <i
          className={`${item.icon} sidebar-icon me-3`}
          style={{ color: item.color }}
        ></i>

        {/* Label */}
        <span className="flex-grow-1">{item.label}</span>

        {/* Dropdown Arrow */}
        {hasChildren && (
          <i
            className={`ri-arrow-right-s-line arrow ${isOpen ? "rotate" : ""
              }`}
          ></i>
        )}
      </li>

      {/* Submenu */}
      {hasChildren && (
        <ul className={`submenu-wrapper ${isOpen ? "open" : ""}`}>
          <div className="submenu-inner">
            {item.children.map((child) => (
              <MenuItem
                key={child.label}
                item={child}
                nav={nav}
                openMap={openMap}
                toggle={toggle}
                currentPath={currentPath}
              />
            ))}
          </div>
        </ul>
      )}
    </>
  );
}