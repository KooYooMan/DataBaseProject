import cheerio from 'cheerio';

var fetchingStudentData = async (studentID) => {
    return fetch(
        `https://cors-anywhere.herokuapp.com/http://112.137.129.87/qldt/?SinhvienLmh%5BmasvTitle%5D=` + studentID + `&SinhvienLmh%5BhotenTitle%5D=&SinhvienLmh%5BngaysinhTitle%5D=&SinhvienLmh%5BlopkhoahocTitle%5D=&SinhvienLmh%5BtenlopmonhocTitle%5D=&SinhvienLmh%5BtenmonhocTitle%5D=&SinhvienLmh%5Bnhom%5D=&SinhvienLmh%5BsotinchiTitle%5D=&SinhvienLmh%5Bghichu%5D=&SinhvienLmh%5Bterm_id%5D=028&SinhvienLmh_page=1&ajax=sinhvien-lmh-grid`
    )
    .then(result => result.text())
    .then(result => {
        const $ = cheerio.load(result)
        var result = Array.from($('#sinhvien-lmh-grid > table > tbody > tr')).map(value => ({
            classID: value.children[6].children[0].data,
            group: value.children[8].children[0].data
        }))
        result.status = "OK"
        return result;
    })
    .catch(() => {
        return {
            status: "Error"
        }
    })
}
export default fetchingStudentData;