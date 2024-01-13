export const rowalizer = (array, items_per_row = 3) => {
    const rowsNumber = Math.ceil(array.length / items_per_row);

    return Array.from({length: rowsNumber}, (_, num) => {
        let start = num * items_per_row;
        let end = start + items_per_row;
        return array.slice(start, end);
    })
};

export const pricer = (likes) => {
    let price = '0';
    if(likes % 2) {
        price = '10';
    } else {
        price = '5';
    }
    return price;
}