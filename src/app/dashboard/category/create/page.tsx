import Button from "../../components/button";
import styles from "./style.module.scss";
import { api } from "@/services/api";
import { getCookieServer } from "@/lib/cookieServer";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function CreateCategory() {

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
  }

  return (
    <main className={styles.categoryContainer}>
      <div className={styles.categoryHeader}>
        <Link href="/dashboard/category">
          <ArrowLeft size={28} />
        </Link>
        <h1>Nova Categoria</h1>
      </div>
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