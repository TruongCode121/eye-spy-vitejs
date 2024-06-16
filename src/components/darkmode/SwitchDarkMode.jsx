import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { toggleDarkMode } from "../../redux/globalSlice";
import useDarkMode from "../hook/useDarkMode";

export default function SwitchDarkMode() {
  const dispatch = useDispatch();
  const [darkMode, setDarkMode] = useDarkMode();

  useEffect(() => {
    dispatch(toggleDarkMode(darkMode));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const handleToggleDarkMode = () => {
    setDarkMode(!darkMode);
    dispatch(toggleDarkMode(!darkMode));
  };
  return {
    darkMode,
    handleToggleDarkMode,
  };
}
