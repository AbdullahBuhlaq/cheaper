import DetailsCard from "./DetailsCard";
import { BsGenderMale, BsGenderFemale } from "react-icons/bs";
import { AiOutlineMail, AiOutlinePhone } from "react-icons/ai";
import { FaRegUserCircle, FaUserAlt } from "react-icons/fa";
import { HiOutlineCake } from "react-icons/hi";
import { LiaUserSlashSolid } from "react-icons/lia";

function ProfileDetails(props) {
  try {
    return (
      <>
        <section className="details-profile-cards">
          <DetailsCard keyName={"الجنس"} value={props.details["gender"]} icon={props.details["gender"] == "ذكر" ? <BsGenderMale /> : <BsGenderFemale />} />
          <DetailsCard keyName={"البريد الإلكتروني"} value={props.details["email"]} icon={<AiOutlineMail />} />
          <DetailsCard keyName={"رقم الموبايل"} value={props.details["phoneNumber"]} icon={<AiOutlinePhone />} />
          <DetailsCard keyName={"تاريخ الميلاد"} value={props.details["birthday"]} icon={<HiOutlineCake />} />
          <DetailsCard keyName={"اسم المستخدم"} value={props.details["username"] + "@"} icon={<FaRegUserCircle />} />
          <DetailsCard keyName={"حالة الحظر"} value={props.details.blocked ? "محظور" : "غير محظور"} icon={<LiaUserSlashSolid />} />
        </section>
      </>
    );
  } catch (err) {
    console.log(err);
  }
}

export default ProfileDetails;
