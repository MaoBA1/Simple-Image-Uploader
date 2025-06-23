import { useCallback, useState } from "react";
import FileInput from "./components/FileInput/FileInput";
import Header from "./components/Header/Header";
import link from "./assets/Link.svg";
import download from "./assets/download.svg";

function App() {
  const [image, setImage] = useState(null);
  const [copied, setCopied] = useState(false);

  const uploadFinishedHandler = useCallback((imageFile) => {
    setImage(imageFile);
  }, []);

  const copyToClipBoardHandler = async () => {
    try {
      await navigator.clipboard.writeText(image.url);
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (err) {
      console.error("Copy failed", err);
    }
  };

  const downloadImageHandler = async() => {
    const response = await fetch("/api/download");
  }

  return (
    <div className="bg-white-20 dark:bg-black-0 h-[100dvh]">
      <Header />
      {image ? (
        <div className="h-[88dvh] sm:h-[92dvh] flex flex-col items-center justify-center w-[650px] m-auto gap-y-4">
          <div className="w-[650px] bg-white-0 p-2 rounded-lg shadow-2xl">
            <img
              src={image.url}
              alt={image.filename}
              className="w-full rounded-lg"
            />
          </div>
          <div className="flex flex-row w-full justify-center gap-x-4 font-inter-medium text-[12px] h-[28px]">
            <button
              onClick={copyToClipBoardHandler}
              className="relative group w-[80px] h-full bg-blue-10 flex flex-row gap-x-[5px] items-center justify-center rounded-md text-white-0"
            >
              <div>
                <img src={link} alt="link-icon" className="w-[15px]" />
              </div>
              <div>Share</div>
              {copied && (
                <div
                  className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 whitespace-nowrap 
               bg-gray-800 text-white text-sm px-2 py-1 rounded 
               animate-fade-in"
                >
                  Image URL copied to clipboard!
                </div>
              )}
            </button>
            <button onClick={downloadImageHandler} className="w-[100px] h-full bg-blue-10 flex flex-row gap-x-[5px] items-center justify-center rounded-md text-white-0">
              <div>
                <img src={download} alt="download-icon" className="w-[15px]" />
              </div>
              <div>Download</div>
            </button>
          </div>
        </div>
      ) : (
        <FileInput onImageUploadFinished={uploadFinishedHandler} />
      )}
    </div>
  );
}

export default App;
