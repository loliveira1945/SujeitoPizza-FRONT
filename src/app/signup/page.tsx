import Link from "next/link";
import Image from "next/image";
import styles from "../page.module.scss";
import logoImg from "@/../public/logo.svg";
import { api } from "@/services/api";
import { redirect } from "next/navigation";

export default function Signup() {

  async function handleRegister(formData: FormData){
    "use server" //funcao executada no server side, mas usa dados do client side
    const name = formData.get("name");
    const email = formData.get("email");
    const password = formData.get("password");

    if(!name || !email || !password) return;

    try {
      await api.post("/user", {
        name,
        email,
        password
      });
    } catch(err) {
      console.log("Error: ", err);
      return;
    }
    redirect("/");
  }

  return (
    <>
      <div className={styles.homeContainer}>
        <Image src={logoImg} alt="Logo do sistema pizzaria" />

        <section className={styles.homeLogin}>
          <h1>Cadastrando sua conta</h1>
          <form action={handleRegister}>
            <input
              name="name"
              type="text"
              required
              placeholder="Digite seu nome..."
              className={styles.homeInput}
            />

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
              Cadastrar
            </button>
          </form>

          <Link href="/" className={styles.homeText}>
            Já possui uma conta? Faça o login.
          </Link>
        </section>
      </div>
    </>
  );
}
