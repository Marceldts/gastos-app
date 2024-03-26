import { Link } from 'react-router-dom'

export const HomeButton = () => {
  return (
    <Link to={'/home'}>
      <button className="home-button">
        <span>Volver a inicio</span>
      </button>
    </Link>
  )
}
