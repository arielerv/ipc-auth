const getSearchParams = (params: object) => {
    if (!params) {
        return '';
    }
    const searchParams = new URLSearchParams();
    Object.entries(params)
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        .filter(([_, value]) => value !== undefined && value !== null)
        .forEach(([key, value]) => searchParams.append(key, value as string));
    return `?${searchParams.toString()}`;
};

export default getSearchParams;
