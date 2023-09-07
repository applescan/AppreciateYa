export const getInitials = (name: string) => {
    const names = name.split(' ').map(capitalizeEachWord);
    let initials = names[0].substring(0, 1).toUpperCase();

    if (names.length > 1) {
        initials += names[names.length - 1].substring(0, 1).toUpperCase();
    }
    return initials;
};

export const capitalizeEachWord = (sentence: string) => {
    return sentence
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(' ');
};

