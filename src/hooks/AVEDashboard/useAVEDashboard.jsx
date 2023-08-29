import React, { useEffect, useState } from "react";
import {
  useIsAuthenticated,
  useMsal,
  useMsalAuthentication,
} from "@azure/msal-react";
import { InteractionType } from "@azure/msal-browser";

const useAVEDashboard = () => {
  const [graphData, setGraphData] = useState(null);
  const { result, error } = useMsalAuthentication(InteractionType.Popup, {
    scopes: ["user.read"],
  });

  const fetchData = (endpoint, accessToken) => {
    const headers = new Headers();
    const bearer = `Bearer ${accessToken}`;
    headers.append("Authorization", bearer);

    const options = {
      method: "GET",
      headers: headers,
    };
    return fetch(endpoint, options)
      .then((response) => response.json())
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    if (!!graphData) {
      return;
    }
    if (!!error) {
      console.log(error);
      return;
    }

    if (result) {
      const { accessToken } = result;
      console.log({ accessToken });
      fetchData("https://graph.microsoft.com/v1.0/me", accessToken)
        .then((response) => {
          setGraphData(response);
          console.log({ response });
          if (!response.error) {
            window.localStorage.setItem("Token", accessToken);
            window.localStorage.setItem("User", JSON.stringify(response));
          }
        })
        .catch((error) => console.group(error));
    }
  }, [graphData, result, error]);
};

export default useAVEDashboard;
