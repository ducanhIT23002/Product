export const createTree = (categories) => {
    const tree = []
    const recursive = (level = 0, parentID = 0) => {
        for (let item of categories) {
            if (item['parentID'] === parentID) {
                const originalTitle = item['title']; // giữ lại tên gốc
                item['title'] = '--  '.repeat(level) + originalTitle;
                tree.push(item);
                recursive(level + 1, item['id']); // xử lý các con của item này
            }
        }
    };
    recursive(0, 0)
    return tree
}