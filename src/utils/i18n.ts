import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const savedLang = localStorage.getItem("lang") || "en";

i18n.use(initReactI18next).init({
  lng: savedLang,
  fallbackLng: "en",
  interpolation: { escapeValue: false },
  resources: {
    en: {
      translation: {
        login: "Login",
        enterName: "Enter Your Name",
        pleaseEnterName: "Please enter your name before logging in.",
        welcome: "Welcome, {{name}}",
        language: "Language",
        theme: "Theme",
        logout: "Logout",
        contact: "Contact us : info@nadin.ir",
        rights:
          "All rights of this site are reserved for Nadin Sadr Aria Engineering Company.",
        city: "City",

        weatherDashboard: "Weather Dashboard",
        dashboardOverview: "Dashboard Overview",
        forecast: "5-Day Forecast",
        humidity: "Humidity",
        pressure: "Pressure",
        wind: "Wind Speed",
        feelsLike: "Feels Like",
        loading: "Loading...",
        details: "Weather Details",
        temp: "Temperature",
        maxTemp: "Max Temp",
        minTemp: "Min Temp",
      },
    },
    fa: {
      translation: {
        login: "ورود",
        enterName: "نام خود را وارد کنید",
        pleaseEnterName: "لطفا قبل از ورود، نام خود را وارد کنید.",
        welcome: "خوش آمدید، {{name}}",
        language: "زبان",
        theme: "تم",
        logout: "خروج",
        contact: "تماس با ما: info@nadin.ir",
        rights:
          "تمام حقوق این سایت متعلق به شرکت مهندسی نادین صدر آریا می‌باشد.",
        city: "شهر",

        weatherDashboard: "داشبورد آب‌وهوا",
        dashboardOverview: "نمای کلی داشبورد",
        forecast: "پیش‌بینی ۵ روز آینده",
        humidity: "رطوبت",
        pressure: "فشار هوا",
        wind: "سرعت باد",
        feelsLike: "دمای احساس‌شده",
        loading: "در حال بارگذاری...",
        details: "جزئیات آب‌وهوا",
        temp: "دما",
        maxTemp: "بیشینه دما",
        minTemp: "کمینه دما",
      },
    },
  },
});

export default i18n;
