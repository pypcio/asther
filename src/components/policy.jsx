import React from "react";

const Policy = ({ isOpen, onClose }) => {
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
          <h2>Privacy Policy</h2>

          <div>
            <p className="tl"></p>
            <h4 className="tl">1. Information We Collect</h4>
            <p className="tl indent">
              We may collect personal information such as name, email address,
              or other details to provide services, improve user experience, or
              comply with legal obligations.
            </p>
            <h4 className="tl">2. How We Use Information</h4>
            <p className="tl indent">
              We may use the information collected to provide services, respond
              to inquiries, process transactions, or send periodic emails.
            </p>
            <h4 className="tl">3. Cookies</h4>
            <p className="tl indent">
              We use cookies to enhance your experience on our website. You may
              choose to decline cookies, but this may affect your ability to use
              certain features of the website.
            </p>
            <h4 className="tl">4. Third-Party Links</h4>
            <p className="tl indent">
              Our site may contain links to third-party websites. We have no
              control over and assume no responsibility for the content or
              privacy policies of any third-party sites.
            </p>
            <h4 className="tl">5. Security</h4>
            <p className="tl indent">
              We take reasonable precautions to protect your information but
              cannot guarantee its absolute security.
            </p>
            <h4 className="tl">6. Changes to Privacy Policy</h4>
            <p className="tl indent">
              We may update our Privacy Policy from time to time. Any changes
              will be posted on this page.
            </p>
            <h4 className="tl">6. Contact Us</h4>
            <p className="tl indent">
              If you have any questions about these Terms & Conditions or
              Privacy Policy, please contact us at https://github.com/pypcio.
            </p>
          </div>
          <button onClick={onClose} style={{ float: "center" }}>
            Close
          </button>
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

export default Policy;
