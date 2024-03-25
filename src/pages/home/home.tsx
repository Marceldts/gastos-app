import './home.css'
import { CreateGroup } from 'modules/group/ui/components/ create-group/create-group'
import { GroupsList } from 'modules/group/ui/components/groups-list/groups-list'

export const HomePage = () => {
  return (
    <main>
      <h1>Inicio</h1>
      <CreateGroup />
      <GroupsList />
    </main>
  )
}
