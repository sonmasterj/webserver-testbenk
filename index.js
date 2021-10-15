const express = require('express')
const {generateKeyPair} = require('crypto')
const app = express()
const port = process.env.PORT || 3000
app.get('/key',async(req,res)=>{
    try{
        let key = await genRSA()
        console.log("done respone in process pid "+process.pid)
        return res.json({key:key[0]})
    }
    catch(err){
        return res.status(401).json({message:err})
    }
    
})
const genRSA = ()=>{
    return new Promise((resolve,reject)=>{
        generateKeyPair('rsa',{
            modulusLength:2048,
            publicKeyEncoding:{
                type:'spki',
                format:'pem'
            },
            privateKeyEncoding: {
                type: 'pkcs8',
                format: 'pem',
                cipher: 'aes-256-cbc',
                passphrase: 'top secret'
            }
        },(err,pubKey,priKey)=>{
            if(err){
                return reject(err)
            }
            resolve([pubKey,priKey])
        })
    })
}
app.listen(port,()=>{
    console.log("app is running in port "+port)
})