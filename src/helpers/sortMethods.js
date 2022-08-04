export const sortByAttribute = (array, attribute) => {
    if(!array) return [];

    if(!attribute) return array;

    return array.sort((a, b) => {
        const attributeA = a[attribute];
        const attributeB = b[attribute];

        if(!attributeA && attributeB) return -1;
        if(attributeA && !attributeB) return 1;

        if(typeof attributeA === 'number' && typeof attributeB === 'number') {
            return attributeB - attributeA;
        } else {
            return attributeA.localeCompare(attributeB);
        }
    });
};

export const sortByName = (array) => {
    if(!array) return [];

    return array.sort((a, b) => {
        const { title: titleA } = a;
        const { title: titleB } = b;

        return titleA.localeCompare(titleB);
    });
};