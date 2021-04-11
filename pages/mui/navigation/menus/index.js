import React from "react";
import AppPage from "../../../../@crema/hoc/AppPage";
import asyncComponent from "../../../../@crema/utility/asyncComponent";

const BottomNavigation = asyncComponent(() => import("../../../../modules/muiComponents/navigation/BottomNavigation"));
export default AppPage(() => <BottomNavigation/>);
