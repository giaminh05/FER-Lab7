import { useContext, useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import { Button } from "@mui/material";

function GoogleOneTapButton() {
  const [user, setUser] = useState({});
  const handleCredentialResponse = (response) => {
    console.log("Encoded JWT ID token: " + response.credential);
    var decoded = jwt_decode(response.credential);
    setUser(decoded);
    document.getElementById("buttonDiv").hidden = true;
  };
  const handleLogOut = (e) => {
    setUser({});
    document.getElementById("buttonDiv").hidden = false;
  };
  useEffect(() => {
    /* global google*/
    window.onload = function () {
      google.accounts.id.initialize({
        client_id: "Your Client ID…..",
        callback: handleCredentialResponse,
      });
      google.accounts.id.renderButton(
        document.getElementById("buttonDiv"),
        { theme: "outline", size: "large" } // customization attributes
      );
      google.accounts.id.prompt(); // also display the One Tap dialog
    };
  }, []);

  return (
    <>
      <Button>
        <div id="buttonDiv"></div>
        {Object.keys(user).length != 0 && (
          <button onClick={handleLogOut}>logout</button>
        )}
        {user && (
          <div>
            <h5>{user.name}</h5>
          </div>
        )}
      </Button>
    </>
  );
}

export default GoogleOneTapButton;
