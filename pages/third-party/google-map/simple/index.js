import React from "react";
import AppPage from "../../../../@crema/hoc/AppPage";
import asyncComponent from "../../../../@crema/utility/asyncComponent";

const Simple = asyncComponent(() => import("../../../../modules/thirdParty/googleMap/Simple"));
export default AppPage(() => <Simple/>);
