import { FOR_COMANY, FOR_USERS } from "../data/services";

function Services() {
  return (
    <>
      <div className="services-home-section">
        <div className="services-home-section-header">
          <h6>خدماتنا</h6>
          <h4>لأصحاب المتاجر و الشركات</h4>
        </div>

        <div className="services-home-box-section">
          {FOR_COMANY.map((item, index) => {
            return (
              <div key={index} className="services-home-box">
                <div className="serv-icon">{item.icon}</div>
                <h6>{item.title}</h6>
                <p>{item.body}</p>
              </div>
            );
          })}
        </div>

        <div className="services-home-section-header">
          <h4>للمستخدمين و المشاركين</h4>
        </div>

        <div className="services-home-box-section">
          {FOR_USERS.map((item, index) => {
            return (
              <div key={index} className="services-home-box">
                <div className="serv-icon">{item.icon}</div>
                <h6>{item.title}</h6>
                <p>{item.body}</p>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default Services;
