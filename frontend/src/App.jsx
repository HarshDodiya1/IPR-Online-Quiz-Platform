import { useTranslation } from "react-i18next";
import "./App.css";
import LanguageSelector from "./components/LanguageSelector";

function App() {
  const { t } = useTranslation();
  const { part1, part2 } = t("description");
  return (
    <div className="flex flex-col items-center justify-center h-screen gap-10">
      <div className="text-xl">
        <LanguageSelector />
      </div>
      <div className="font-bold text-4xl">{t("greetings")}</div>
      <div className="text-lg text-center">
        {part1}
        <br />
        {part2}
      </div>
    </div>
  );
}

export default App;
