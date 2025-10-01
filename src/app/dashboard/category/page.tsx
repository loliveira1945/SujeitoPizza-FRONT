import { getCategories } from "@/services/category";
import CategoryClient from "./components";

export default async function Category() {
  const categories = await getCategories();
  return <CategoryClient initialCategories={categories} />;
}