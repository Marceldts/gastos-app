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
  return (
    <section>
      <h2>Lista de grupos ya creados:</h2>
      <nav>
        <ul>
          {groupIds.map(id => (
            <li key={id}>
              <Link to={`/group/${id}`}>Group {id}</Link>
            </li>
          ))}
        </ul>
      </nav>
    </section>
  )
}
