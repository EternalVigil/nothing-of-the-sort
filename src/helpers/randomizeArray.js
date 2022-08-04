// TODO - turn into web worker
export const randomizeArray = (array) => {
    if(!array) return [];

    let randomizedArray = [];

    while(array?.length > 0) {
        const randomNum = Math.floor(Math.random() * array.length);

        randomizedArray.push(array[randomNum]);
        array.splice(randomNum, 1);
    }
    return randomizedArray;
};