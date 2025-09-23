"use client"

import { useState, ChangeEvent } from "react";
import styles from "./style.module.scss";
import { UploadCloud } from "lucide-react";
import Image from "next/image";
import Button from "@/app/dashboard/components/button";
import { api } from "@/services/api";
import { getCookieClient } from "@/lib/cookieClient";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface ICategoryProps {
  id: string;
  name: string;
}

interface ICategoriesProps {
  categories: ICategoryProps[]
}

export function FormProduct({ categories }: ICategoriesProps) {
  const ACCEPT_IMAGES = ["image/png", "image/jpeg"];
  const [imageInput, setImage] = useState<File>(); 
  const [previewImage, setPreview] = useState("");
  const router = useRouter();

  async function handleProduct(formData: FormData) {
    const categoryIndex = formData.get("category");
    const name = formData.get("name");
    const price = formData.get("price");
    const description = formData.get("description");

    if(!categoryIndex || !name || !price || !description || !imageInput) {
      toast.warning("Campo(s) obrigatório(s) não preenchido(s)!") ;
      return;
    }

    const data = new FormData();

    data.append("category_id", categories[Number(categoryIndex)].id);
    data.append("name", name);
    data.append("price", price);
    data.append("description", description);
    data.append("file", imageInput);

    const token = await getCookieClient();
    try {
      await api.post("/product", data, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      toast.success("Produto cadastrado com sucesso!");
      router.replace("/dashboard");
    } catch(err: any) {
        console.log(err);

        const status = err.response?.status || "desconhecido";
        toast.error(`Erro ${status} ao cadastrar produto!`);
        return; 
    };

  }

  function handleFile(event: ChangeEvent<HTMLInputElement>) {
    if(event.target.files && event.target.files[0]) {
      const image = event.target.files[0];

      if(!ACCEPT_IMAGES.includes(image.type)) {
        toast.warning("Formado do arquivo inválido") ;
        return;
      }

      setImage(image);
      setPreview(URL.createObjectURL(image));
    }
  }

  return (
    <main className={styles.productContainer}>
      <h1>Novo Produto</h1>
      <form className={styles.productForm} action={handleProduct}>
        <label className={styles.productFile}>
          <span>
            <UploadCloud size={36} color="#FFF" />
          </span>
          <input 
            type="file"
            accept={ACCEPT_IMAGES.join(",")}
            required
            onChange={handleFile}
          />

          {previewImage && (
            <Image 
              alt="Imagem preview"
              src={previewImage}
              className={styles.productPreview}
              fill={true}
              quality={100}
              priority={true}
            />
          )}
        </label>

        <select name="category" className={styles.productInput}>
          {categories.map((category, index) => (
            <option key={category.id} value={index}>
              {category.name}
            </option>
          ))}
        </select>

        <input 
          name="name"
          type="text"
          required
          placeholder="Digite o nome do produto..."
          className={styles.productInput}
        />

        <input 
          name="price"
          type="text"
          required
          placeholder="Digite o preço do produto..."
          className={styles.productInput}
        />

        <textarea 
          name="description"
          required
          placeholder="Digite a descrição do produto..."
          className={styles.productInput}
        />

        <Button title="Cadastrar"/>
      </form>
    </main>
  )
}