import { cn } from "@/lib/utils";
import React, { useRef } from "react";
import { motion } from "motion/react";
import { useDropzone } from "react-dropzone";
import { Input } from "./input";

const mainVariant = {
  initial: {
    x: 0,
    y: 0,
  },
  animate: {
    x: 0,
    y: -0,
    opacity: 0.9,
  },
};

export const FileUpload = ({
  onChange,
  file,
}: {
  onChange: (files: File) => void;
  file: File;
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (newFiles: File[]) => {
    onChange(newFiles[0]);
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const { getRootProps, isDragActive } = useDropzone({
    multiple: false,
    noClick: true,
    onDrop: handleFileChange,
    onDropRejected: (error) => {
      console.log(error);
    },
  });

  return (
    <div className="h-full w-full bg-transparent" {...getRootProps()}>
      <motion.div
        onClick={handleClick}
        whileHover="animate"
        className="group/file relative block h-full w-full cursor-pointer overflow-hidden rounded-lg"
      >
        <Input
          ref={fileInputRef}
          id="file-upload-handle"
          type="file"
          multiple={false}
          accept="application/pdf"
          onChange={(e) => handleFileChange(Array.from(e.target.files || []))}
          className="hidden"
        />
        <div className="flex flex-col items-center justify-center gap-1">
          <p className="text-foreground relative z-20 font-bold">آپلود رزومه</p>
          <p className="text-muted-foreground relative z-20 text-base font-normal">
            Drag and drop or click to browse
          </p>
          <div className="relative mx-auto w-full max-w-xl">
            {file && (
              <motion.div
                layoutId={"file-upload"}
                className={cn(
                  "bg-muted relative z-40 mx-auto flex w-full flex-col items-start justify-start overflow-hidden rounded-md p-4",
                )}
              >
                <div className="flex w-full items-center justify-between gap-2">
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    layout
                    className="text-muted-foreground max-w-xs truncate text-sm"
                  >
                    {(file.size / (1024 * 1024)).toFixed(2)} MB
                  </motion.p>
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    layout
                    className="shadow-input bg-background text-foreground w-fit shrink-0 rounded-md px-2 py-1 text-sm"
                  >
                    {file.name}
                  </motion.p>
                </div>
              </motion.div>
            )}
            {!file && (
              <motion.div
                layoutId="file-upload"
                variants={mainVariant}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 20,
                }}
                className={cn(
                  "border-foreground/25 hover:border-foreground/50 relative z-40 mx-auto mt-2 flex h-44 w-full items-center justify-center rounded-md border-2 border-dashed bg-transparent transition-all duration-300 ease-in-out dark:border-[#9F5BE3]/25 dark:hover:border-[#9F5BE3]/50",
                )}
              >
                {isDragActive ? (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-muted-foreground flex flex-col items-center gap-2 text-xs"
                  >
                    <svg
                      width="68"
                      height="67"
                      viewBox="0 0 68 67"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect
                        x="0.5"
                        width="67"
                        height="67"
                        rx="33.5"
                        fill="#070707"
                      />
                      <path
                        d="M26.3992 32.389H25.2992V34.589H26.3992V32.389ZM39.5992 34.589H40.6992V32.389H39.5992V34.589ZM26.3992 38.9846H25.2992V41.1846H26.3992V38.9846ZM39.5992 41.2H40.6992V39H39.5992V41.2ZM26.3992 25.7934H25.2992V27.9934H26.3992V25.7934ZM35.1992 28H36.2992V25.8H35.1992V28ZM39.5992 18.1L40.378 17.3212L40.0546 17H39.5992V18.1ZM46.1992 24.7H47.2992V24.2446L46.978 23.9212L46.1992 24.7ZM26.3992 34.589H39.5992V32.389H26.3992V34.589ZM26.3992 41.1846L39.5992 41.2V39L26.3992 38.9846V41.1846ZM26.3992 27.9934L35.1992 28V25.8L26.3992 25.7934V27.9934ZM43.9992 47.8H21.9992V50H43.9992V47.8ZM20.8992 46.7V20.3H18.6992V46.7H20.8992ZM21.9992 19.2H39.5992V17H21.9992V19.2ZM45.0992 24.7V46.7H47.2992V24.7H45.0992ZM38.8204 18.8788L45.4204 25.4788L46.978 23.9212L40.378 17.3212L38.8204 18.8788ZM21.9992 47.8C21.7075 47.8 21.4277 47.6841 21.2214 47.4778C21.0151 47.2715 20.8992 46.9917 20.8992 46.7H18.6992C18.6992 47.5752 19.0469 48.4146 19.6658 49.0335C20.2846 49.6523 21.124 50 21.9992 50V47.8ZM43.9992 50C44.8744 50 45.7138 49.6523 46.3327 49.0335C46.9515 48.4146 47.2992 47.5752 47.2992 46.7H45.0992C45.0992 46.9917 44.9833 47.2715 44.777 47.4778C44.5707 47.6841 44.291 47.8 43.9992 47.8V50ZM20.8992 20.3C20.8992 20.0083 21.0151 19.7285 21.2214 19.5222C21.4277 19.3159 21.7075 19.2 21.9992 19.2V17C21.124 17 20.2846 17.3477 19.6658 17.9665C19.0469 18.5854 18.6992 19.4248 18.6992 20.3H20.8992Z"
                        fill="#9F5BE3"
                      />
                    </svg>
                    اینجا رها کنید
                  </motion.p>
                ) : (
                  <div className="flex flex-col items-center justify-center gap-2">
                    <svg
                      width="68"
                      height="67"
                      viewBox="0 0 68 67"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect
                        x="0.5"
                        width="67"
                        height="67"
                        rx="33.5"
                        className="fill-muted dark:fill-[#070707]"
                      />
                      <path
                        d="M26.3992 32.389H25.2992V34.589H26.3992V32.389ZM39.5992 34.589H40.6992V32.389H39.5992V34.589ZM26.3992 38.9846H25.2992V41.1846H26.3992V38.9846ZM39.5992 41.2H40.6992V39H39.5992V41.2ZM26.3992 25.7934H25.2992V27.9934H26.3992V25.7934ZM35.1992 28H36.2992V25.8H35.1992V28ZM39.5992 18.1L40.378 17.3212L40.0546 17H39.5992V18.1ZM46.1992 24.7H47.2992V24.2446L46.978 23.9212L46.1992 24.7ZM26.3992 34.589H39.5992V32.389H26.3992V34.589ZM26.3992 41.1846L39.5992 41.2V39L26.3992 38.9846V41.1846ZM26.3992 27.9934L35.1992 28V25.8L26.3992 25.7934V27.9934ZM43.9992 47.8H21.9992V50H43.9992V47.8ZM20.8992 46.7V20.3H18.6992V46.7H20.8992ZM21.9992 19.2H39.5992V17H21.9992V19.2ZM45.0992 24.7V46.7H47.2992V24.7H45.0992ZM38.8204 18.8788L45.4204 25.4788L46.978 23.9212L40.378 17.3212L38.8204 18.8788ZM21.9992 47.8C21.7075 47.8 21.4277 47.6841 21.2214 47.4778C21.0151 47.2715 20.8992 46.9917 20.8992 46.7H18.6992C18.6992 47.5752 19.0469 48.4146 19.6658 49.0335C20.2846 49.6523 21.124 50 21.9992 50V47.8ZM43.9992 50C44.8744 50 45.7138 49.6523 46.3327 49.0335C46.9515 48.4146 47.2992 47.5752 47.2992 46.7H45.0992C45.0992 46.9917 44.9833 47.2715 44.777 47.4778C44.5707 47.6841 44.291 47.8 43.9992 47.8V50ZM20.8992 20.3C20.8992 20.0083 21.0151 19.7285 21.2214 19.5222C21.4277 19.3159 21.7075 19.2 21.9992 19.2V17C21.124 17 20.2846 17.3477 19.6658 17.9665C19.0469 18.5854 18.6992 19.4248 18.6992 20.3H20.8992Z"
                        className="fill-primary"
                      />
                    </svg>
                    <p className="text-foreground relative z-20 text-base">
                      فایل رزومت رو آپلود کن
                    </p>
                    <p className="text-muted-foreground relative z-20 text-xs font-light">
                      فایل PDF, DOCX تا حجم ۲۰ مگابایت
                    </p>
                  </div>
                )}
              </motion.div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};
