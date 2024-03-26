import { User } from 'modules/user/domain/User'
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
  members: Set<User>
  handleSubmitForm: (e: SyntheticEvent, expenseFormData: ExpenseFormData) => void
  handleCancelForm: (e: SyntheticEvent) => void
}

export const AddExpenseForm = ({ members, handleSubmitForm, handleCancelForm }: AddExpenseFormProps) => {
  const arrayFromMembers = Array.from(members).sort((a, b) => a.id - b.id)
  const [expenseFormData, setExpenseFormData] = useState({
    payerName: arrayFromMembers[0].name,
    payerId: arrayFromMembers[0].id,
    description: '',
    amount: 0,
    date: '',
  })

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedMember = e.target.value.split('-')
    const selectedMemberId = Number(selectedMember[0])
    const selectedMemberName = selectedMember[1]
    setExpenseFormData({
      ...expenseFormData,
      payerName: selectedMemberName,
      payerId: selectedMemberId,
    })
  }

  return (
    <form role="dialog" id="expense-form" className="expense-form">
      <>
        <h3>Añadir gasto</h3>
        <label>¿Qué usuario ha pagado el gasto?</label>
        <select onChange={handleSelectChange} name="users" id="user">
          {Array.from(members).map(member => (
            <option key={member.id} value={`${member.id}-${member.name}`}>
              {member.name} (Balance: {member.balance} - ID: {member.id})
            </option>
          ))}
        </select>
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
          step={0.01}
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
      </>
    </form>
  )
}
