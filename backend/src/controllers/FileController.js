import FileModel from '../model/FileModel'
class FileController{
    async store(req,res){
        const {originalname:name,filename:path}=req.file
        
        const file=new FileModel({
            name,
            path,
            url:"http://localhost:3333/uploads/"+path
        })

        const newFile=await file.save()

        if(newFile){
            return res.status(200).send({message:"Image salva com sucesso",data:newFile})
        }

        return res.status(200).send({message:"ok",data:req.file})
      }
}

export default new FileController