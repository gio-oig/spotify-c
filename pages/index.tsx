import { Box, Flex, Text } from "@chakra-ui/layout";
import { Img } from "@chakra-ui/react";
import GradientLayout from "../components/GradientLayout";
import ArtistCard from "../components/shared/artistCard/ArtistCard";
import { useMe } from "../lib/hooks";
import prisma from "../lib/prisma";

export default function Home({ artists }) {

  const { user } = useMe();

  return (
    <GradientLayout
      color="purple"
      subititle="PROFILE"
      title={`${user?.firstName} ${user?.lastName}`}
      description={`${user?.playlistsCount} public playlists`}
      image="https://ap.ge/system/car/photos/006/274/188/original.jpg"
      roundImage
    >
      <Box color="white" paddingX="40px">
        <Box mb="20px">
          <Text fontSize="2xl" fontWeight="bold">
            Top artists this month
          </Text>
          <Text fontSize="md">Only visible to you</Text>
        </Box>
        <Flex gap="10px">
          {artists?.map((artist) => (
            <ArtistCard artist={artist} />
          ))}
        </Flex>
      </Box>
    </GradientLayout>
  );
}

export const getServerSideProps = async () => {
  const artists = await prisma.artist.findMany({});

  return {
    props: { artists },
  };
};
