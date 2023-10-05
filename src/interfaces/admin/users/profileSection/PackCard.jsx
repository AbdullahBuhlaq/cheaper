function PackCard(props) {
  try {
    return (
      <>
        <div class="received-item-line">
          <div class="progress-line">
            <span class="time start">2023/01/31</span>
            <span class="time end">2023/03/31</span>
          </div>
          <div class="received-items-content">
            <div class="perfect-card-container" dir="ltr">
              <div class="perfect-card">
                <div class="perfect-card-right">
                  <div class="dropdown">
                    <button class="dropbtn" style={{ background: "var(--main-profile)", border: "none", marginLeft: "70px", letterSpacing: "1px", padding: "revert", fontWeight: "600" }}>
                      •••
                    </button>
                    <ul id="myDropdown" class="dropdown-content">
                      <li>
                        <a href="#">عرض الحساب الشخصي</a>
                      </li>
                      <li>
                        <a href="#">عرض قائمة الحظورات</a>
                      </li>
                      <li>
                        <a href="#">حذف</a>
                      </li>
                    </ul>
                  </div>
                  <img src="test.png" />
                </div>

                <div class="perfect-card-left">
                  <div class="perfect-card-left-header">
                    <h1>اسم الباقة</h1>
                    <h2>سعر الباقة</h2>
                  </div>
                  <div class="perfect-card-left-body">
                    <h1>تم الشراء : 28</h1>
                    <h2>لم يتم الشراء : 8</h2>
                    <h3> المدة </h3>
                  </div>
                </div>

                <ul>
                  <li></li>
                  <li></li>
                  <li></li>
                  <li></li>
                  <li></li>
                  <li></li>
                  <li></li>
                  <li></li>
                  <li></li>
                  <li></li>
                  <li></li>
                  <li></li>
                  <li></li>
                  <li></li>
                  <li></li>
                  <li></li>
                  <li></li>
                  <li></li>
                  <li></li>
                  <li></li>
                  <li></li>
                  <li></li>
                  <li></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  } catch (err) {
    console.log(err);
  }
}

export default PackCard;
