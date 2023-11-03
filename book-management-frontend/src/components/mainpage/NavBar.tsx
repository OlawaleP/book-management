import { HStack, Image } from '@chakra-ui/react'
import logo from '../../assets/book logo.webp'
import ColorModeSwitch from '../../ColorModeSwitch'
import { useAuth0 } from '@auth0/auth0-react';
import { MouseEventHandler } from 'react';

const NavBar = () => {
  const { loginWithRedirect, logout, isAuthenticated } =
  useAuth0();


const handleLoginWithRedirect: MouseEventHandler<HTMLButtonElement> = () => {
  loginWithRedirect();
};

const handleLogout: MouseEventHandler<HTMLButtonElement> = () => {
  logout();
}; 
  return (
    <HStack justifyContent='space-between' padding='10px'>
        <Image src={logo} boxSize='60px' />
        <div>
        <ul>
         {isAuthenticated ?<li>
            <button onClick={handleLogout}>Logout</button>
          </li>:
           <li>
           <button onClick={handleLoginWithRedirect}>Login/Signup</button>
         </li>
    } 
        </ul>
    
      </div>
        <ColorModeSwitch/>
    </HStack>    
  )
}

export default NavBar