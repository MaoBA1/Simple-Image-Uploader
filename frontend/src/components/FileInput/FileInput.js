import { useDropzone } from "react-dropzone";
import { useCallback, useEffect, useState } from "react";

import upload from "../../assets/exit.svg";

function FileInput({ onImageUploadFinished }) {
  const [isLoading, setIsLoading] = useState(false);

  const onDrop = useCallback(
    async (acceptedFiles) => {
      if (acceptedFiles.length > 1) {
        return;
      }
      const file = acceptedFiles[0];
      const formData = new FormData();
      formData.append("image", file);

      try {
        setIsLoading(true);
        const res = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });

        const data = await res.json();
        onImageUploadFinished(data.file);
        console.log("Upload success:", data);
      } catch (error) {
        console.error("Upload error:", error);
      } finally {
        setIsLoading(false);
      }
    },
    [onImageUploadFinished]
  );

  const onDropRejected = useCallback((fileRejections) => {
    if (fileRejections.length > 1) {
      alert("Only one image file is allowed");
    }
  }, []);

  const dropZoneSettings = {
    accept: {
      "image/*": [],
    },
    onDrop,
    onDropRejected,
    maxFiles: 1,
  };
  const { getRootProps, getInputProps, isDragActive } =
    useDropzone(dropZoneSettings);
  const [parentClass, setParentClass] = useState(
    "h-[88dvh] sm:h-[92dvh] flex flex-col items-center justify-center"
  );

  useEffect(() => {
    if (isDragActive) {
      setParentClass((prev) => `${prev} opacity-75`);
    } else {
      setParentClass((prev) => prev.replace(" opacity-75", ""));
    }
  }, [isDragActive]);

  return (
    <>
      {isLoading ? (
        <div className={parentClass}>
          <div className="bg-white-0 dark:bg-gray-0 w-[80vw] md:w-[60vw] lg:w-[50vw] xl:w-[40vw] h-[25vh] rounded-xl p-3 shadow-2xl flex flex-col items-center justify-center gap-y-5 text-black-0 dark:text-white-0 font-inter-light">
            <div>
              <strong className="font-inter-semibold">Uploading</strong>, please
              wait...
            </div>
            <div className="h-[5px] w-[80%] bg-white-30 rounded-full overflow-hidden relative">
              <div className="w-[80px] h-full bg-blue-10 rounded-full animate-slide absolute" />
            </div>
          </div>
        </div>
      ) : (
        <div className={parentClass} {...getRootProps()}>
          <input {...getInputProps({ multiple: false })} />
          <div className="bg-white-0 dark:bg-gray-0 w-[80vw] md:w-[60vw] lg:w-[50vw] xl:w-[40vw] h-[50vh] rounded-xl p-3 shadow-2xl">
            <div className="w-full h-full border-dashed border-[2px] border-white-30 rounded-xl flex flex-col items-center justify-center">
              <img
                src={upload}
                className="aspect-square w-[50px] sm:w-[70px] md:w-[80px]"
                alt="upload-icon"
              />
              <p className="text-center text-[16px] sm:text-[18px] md:text-[25px]">
                <strong className="font-semibold">
                  Drag & drop file or{" "}
                  <span className="text-blue-10">browse files</span>
                </strong>
                <br />
                <span className="font-light">
                  JPG, PNG, or GIF - Max file size 2MB
                </span>
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default FileInput;
