import Button from "../components/button";
import styles from "./style.module.scss";
import { api } from "@/services/api";
import { getCookieServer } from "@/lib/cookieServer";
import { redirect } from "next/navigation";

export default function Category() {

  async function handleCreateCategory(formData: FormData) {
    "use server"

    const nameCategory = formData.get("name");
    const data = { name: nameCategory }
    const token = await getCookieServer();

    try {
      await api.post("/category", data, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
    } catch(err) {
      console.log("Error: ", err);
      return;
    }
    redirect("/dashboard");
  }

  return (
    <main className={styles.categoryContainer}>
      <h1>Nova Categoria</h1>
      <form action={handleCreateCategory} className={styles.categoryForm}>
        <input 
          type="text"
          name="name"
          placeholder="Nome da categoria..."
          required
          className={styles.categoryInput}
        />

        <Button title="Cadastrar" />
      </form>
    </main>
  )
}