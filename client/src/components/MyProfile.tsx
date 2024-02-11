import { useCallback, useContext } from "react";
import { Context } from "..";
import { observer } from "mobx-react-lite";
import { Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

function MyProfile() {
  const { store } = useContext(Context);
  const navigate = useNavigate();

  const onLogout = useCallback(async () => {
    try {
      await store.logout();
      navigate("/login");
    } catch (e) {
      console.error(e);
    }
  }, []);

  return (
    <>
      {store.isAuth &&
        (!store.user?.isActivated ? (
          <Typography marginBottom={2}>
            Confirm your account by clicking on the link that came to your
            email.
          </Typography>
        ) : (
          <Typography marginBottom={2}>
            User {store.user?.email} is logged in.
          </Typography>
        ))}
      <Button variant="contained" onClick={onLogout}>
        Log out
      </Button>
    </>
  );
}

export default observer(MyProfile);
