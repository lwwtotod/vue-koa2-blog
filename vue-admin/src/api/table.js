import { get, post } from "@/utils/axios";

export const getList = () => get("/admin/getArticleList");
export const getTypeInfo = () => get("/admin/getTypeInfo");
export const addArticle = params => post("/admin/addArticle", params);
export const getArticleById = params => get(`/admin/getArticleById/${params}`);
export const delArticleById = params => get(`/admin/delArticle/${params}`);
export const updateArticle = params => post("/admin/updateArticle", params);
