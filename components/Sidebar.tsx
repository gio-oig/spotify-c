import NextImage from "next/image";
import NextLink from "next/link";
import {
  Box,
  Divider,
  LinkBox,
  LinkOverlay,
  List,
  ListIcon,
  ListItem,
} from "@chakra-ui/layout";
import {
  MdHome,
  MdSearch,
  MdLibraryMusic,
  MdPlaylistAdd,
  MdFavorite,
} from "react-icons/md";

const navMenus = [
  { name: "Home", icon: MdHome, route: "/" },
  { name: "Search", icon: MdSearch, route: "/search" },
  { name: "My Library", icon: MdLibraryMusic, route: "/library" },
];

const musicMenu = [
  { name: "Create Playlist", icon: MdPlaylistAdd, route: "/" },
  { name: "Home", icon: MdFavorite, route: "/favorite" },
];

const playlists = new Array(30).fill(1).map((_, i) => `Playlist ${i + 1}`);

const Sidebar = () => {
  return (
    <Box
      width="100%"
      height="calc(100vh - 100px)"
      bg="black"
      paddingX="5px"
      color="gray"
    >
      <Box py="20px" height="100%" display="flex" flexDirection="column">
        <Box w="120px" mb="20px" px="20px">
          <NextImage src="/logo.svg" width={120} height={60} />
        </Box>
        <Box mb="20px">
          <List spacing={2}>
            {navMenus.map(({ name, icon, route }) => (
              <ListItem fontSize="16px" key={name}>
                <LinkBox>
                  <NextLink href={route} passHref>
                    <LinkOverlay>
                      <ListIcon as={icon} color="white" ml="20px" />
                      {name}
                    </LinkOverlay>
                  </NextLink>
                </LinkBox>
              </ListItem>
            ))}
          </List>
        </Box>
        <Box>
          <List spacing={2}>
            {musicMenu.map(({ name, icon, route }) => (
              <ListItem fontSize="16px" key={name}>
                <LinkBox>
                  <NextLink href={route} passHref>
                    <LinkOverlay>
                      <ListIcon as={icon} color="white" ml="20px" />
                      {name}
                    </LinkOverlay>
                  </NextLink>
                </LinkBox>
              </ListItem>
            ))}
          </List>
        </Box>
        <Divider color="gray.700" />
        <Box flex={1} overflow="auto" py="20px">
          <List spacing={2}>
            {playlists.map((playlist) => (
              <ListItem px="20px" key={playlist}>
                <LinkBox>
                  <NextLink href="/" passHref>
                    <LinkOverlay>{playlist}</LinkOverlay>
                  </NextLink>
                </LinkBox>
              </ListItem>
            ))}
          </List>
        </Box>
      </Box>
    </Box>
  );
};

export default Sidebar;
