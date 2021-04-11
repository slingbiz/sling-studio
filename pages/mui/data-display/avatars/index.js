import React from "react";
import AppPage from "../../../../@crema/hoc/AppPage";
import asyncComponent from "../../../../@crema/utility/asyncComponent";

const Avatars = asyncComponent(() => import("../../../../modules/muiComponents/dataDisplay/Avatars"));
export default AppPage(() => <Avatars/>);
