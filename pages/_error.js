import React from "react";
import asyncComponent from "../@crema/utility/asyncComponent";

export default asyncComponent(() => import("../modules/errorPages/Error404/index"));
