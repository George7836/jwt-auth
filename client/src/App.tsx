import { useCallback, useContext, useEffect } from "react";
import { Context } from ".";
import { observer } from "mobx-react-lite";
import { Container } from "@mui/material";
import AppRouter from "./router/AppRouter";
import { useNavigate } from "react-router-dom";

function App() {
  const { store } = useContext(Context);
  const navigate = useNavigate();

  const checkAuth = useCallback(async () => {
    await store.checkAuth();
    if (!store.isAuth && window.location.pathname === "/") {
      navigate("/registration");
    }
  }, [navigate, store]);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      checkAuth();
    } else if (window.location.pathname === "/") {
      navigate("/registration");
    }
  }, []);

  return (
    <Container maxWidth="xs">
      {store.isLoading ? <div>Loading...</div> : <AppRouter />}
    </Container>
  );
}

export default observer(App);
