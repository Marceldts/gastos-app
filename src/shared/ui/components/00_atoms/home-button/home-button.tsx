import { Link } from 'react-router-dom'

export const HomeButton = () => {
  return (
    <button className="home-button">
      <Link to={'/home'}>
        <span>Volver a inicio</span>
      </Link>
    </button>
  )
}
