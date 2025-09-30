import { FormProduct } from "./components/form";
import { getCategories } from "@/services/category";

export default async function Product() {

  const categories = await getCategories();

  return <FormProduct categories={categories}/>
}