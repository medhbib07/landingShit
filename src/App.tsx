import LandingPage from "./front-end/landing/LandingPage";

import { ThemeProvider } from "next-themes";
import {
  Routes,
  Route,
  useNavigate,
  useParams,
  Navigate,
  Outlet,
} from "react-router-dom";
import { useEffect,  } from "react";
import { useTranslation } from "react-i18next";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/sonner";




const SUPPORTED_LANGUAGES = ["en", "fr", "ar"];
const DEFAULT_LANGUAGE = "en";

function LanguageWrapper() {
  const { lang } = useParams<{ lang: string }>();
  const { i18n } = useTranslation();
  const navigate = useNavigate();

  useEffect(() => {
    if (lang && SUPPORTED_LANGUAGES.includes(lang)) {
      if (i18n.language !== lang) {
        i18n.changeLanguage(lang);
      }
    } else {
      // If language is not supported or missing, redirect to default
      navigate(`/${DEFAULT_LANGUAGE}`, { replace: true });
    }
  }, [lang, i18n, navigate]);

  if (!lang || !SUPPORTED_LANGUAGES.includes(lang)) {
    return null;
  }

  return <Outlet />;
}

function RootRedirect() {
  const { i18n } = useTranslation();
  // Ensure we have a valid language to redirect to
  const targetLang = SUPPORTED_LANGUAGES.includes(i18n.language)
    ? i18n.language
    : DEFAULT_LANGUAGE;

  return <Navigate to={`/${targetLang}`} replace />;
}



function App() {
  const navigate = useNavigate();
  const { i18n } = useTranslation();

  const getCurrentLang = () => {
    return SUPPORTED_LANGUAGES.includes(i18n.language)
      ? i18n.language
      : DEFAULT_LANGUAGE;
  };

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <TooltipProvider delayDuration={200}>
        <Toaster />
          <Routes>
            <Route path="/" element={<RootRedirect />} />

            <Route path="/:lang" element={<LanguageWrapper />}>
              <Route
                index
                element={
                  <LandingPage
                    onGetStarted={() =>
                      navigate(`/${getCurrentLang()}/getstarted`)
                    }
                  />
                }
              />


            </Route>
            <Route path="*" element={<RootRedirect />} />
          </Routes>
      </TooltipProvider>
    </ThemeProvider>
  );
}

export default App;
