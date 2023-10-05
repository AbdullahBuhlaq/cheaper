function CardsArea(props) {
  function openCardHandle() {
    if (props.canOpen > 0) {
      props.setOpenOffer(true);
    } else {
      props.toast.info("لم يعد لديك عروض متاحة, يرجى المحاولة لاحقا", {
        position: props.toast.POSITION.TOP_CENTER,
      });
    }
  }
  try {
    return (
      <>
        <section className="content-section">
          <h1 className="section-header">قم باختيار كارد عشوائي</h1>

          {Array.from(Array(3).keys()).map((item, index) => {
            return (
              <div key={index} className="card-section">
                {Array.from(Array(3).keys()).map((item, innerindex) => {
                  return (
                    <div
                      key={innerindex}
                      className="offer-card"
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        openCardHandle();
                      }}
                    >
                      <img src="images/test.png" />
                    </div>
                  );
                })}
              </div>
            );
          })}
        </section>
      </>
    );
  } catch (err) {
    console.log(err);
  }
}

export default CardsArea;
