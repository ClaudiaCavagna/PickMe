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
    likes % 2 ? price=20 : price=15;
    return price;
};

export const getItemFromLocalStorage = (key) => {
    if(localStorage.getItem(key)){
        return JSON.parse(localStorage.getItem(key));
    }
};

export const setLocalStorageItem = (key, item) => {
    if(item && typeof key === "string") {
        localStorage.setItem(key, JSON.stringify(item));
    }
};