import multer from 'multer'
import crypto from 'crypto'
import {extname,resolve} from 'path'

export default{
    storage:multer.diskStorage({
        destination:resolve(__dirname,'..','..','tmp','uploads'),
        filename:(req,file,callback)=>{
            crypto.randomBytes(16,(error,res)=>{
                if(error){
                    return callback(error)
                }
                // 1sd51asd.png
                return callback(null,res.toString('hex')+extname(file.originalname))
            })
        }
    }),
    limits:{
        fileSize:2*1024*1024
    },
    fileFilter:(req,file,cb)=>{
        const allowrdMimes=[
            'image/png',
            'image/pjpeg',
            'image/jpeg',
        ]
        if(allowrdMimes.includes(file.mimetype)){
            cb(null,true)
        }else{
            cb(new Error('Arquivo não suportado'))
        }
    }
}