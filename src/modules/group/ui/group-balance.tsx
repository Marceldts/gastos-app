import { User } from 'modules/user/domain/User'
import '../../../App.css'

interface GroupBalanceProps {
  balance: Map<User, number> | null
}

export const GroupBalance = ({ balance }: GroupBalanceProps) => {
  return (
    <>
      {balance && (
        <section className="balance">
          <h3>Balance del grupo</h3>
          <ul>
            {Array.from(balance).map(([user, balance]) => (
              <li key={user.id} className={balance >= 0 ? 'positive-balance' : 'negative-balance'}>
                {user.name}:{' '}
                <span className={balance >= 0 ? 'positive-number' : 'negative-number'}>{balance.toFixed(2)}</span>
              </li>
            ))}
          </ul>
        </section>
      )}
    </>
  )
}
