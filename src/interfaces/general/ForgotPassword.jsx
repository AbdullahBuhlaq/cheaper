function ForgotPassword(props) {
  try {
    return (
      <>
        <div class="container">
          <h1>نسيت كلمة المرور ؟</h1>
          <p>ساعدنا في إيجاد حسـابك عبر كتابة الإيميل الخاص بك أو اسم المستخدم، أو محاولة تذكر أحدهما.</p>
          <form>
            <div class="row">
              <div class="column">
                <h3>اسم المستخدم أو الإيميل الخاص بك</h3>
                <input type="text" name="sname" id="sname" placeholder="@example || example@gmail.com" dir="ltr" required="" />
              </div>
            </div>

            <div class="row">
              <div class="column">
                <img src="images/secure.png" style={{ maxHeight: "300px", width: "100%", margin: "4px auto" }} />
              </div>
            </div>
          </form>
          <button class="button">
            <span class="default">إرسال</span>
            <span class="success">تم الإرسال ✅</span>
            <div class="left"></div>
            <div class="right"></div>
          </button>
        </div>
      </>
    );
  } catch (err) {
    console.log(err);
  }
}

export default ForgotPassword;
