"use client";
import { useEffect } from "react";

export default function GoogleLogin() {
  useEffect(() => {
    // Load Google Identity Services script
    const script = document.createElement("script");
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);

    let googleUser = null;
    function handleCredentialResponse(response) {
      const data = parseJwt(response.credential);
      googleUser = data;
      const infoDiv = document.getElementById("google-user-info");
      if (infoDiv) infoDiv.innerText = "Signed in as: " + (data.name || data.email);
      // Load theme for this user
      const userTheme = localStorage.getItem("theme-" + data.sub);
      if (userTheme) {
        window.localStorage.setItem("theme", userTheme);
        document.documentElement.classList.toggle("dark", userTheme === "dark");
      }
    }
    function parseJwt(token) {
      try {
        return JSON.parse(atob(token.split('.')[1]));
      } catch (e) { return {}; }
    }
    script.onload = () => {
      if (window.google && window.google.accounts && window.google.accounts.id) {
        window.google.accounts.id.initialize({
          client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
          callback: handleCredentialResponse
        });
        window.google.accounts.id.renderButton(
          document.getElementById("google-login-btn"),
          { theme: "outline", size: "large" }
        );
      }
    };
    // Save theme per user
    const observer = new MutationObserver(() => {
      if (googleUser) {
        const theme = document.documentElement.classList.contains("dark") ? "dark" : "light";
        localStorage.setItem("theme-" + googleUser.sub, theme);
      }
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => {
      document.body.removeChild(script);
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <div id="google-login-btn" style={{ alignSelf: 'flex-end', marginBottom: 16 }}></div>
      <div id="google-user-info" style={{ alignSelf: 'flex-end', marginBottom: 16 }}></div>
    </>
  );
}
