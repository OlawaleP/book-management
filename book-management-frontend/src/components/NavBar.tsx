import { HStack, Image, Text } from '@chakra-ui/react'
import logo from '../assets/book logo.webp'

const NavBar = () => {
  return (
    <HStack>
        <Image src={logo} boxSize='60px' />
        <Text>Book Shelf</Text>
    </HStack>    
  )
}

export default NavBar