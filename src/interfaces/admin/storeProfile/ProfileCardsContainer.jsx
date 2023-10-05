import ProfileCardForStore from "./ProfileCardForStore";
import { BsGenderMale, BsGenderFemale } from "react-icons/bs";
import { AiOutlineMail, AiOutlinePhone } from "react-icons/ai";
import { FaRegUserCircle } from "react-icons/fa";
import { HiOutlineCake } from "react-icons/hi";
import { LiaUserSlashSolid } from "react-icons/lia";

function ProfileCardsContainer(props) {
  try {
    return (
      <>
        <section className="details-profile-cards">
          <ProfileCardForStore title={"اسم المستخدم"} icon={<FaRegUserCircle />} value={props.store.storeInfo["user.username"] + "@"} />
          <ProfileCardForStore title={"رقم الموبايل"} icon={<AiOutlinePhone />} value={props.store.storeInfo["user.phoneNumber"]} />
          <ProfileCardForStore title={"الجنس"} icon={props.store.storeInfo["user.gender"] == "ذكر" ? <BsGenderMale /> : <BsGenderFemale />} value={props.store.storeInfo["user.gender"]} />
          <ProfileCardForStore title={"المتبقي لأخد باقة مجانية"} icon={<HiOutlineCake />} value={props.store.stillToGetFreePack} />
          <ProfileCardForStore title={"حالة الحظر"} icon={<LiaUserSlashSolid />} value={props.store.block ? "محظور" : "غير محظور"} />
          <ProfileCardForStore title={"المدينة"} icon={<AiOutlineMail />} value={props.store.storeInfo.city} />
        </section>
      </>
    );
  } catch (err) {
    console.log(err);
  }
}

export default ProfileCardsContainer;
