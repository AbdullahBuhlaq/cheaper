function ImageInput(props) {
  try {
    return (
      <>
        <div className="column" style={{ position: "relative" }}>
          {props.imageTitle ? <h3>{props.imageTitle}</h3> : <h3>الصورة الشخصية</h3>}
          <input
            type="file"
            name=""
            id=""
            multiple={props.multiple}
            onChange={(event) => {
              if (props.multiple) props.setImage(event.target.files);
              else props.setImage(event.target.files[0]);
            }}
            disabled={props.disabled}
          />
        </div>
      </>
    );
  } catch (err) {
    console.log(err);
  }
}

export default ImageInput;
