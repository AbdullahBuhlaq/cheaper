function GiftIcon(props) {
  try {
    return (
      <>
        <div style={{ position: "absolute", width: "50px", height: "50px", right: "20px", top: "20px", objectFit: "cover" }}>
          <img
            src="images/cheaper_icon.png"
            style={{ width: "100%", cursor: "pointer" }}
            onClick={() => {
              props.setIsGift(true);
              props.setOpenOffer(true);
            }}
          />
        </div>
      </>
    );
  } catch (err) {
    console.log(err);
  }
}

export default GiftIcon;
