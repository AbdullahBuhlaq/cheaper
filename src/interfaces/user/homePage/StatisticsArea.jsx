import StatisticsItem from "./StatisticsItem";

function StatisticsArea(props) {
  try {
    return (
      <>
        <section className="content-section">
          <h1 className="section-header">إحصائيـات سـريـعة</h1>
          <div className="access-links">
            <StatisticsItem title={"العروض المجانية المكتسبة"} value={props.homeInfo.free.taken + "/" + props.homeInfo.free.notTaken} />
            <StatisticsItem title={"العروض المدفوعة المكتسبة"} value={props.homeInfo.pro.taken + "/" + props.homeInfo.pro.notTaken} />
            <StatisticsItem title={"العروض التي أهديتها"} value={props.homeInfo.countGiftedForOtherUser + " عرض"} />
            <StatisticsItem title={"خصم إضافي بعد"} value={props.homeInfo.stillToGetGift + " عروض"} />
          </div>
        </section>
      </>
    );
  } catch (err) {
    console.log(err);
  }
}

export default StatisticsArea;
