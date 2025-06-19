import logo from "./assets/logo.svg";
import moon from "./assets/Moon_fill.svg";
import sun from "./assets/Sun_fill.svg";
import upload from "./assets/exit.svg";
import { useToggleDarkMode } from "./customHooks/useToggleDarkMode";

function App() {
  const { toggleDarkMode, isDark } = useToggleDarkMode();
  return (
    <div className="bg-white-20 dark:bg-black-0 h-[100dvh]">
      <div className="h-[12dvh] sm:h-[8dvh] pt-4 pb-4 pl-5 pr-5 sm:pl-16 sm:pr-16  border-solid border-b-[2px] border-white-30 flex flex-row justify-between items-center">
        <img src={logo} className="w-[150px] sm:w-[180px] aspect-[3/1]" alt="logo" />

        <div onClick={toggleDarkMode} className="border-solid border-[2px] border-white-30 rounded-lg h-[40px] w-[40px] flex flex-col items-center justify-center">
          <img src={isDark ? sun : moon} className="aspect-square w-[30px]" alt="moon-icon" />
        </div>
      </div>

      <div className="h-[88dvh] sm:h-[92dvh] flex flex-col items-center justify-center">
        <div className="bg-white-0 dark:bg-gray-0 w-[85vw] sm:w-[45vw] h-[50vh] rounded-xl p-3 shadow-2xl">
          <div className="w-full h-full border-dashed border-[2px] rounded-xl flex flex-col items-center justify-center">
            <img src={upload} className="aspect-square w-[40px]" alt="upload-icon"/>
            <p className="text-center">
              <strong className="font-semibold">
                Drag & drop file or{" "}
                <span className="text-blue-10">browse files</span>
              </strong>
              <br/>
              <span className="font-light">JPG, PNG, or GIF - Max file size 2MB</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
