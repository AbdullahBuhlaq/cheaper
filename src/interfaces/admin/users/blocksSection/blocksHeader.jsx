function BlocksHeader(props) {
  try {
    return (
      <>
        <div className="categories-main-modal-body-details">
          <h1>حالة الحظر: {props.blocked ? "محظور" : "غير محظور"}</h1>
          <h2>عدد الحظورات: {props.count}</h2>
        </div>
      </>
    );
  } catch (err) {
    console.log(err);
  }
}

export default BlocksHeader;
