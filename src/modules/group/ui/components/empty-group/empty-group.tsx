import { SyntheticEvent } from 'react'

interface EmptyGroupProps {
  handleCancelForm: (e: SyntheticEvent) => void
}

export const EmptyGroup = ({ handleCancelForm }: EmptyGroupProps) => {
  return (
    <form role="dialog" id="expense-form" className="expense-form">
      <h3>No hay usuarios en el grupo</h3>
      <p>Para añadir un gasto, primero añade usuarios al grupo.</p>
      <section className="expense-form-buttons">
        <button className="close-button" onClick={handleCancelForm}>
          Cerrar
        </button>
      </section>
    </form>
  )
}
