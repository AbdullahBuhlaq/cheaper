import { BsGenderMale, BsGenderFemale } from "react-icons/bs";
import { AiOutlinePhone } from "react-icons/ai";
import { FaRegUserCircle } from "react-icons/fa";
import { HiOutlineCake } from "react-icons/hi";
import { LiaUserSlashSolid } from "react-icons/lia";
import UserDetailsCard from "./UserDetailsCard";

function UserProfileDetails(props) {
  try {
    return (
      <>
        <section className="details-profile-cards">
          <UserDetailsCard keyName={"الجنس"} value={props.profile.userInformation["gender"]} icon={props.profile.userInformation["gender"] == "ذكر" ? <BsGenderMale /> : <BsGenderFemale />} />
          <UserDetailsCard keyName={"رقم الموبايل"} value={props.profile.userInformation["phoneNumber"]} icon={<AiOutlinePhone />} />
          <UserDetailsCard keyName={"تاريخ الميلاد"} value={props.profile.userInformation["birthday"]} icon={<HiOutlineCake />} />
          <UserDetailsCard keyName={"اسم المستخدم"} value={props.profile.userInformation["username"] + "@"} icon={<FaRegUserCircle />} />
          <UserDetailsCard keyName={"حالة الحظر"} value={props.profile.userInformation.blocked ? "محظور" : "غير محظور"} icon={<LiaUserSlashSolid />} />
          <UserDetailsCard keyName={"حالة النشاط"} value={props.profile.userInformation.isActive ? "نشط" : "غير نشط"} icon={<LiaUserSlashSolid />} />
        </section>
      </>
    );
  } catch (err) {
    console.log(err);
  }
}

export default UserProfileDetails;
