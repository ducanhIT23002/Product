var count = 1;
export const codeOrder = () => {
    let res = "OD"
    let index = count.toString()
    for (let i = 0; i < 5 - index.length; i++) {
        res += "0"
    }
    res += index
    // ví dụ OD00012
    ++count
    return res
}