const {error} = require('./src/constants')
const File = require('./src/file')
const {rejects, deepStrictEqual} = require('assert')
;
(async()=>{
    {
        const filePath = './mocks/emptyFile-invalid.csv'
        const rejection = new Error(error.FILE_LENGTH_ERROR_MESSAGE)
        const result = File.csvToJson(filePath)
        await rejects(result, rejection)
    }
    {
        const filePath = './mocks/fiveItems-invalid.csv'
        const rejection = new Error(error.FILE_LENGTH_ERROR_MESSAGE)
        const result = File.csvToJson(filePath)
        await rejects(result, rejection)    
    }
    {
        const filePath = './mocks/invalidHeader.csv'
        const rejection = new Error(error.FILE_FIELDS_ERROR_MESSAGE)
        const result = File.csvToJson(filePath)
        await rejects(result, rejection)    
    }
    {
        const filePath = './mocks/threeItems-valid.csv'
        const result = await File.csvToJson(filePath)
        const expected = [
            {
              "name": "Paulo",
              "id": 123,
              "profession": "developer",
              "birthDay": 1993
            },
            {
              "name": "Olivia",
              "id": 145,              
              "profession": "Programmer",
              "birthDay": 1989
            },
            {
              "name": "Maria",
              "id": 156,
              "profession": "Teacher",
              "birthDay": 1988
            }
          ]
        deepStrictEqual(JSON.stringify(result), JSON.stringify(expected))
    }


})()