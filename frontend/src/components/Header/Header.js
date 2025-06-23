import logo from "../../assets/logo.svg";
import moon from "../../assets/Moon_fill.svg";
import sun from "../../assets/Sun_fill.svg";
import logoSmall from "../../assets/logo-small.svg";
import { useToggleDarkMode } from "../../customHooks/useToggleDarkMode";

function Header(props) {
  const { toggleDarkMode, isDark } = useToggleDarkMode();
  return (
    <div className="h-[12dvh] sm:h-[8dvh] pt-4 pb-4 pl-5 pr-5 sm:pl-16 sm:pr-16  border-solid border-b-[2px] dark:border-b-[1px] border-white-30 dark:border-gray-0 flex flex-row justify-between items-center">
      {isDark ? (
        <div className="flex flex-row gap-x-3 items-center justify-start">
          <img
            src={logoSmall}
            className="w-[35px] sm:w-[45px] md:w-[55px] aspect-square"
            alt="logo"
          />
          <div className="text-white-0 font-inter-bold text-[16px] sm:text-[18px] md:text-[20px]">
            ImageUpload
          </div>
        </div>
      ) : (
        <img
          src={logo}
          className="w-[150px] sm:w-[180px] aspect-[3/1]"
          alt="logo"
        />
      )}

      <div
        onClick={toggleDarkMode}
        className="border-solid border-[2px] border-white-30 dark:border-gray-0 rounded-lg h-[40px] w-[40px] flex flex-col items-center justify-center"
      >
        <img
          src={isDark ? sun : moon}
          className="aspect-square w-[30px]"
          alt="moon-icon"
        />
      </div>
    </div>
  );
}

export default Header;
