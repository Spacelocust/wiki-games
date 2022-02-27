export const checkValue1Value2 = (value1, value2) => {
    console.log(value1, value2)
    if(!(value1 >= value2)) {
        throw 'Error value 1 < value 2';
    }
}
