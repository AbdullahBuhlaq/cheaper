import { useState } from "react";
import Joi from "joi";
import Input from "../../../components/Input";
import handleSave from "../../../functions/handleSave";
import Button from "../../../components/Button";
import CheckPasswordInput from "../../../components/CheckPasswordInput";
import Select from "../../../components/Select";
import selectOptions from "../../../constants/selectOptions";
import SelectFromDB from "../../../components/SelectFromDB";
import addEmployee from "./functions/addEmployee";
import employeeSchema from "./schema/employeeSchema";

function AddEmployee(props) {
  const [duringAdd, setDuringAdd] = useState(false);

  const [employee, setEmployee] = useState({
    name: "",
    gender: "",
    email: "",
    phoneNumber: "",
    username: "",
    password: "",
    roleId: "",
  });

  const [employeeErrors, setEmployeeErrors] = useState({});

  const joiEmployee = Joi.object(employeeSchema);

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
            <CheckPasswordInput password={employee.password} errors={employeeErrors} setErrors={setEmployeeErrors} />
            <SelectFromDB label={"الدور"} placeholder={"اختر الدور..."} type={"less5"} list={props.roles} showKey={"name"} valueKey={"id"} name={"roleId"} onChange={handleSave} state={employee} setState={setEmployee} errors={employeeErrors} setErrors={setEmployeeErrors} schema={employeeSchema} />
          </div>
          <Button
            action={() => {
              addEmployee(employee, props.userInformation, props.setUserInformation, props.refreshStatus, props.setRefreshStatus, setDuringAdd, props.setEmployees, props.employees, props.toast, props.setAddNew);
            }}
            text={"إرسال"}
            disabled={duringAdd}
            joiObject={joiEmployee}
            state={employee}
            setStateErrors={setEmployeeErrors}
            toast={props.toast}
          />
        </form>
      </>
    );
  } catch (err) {
    console.log(err);
  }
}

export default AddEmployee;
