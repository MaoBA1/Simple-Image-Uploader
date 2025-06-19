import { useCallback, useEffect, useState } from "react";

export const useToggleDarkMode = () => {
    const [isDark, setIsDark] = useState(localStorage.getItem("theme") === "dark");
    const enable = useCallback(() => {
        document.documentElement.classList.add("dark");
        localStorage.setItem("theme", "dark");
        setIsDark(true);
    },[]);

    const disable = useCallback(() => {
        document.documentElement.classList.remove("dark");
        localStorage.setItem("theme", "light");
        setIsDark(false);
    },[]);

    const toggleDarkMode = useCallback(() => {
        if(isDark) {
            return disable();
        }
        return enable();
    },[isDark, enable, disable]);

    useEffect(() => {
        if(isDark) {
            enable();
        } else {
            disable()
        }
    },[enable, disable, isDark]);

    return { toggleDarkMode, isDark };
}