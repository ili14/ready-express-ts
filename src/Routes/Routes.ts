import { Router } from "express";
import ApiR from "./ApiR";

type routeAndPrefixType = Array<{ prefix: string; router: Router }>;

const Routes: routeAndPrefixType = [
    { prefix: "/api/v1", router: ApiR },
];

export default Routes;
