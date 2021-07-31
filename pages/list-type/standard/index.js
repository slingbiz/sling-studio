import React from "react";
import AppPage from "../../../@sling/hoc/AppPage";
import asyncComponent from "../../../@sling/utility/asyncComponent";

const Standard = asyncComponent(() => import("../../../modules/userList/Standard"));
export default AppPage(() => <Standard/>);
