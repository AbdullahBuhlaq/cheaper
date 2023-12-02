function Footer() {
  return (
    <>
      <div className="the-footer-section">
        <div className="the-footer">
          <div className="the-footer-right">
            <img src="images/img/logo.jpg" alt="" />
            <h1>جميع الحقوق محفوظة 2023-2024</h1>
          </div>

          <div className="the-footer-left">
            <a className="footer-link" href="index.html">
              <span>سياسات الخصوصية و التعامل</span>
            </a>
            <a className="footer-link" href="payment-proof.html">
              <span>طرق الانضمام لدينا</span>
            </a>
            <a className="footer-link" href="payout-rates.html">
              <span>حول التراخيص</span>
            </a>
            <a className="footer-link" href="auth/signin.html">
              <span>تسجيل دخول</span>
            </a>
            <a className="footer-link" href="auth/signup.html">
              <span>أنشئ حساباً</span>
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

export default Footer;
