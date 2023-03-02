export const GETALLTECHNIQUE = async () => {
    const res = await fetch(`${process.env.API_URL}technique`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });
    return res;
}