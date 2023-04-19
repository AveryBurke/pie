const generateData = (columns:string[],amountOfData:number,maxValues = 10) => {
    const columnSet = Object.fromEntries(columns.map(column => [column,Array.from({length:Math.floor(Math.random() * (maxValues - 1))}, () => randomString(5,'abcdefghijklmnopqrstuvwxyz'))]))
    return Array.from({length: amountOfData}, () => Object.fromEntries(columns.map(column => {
        const set = columnSet[column]!
        const value = set[Math.floor(Math.random() * (set.length - 1))]
        return [column,value]
    })))

}
function randomString(size:number, charset:string) {
    var res = '';
    while (size--) res += charset[Math.random() * charset.length | 0];
    return res;
}
export default generateData