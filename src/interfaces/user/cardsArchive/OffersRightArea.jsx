import getIcon from "../../../functions/getIcon";
import { MdOutlineDiscount } from "react-icons/md";
import { BsClockHistory } from "react-icons/bs";
import QRCode from "react-qr-code";
import { TfiGift } from "react-icons/tfi";
import { GiPartyPopper } from "react-icons/gi";
import { PiMaskSadDuotone } from "react-icons/pi";
import { useEffect, useState } from "react";
import selectOptions from "../../../constants/selectOptions";
import sendSpam from "./functions/sendSpam";
import sendEva from "./functions/sendEva";
import getRemainingTime from "../../../functions/getRemainingTime";
import checkPermissions from "../../../functions/checkPermission";
import { FcCancel } from "react-icons/fc";
import { motion } from "framer-motion";

function OffersRightArea(props) {
  const [rate, setRate] = useState(50);
  const [spam, setSpam] = useState(-1);
  const [duringAddSpam, setDuringAddSpam] = useState(false);
  const [duringAddEva, setDuringAddEva] = useState(false);
  const [remainingTime, setRemainingTime] = useState("");

  useEffect(() => {
    if (props.currentOffer) props.setCurrentOffer(props.offers[props.currentOffer.offerUserId]);
  }, [props.offers]);

  useEffect(() => {
    if (props.currentOffer.createdAt && remainingTime == "") {
      setRemainingTime(getRemainingTime(172800000 - (new Date(new Date().toISOString()) - new Date(props.currentOffer.createdAt))));

      setInterval(() => {
        setRemainingTime(getRemainingTime(172800000 - (new Date(new Date().toISOString()) - new Date(props.currentOffer.createdAt))));
      }, 60000);
    }
  }, [props.currentOffer]);

  try {
    return (
      <>
        {props.currentOffer ? (
          <>
            <motion.div className="right-area homeuser" key={props.currentOffer.offerUserId} initial={{ x: "-100%", opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ type: "spring", duration: "1.2" }} style={{ background: "transparent" }}>
              <button className="btn-close-right">
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="feather feather-x-circle" viewBox="0 0 24 24">
                  <defs></defs>
                  <circle cx="12" cy="12" r="10"></circle>
                  <path d="M15 9l-6 6M9 9l6 6"></path>
                </svg>
              </button>

              <div className="more-card-info">
                <div className="more-card-info-header">
                  <p>تم ربح عرض من قبل : {props.currentOffer.storeInfo.nameStore}</p>
                </div>

                <div className="more-card-info-header-sec">
                  <p>
                    التصنيف : {props.currentOffer.storeInfo.category.name + " "} {getIcon(props.currentOffer.storeInfo.category.emoji)}
                  </p>
                </div>

                <div className="more-card-info-body">
                  <div className="more-card-info-body-right">
                    <MdOutlineDiscount />
                    <p>نوع العرض : {props.currentOffer.typeOffer}</p>
                  </div>

                  <div className="more-card-info-body-left">
                    <BsClockHistory />
                    {props.currentOffer.dataTake ? (
                      <>
                        <p style={{ textAlign: "center" }}>
                          تم استلام العرض <span style={{ color: "green" }}>✔</span>
                        </p>
                      </>
                    ) : new Date(new Date().toISOString()) - new Date(props.currentOffer.createdAt) > 172800000 ? (
                      <>
                        <p>انتهت مدة العرض</p>
                      </>
                    ) : (
                      <>
                        <p>تبقى {remainingTime} لانتهاء العرض</p>
                      </>
                    )}
                  </div>
                </div>

                {(props.currentOffer.state !== false || !props.currentOffer.QR) && checkPermissions(props.userInformation, ["user.gift"]) ? null : (
                  <button className="modal-image-wrapper-btn" onClick={() => props.setOpenSendGift(props.currentOffer)}>
                    انقر لاهداء العرض لشخص اخر
                  </button>
                )}
              </div>

              {props.currentOffer.state !== false ? (
                <>
                  <div className="qr-code">
                    <span style={{ fontSize: "120px", display: "flex", flexDirection: "column", alignItems: "center" }}>
                      <TfiGift />
                      <span style={{ fontSize: "20px" }}>تم الإهداء إلى {props.currentOffer.state.receiver}</span>
                    </span>
                  </div>
                </>
              ) : props.currentOffer.QR ? (
                <>
                  <div className="qr-code">
                    <div style={{ padding: "10px", backgroundColor: "white" }}>
                      <QRCode fgColor="#0086d9" bgColor="white" size={512} style={{ height: "auto", maxWidth: "130px", width: "130px" }} value={props.currentOffer.QR} viewBox={`0 0 256 256`} />
                    </div>
                    امسح ال QR عند المحل لاكتساب العرض
                  </div>
                </>
              ) : props.currentOffer.dataTake ? (
                <>
                  <div className="qr-code">
                    <span style={{ fontSize: "120px", display: "flex", flexDirection: "column", alignItems: "center" }}>
                      <GiPartyPopper />
                      <span style={{ fontSize: "20px" }}>
                        تم استلام العرض <span style={{ color: "green" }}>🥳</span>
                      </span>
                    </span>
                  </div>
                </>
              ) : (
                <>
                  <div className="qr-code">
                    <span style={{ fontSize: "120px", display: "flex", flexDirection: "column", alignItems: "center" }}>
                      <PiMaskSadDuotone />
                      <span style={{ fontSize: "20px" }}>
                        لم يتم استلام العرض<span style={{ color: "green" }}>😕</span>
                      </span>
                    </span>
                  </div>
                </>
              )}

              {props.currentOffer.state !== false ? null : (
                <div className="rates-box">
                  <div className="rates-box-rate">
                    <input
                      className="range"
                      type="range"
                      min="0"
                      max="100"
                      value={props.currentOffer.evaluate !== false ? props.currentOffer.evaluate : rate}
                      step="1"
                      onChange={(e) => {
                        if (props.currentOffer.evaluate === false) setRate(e.target.value);
                      }}
                    />
                    <div style={{ marginRight: (props.currentOffer.evaluate !== false ? props.currentOffer.evaluate : rate) - (props.currentOffer.evaluate !== false ? props.currentOffer.evaluate : rate) / 20 + "%" }}>
                      <span style={{ fontWeight: "bold", color: `rgba(${255 - (255 * (props.currentOffer.evaluate !== false ? props.currentOffer.evaluate : rate)) / 100.0} ,${0 + (255 * (props.currentOffer.evaluate !== false ? props.currentOffer.evaluate : rate)) / 100.0}, 0)` }}>{props.currentOffer.evaluate !== false ? props.currentOffer.evaluate : rate}</span>
                    </div>
                    {props.currentOffer.evaluate !== false ? (
                      <p>
                        لقد قمت بتقييم المحل ب {props.currentOffer.evaluate} <span style={{ color: "green" }}>✔</span>
                      </p>
                    ) : (
                      <button
                        onClick={() => sendEva(props.userInformation, props.setUserInformation, props.refreshStatus, props.setRefreshStatus, setDuringAddEva, props.toast, rate, props.setOffers, props.offers, props.currentOffer)}
                        disabled={duringAddEva || !checkPermissions(props.userInformation, ["user.spamAndEvaluation"])}
                        style={!checkPermissions(props.userInformation, ["user.spamAndEvaluation"]) ? { cursor: "not-allowed" } : {}}
                      >
                        {checkPermissions(props.userInformation, ["user.spamAndEvaluation"]) ? (
                          "إرسال التقييم"
                        ) : (
                          <>
                            تم حظرك عن التقييم <FcCancel />
                          </>
                        )}
                      </button>
                    )}
                  </div>
                  <div className="rates-box-report">
                    <select
                      style={{ width: "100%", cursor: "pointer" }}
                      onChange={(e) => {
                        setSpam(e.target.value);
                      }}
                      value={props.currentOffer.spam ? props.currentOffer.spam : spam}
                      disabled={props.currentOffer.spam}
                    >
                      <option value={-1}>هل تود الإبلاغ عن المحل؟</option>
                      {selectOptions.spams.map((item, index) => {
                        return <option key={index}>{item}</option>;
                      })}
                    </select>
                    {props.currentOffer.spam ? (
                      <p style={{ color: "black", marginTop: "20px" }}>
                        لقد قمت بالإبلاغ عن هذا المحل <span style={{ color: "green" }}>✔</span>
                      </p>
                    ) : (
                      <button
                        onClick={() => {
                          if (spam != -1) {
                            sendSpam(props.userInformation, props.setUserInformation, props.refreshStatus, props.setRefreshStatus, setDuringAddSpam, props.toast, spam, props.setOffers, props.offers, props.currentOffer);
                          } else {
                            props.toast.info("يرجى اختيار إبلاغ", {
                              position: props.toast.POSITION.TOP_CENTER,
                            });
                          }
                        }}
                        disabled={duringAddSpam || !checkPermissions(props.userInformation, ["user.spamAndEvaluation"])}
                        style={!checkPermissions(props.userInformation, ["user.spamAndEvaluation"]) ? { cursor: "not-allowed" } : {}}
                      >
                        {checkPermissions(props.userInformation, ["user.spamAndEvaluation"]) ? (
                          "إرسال الإبلاغ"
                        ) : (
                          <>
                            تم حظرك عن الإبلاغ <FcCancel />
                          </>
                        )}
                      </button>
                    )}
                  </div>
                </div>
              )}
            </motion.div>
          </>
        ) : (
          <>
            <div className="right-area homeuser">
              <button className="btn-close-right">
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="feather feather-x-circle" viewBox="0 0 24 24">
                  <defs></defs>
                  <circle cx="12" cy="12" r="10"></circle>
                  <path d="M15 9l-6 6M9 9l6 6"></path>
                </svg>
              </button>
              قم باختيار عرض لعرض المعلومات والتقييم والإبلاغ.
            </div>
          </>
        )}
      </>
    );
  } catch (err) {
    console.log(err);
  }
}

export default OffersRightArea;
