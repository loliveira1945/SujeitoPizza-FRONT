"use client"
import { use } from "react";
import styles from "./style.module.scss";
import { RefreshCw } from "lucide-react";
import { IOrderProps } from "@/interfaces/order.type";
import { ModalOrder } from "@/app/dashboard/components/modal";
import { OrderContext } from "@/providers/order";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface IProps {
  orders: IOrderProps[];
}

export function Orders({ orders }: IProps) {
  const { isOpen, onRequestOpen } = use(OrderContext);
  const router = useRouter();

  async function handleDetailOrder(order_id: string) {
    await onRequestOpen(order_id);
  }

  async function handleRefresh() {
    router.refresh();
    toast.success("Pedidos atualizados!");
  }

  return (
    <>
      <main className={styles.orderContainer}>
        <section className={styles.orderHeader}>
          <h1>Útlimos pedidos</h1>
          <button onClick={handleRefresh}>
            <RefreshCw size={24} color="#3fffa3" />
          </button>
        </section>
        <section className={styles.orderContent}>
          {orders.length === 0 && 
            <span className={styles.orderEmpty}>Sem pedidos...</span>
          }

          {orders.map(order => (
            <button 
              className={styles.orderItem}
              key={order.id}
              onClick={() => handleDetailOrder(order.id)}
            >

              <div className={styles.orderTag}></div>
              
              <span>Mesa {order.table}</span>

            </button>
          ))}
        </section>
      </main>

      {isOpen && <ModalOrder />}
    </>
  );
}
