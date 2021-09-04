import React from 'react';
import { useDispatch, useSelector } from "react-redux";

import { Header } from "./components/Header";
import { AuthPage } from "./pages/AuthPage";
import { login } from "./store/actions/auth";
import { Content } from "./pages/Content";

function App() {
  const dispatch = useDispatch();
  const { token, userId } = useSelector(({ authPage }) => authPage);

  React.useEffect(() => {
    if (token) {
      dispatch(login(token, userId));
    }
  }, []);

  return (
    <div>
      <Header />
      <main>
        {token ?
          <Content /> :
          <AuthPage />
        }
      </main>
    </div>
  );
}

export default App;
