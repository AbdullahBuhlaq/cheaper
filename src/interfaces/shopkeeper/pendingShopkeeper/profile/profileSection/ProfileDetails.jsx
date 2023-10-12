import DetailsCard from "./DetailsCard";
import { BsGenderMale, BsGenderFemale } from "react-icons/bs";
import { AiOutlineMail, AiOutlinePhone } from "react-icons/ai";
import { FaRegUserCircle, FaUserAlt } from "react-icons/fa";
import { HiOutlineCake } from "react-icons/hi";

function ProfileDetails(props) {
  try {
    return (
      <>
        <section className="details-profile-cards">
          <DetailsCard keyName={"الجنس"} value={props.details["gender"]} icon={props.details["gender"] == "ذكر" ? <BsGenderMale /> : <BsGenderFemale />} />
          <DetailsCard keyName={"البريد الإلكتروني"} value={props.details["email"]} icon={<AiOutlineMail />} setPopupStatus={props.setPopupStatus} verify={props.details.settings.verify.email ? { state: true } : { state: false }} />
          <DetailsCard keyName={"رقم الموبايل"} value={props.details["phoneNumber"]} icon={<AiOutlinePhone />} />
          <DetailsCard keyName={"تاريخ الميلاد"} value={props.details["birthday"]} icon={<HiOutlineCake />} />
          <DetailsCard keyName={"اسم المستخدم"} value={props.details["username"] + "@"} icon={<FaRegUserCircle />} />
          <DetailsCard keyName={"الاسم"} value={props.details["name"]} icon={<FaUserAlt />} />
        </section>
      </>
    );
  } catch (err) {
    console.log(err);
  }
}

export default ProfileDetails;
