// use axios to get post request
// import axios from "axios";
// import { showAlert } from "./alerts";

const login = async (email, password) => {
  try {
    const res = await axios({
      method: "POST",
      url: "http://localhost:3000/api/v1/users/login",
      data: {
        email,
        password,
      },
    });

    if (res.data.status === "success") {
      alert("Logged in!");
      window.setTimeout(() => {
        location.assign("/");
      }, 500);
    }
  } catch (err) {
    alert("Incorrect Login Information");
  }
};

// DOM ELEMENTS
const loginForm = document.querySelector(".form--login");

// DELEGATION
if (loginForm) {
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    login(email, password);
  });
}

const logout = async () => {
  try {
    const res = await axios({
      method: "GET",
      url: "http://localhost:3000/api/v1/users/logout",
    });
    if (res.data.status === "success") {
      // reload fresh page without user info
      location.reload(true);
    }
  } catch (err) {
    alert("Error");
  }
};

document.querySelector(".logout").addEventListener("click", (e) => {
  e.preventDefault();
  logout();
});
