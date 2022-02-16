import Logo from '../images/to-do-list.png'
import { Menu } from 'antd'

const Navbar = () => {
  return (
    <Menu mode="horizontal">
      <Menu.Item key="mail">
        <img src={ Logo } width="30px" alt="Todo app" />
        TODO List
      </Menu.Item>
      <Menu.Item key="pricing">
        <a href="#" rel="noopener noreferrer">
          Pricing
        </a>
      </Menu.Item>
      <Menu.Item key="about">
        <a href="#" rel="noopener noreferrer">
          About
        </a>
      </Menu.Item>
      <Menu.Item key="contact">
        <a href="#" rel="noopener noreferrer">
          Contact
        </a>
      </Menu.Item>
    </Menu>
  )
}

export default Navbar