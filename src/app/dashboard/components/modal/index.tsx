"use client"

import { use } from "react";
import styles from "./style.module.scss";
import { X } from "lucide-react";
import { OrderContext } from "@/providers/order";

export function ModalOrder() {
  const { onRequestClose, order, finishOrder } = use(OrderContext)

  async function handleFinishOrder() {
    await finishOrder(order[0].order.id);
  }

  return (
    <dialog className={styles.modalContainer}>
      <section className={styles.modalContent}>
        <div className={styles.modalHeader}>
          <div className={styles.modalHeaderLeft}>
            <h2>Detalhes do pedido</h2>

            <span className={styles.modalTable}>
              Mesa {order[0].order.table}
            </span>

            {order[0].order.name && (
              <span className={styles.modalNameClient}>
                - {order[0].order.name}
              </span>
            )}
          </div>
          <button className={styles.modalClose} onClick={onRequestClose}>
            <X size={32} color="#FF3F4B" />
          </button>
        </div>

        <article className={styles.modalOrderDetail}>
          {order.map(item => (
            <section className={styles.modalListOrder} key={item.id}>
              <span>{item.amount} - {item.product.name}</span>
              <div className={styles.modalDescriptions}>
                <span className={styles.modalDescriptionOrder}>
                  Descrição: {item.product.description ? item.product.description : "Sem descrição" }
                </span>
                <span className={styles.modalDescriptionOrder}>
                  Observação: {item.observation ? item.observation : "Sem observação" }
                </span>
              </div>
              {order.length > 1 && <hr />}
            </section>
          ))}

          <div className={styles.modalButton}>
            <button className={styles.modalSend} onClick={handleFinishOrder}>
              Concluir pedido
            </button>
          </div>
          
        </article>
      </section>
    </dialog>
  )
}