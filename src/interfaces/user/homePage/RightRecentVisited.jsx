function RightRecentVisited(props) {
  try {
    return (
      <>
        <div className="received-item-line">
          <div className="progress-line">
            <span className="time start">25 </span>
            <span className="time end">27 </span>
          </div>
          <div className="received-items-content">
            <div className="received-files">
              <div className="image-wrapper">
                <img src="https://images.unsplash.com/photo-1523987355523-c7b5b0dd90a7?ixlib=rb-1.2.1&amp;auto=format&amp;fit=crop&amp;w=2250&amp;q=80" />
              </div>
              <div className="image-wrapper">
                <img src="https://images.unsplash.com/photo-1523987355523-c7b5b0dd90a7?ixlib=rb-1.2.1&amp;auto=format&amp;fit=crop&amp;w=2250&amp;q=80" />
              </div>
              <div className="image-wrapper">
                <img src="https://images.unsplash.com/photo-1523987355523-c7b5b0dd90a7?ixlib=rb-1.2.1&amp;auto=format&amp;fit=crop&amp;w=2250&amp;q=80" />
              </div>
            </div>
            <div className="received-files-info">
              لقد قمت بزيارة <span className="info-purple">ماستر جيم</span> في تاريخ <span className="info-purple">26 </span>
            </div>
          </div>
        </div>
      </>
    );
  } catch (err) {
    console.log(err);
  }
}

export default RightRecentVisited;
