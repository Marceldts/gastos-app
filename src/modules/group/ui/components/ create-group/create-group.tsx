import { createGroupCommand } from 'modules/group/application/create/create-group.command'
import { GroupAlreadyExists, GroupError } from 'modules/group/domain/Group'
import { createStorageGroupRepository } from 'modules/group/infrastructure/repositories/StorageGroup.repository'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export const CreateGroup = () => {
  const [showCreateGroupModal, setShowCreateGroupModal] = useState(false)
  const [groupId, setGroupId] = useState('')
  const navigate = useNavigate()
  const repository = createStorageGroupRepository(localStorage)
  const createGroup = async () => {
    try {
      await createGroupCommand(repository).execute(groupId)
    } catch (error) {
      if (error instanceof GroupError) alert(error.message)
      if (error instanceof GroupAlreadyExists) handleGroupAlreadyExists()
    }
  }

  const handleGroupAlreadyExists = () => {
    const navigateToGroup = window.confirm(
      'A group with that id already exists. Do you want to navigate to that group?',
    )
    if (!navigateToGroup) return
    navigate(`/group/${groupId}`)
  }

  return (
    <>
      <section className="create-group">
        <button onClick={() => setShowCreateGroupModal(true)}>
          <h2>Crear nuevo grupo</h2>
        </button>
      </section>

      {showCreateGroupModal && (
        <div className="dialog-background">
          <dialog open>
            <span className="close" onClick={() => setShowCreateGroupModal(false)}>
              &times;
            </span>
            <div className="dialog-content">
              <h2>Crear nuevo grupo</h2>
              <label>Id del grupo:</label>
              <input onChange={e => setGroupId(e.target.value)} type="text" minLength={1} />
              <button onClick={createGroup}>Crear</button>
            </div>
          </dialog>
        </div>
      )}
    </>
  )
}
