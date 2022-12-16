function getDateTimePrint () {
    return new Date().toLocaleString('th-TH')
}

function getPageNumber (pageIndex) {
    if (pageIndex == null) {
        return ''
    }

    const pageNumber = pageIndex + 1

    return pageNumber
}

function getTotalPages (pages) {
    if (!pages) {
        return ''
    }

    return pages.length
}