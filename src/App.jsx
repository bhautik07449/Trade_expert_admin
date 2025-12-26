import { useTranslation } from "react-i18next";
import "./App.css";
import Router from "./router/router";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

function App() {

  const { i18n } = useTranslation("common");

  useEffect(() => {
    if (!localStorage.getItem("language")) {
      localStorage.setItem("language", "en");
    } else {
      i18n.changeLanguage(localStorage.getItem("language"));
    }

    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, []);

  const [isLaptop, setIsLaptop] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      setIsLaptop(window.innerWidth >= 1024);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  return (
    <>
      {isLaptop ? <Router isLoggedIn={isLoggedIn} /> : <div className='flex justify-center items-center h-screen '>This website is accessible only on laptop and desktop devices.</div>}
    </>
  );
}

export default App;
