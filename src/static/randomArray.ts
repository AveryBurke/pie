function randomElement (array:string[]):string {
    const element = array[Math.floor(Math.random() * array.length)] || ''
    return element
}
const randomArray = () => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split(''),
    result:string[] = []
for (var i = 0; i < 8; i++) {
    result.push(randomElement(characters))
}
return result
}
export default randomArray
