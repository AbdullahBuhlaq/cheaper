import { motion } from "framer-motion";

function ImageInput(props) {
  try {
    return (
      <>
        <div className="column" style={{ position: "relative" }}>
          {props.imageTitle ? (
            <motion.h3 initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: "1.2" }}>
              {props.imageTitle}
            </motion.h3>
          ) : (
            <motion.h3 initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: "1.2" }}>
              الصورة الشخصية
            </motion.h3>
          )}
          <motion.input
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: "100%", opacity: 1 }}
            transition={{ type: "spring", duration: "1.2" }}
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
