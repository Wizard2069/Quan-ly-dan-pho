import React from "react";

import Buttons from "./components/components/buttons/buttons";
import Admin from "./components/admin/admin";
import People from "./components/people/people";
import DatePickerPage from "./components/components/DatePicker/DatePicker";
import Household from "./components/household/household";
import TempAbsent from "./components/TempAbsent/tempAbsent";
import Stay from "./components/stay/stay";
import Form from "./components/components/Form/Form";
import FormAddPeople from "./components/people/FormAddPeople";
import FormAddHousehold from "./components/household/FormAddHousehold";
import Form_addstay from "./components/stay/Form_addstay";
import Form_addtempabsent from "./components/TempAbsent/Form_addtempabsent";
import Form_kienNghi from "./components/kien nghi phan hoi/form_kienNghi";
import Form_phanHoi from "./components/kien nghi phan hoi/form_phanHoi";
import Form_phanHoiChiTiet from "./components/kien nghi phan hoi/form_phanHoiChiTiet";
import ModalPage from "./components/components/modals/modal";
import PersonDetail from "./components/people/PersonDetail";
import HouseholdDetail from "./components/household/HouseholdDetail";
import DeathDeclare from "./DeathDeclare/DeathDeclare";


const App = () => {
  return (
    <div>
        <main style={{paddingLeft: 0, margin: "8rem 6% 6rem"}}>
          <DeathDeclare/>
        </main>
    </div>
  );
};

export default App;
