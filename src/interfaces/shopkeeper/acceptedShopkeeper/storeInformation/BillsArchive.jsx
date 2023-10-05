function BillsArchive(props) {
  try {
    return (
      <>
        <div className="profile-right-reports" style={{ height: "96%" }}>
          <div className="app-main-right-header">
            <span>0</span>
            <a href="#">سجل السحوبات</a>
          </div>
        </div>
      </>
    );
  } catch (err) {
    console.log(err);
  }
}

export default BillsArchive;
