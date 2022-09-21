import { Box } from "@chakra-ui/layout";
import { IconButton, Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import { BsFillPlayFill } from "react-icons/bs";
import { AiFillClockCircle } from "react-icons/ai";
import { fomratDate, formatTime } from "../../lib/formatters";
import { useStoreActions } from "easy-peasy";

const songRowStyle = {
  transition: "all 0.3s",
  "&:hover": {
    bg: "rgba(255, 255, 255, 0.1)",
  },
};

const SongTable = ({ songs }) => {
  const setActiveSong = useStoreActions((store: any) => store.changeActiveSong);
  const setActiveSongs = useStoreActions(
    (store: any) => store.changeActiveSongs
  );

  function handlePlay(song?) {
    setActiveSong(song || songs[0]);
    setActiveSongs(songs);
  }

  return (
    <Box bg="transparent" color="white">
      <Box p="10px" mb="20px">
        <IconButton
          icon={<BsFillPlayFill fontSize="30px" />}
          aria-label="play"
          colorScheme="green"
          isRound
          onClick={() => handlePlay()}
        />
      </Box>
      <Table variant="unstyled">
        <Thead borderBottom="1px solid" borderColor="rgba(255, 255, 255, 0.2)">
          <Tr>
            <Th>#</Th>
            <Th>Title</Th>
            <Th>Date Added</Th>
            <Th>
              <AiFillClockCircle />
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          {songs.map((song, i) => (
            <Tr
              key={i}
              cursor="pointer"
              sx={songRowStyle}
              onClick={() => handlePlay(song)}
            >
              <Td>{i + 1}</Td>
              <Td>{song.name}</Td>
              <Td>{fomratDate(song.createdAt)}</Td>
              <Td>{formatTime(song.duration)}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default SongTable;
