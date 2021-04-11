import React from "react";
import AppPage from "../../../../@crema/hoc/AppPage";
import asyncComponent from "../../../../@crema/utility/asyncComponent";

const Rating = asyncComponent(() => import("../../../../modules/muiComponents/util/Rating"));
export default AppPage(() => <Rating/>);
