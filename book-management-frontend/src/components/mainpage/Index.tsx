import { Grid, GridItem, Show } from "@chakra-ui/react"
import NavBar from "./NavBar"
import BookList from "./BookList"


function Index() {
  return <Grid templateAreas={{
    base: `"nav" "main"`,  // smaller devices
    lg: `"nav nav" "main"` // Devices more than 1024
  }}>
    <GridItem area='nav'>
      <NavBar />
    </GridItem>
    {/* <Show above="lg">    
    <GridItem area='aside'>Aside</GridItem>
    </Show> */}
    <GridItem area='main'><BookList/></GridItem>
  </Grid>
}

export default Index;
