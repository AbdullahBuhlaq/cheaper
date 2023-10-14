import "../css/offersStatistics.css";
function OffersStatistics(props) {
  try {
    return (
      <>
        <div className="advices" style={{ height: "48%", overflow: "auto" }}>
          <div className="advice-header">
            <p>إحصائيات العروض</p>
          </div>
          <div className="offers-statistics">
            <div className="offers-statistics-header">المجانية</div>
            <div className="offers-statistics-body">
              <div className="taken-offer">المستلمة : {props.userProfile.free.taken}</div>
              <div className="not-taken-offer">غير المستلمة : {props.userProfile.free.notTaken}</div>
            </div>
          </div>
          <div className="offers-statistics">
            <div className="offers-statistics-header">المدفوعة</div>
            <div className="offers-statistics-body">
              <div className="taken-offer">المستلمة : {props.userProfile.pro.taken}</div>
              <div className="not-taken-offer">غير المستلمة : {props.userProfile.pro.notTaken}</div>
            </div>
          </div>
        </div>
      </>
    );
  } catch (err) {
    console.log(err);
  }
}

export default OffersStatistics;
