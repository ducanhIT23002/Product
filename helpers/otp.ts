export const  otp = () => {
    let result = "";
    const words = "123456789"
    for (let i = 0; i < 6; i++) {
        result += words.charAt(Math.floor(Math.random() * words.length));
    }
    return result
}


