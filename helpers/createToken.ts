export const  createTokenUser = (quantity) => {
    let result = "";
    const words = "qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM123456789"
    for (let i = 0; i < quantity; i++) {
        result += words.charAt(Math.floor(Math.random() * words.length));
    }
    return result
}

