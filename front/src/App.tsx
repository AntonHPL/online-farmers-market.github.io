import { useContext } from "react";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Ad from "./components/Ad";
import Ads from "./components/Ads";
import Chats from "./components/Chats";
import GeneralInfo from "./components/GeneralInfo";
import Header from "./components/Header";
import NewAd from "./components/NewAd";
import Profile from "./components/Profile";
import MyAds from "./components/MyAds";
import { UserContext } from "./components/UserContext";
import "./App.scss";
import { createTheme, ThemeProvider } from "@mui/material";
import { orange } from "@mui/material/colors";

const theme = createTheme({
  palette: {
    primary: {
      main: orange[500],
      light: orange[50]
    },
    secondary: { main: orange[50] },
  }
});

const App = () => {
  const { user, isTokenValidationComplete } = useContext(UserContext);
  console.log("user", user)
  return (
    <ThemeProvider theme={theme}>
      <Router>
        {isTokenValidationComplete &&
          <>
            <Header />
            <Routes>
              <Route path="/" element={<Ads />} />
              <Route path="/ad/:id" element={<Ad />} />
              {user ?
                <>
                  <Route path="/new-advertisement" element={<NewAd />} />
                  <Route path="/profile" element={<Profile />}>
                    <Route path="general-info" element={<GeneralInfo />} />
                    <Route path="ads" element={<MyAds />} />
                    <Route path="chats" element={<Chats />} />
                  </Route>
                  <Route path="*" element={<Navigate to="/" />} />
                </> :
                <Route path="*" element={<Navigate to="/" />} />
              }
            </Routes>
          </>
        }
      </Router>
    </ThemeProvider>
  )
}

export default App;