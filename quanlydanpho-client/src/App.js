import React from "react";

import Buttons from "./components/components/buttons/buttons";
import Admin from "./components/admin/admin";
import People from "./components/people/people";
import DatePickerPage from "./components/components/date/date";
import Household from "./components/household/household";
import TempAbsent from "./components/TempAbsent/tempAbsent";
import Stay from "./components/stay/stay";
import Form from "./components/components/Form/Form";
import Form_addpeople from "./components/people/form_addpeople";
import Form_addhousehold from "./components/household/Form_addhousehold";
import Form_addstay from "./components/stay/Form_addstay";
import Form_addtempabsent from "./components/TempAbsent/Form_addtempabsent";
import Form_kienNghi from "./components/kien nghi phan hoi/form_kienNghi";
import Form_phanHoi from "./components/kien nghi phan hoi/form_phanHoi";
import Form_phanHoiChiTiet from "./components/kien nghi phan hoi/form_phanHoiChiTiet";


const App = () => {
  return (
    <div>
        <main style={{paddingLeft: 0, margin: "8rem 6% 6rem"}}>
            <Form_phanHoiChiTiet   />
        </main>

    </div>
  );
};

export default App;
