import DetailsCard from "./DetailsCard";
import { BsGenderMale, BsGenderFemale } from "react-icons/bs";
import { AiOutlinePhone } from "react-icons/ai";
import { FaRegUserCircle } from "react-icons/fa";
import { HiOutlineCake } from "react-icons/hi";
import { LiaUserSlashSolid } from "react-icons/lia";

function ProfileDetails(props) {
  try {
    return (
      <>
        <section className="details-profile-cards">
          <DetailsCard keyName={"الجنس"} value={props.userProfile.infoUser["gender"]} icon={props.userProfile.infoUser["gender"] == "ذكر" ? <BsGenderMale /> : <BsGenderFemale />} />
          <DetailsCard keyName={"رقم الموبايل"} value={props.userProfile.infoUser["phoneNumber"]} icon={<AiOutlinePhone />} />
          <DetailsCard keyName={"تاريخ الميلاد"} value={props.userProfile.infoUser["birthday"]} icon={<HiOutlineCake />} />
          <DetailsCard keyName={"اسم المستخدم"} value={props.userProfile.infoUser["username"] + "@"} icon={<FaRegUserCircle />} />
          <DetailsCard keyName={"حالة الحظر"} value={props.userProfile.checkIfBlocked ? "محظور" : "غير محظور"} icon={<LiaUserSlashSolid />} />
          <DetailsCard keyName={"حالة النشاط"} value={props.userProfile.active ? "نشط" : "غير نشط"} icon={<LiaUserSlashSolid />} />
        </section>
      </>
    );
  } catch (err) {
    console.log(err);
  }
}

export default ProfileDetails;
