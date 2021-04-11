import React from "react";
import AppPage from "../../../@crema/hoc/AppPage";
import asyncComponent from "../../../@crema/utility/asyncComponent";

const KnowledgeBase = asyncComponent(() => import("../../../modules/extraPages/KnowledgeBase"));
export default AppPage(() => <KnowledgeBase/>);
