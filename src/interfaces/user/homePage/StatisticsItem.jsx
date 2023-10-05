function StatisticsItem(props) {
  try {
    return (
      <>
        <div className="access-link-wrapper">
          <div className="access-icon">
            <p>{props.value}</p>
          </div>
          <span className="access-text">{props.title}</span>
        </div>
      </>
    );
  } catch (err) {
    console.log(err);
  }
}

export default StatisticsItem;
