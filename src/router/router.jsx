import { createBrowserRouter, createHashRouter, Outlet, redirect } from "react-router";
import Login from "../components/login/Login";
import { SpeakerDashboard } from "../pages/dashboard/SpeakerDashboard";
import AuthLayout from "../layouts/AuthLayout";
import AppLayout from "../layouts/AppLayout";
import UserDashboard from "../pages/dashboard/user/UserDashboard";
import SpeakerProfile from "../pages/speaker/SpeakerProfile";
import ProfileEdit from "../pages/user/ProfileEdit";
import Participants from "../pages/participant/Participants";
import ScholarSearch from "../components/scholar/ScholarSearch";
import MyBookShelf from "../components/bookshelf/MyBookShelf";
import Inbox from "../components/inbox/Inbox";
import InboxLayout from "../layouts/InboxLayout";
import NotFound from "../components/404/NotFound";
import PostsPage from "../components/posts/PostsPage";
import PostDetail from "../components/posts/PostDetail";
import HandshakesComponent from "../components/handshakes/HandshakesComponent";
import NewPostPage from "../components/posts/NewPostPage";
import ParticipantProfile from "../pages/participant/ParticipantProfile";
import Program from "../components/program/GatcProgram";
import Profile from "../pages/user/Profile";
import Bookmark from "../components/bookmark/Bookmark";
import PostLayout from "../layouts/PostLayout";
import RegisterForm from "../components/register/RegisterForm";
import GatcDashboard from "../components/gatc/GatcDashboard";
import PublicProfile from "../pages/user/PublicProfile";
// import UserDashboardNew from "../pages/dashboard/user/UserDashboardNew";
import GATC2026 from "../components/gatc/GATC2026";
import GATCRegistration from "../components/gatc/GATC-Registration";
import VerifyEmail from "../components/auth/VerifyEmail";
import ResendVerification from "../components/auth/ResendVerification";
import PrivacyPolicy from "../components/documents/PrivacyPolicy";
import TermsConditions from "../components/documents/TermsConditions";
import Consultancy from "../components/documents/Consultancy";
import Events from "../components/documents/Events";
import Product from "../components/documents/Products";


export const router = createBrowserRouter
  ([
    {
      element: <InboxLayout />,
      loader: () => {
        let user = localStorage.getItem("user");
        if (!user) return redirect("/login");
        return JSON.parse(user);
      },
      children: [
        {
          element: <Inbox />,

          path: "/inbox/"
        },
        {
          element: <Inbox />,

          path: "/inbox/:userId"
        }
      ]

    },
    {
      element: <PostLayout />,
      loader: () => {
        let user = localStorage.getItem("user");
        if (!user) return redirect("/login");
        return JSON.parse(user);
      },
      children: [
        {
          element: <PostsPage />,

          path: "/posts/"
        },
        {
          element: <NewPostPage />,

          path: "/post-new"
        },
        {
          element: <PostDetail />,

          path: "/posts/:id"
        }
      ]

    },
    {
      path: "/",
      loader: () => redirect("/login"),
    },

    {
      element: <AuthLayout />,
      children: [
        {
          element: <Login />,
          path: "/login",
        },
        {
          element: <RegisterForm />,
          path: "/register",
        },
        {
          element: <VerifyEmail />,
          path: "/verify-email",
        },
        {
          element: <ResendVerification />,
          path: "/resend-verification",

        },
        {
          element: <TermsConditions />,
          path: "/Terms&Conditions",

        },
        {
          element: <PrivacyPolicy />,
          path: "/PrivacyPolicy",

        },
        {
          element: <Events />,
          path: "/Events",

        },
        {
          element: <Consultancy />,
          path: "/Consultancy",

        },
        {
          element: <Product />,
          path: "/Product",

        },

      ],
    },

    {
      element: (<AppLayout />),
      loader: () => {
        let user = localStorage.getItem("user");
        if (!user) return redirect("/login");
        return JSON.parse(user);
      },
      children: [

        // {
        //   path: "/",
        //   element: <div>Home</div>,
        //   loader: () => {
        //     let user = localStorage.getItem("user");
        //     if (user) {
        //       user = JSON.parse(user);
        //       if (user.type === "admin") return redirect("/admin");
        //       if (user.type === "speaker") return redirect("/speaker");
        //       return redirect("/login");
        //     }
        //   }
        // },

        { path: "/admin", element: <div>Admin Dashboard</div> },
        { path: "/about", element: <div>About</div> },

        { path: "/user1", element: <UserDashboard /> },
        { path: "/speaker", element: <UserDashboard /> },
        { path: "/gatc/participants", element: <Participants /> },
        { path: "/user", element: <ScholarSearch /> },
        { path: "/my-bookshelf", element: <MyBookShelf /> },
        { path: "/user/profile/edit", element: <ProfileEdit /> },
        { path: "/gatc/speakers", element: <SpeakerDashboard /> },

        { path: "/posts", element: <PostsPage /> },
        { path: "/posts/:id", element: <PostDetail /> },

        { path: "/post-new", element: <NewPostPage /> },

        { path: "/handshakes", element: <HandshakesComponent /> },

        { path: "/gatc/program", element: <Program /> },
        { path: "/user/profile", element: <Profile /> },
        { path: "/my-bookmarks", element: <Bookmark /> },
        { path: "/gatc/dashboard", element: <GatcDashboard /> },
        { path: "/gatc2026", element: <GATC2026 /> },
        { path: "/gatc2026/registration", element: <GATCRegistration /> },
        {
          path: "/public/users/:id",
          loader: ({ params }) => {
            const id = Number(params.id);

            if (!id) {
              throw new Response("Invalid User ID", { status: 400 });
            }

            return null;
          },
          element: <PublicProfile />,
        },

        {
          path: "/speakers/:id",
          loader: ({ params }) => {
            const id = Number(params.id);
            if (!id) {
              throw new Response("Invalid Speaker ID", { status: 400 });
            }
            return null;
          },

          element: <SpeakerProfile />
        },
        {
          path: "/participants/:id",
          loader: ({ params }) => {
            const id = Number(params.id);
            if (!id) {
              throw new Response("Invalid participant ID", { status: 400 });
            }
            return null;
          },

          element: <ParticipantProfile />
        },

        { path: "/help", element: <div>Help</div> },
        { path: "*", element: <NotFound /> },
      ]
    }

  ]);