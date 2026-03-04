import { createBrowserRouter, redirect } from "react-router";
import NotFound from "../components/404/NotFound";
import Bookmark from "../components/bookmark/Bookmark";
import MyBookShelf from "../components/bookshelf/MyBookShelf";
import GatcDashboard from "../components/gatc/GatcDashboard";
import HandshakesComponent from "../components/handshakes/HandshakesComponent";
import Inbox from "../components/inbox/Inbox";
import Login from "../components/login/Login";
import NewPostPage from "../components/posts/NewPostPage";
import PostDetail from "../components/posts/PostDetail";
import PostsPage from "../components/posts/PostsPage";
import Program from "../components/program/GatcProgram";
import RegisterForm from "../components/register/RegisterForm";
import ScholarSearch from "../components/scholar/ScholarSearch";
import AppLayout from "../layouts/AppLayout";
import AuthLayout from "../layouts/AuthLayout";
import InboxLayout from "../layouts/InboxLayout";
import PostLayout from "../layouts/PostLayout";
import { SpeakerDashboard } from "../pages/dashboard/SpeakerDashboard";
import UserDashboard from "../pages/dashboard/user/UserDashboard";
import ParticipantProfile from "../pages/participant/ParticipantProfile";
import Participants from "../pages/participant/Participants";
import SpeakerProfile from "../pages/speaker/SpeakerProfile";
import Profile from "../pages/user/Profile";
import ProfileEdit from "../pages/user/ProfileEdit";
import PublicProfile from "../pages/user/PublicProfile";
// import UserDashboardNew from "../pages/dashboard/user/UserDashboardNew";
import ResendVerification from "../components/auth/ResendVerification";
import ResetPassword from "../components/auth/ResetPassword";
import VerifyEmail from "../components/auth/VerifyEmail";
import Consultancy from "../components/documents/Consultancy";
import Events from "../components/documents/Events";
import PrivacyPolicy from "../components/documents/PrivacyPolicy";
import Product from "../components/documents/Products";
import TermsConditions from "../components/documents/TermsConditions";
import GATCLite from "../components/gatc/GATC-Lite";
import GATCRegistration from "../components/gatc/GATC-Registration";
import GATC2026 from "../components/gatc/GATC2026";
import WriteArticle from "../components/posts/WriteArticle";
import Page from "@/pages/page/Page";
import PageDetails from "@/pages/page/PageDetails";
import { APP_ROUTES } from "./appRoutes";

export const router = createBrowserRouter([
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

        path: "/inbox/",
      },
      {
        element: <Inbox />,

        path: "/inbox/:userId",
      },
    ],
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

        path: "/posts/",
      },
      {
        element: <NewPostPage />,

        path: "/post-new",
      },
      {
        element: <PostDetail />,

        path: "/posts/:id",
      },
    ],
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
        element: <ResetPassword />,
        path: "/reset-password",
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
    element: <AppLayout />,
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
      { path: "writearticle", element: <WriteArticle /> },
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
      { path: "/gatclite", element: <GATCLite /> },
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

        element: <SpeakerProfile />,
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

        element: <ParticipantProfile />,
      },

      { path: "/help", element: <div>Help</div> },
      { path: APP_ROUTES.PAGES.ROOT, element: <Page /> },
      { path: APP_ROUTES.PAGES.PAGE_DETAILS, element: <PageDetails /> },
      { path: "*", element: <NotFound /> },
    ],
  },
]);
