import { Link } from "react-router-dom";
import "../style/footer.css";
import Policy from "./policy";
import Terms from "./terms";
import { useState } from "react";
const Footer = () => {
  const [isPolicyOpen, setIsPolicyOpen] = useState(false);
  const [isTermsOpen, setIsTermsOpen] = useState(false);
  const svgStyle = {
    fill: "currentcolor",
  };
  return (
    <footer className=" ph3 ph5-ns tc color-1">
      <Link
        className="link dim color-1 dib h2 w2 br-100 mr3 "
        to="https://github.com/pypcio"
        title=""
        target="_blank"
        rel="noreferrer noopener"
      >
        <svg data-icon="github" viewBox="0 0 16 16">
          <title>facebook icon</title>
          <path
            style={svgStyle}
            d="M8 0C3.58 0 0 3.582 0 8c0 3.535 2.292 6.533 5.47 7.59.4.075.547-.172.547-.385 0-.19-.007-.693-.01-1.36-2.226.483-2.695-1.073-2.695-1.073-.364-.924-.89-1.17-.89-1.17-.725-.496.056-.486.056-.486.803.056 1.225.824 1.225.824.714 1.223 1.873.87 2.33.665.072-.517.278-.87.507-1.07-1.777-.2-3.644-.888-3.644-3.953 0-.873.31-1.587.823-2.147-.083-.202-.358-1.015.077-2.117 0 0 .672-.215 2.2.82.638-.178 1.323-.266 2.003-.27.68.004 1.364.092 2.003.27 1.527-1.035 2.198-.82 2.198-.82.437 1.102.163 1.915.08 2.117.513.56.823 1.274.823 2.147 0 3.073-1.87 3.75-3.653 3.947.287.246.543.735.543 1.48 0 1.07-.01 1.933-.01 2.195 0 .215.144.463.55.385C13.71 14.53 16 11.534 16 8c0-4.418-3.582-8-8-8"
          ></path>
        </svg>
      </Link>
      <Link
        className="link dim color-1 dib h2 w2 br-100 mr3 "
        to="https://twitter.com/STymcio"
        title=""
        target="_blank"
        rel="noreferrer noopener"
      >
        <svg data-icon="twitter" viewBox="0 0 32 32">
          <title>twitter icon</title>
          <path
            style={svgStyle}
            d="M2 4 C6 8 10 12 15 11 A6 6 0 0 1 22 4 A6 6 0 0 1 26 6 A8 8 0 0 0 31 4 A8 8 0 0 1 28 8 A8 8 0 0 0 32 7 A8 8 0 0 1 28 11 A18 18 0 0 1 10 30 A18 18 0 0 1 0 27 A12 12 0 0 0 8 24 A8 8 0 0 1 3 20 A8 8 0 0 0 6 19.5 A8 8 0 0 1 0 12 A8 8 0 0 0 3 13 A8 8 0 0 1 2 4"
          ></path>
        </svg>
      </Link>
      <Link
        className="link dim color-1 dib br-100 h2 w2 mr3 "
        to="https://www.linkedin.com/in/szymon-tymcio-411882261/"
        title=""
        target="_blank"
        rel="noreferrer noopener"
      >
        <svg data-icon="linkedin" viewBox="0 0 16 16">
          <title>linkedin icon</title>
          <path
            style={svgStyle}
            d="M13.632 13.635h-2.37V9.922c0-.886-.018-2.025-1.234-2.025-1.235 0-1.424.964-1.424 1.96v3.778h-2.37V6H8.51V7.04h.03c.318-.6 1.092-1.233 2.247-1.233 2.4 0 2.845 1.58 2.845 3.637v4.188zM3.558 4.955c-.762 0-1.376-.617-1.376-1.377 0-.758.614-1.375 1.376-1.375.76 0 1.376.617 1.376 1.375 0 .76-.617 1.377-1.376 1.377zm1.188 8.68H2.37V6h2.376v7.635zM14.816 0H1.18C.528 0 0 .516 0 1.153v13.694C0 15.484.528 16 1.18 16h13.635c.652 0 1.185-.516 1.185-1.153V1.153C16 .516 15.467 0 14.815 0z"
          ></path>
        </svg>
      </Link>

      <div className=" mr4 ml3">
        <Link
          to="#"
          className="f6 link dim color-1 dib mr3 mr4-ns"
          onClick={() => setIsPolicyOpen(true)}
        >
          Privacy
        </Link>
        <Link
          to="#"
          className="f6 link dim color-1 dib"
          onClick={() => setIsTermsOpen(true)}
        >
          Terms
        </Link>
      </div>
      <Policy isOpen={isPolicyOpen} onClose={() => setIsPolicyOpen(false)} />
      <Terms isOpen={isTermsOpen} onClose={() => setIsTermsOpen(false)} />
    </footer>
  );
};
export default Footer;
