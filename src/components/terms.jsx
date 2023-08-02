import React from "react";

const Terms = ({ isOpen, onClose }) => {
  return (
    <div>
      {isOpen && (
        <div
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: 1000,
            backgroundColor: "white",
            padding: "20px",
            borderRadius: "8px",
            width: "80%",
            maxWidth: "600px",
            maxHeight: "80%",
            overflowY: "auto",
          }}
        >
          <h2>Terms & Conditions</h2>
          <button onClick={onClose} style={{ float: "right" }}>
            Close
          </button>
          <div>
            <p className="tl">
              Introduction: By accessing or using our website and services, you
              agree to be bound by these Terms & Conditions...
            </p>
            <h4 className="tl">1. Use License</h4>
            <p className="tl indent">
              You are granted a limited license to access and make personal use
              of this site. It does not include any rights to download or modify
              the site or its contents.
            </p>
            <h4 className="tl">2. User Conduct</h4>
            <p className="tl indent">
              You agree not to use the website in any way that is unlawful,
              harmful, or in violation of these Terms & Conditions.
            </p>
            <h4 className="tl">3. Intellectual Property Rights</h4>
            <p className="tl indent">
              All content on this website, including but not limited to text,
              graphics, logos, and images, is our property or the property of
              our licensors and is protected by copyright laws.
            </p>
            <h4 className="tl">4. Disclaimer</h4>
            <p className="tl indent">
              The materials on this website are provided "as is." We make no
              warranties or representations of any kind concerning the accuracy
              or reliability of the content on this site
            </p>
            <h4 className="tl">5. Limitation of Liability</h4>
            <p className="tl indent">
              In no event shall we be liable for any damages arising out of the
              use or inability to use the materials on our website.
            </p>
            <h4 className="tl">6. Changes to Terms & Conditions</h4>
            <p className="tl indent">
              We reserve the right to modify or replace these Terms & Conditions
              at any time without notice. By using this website, you agree to be
              bound by the then-current version of these Terms & Conditions.
            </p>
          </div>
        </div>
      )}
      <div
        style={
          isOpen
            ? {
                position: "fixed",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: "rgba(0, 0, 0, 0.5)",
                zIndex: 999,
              }
            : {}
        }
        onClick={onClose}
      />
    </div>
  );
};

export default Terms;
