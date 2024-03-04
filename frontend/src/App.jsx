import { useAuth0 } from "@auth0/auth0-react";
import { Route, Routes } from "react-router-dom";
import CallbackPage from "./pages/callback-page";
import HomePage from "./pages/home-page";
import ErrorPage from "./pages/error-page";
import ProfilePage from "./pages/profile-page";
import ProtectedPage from "./pages/protected-page";
import AdminPage from "./pages/admin-page";
import PublicPage from "./pages/public-page";
import ActivityPage from "./pages/activity-page";
import IndividualActivityPage from "./pages/individual-activity-page";
import IndividualPlayerPage from "./pages/individual-player-page";
import PlayersPage from "./pages/players-page";
import PageLoader from "./components/page-loader";
import AuthenticationGuard from "./components/authentication-guard";
import PageLayout from "./components/page-layout";
const App = () => {
  const { isLoading } = useAuth0();

  if (isLoading) {
    return (
      <div className="page-layout">
        <PageLoader />
      </div>
    );
  }

  return (
    <PageLayout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/profile"
          element={<AuthenticationGuard component={ProfilePage} />}
        />
        <Route
          path="/activity"
          element={<AuthenticationGuard component={ActivityPage} />}
        />

        <Route
          path="/activity/:activity_id"
          element={<AuthenticationGuard component={IndividualActivityPage} />}
        />
        <Route
          path="/players/:player_id"
          element={<AuthenticationGuard component={IndividualPlayerPage} />}
        />
        <Route
          path="/players"
          element={<AuthenticationGuard component={PlayersPage} />}
        />
        <Route path="/public" element={<PublicPage />} />

        <Route
          path="/protected"
          element={<AuthenticationGuard component={ProtectedPage} />}
        />

        <Route
          path="/admin"
          element={<AuthenticationGuard component={AdminPage} />}
        />

        <Route path="/callback" element={<CallbackPage />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </PageLayout>
  );
};

export default App;
