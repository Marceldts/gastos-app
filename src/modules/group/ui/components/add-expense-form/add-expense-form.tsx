import { SyntheticEvent, useState } from 'react'
import { today } from 'shared/datetime/datetime'

export interface ExpenseFormData {
  payerName: string
  payerId: number
  description: string
  amount: number
  date: string
}
interface AddExpenseFormProps {
  handleSubmitForm: (e: SyntheticEvent, expenseFormData: ExpenseFormData) => void
  handleCancelForm: (e: SyntheticEvent) => void
}

export const AddExpenseForm = ({ handleSubmitForm, handleCancelForm }: AddExpenseFormProps) => {
  const [expenseFormData, setExpenseFormData] = useState({
    payerName: 'Marcel',
    payerId: 1,
    description: '',
    amount: 0,
    date: '',
  })

  return (
    <form role="dialog" id="expense-form" className="expense-form">
      <h3>Añadir gasto</h3>
      <label>Descripción:</label>
      <input
        type="text"
        value={expenseFormData.description}
        onChange={e =>
          setExpenseFormData({
            ...expenseFormData,
            description: e.target.value,
          })
        }
      />
      <label>Cantidad:</label>
      <input
        type="number"
        value={expenseFormData.amount}
        onChange={e =>
          setExpenseFormData({
            ...expenseFormData,
            amount: +e.target.value,
          })
        }
      />
      <label htmlFor="datepicker">Selecciona una fecha:</label>
      <input
        type="date"
        id="datepicker"
        value={expenseFormData.date}
        max={today}
        onChange={e =>
          setExpenseFormData({
            ...expenseFormData,
            date: e.target.value,
          })
        }
      />
      <section className="expense-form-buttons">
        <button onClick={(e: SyntheticEvent) => handleSubmitForm(e, expenseFormData)}>Enviar</button>
        <button onClick={handleCancelForm}>Cancelar</button>
      </section>
    </form>
  )
}
