function FailVideo(props) {
  try {
    return (
      <>
        <div className="loading-container">
          <video className="loading-video" autoPlay muted playsInline style={{ backgroundColor: "transparent" }}>
            <source src="videos/2.webm" type="video/webm" />
            {/* <source src="https://rotato.netlify.app/alpha-demo/movie-webm.webm" type="video/webm" />
              <source src="https://rotato.netlify.app/alpha-demo/movie-hevc.mov" type='video/mp4; codecs="hvc1"' /> */}
          </video>
        </div>
      </>
    );
  } catch (error) {
    console.log(error);
  }
}

export default FailVideo;
