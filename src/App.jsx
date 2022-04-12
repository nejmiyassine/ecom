import React, { useEffect } from 'react';
import { ThemeProvider } from 'styled-components';
import { useDispatch } from 'react-redux';
// Routing
import { Routes, Route, useNavigate } from 'react-router-dom';
import {
  HOMEROUTE,
  SIGNINROUTE,
  NOTFOUNDROUTE,
  SHOPROUTE,
  SHOPCOLLECTIONROUTE,
  FAVORITEROUTE,
} from './navigation/CONSTANT';
// Hooks
import { useDarkMode } from './hooks/useDarkMode';
// Styles
import GlobalStyle, { Container } from './styles/GlobalStyle.style';
import { darkTheme, lightTheme } from './styles/theme/theme';
// Components
import ThemeSwitch from './components/ThemeSwitch/ThemeSwitch';
import Home from './pages/Home/index';
import NotFound from './navigation/NotFound';
import Header from './components/Header/Header';
import SignIn from './components/SignIn/SignIn';
import Shop from './pages/Shop';
import Favorite from './pages/Favorite';
import CollectionItem from './components/CollectionItem/CollectionItem';
// Firebase
import { auth } from './configs/FirebaseConfigs';
// Redux
import { loginUser } from './redux/features/auth/authSlice';
import { getCollections } from './redux/features/shop/shopSlice';
// Toastify
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  let navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user === null) {
        // user is not logged in
        return;
      }

      const data = {
        id: user.uid,
        displayName: user.displayName,
        email: user.email,
        phoneNumber: user.phoneNumber,
        photoURL: user.photoURL,
      };

      dispatch(loginUser(data));
    });
  }, [dispatch, navigate]);

  useEffect(() => {
    dispatch(getCollections());
  }, [dispatch]);

  const [theme, themeToggler] = useDarkMode();
  const themeMode = theme === 'light' ? lightTheme : darkTheme;

  return (
    <ThemeProvider theme={themeMode}>
      <GlobalStyle />
      <ToastContainer />

      <Container>
        <Header />

        <Routes>
          <Route path={NOTFOUNDROUTE} element={<NotFound />} />
          <Route path={HOMEROUTE} element={<Home />} />
          <Route path={SIGNINROUTE} element={<SignIn />} />
          <Route path={SHOPROUTE} element={<Shop />} />
          <Route path={SHOPCOLLECTIONROUTE} element={<CollectionItem />} />
          <Route path={FAVORITEROUTE} element={<Favorite />} />
        </Routes>
      </Container>

      <ThemeSwitch theme={theme} themeToggler={themeToggler} />
    </ThemeProvider>
  );
};

export default App;
