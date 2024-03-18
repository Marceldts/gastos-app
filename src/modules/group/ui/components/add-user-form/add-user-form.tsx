import { Group } from 'modules/group/domain/Group'
import { SyntheticEvent, useState } from 'react'

interface AddUserFormProps {
  groupData: Group
  submitHandler: (username: string) => void
  cancelHandler: (e: SyntheticEvent) => void
  setShowUserForm: (value: boolean) => void
}

export const AddUserForm = ({ submitHandler, cancelHandler }: AddUserFormProps) => {
  const [newUserName, setNewUserName] = useState('')

  return (
    <form className="user-form">
      <h3>Añadir miembro al grupo</h3>
      <label>Nombre de usuario:</label>
      <input type="text" value={newUserName} onChange={e => setNewUserName(e.target.value)} />
      <section className="user-form-buttons">
        <button onClick={() => submitHandler(newUserName)}>Enviar</button>
        <button onClick={cancelHandler}>Cancelar</button>
      </section>
    </form>
  )
}
