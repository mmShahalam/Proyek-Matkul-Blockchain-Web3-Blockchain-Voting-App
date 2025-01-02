import React, { useState } from "react";
import Modal from "react-modal";

Modal.setAppElement("#root");

const Login = (props) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);

  const handleAdminLogin = async () => {
    try {
      const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
      const currentAccount = accounts[0];

      if (currentAccount.toLowerCase() === "0xc983e6ba2Ec500602b1e8292F558a147902f830c".toLowerCase()) {
        setIsAdmin(true);
        props.onAdminLogin(currentAccount);
      } else {
        setShowErrorModal(true);
      }
    } catch (error) {
      console.error("Error connecting to wallet:", error);
    }
  };

  const closeModal = () => {
    setShowErrorModal(false);
  };

  return (
    <div className="login-container">
      <h1 className="welcome-message">Welcome to the Decentralized Voting Application</h1>
      <button className="login-button" onClick={props.connectWallet}>
        Login with Metamask
      </button>
      <button className="admin-login-button" onClick={handleAdminLogin}>
        Login as Admin
      </button>

      {/* Modal for Error */}
      <Modal
        isOpen={showErrorModal}
        onRequestClose={closeModal}
        contentLabel="Error Modal"
        style={{
          content: {
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            marginRight: "-50%",
            transform: "translate(-50%, -50%)",
            padding: "20px",
            borderRadius: "10px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
          },
        }}
      >
        <div className="error-modal-content">
          <h2 style={{ color: "red" }}>Access Denied</h2>
          <p style={{ margin: "10px 0" }}>You are not authorized to log in as an admin.</p>
          <button
            onClick={closeModal}
            style={{
              padding: "10px 20px",
              backgroundColor: "#ff4d4d",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Close
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default Login;
