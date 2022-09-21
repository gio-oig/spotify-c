import GradientLayout from "../../components/GradientLayout";
import SongTable from "../../components/table/SongTable";
import { validateToken } from "../../lib/auth";
import prisma from "../../lib/prisma";
import { getRandomColor } from "../../utils/getRandomColor";

const playlist = ({ playlist }) => {
  const randomColor = getRandomColor();
  return (
    <GradientLayout
      title={playlist.name}
      subititle="playlist"
      description={`${playlist.songs.length} songs`}
      image={`https://picsum.photos/400?random=${playlist.id}`}
      color={randomColor}
      roundImage={false}
    >
      <SongTable songs={playlist.songs} />
    </GradientLayout>
  );
};

export const getServerSideProps = async ({ query, req }) => {
  let user;

  try {
    user = validateToken(req.cookies.ACCESS_TOKEN);
  } catch (error) {
    return {
      redirect: {
        permanent: false,
        destination: "/signin",
      },
    };
  }

  const [playlist] = await prisma.playlist.findMany({
    where: {
      id: +query.id,
      userId: user.id,
    },
    include: {
      songs: {
        include: {
          artist: {
            select: {
              name: true,
              id: true,
            },
          },
        },
      },
    },
  });

  return {
    props: { playlist },
  };
};

export default playlist;
