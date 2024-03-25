import './home.css'
import { Link } from 'react-router-dom'
import { CreateGroup } from 'modules/group/ui/components/ create-group/create-group'

export const HomePage = () => {
  return (
    <main>
      <h1>Inicio</h1>
      <CreateGroup />
      <section>
        <h2>Lista de grupos ya creados:</h2>
        <nav>
          <ul>
            <li>
              <Link to="/group/1">Grupo 1</Link>
            </li>
          </ul>
        </nav>
      </section>
    </main>
  )
}
