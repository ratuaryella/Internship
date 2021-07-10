const paginator = (reqPage, pageSize) => {
    const page = !reqPage || reqPage <= 0 ? 0 : reqPage - 1;
    const nextPage = page + 2;
    const prevPage = page;
    const offset = page * pageSize;
    const limit = pageSize;
    const currentPage = reqPage;

    return {
        page: page,
        nextPage: nextPage,
        prevPage: prevPage,
        offset: offset,
        limit: limit,
        currentPage: currentPage
    }
}

module.exports = paginator;