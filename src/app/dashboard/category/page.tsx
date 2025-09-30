import styles from "./style.module.scss";
import { RefreshCw, SquarePlus, SquarePen, Trash2 } from "lucide-react";
import Link from "next/link";
import { getCategories } from "@/services/category";

interface ICategory {
  id: string;
  name: string;
}

export default async function Category() {
  const categories = await getCategories();

  return (
    <main className={styles.categoryContainer}>
      <section className={styles.categoryHeader}>
        <h1>Categorias</h1>
        <section className={styles.categoryButtons}>
          <button aria-label="Atualizar lista de categorias">
            <RefreshCw size={24} />
          </button>

          <Link href="/dashboard/category/create" aria-label="Criar categoria">
            <SquarePlus size={24} />
          </Link>
        </section>
      </section>
      <section className={styles.categoryContent}>
        {categories?.length > 0 ? (
          <ul>
            {categories.map((category: ICategory) => (
              <li key={category.id} className={styles.categoryItem}>
                {category.name}
                <div>
                  <button aria-label="Editar categoria">
                    <SquarePen size={20} color="#3fffa3" />
                  </button>
                  <button aria-label="Apagar categoria">
                    <Trash2 size={20} color="#ff4d4f" />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className={styles.categoryEmpty}>Sem categorias...</p>
        )}
      </section>
      
    </main>
  )
}