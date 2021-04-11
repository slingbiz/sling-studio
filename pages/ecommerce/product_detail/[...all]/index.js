import React from "react";
import AppPage from "../../../../@crema/hoc/AppPage";
import asyncComponent from "../../../../@crema/utility/asyncComponent";

const ProductDetail = asyncComponent(() => import("../../../../modules/ecommerce/ProductDetail"));
export default AppPage(() => <ProductDetail/>);
