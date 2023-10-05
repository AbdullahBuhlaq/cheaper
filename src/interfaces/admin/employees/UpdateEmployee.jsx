import { useState, useEffect } from "react";
import Joi from "joi";
import Input from "../../../components/Input";
import handleSave from "../../../functions/handleSave";
import Select from "../../../components/Select";
import selectOptions from "../../../constants/selectOptions";
import SelectFromDB from "../../../components/SelectFromDB";
import ImageInput from "../../../components/ImageInput";
import employeeSchema from "./schema/employeeSchema";
import editEmployee from "./functions/editEmployee";
import Button from "../../../components/Button";

function UpdateEmployee(props) {
  const [duringAdd, setDuringAdd] = useState(false);
  const [employee, setEmployee] = useState({
    name: props.currentEdit.name,
    gender: props.currentEdit.gender,
    email: props.currentEdit.email,
    phoneNumber: props.currentEdit.phoneNumber,
    username: props.currentEdit.username,
    password: props.currentEdit.password,
    roleId: props.currentEdit.roleId,
  });

  useEffect(() => {
    setEmployee({
      name: props.currentEdit.name,
      gender: props.currentEdit.gender,
      email: props.currentEdit.email,
      phoneNumber: props.currentEdit.phoneNumber,
      username: props.currentEdit.username,
      password: props.currentEdit.password,
      roleId: props.currentEdit.roleId,
    });
  }, [props.currentEdit]);
  const [employeeErrors, setEmployeeErrors] = useState({});

  const joiEmployee = Joi.object(employeeSchema);

  const [image, setImage] = useState(false);

  try {
    return (
      <>
        <form>
          <div className="row">
            <Input placeholder={""} label={"الاسم"} type={"text"} name={"name"} onChange={handleSave} state={employee} setState={setEmployee} errors={employeeErrors} setErrors={setEmployeeErrors} schema={employeeSchema} />
            <Select label={"الجنس"} placeholder={"اختر الجنس..."} list={selectOptions.gender} name={"gender"} onChange={handleSave} state={employee} setState={setEmployee} errors={employeeErrors} setErrors={setEmployeeErrors} schema={employeeSchema} />
            <Input placeholder={""} label={"البريد الإلكتروني"} type={"text"} name={"email"} onChange={handleSave} state={employee} setState={setEmployee} errors={employeeErrors} setErrors={setEmployeeErrors} schema={employeeSchema} />
            <Input placeholder={""} label={"رقم الموبايل"} type={"text"} name={"phoneNumber"} onChange={handleSave} state={employee} setState={setEmployee} errors={employeeErrors} setErrors={setEmployeeErrors} schema={employeeSchema} />
            <Input placeholder={""} label={"اسم المستخدم"} type={"text"} name={"username"} onChange={handleSave} state={employee} setState={setEmployee} errors={employeeErrors} setErrors={setEmployeeErrors} schema={employeeSchema} />
            <Input placeholder={""} label={"كلمة المرور"} type={"password"} name={"password"} onChange={handleSave} state={employee} setState={setEmployee} errors={employeeErrors} setErrors={setEmployeeErrors} schema={employeeSchema} />
            <SelectFromDB label={"الدور"} placeholder={"اختر الدور..."} list={props.roles} type={"less5"} showKey={"name"} valueKey={"id"} name={"roleId"} onChange={handleSave} state={employee} setState={setEmployee} errors={employeeErrors} setErrors={setEmployeeErrors} schema={employeeSchema} />
            {/* <ImageInput setImage={setImage} /> */}
          </div>
          <Button action={() => editEmployee(employee, props.currentEdit, setDuringAdd, image, props.userInformation, props.setUserInformation, props.refreshStatus, props.setRefreshStatus, props.setEmployees, props.employees, props.setCurrentEdit, props.toast)} text={"حفظ"} disabled={duringAdd} joiObject={joiEmployee} state={employee} setStateErrors={setEmployeeErrors} toast={props.toast} />
        </form>
      </>
    );
  } catch (err) {
    console.log(err);
  }
}

export default UpdateEmployee;
