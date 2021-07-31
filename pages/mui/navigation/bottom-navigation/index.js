import React from "react";
import AppPage from "../../../../@sling/hoc/AppPage";
import asyncComponent from "../../../../@sling/utility/asyncComponent";

const BottomNavigation = asyncComponent(() => import("../../../../modules/muiComponents/navigation/BottomNavigation"));
export default AppPage(() => <BottomNavigation/>);
