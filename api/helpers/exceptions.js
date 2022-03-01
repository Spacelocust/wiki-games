export const checkValue1Value2 = (value1, value2) => {
    if (value1 <= 0) {
        throw { message: 'Error value <= 0' };
    } else {
        if(!(value1 >= value2)) {
            throw { message: 'Error value 1 < value 2' };
        }
    }
}
