export function getRandomColor() {
  const color = [
    "gray",
    "red",
    "orange",
    "yellow",
    "green",
    "teal",
    "blue",
    "cyan",
    "Purple",
    "pink",
  ];

  return color[getRandomNumberUpTo(color.length)];
}

function getRandomNumberUpTo(number: number) {
    return Math.floor(Math.random() * number);
}
