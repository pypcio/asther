import React from "react";
import userServises from "../APIs/users";
import useAuth from "./useAuth";

const useRefreshToken = () => {
  const { setAuth } = useAuth();
  const refresh = async () => {
    const response = await userServises.refreshToken();
    setAuth((prev) => {
      return { ...prev, token: response.data.token };
    });
  };
  return refresh;
};

export default useRefreshToken;
