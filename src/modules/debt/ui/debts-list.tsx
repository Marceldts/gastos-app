import { Debt } from 'modules/debt/domain/Debt'

interface DebtListProps {
  debts: Debt[]
}

export const DebtList = ({ debts }: DebtListProps) => {
  return (
    <>
      {debts.length > 0 && (
        <section className="debts">
          <h3>Deudas</h3>
          <ul>
            {debts.map((debt, index) => (
              <li key={index}>
                {debt.debtor.name} le debe a {debt.creditor.name}: {debt.amount}
              </li>
            ))}
          </ul>
        </section>
      )}
    </>
  )
}
