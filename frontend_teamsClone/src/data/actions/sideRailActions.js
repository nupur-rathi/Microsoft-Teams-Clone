import {SETSIDERAIL} from "../../constants";

export const setSideRail = (selectedNav) => {
    return {
        type: SETSIDERAIL,
        payload: selectedNav,
    }
};