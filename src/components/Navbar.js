import Logo from '../images/to-do-list.png'

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="left-navbar">
        <img src={Logo} className="navbar-icon" alt="Todo list" />
        <span className="brand-name">TODO List</span>
      </div>
      <ul className="nav-items">
        <li className="nav-list-item">
          <a href="#" className="nav-item-link">
            Pricing
          </a>
        </li>
        <li className="nav-list-item">
          <a href="#" className="nav-item-link">
            About
          </a>
        </li>
        <li className="nav-list-item">
          <a href="#" className="nav-item-link">
            Contact
          </a>
        </li>
      </ul>
    </nav>
  )
}

export default Navbar