"use client"

import styles from "./style.module.scss";
import { RefreshCw, SquarePlus, SquarePen, Trash2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";
import { api } from "@/services/api";
import { getCookieClient } from "@/lib/cookieClient";

interface ICategory {
  id: string;
  name: string;
}

export default function CategoryClient({ initialCategories }: { initialCategories: ICategory[] }) {
  const [categories, setCategories] = useState(initialCategories);
  const [loading, setLoading] = useState(false);

  async function handleRefresh() {
    setLoading(true);
    const token = await getCookieClient();

    try {
      const response = await api.get("/categories", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setCategories(response.data);
    } catch(err) {
      toast.error("Erro ao atualizar lista de categorias");
      return;
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(category_id: string) {
    const token = await getCookieClient();

    try {
      await api.delete(`/category?category_id=${category_id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      // Atualiza o estado local de categorias:
      // - `prev` é o array de categorias antes da exclusão
      // - `filter` retorna um novo array SEM a categoria cujo id foi deletado
      // - garante que o React faça o re-render
      setCategories(prev => prev.filter(category => category.id !== category_id));
      toast.success("Categoria excluída.");
    } catch(err: any) {
      toast.error("Erro ao excluir categoria");
      return
    }
  }

  async function handleEdit(category: ICategory){
    console.log(category);
  }

  return (
    <main className={styles.categoryContainer}>
      <section className={styles.categoryHeader}>
        <h1>Categorias</h1>
        <section className={styles.categoryButtons}>
          <button aria-label="Atualizar lista de categorias" onClick={handleRefresh}>
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
                  <button 
                    aria-label="Editar categoria" 
                    disabled={loading} 
                    onClick={() => handleEdit(category)}
                  >
                    <SquarePen size={20} color="#3fffa3" />
                  </button>

                  <button 
                    aria-label="Deletar categoria" 
                    disabled={loading} 
                    onClick={() => handleDelete(category.id)}
                  >
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