const axios = require("axios")
const FormData = require('form-data')
const { fromBuffer } = require('file-type')

// Files will be deleted automatically within 60 minutes
         
module.exports = tmpfiles = (buffer) =>{
      return new Promise(async (resolve) => {
         try {
            const { ext } = await fromBuffer(buffer)
            const form = new FormData()
            form.append('file', buffer, 'tmp.' + ext)
            const json = await (await axios.post("https://tmpfiles.org/api/v1/upload", form, {
            headers: {
            "accept": "*/*",
            "accept-language": "id-ID , id; q=O. 9 , en- US ; q=0.8, en q=0.7",
            "content-type": "multipart/form-data",
            "origin": "https://tmpfiles.orgi",
            "referer": "https://tmpfiles.org/",
            "sec-ch-ua": '"Chromium";v="107", "Not=A?Brand";v="24"',
            "sec-ch-ua-mobile": "?1",
            "sec-ch-ua-platform": "Android",
            "sec-fetch-dest": "empty",
            "sec-fetch-mcde": "cors",
            "sec-fetch-site": "same-origin",
            "user-agent": "Mozilla/5.0 (Linux; Android 6.0.1; SM-J500G) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.131 Mobile Safari/537.36",
            "x-requested-with": "XMLHttpRequest",
            ...form.getHeaders()
            }})).data
            if (json.status != 'success') return resolve({
               developer: '@Alya Uhuy',
               status: false,
               msg: 'Failed to uploaded'
            })
            resolve({
               developer: '@Alya Uhuy',
               status: true,
               data: {
               url: json.data.url.replace(
               'https://tmpfiles.org/', 
               'https://tmpfiles.org/dl/'
               )
               }
            })
         } catch (e) {
            console.log(e)
            resolve({
               creator: global.creator,
               status: false,
               msg: e.message
            })
         }
      })
   }