import React, { useState, useEffect } from "react";
import QrReader from "react-qr-scanner";
// import "./QRScanner.css";
import { AiOutlineScan } from "react-icons/ai";
import sendQR from "./functions/sendQR";

const QRScanner = (props) => {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState(true);

  function onClose() {
    setOpen(false);
  }

  const handleScan = async (data) => {
    if (data) {
      onClose();
      setStatus(false);
      await sendQR(data.text, props.userInformation, props.setUserInformation, props.refreshStatus, props.setRefreshStatus, props.toast);
      setStatus(true);
    }
  };

  const handleError = (error) => {
    console.log(error);
  };

  return (
    <div className="qr-scanner" style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", width: "100%", height: "250px" }}>
      {open ? (
        <>
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
            <QrReader delay={1000} onError={handleError} onScan={handleScan} style={{ width: "200px" }} />
            <span onClick={() => setOpen(false)} style={{ cursor: "pointer" }}>
              إغلاق
            </span>
          </div>
        </>
      ) : (
        <>
          <span onClick={() => status && setOpen(true)} style={{ cursor: "pointer", fontSize: "125px", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
            <AiOutlineScan />
            <span style={{ fontSize: "initial" }}>{status ? "امسح QR العرض" : "جار إرسال الرمز ..."}</span>
          </span>
        </>
      )}
    </div>
  );
};

export default QRScanner;
