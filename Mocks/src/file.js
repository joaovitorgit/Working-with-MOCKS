const {readFile}  = require('fs/promises')
const {join} = require('path')
const {error} = require('./constants')

const FILE_DEFAULT_CONFIGS = {
    maxLines: 3,
    fields: ["id","name","profession","age"]
}

class File{
    static async csvToJson(filePath){
        const content = await File.getFileContent(filePath)
        const validation = File.isValid(content)
        if(!validation.valid) throw new Error(validation.error)
        return content
    }

    static async getFileContent(filePath){
        const fileName = join(__dirname, filePath)
        return (await readFile(fileName)).toString("utf-8")
    }

    static isValid(csvString, options = FILE_DEFAULT_CONFIGS){
        const [header,...fileWithoutHeader] = csvString.split('\n')
        const isHeaderValid = header === options.fields.join(',') 
        if(!isHeaderValid){
            return {
                error: error.FILE_FIELDS_ERROR_MESSAGE,
                valid: false
            }
        }

        
    }
}
(async()=>{
    try {
        const result = await File.csvToJson("./../mocks/invalidHeader.csv")
    } catch (error) {
        console.log('Error: ', error)     
    }
   
    
})();