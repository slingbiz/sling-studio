import React from "react";
import AppPage from "../../@crema/hoc/AppPage";
import asyncComponent from "../../@crema/utility/asyncComponent";

const Academy = asyncComponent(() => import("../../modules/dashboard/Academy"));
export default AppPage(() => <Academy/>);
