const axios = require('axios');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const theNow = Math.floor(Date.now() / 1000);
const theUrl = `result-${theNow}.csv`;
const csvWriter = createCsvWriter({
    path: theUrl,
    header: [
        { id: 'url', title: 'URL' },
        { id: 'sdescc', title: 'Short Desc' },
        { id: 'ldesc', title: 'Long Desc' }
    ]
})

ids = ['URL', 'URL']
user = 'USER'
pass = 'PASS'

records = []
async function getData() {
    for (id of ids){
    let res = await axios.get(id, {
        auth: {
            username: user,
            password: pass
        },
        headers: {
            'Content-Type': 'applications/json'
        }
    });
    // let sdesc = res.data;
    // console.log(sdesc)
    try {
        records.push({
            url: id,
            sdescc: res.data.shortDescription,
            ldesc: res.data.longDescription,
        })
        csvWriter.writeRecords(records)
    } catch (error) {
        records.push({
            url: id,
            sdescc: 'error',
            ldesc: 'error',
        })
        csvWriter.writeRecords(records)
    }

    
}
}

getData();



