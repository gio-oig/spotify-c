export function getRandomNumberDifferentFrom(num: number, size: number) {
    let isSameNumber = true;
    let randomNumber = undefined;

    while(isSameNumber) {
        randomNumber = Math.floor(Math.random() * size);
        isSameNumber = randomNumber === num;
    }

    return randomNumber;
}