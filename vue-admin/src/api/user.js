import { get, post } from "@/utils/axios";

export const login = params => post("admin/checkLogin", params);
export const logout = () => post("/admin/outLogin");
export const getInfo = params => post("/admin/checkOpenId", params);