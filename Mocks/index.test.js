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
              "id": 123,
              "name": "Paulo",
              "profession": "developer30",
              "age": ""
            },
            {
              "id": 145,
              "name": "Olivia",
              "profession": "Programmer",
              "age": 34
            },
            {
              "id": 156,
              "name": "Maria",
              "profession": "Teacher",
              "age": 35
            }
          ]
        deepStrictEqual(result, expected)
    }


})()