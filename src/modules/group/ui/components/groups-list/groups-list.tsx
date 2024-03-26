import { deleteGroupCommand } from 'modules/group/application/delete/delete-group.command'
import { getGroupIdsQuery } from 'modules/group/application/get/get-group-ids.query'
import { createStorageGroupRepository } from 'modules/group/infrastructure/repositories/StorageGroup.repository'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

export const GroupsList = () => {
  const [groupIds, setGroupIds] = useState<string[]>([])
  const groupRepository = createStorageGroupRepository(localStorage)

  useEffect(() => {
    const _getGroupsIds = async () => {
      setGroupIds(await getGroupIdsQuery(groupRepository).execute())
    }
    _getGroupsIds()
  }, [])

  const deleteGroup = async (id: string) => {
    const deleteConfirmation = window.confirm('Are you sure you want to delete this group?')
    if (!deleteConfirmation) return
    await deleteGroupCommand(groupRepository).execute(id)
    setGroupIds(await getGroupIdsQuery(groupRepository).execute())
  }

  return (
    <section>
      <h2>Grupos ya creados:</h2>
      <nav>
        <ul>
          {groupIds.map(id => (
            <li key={id}>
              <Link to={`/group/${id}`}>Group {id}</Link>
              <img
                onClick={() => deleteGroup(id)}
                className="icon"
                src={`${process.env.PUBLIC_URL}/assets/icons/trash.svg`}
                title="Delete group"
                alt="Delete group icon"
              />
            </li>
          ))}
        </ul>
      </nav>
    </section>
  )
}
