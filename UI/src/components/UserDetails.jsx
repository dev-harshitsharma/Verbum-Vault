import axios from "axios";
import React, { useEffect, useState } from "react";

const UserDetails = () => {
  const [user, setUser] = useState("");
  useEffect(() => {
    const token = localStorage.getItem("token");

    let headers = {
      "Content-Type": "application/json",
    };

    if (token) {
      headers = {
        ...headers,
        Authorization: "Bearer " + token,
      };
    }

    axios
      .get("http://localhost:5001/api/account/getcurrentuser", { headers })
      .then((res) => {
        setUser(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      {user && (
        <>
          <div className="mt-2 flex flex-inline justify-between gap-x-2">
            <p className="font-bold">{user.displayName}</p>
            <p className="italic">Tokens Available: {user.tokensAvailable}</p>
          </div>
        </>
      )}
    </>
  );
};

export default UserDetails;
