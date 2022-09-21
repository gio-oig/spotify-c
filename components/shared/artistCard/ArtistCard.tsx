import { Box, Text } from "@chakra-ui/layout";
import { Img } from "@chakra-ui/react";
import CardWrapper from "../wrappers/CardWrapper";

const ArtistCard = ({ artist }) => {
  return (
    <CardWrapper>
      <Img width="160px" borderRadius="100%" src="https://ap.ge/system/car/photos/006/274/188/original.jpg" />
      <Box mt="10px" color="white">
        <Text fontSize="large">{artist.name}</Text>
        <Text fontSize="sm" textTransform="capitalize">
          artist
        </Text>
      </Box>
    </CardWrapper>
  );
};

export default ArtistCard;
