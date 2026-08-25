import axiosClient from "./axiosClient";

// -----------
//    Auth
// -----------

export const loginUser = async (email, password) => {
  const response = await axiosClient.post("/auth/login/", { email, password });
  localStorage.setItem("access", response.data.access);
  localStorage.setItem("refresh", response.data.refresh);
  return response.data;
};

// loginUser()
// {
//     email,
//     token
// }

export const registerUser = async (email, password, passwordConfirm) => {
  const response = await axiosClient.post("/auth/register/", {
    email,
    password,
    password_confirm: passwordConfirm,
  });
  return response.data;
};

// registerUser()

export const logoutUser = async () => {
  const refresh = localStorage.getItem("refresh");
  await axiosClient.post("/auth/logout/", { refresh });
  localStorage.removeItem("access");
  localStorage.removeItem("refresh");
};

// logOutUser()

export const getMe = async () => {
  const response = await axiosClient.get("/auth/me/");
  return response.data;
};