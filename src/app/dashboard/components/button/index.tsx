"use client"
import styles from "./style.module.scss";
import { useFormStatus } from "react-dom";

interface IButtonProps {
  title: string;
}

export default function Button({title}: IButtonProps) {
  const { pending } = useFormStatus();
  return (
    <button 
      type="submit" 
      disabled={pending} 
      className={`${styles.buttonComponent} ${pending ? styles.buttonLoading : ""}`}
    >
      { pending ? "Carregando..." : title }
    </button>
  )
}
