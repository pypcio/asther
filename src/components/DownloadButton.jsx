import { forwardRef } from "react";

const DownloadButton = forwardRef(function DownloadButton(props, ref) {
  return (
    <div
      id="download-div"
      ref={ref}
      className={`br3 ba shadow-5 b--black-20 mv4 w-100 w-50-m w-25-l mw fade-in bg-white `}
    >
      <div>
        <h2 className="center flex justify-center items-center">
          Comming soon!
        </h2>
      </div>
    </div>
  );
});

export default DownloadButton;
