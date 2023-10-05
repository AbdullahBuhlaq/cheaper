function Loading(props) {
  try {
    return (
      <>
        <div className="loading-container">
          <video className="loading-video" autoPlay loop muted playsInline style={{ backgroundColor: "transparent" }}>
            <source src="videos/1.webm" type="video/webm" />
          </video>
        </div>
      </>
    );
  } catch (error) {
    console.log(error);
  }
}

export default Loading;
