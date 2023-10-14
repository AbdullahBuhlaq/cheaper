function ForgotPassword(props) {
  try {
    return (
      <>
        <div className="container">
          <h1>نسيت كلمة المرور ؟</h1>
          <p>ساعدنا في إيجاد حسـابك عبر كتابة الإيميل الخاص بك أو اسم المستخدم، أو محاولة تذكر أحدهما.</p>
          <form>
            <div className="row">
              <div className="column">
                <h3>اسم المستخدم أو الإيميل الخاص بك</h3>
                <input type="text" name="sname" id="sname" placeholder="@example || example@gmail.com" dir="ltr" required="" />
              </div>
            </div>

            <div className="row">
              <div className="column">
                <img src="images/secure.png" style={{ maxHeight: "300px", width: "100%", margin: "4px auto" }} />
              </div>
            </div>
          </form>
          <button className="button">
            <span className="default">إرسال</span>
            <span className="success">تم الإرسال ✅</span>
            <div className="left"></div>
            <div className="right"></div>
          </button>
        </div>
      </>
    );
  } catch (err) {
    console.log(err);
  }
}

export default ForgotPassword;
