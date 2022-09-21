import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

import { Artist, artistsData } from "./songsData";

const prisma = new PrismaClient();

async function createPlaylistWithSongs(artist: Artist) {
  return prisma.artist.upsert({
    where: { name: artist.name },
    update: {},
    create: {
      name: artist.name,
      songs: {
        create: artist.songs.map((song) => ({
          name: song.name,
          duration: song.duration,
          url: song.url,
        })),
      },
    },
  });
}

async function createUser(email: string, password: string) {
  const salt = bcrypt.genSaltSync();

  const user = await prisma.user.upsert({
    where: { email },
    update: {},
    create: {
      email,
      firstName: "Giorgi",
      lastName: "Arakhamia",
      password: bcrypt.hashSync(password, salt),
    },
  });

  return user;
}

const run = async () => {
  await Promise.all(artistsData.map(createPlaylistWithSongs));

  const user = await createUser("user@test.com", "password");

  const songs = await prisma.song.findMany({});
  await Promise.all(
    new Array(10).fill(1).map(async (_, i) => {
      return prisma.playlist.create({
        data: {
          name: `Playlist #${i + 1}`,
          user: {
            connect: { id: user.id },
          },
          songs: {
            connect: songs.map((song) => ({
              id: song.id,
            })),
          },
        },
      });
    })
  );
};

run()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
