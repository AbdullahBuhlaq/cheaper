import emailjs from "emailjs-com";
import { useRef, useState } from "react";
import { motion } from "framer-motion";

function ContactUs(props) {
  try {
    const form = useRef();
    const [duringSend, setDuringSend] = useState(false);

    const sendEmail = (e) => {
      e.preventDefault();

      setDuringSend(true);
      emailjs.sendForm(import.meta.env.VITE_EMAILJS_SERVICE_ID, import.meta.env.VITE_EMAILJS_TEMPLATE_ID, form.current, import.meta.env.VITE_EMAILJS_PUBLIC_KEY).then(
        (result) => {
          if (result.text == "OK" || result.status == 200)
            props.toast.success("تم إرسال الرسالة بنجاح", {
              position: props.toast.POSITION.TOP_CENTER,
            });
          e.target.reset();
          setDuringSend(false);
        },
        (error) => {
          props.toast.error(error.text, {
            position: props.toast.POSITION.TOP_CENTER,
          });
          setDuringSend(false);
        }
      );
    };
    return (
      <>
        <div className="contact-us-section">
          <div className="contact-us-section-header">
            <h6>تواصل معنا</h6>
            <h4>لمزيد من المعلومات</h4>
          </div>

          <div className="quick-contact">
            <div className="quick-contact-box">
              <a href="#" className="details-box text-center">
                <svg width="24" height="31" viewBox="0 0 24 31" fill="none" xmlns="../external.html?link=http://www.w3.org/2000/svg">
                  <path
                    d="M11.9288 0.62225C9.73552 0.654571 7.59813 1.31897 5.77304 2.53575C3.94794 3.75253 2.51264 5.47001 1.6393 7.48217C0.765965 9.49434 0.491683 11.7157 0.849361 13.8799C1.20704 16.0441 2.18148 18.0591 3.6558 19.6833C5.16645 21.3407 6.52555 23.1302 7.71681 25.0302C8.83383 26.8112 9.78387 28.6915 10.5548 30.6473C10.5989 30.7605 10.6549 30.8688 10.7218 30.9702C11.1708 30.9872 11.6288 30.9963 12.0928 30.9963C12.5568 30.9963 13.0148 30.9872 13.4638 30.9702C13.5307 30.8688 13.5867 30.7605 13.6308 30.6473L13.6718 30.5422C14.4292 28.6228 15.3622 26.7773 16.4588 25.0292C17.6468 23.1339 19.0047 21.3506 20.5158 19.7012C22.0139 18.0579 22.9987 16.0124 23.3489 13.8164C23.6991 11.6205 23.3994 9.37005 22.4867 7.34228C21.5741 5.31451 20.0883 3.59792 18.2124 2.40391C16.3365 1.20989 14.1523 0.590587 11.9288 0.62225V0.62225ZM12.0938 17.6493C10.9807 17.6493 9.89258 17.3192 8.96706 16.7008C8.04154 16.0823 7.32018 15.2034 6.89421 14.175C6.46824 13.1466 6.35679 12.015 6.57395 10.9233C6.7911 9.83156 7.32712 8.82874 8.11421 8.04165C8.9013 7.25456 9.90411 6.71855 10.9958 6.50139C12.0876 6.28423 13.2192 6.39569 14.2475 6.82166C15.2759 7.24763 16.1549 7.96898 16.7733 8.8945C17.3917 9.82002 17.7218 10.9081 17.7218 12.0212C17.7222 12.7607 17.5769 13.493 17.2942 14.1763C17.0115 14.8596 16.5969 15.4805 16.0742 16.0035C15.5514 16.5265 14.9308 16.9414 14.2476 17.2245C13.5645 17.5076 12.8323 17.6532 12.0928 17.6532L12.0938 17.6493Z"
                    fill="#808DAD"
                  />
                  <path d="M8.13456 30.7754C4.24356 30.3134 1.49756 29.1904 1.49756 27.8754C1.49756 26.9144 2.97056 26.0554 5.28656 25.4834C5.45456 25.7354 5.61822 25.9894 5.77756 26.2454C6.68268 27.6902 7.47086 29.205 8.13456 30.7754Z" fill="#808DAD" />
                  <path d="M22.6879 27.8783C22.6879 29.1903 19.9409 30.3143 16.0479 30.7783C16.7075 29.2068 17.4938 27.6915 18.3989 26.2473C18.5582 25.992 18.7215 25.7386 18.8889 25.4873C21.2119 26.0563 22.6879 26.9163 22.6879 27.8783Z" fill="#808DAD" />
                </svg>
                <p>ريف دمشق - دير عطية</p>
              </a>
            </div>

            <div className="quick-contact-box" style={{ border: "none" }}>
              <a href="tel:905343152141" className="details-box details-mobile-box text-center">
                <svg width="27" height="28" viewBox="0 0 27 28" fill="none" xmlns="../external.html?link=http://www.w3.org/2000/svg">
                  <path
                    d="M26.5258 21.5384C26.5114 21.9788 26.4494 22.4163 26.3408 22.8434C26.2496 23.2769 26.1194 23.7013 25.9518 24.1114C25.4186 24.9822 24.6297 25.6673 23.6928 26.0734C22.3619 26.8545 20.8065 27.1642 19.2778 26.9524C18.9183 26.8996 18.5629 26.8225 18.2138 26.7214C17.8192 26.61 17.5262 26.5207 17.3348 26.4534C17.1435 26.386 16.8012 26.2594 16.3079 26.0734C15.8139 25.888 15.5115 25.777 15.4008 25.7404C14.269 25.3453 13.1828 24.8301 12.1608 24.2034C8.62504 21.8769 5.60132 18.8532 3.27485 15.3174C2.64816 14.2954 2.13288 13.2092 1.73784 12.0774C1.70051 11.966 1.58952 11.6637 1.40485 11.1704C1.22019 10.677 1.09351 10.3347 1.02485 10.1434C0.958181 9.95204 0.868842 9.65904 0.756842 9.26438C0.655724 8.91504 0.578542 8.55921 0.525839 8.19937C0.314123 6.67074 0.623802 5.11535 1.40485 3.78437C1.81089 2.84746 2.49603 2.05861 3.36684 1.52538C3.77693 1.35778 4.20133 1.22757 4.63485 1.13637C5.06191 1.02784 5.49944 0.965811 5.93984 0.951373C6.07189 0.945074 6.20394 0.964081 6.32885 1.00737C6.55085 1.08137 6.87785 1.55037 7.30985 2.41437C7.44318 2.64904 7.62818 2.98237 7.86484 3.41437C8.10151 3.84637 8.31751 4.23838 8.51284 4.59038C8.71284 4.94238 8.90418 5.27237 9.08684 5.58037C9.12418 5.6297 9.23218 5.78404 9.41085 6.04337C9.56031 6.25213 9.69401 6.47174 9.81084 6.70037C9.89374 6.8642 9.9382 7.04477 9.94085 7.22837C9.88103 7.59017 9.69374 7.91863 9.41285 8.15438C9.05978 8.52569 8.67571 8.86624 8.26484 9.17237C7.86045 9.47305 7.47691 9.80081 7.11684 10.1534C6.84243 10.3631 6.65455 10.6663 6.58884 11.0054C6.5957 11.1487 6.62716 11.2897 6.68185 11.4224C6.7277 11.5516 6.7801 11.6784 6.83884 11.8024C6.88218 11.889 6.96851 12.037 7.09785 12.2464C7.22718 12.4557 7.29818 12.573 7.31084 12.5984C9.02582 15.8191 11.6621 18.4554 14.8828 20.1704C14.9075 20.1824 15.0248 20.2534 15.2348 20.3834C15.4448 20.5134 15.5928 20.5997 15.6788 20.6424C15.8028 20.7011 15.9296 20.7535 16.0588 20.7994C16.1915 20.8541 16.3325 20.8855 16.4759 20.8924C16.8149 20.8267 17.1181 20.6388 17.3278 20.3644C17.6804 20.0043 18.0082 19.6208 18.3088 19.2164C18.615 18.8055 18.9555 18.4215 19.3268 18.0684C19.5626 17.7876 19.8911 17.6003 20.2528 17.5404C20.4364 17.543 20.617 17.5875 20.7808 17.6704C21.0095 17.7872 21.2291 17.9209 21.4378 18.0704C21.6972 18.249 21.8515 18.357 21.9008 18.3944C22.2095 18.5797 22.5395 18.771 22.8908 18.9684C23.2422 19.1657 23.6342 19.3817 24.0668 19.6164C24.4988 19.851 24.8322 20.036 25.0668 20.1714C25.9335 20.6034 26.4025 20.9304 26.4739 21.1524C26.5154 21.2766 26.533 21.4076 26.5258 21.5384V21.5384Z"
                    fill="#0c93ff"
                  />
                </svg>
                <p>+963 940 0181 17</p>
              </a>
            </div>

            <div className="quick-contact-box">
              <a href="mailto:cheaper@chimento.com" className="details-box text-center">
                <svg width="32" height="26" viewBox="0 0 32 26" fill="none" xmlns="../external.html?link=http://www.w3.org/2000/svg">
                  <path
                    d="M25.926 0.75H5.25997C3.83305 0.815475 2.48969 1.4417 1.52208 2.49246C0.554462 3.54322 0.0408551 4.93353 0.0929667 6.361V20.389C0.0408551 21.8165 0.554462 23.2068 1.52208 24.2575C2.48969 25.3083 3.83305 25.9345 5.25997 26H25.926C27.3529 25.9345 28.6962 25.3083 29.6639 24.2575C30.6315 23.2068 31.1451 21.8165 31.093 20.389V6.361C31.1451 4.93353 30.6315 3.54322 29.6639 2.49246C28.6962 1.4417 27.3529 0.815475 25.926 0.75V0.75ZM27.993 8.886L17.793 16.321C17.1417 16.7599 16.3782 17.0029 15.593 17.021C14.8078 17.0029 14.0443 16.7599 13.393 16.321L3.19297 8.886C2.93135 8.6378 2.76296 8.30726 2.71599 7.94971C2.66902 7.59217 2.74633 7.22934 2.93497 6.922C3.03524 6.78483 3.16156 6.66876 3.30672 6.58044C3.45188 6.49212 3.61302 6.43327 3.78093 6.40727C3.94885 6.38126 4.12024 6.38861 4.28531 6.42889C4.45038 6.46916 4.6059 6.54158 4.74297 6.642L14.943 14.077C15.1543 14.2149 15.4011 14.2883 15.6535 14.2883C15.9058 14.2883 16.1527 14.2149 16.364 14.077L26.564 6.642C26.7056 6.53619 26.8687 6.46259 27.0417 6.42636C27.2148 6.39012 27.3936 6.39212 27.5658 6.43222C27.738 6.47232 27.8994 6.54954 28.0386 6.65849C28.1779 6.76745 28.2916 6.9055 28.372 7.063C28.5041 7.36893 28.5386 7.70817 28.4708 8.03444C28.4029 8.3607 28.2361 8.65808 27.993 8.886V8.886Z"
                    fill="#808DAD"
                  />
                </svg>
                <p>cheaper@chimento.com</p>
              </a>
            </div>
          </div>

          <div className="contact-form-home">
            <form ref={form} onSubmit={sendEmail}>
              <div className="first-row">
                <div className="contact-form-home-name">
                  <label>الاسم الكامل</label>
                  <input type="text" name="name" required="required" className="form-control" id="name" />
                </div>

                <div className="contact-form-home-mail">
                  <label>البريد الالكتروني</label>
                  <input type="text" name="email" required="required" className="form-control" id="email" />
                </div>
              </div>

              <div className="second-row">
                <div className="contact-form-home-subject">
                  <label>عنوان الرسالة</label>
                  <input type="text" name="title" required="required" className="form-control pl-3" id="subject" />
                </div>

                <div className="contact-form-home-message">
                  <label htmlFor="message">نص رسالتك</label>
                  <textarea name="message" required="required" id="message" rows="5"></textarea>
                </div>
              </div>

              <div className="send-form">
                <button className="success" id="invisibleCaptchaContact" type="submit">
                  {!duringSend ? (
                    "إرسال الآن"
                  ) : (
                    <span className="default" style={{ width: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>
                      <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 2, ease: "linear" }} style={{ width: "20px", height: "20px", borderRadius: "50%", border: "2px solid white", borderTopColor: "transparent" }}></motion.div>
                    </span>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </>
    );
  } catch (err) {
    console.log(err);
  }
}

export default ContactUs;
