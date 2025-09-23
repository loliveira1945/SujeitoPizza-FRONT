import Link from "next/link";
import Image from "next/image";
import styles from "./page.module.scss";
import logoImg from "@/../public/logo.svg";
import { api } from "@/services/api";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export default function Home() {
  async function handleLogin(formData: FormData){
    "use server"
    const email = formData.get("email");
    const password = formData.get("password");

    if(email === "" || password === "") return;

    try {
      const response = await api.post("/auth", {
        email,
        password
      });

      if(!response.data.token) return;

      const expressTime = 60 * 60 * 24 * 30 * 1000; //1 Mes
      const cookieStore = await cookies();

      cookieStore.set("session", response.data.token, {
        maxAge: expressTime,
        path: "/",
        httpOnly: false,
        secure: process.env.NODE_ENV === "production"
      });

    } catch(err) {
      console.log("Error: ", err);
      return;
    }
    redirect("/dashboard");
  }

  return (
    <>
      <div className={styles.homeContainer}>
        <Image src={logoImg} alt="Logo do sistema pizzaria" />

        <section className={styles.homeLogin}>
          <form action={handleLogin}>
            <input
              name="email"
              type="email"
              required
              placeholder="Digite seu e-mail..."
              className={styles.homeInput}
            />

            <input
              name="password"
              type="password"
              required
              placeholder="Digite sua senha..."
              className={styles.homeInput}
            />

            <button type="submit">
              Entrar
            </button>
          </form>

          <Link href="/signup" className={styles.homeText}>
            Não possui uma conta? Cadastra-se.
          </Link>
        </section>
      </div>
    </>
  );
}
