import jwt from "jsonwebtoken";
import config from "./config";

const getToken = (user) => {
//jwt.sign(payload, secretOrPrivateKey, [options, callback])
// Cria o token
/*
  Payload: dados que quero incorporar dentro do token
  SecretOrPrivateKey:texto que só eu tenho acesso

*/
  return jwt.sign(
    {
      _id: user._id,
      name: user.name,
      email: user.email,
      password: user.password,
      isADM: user.isADM,
    },
    config.JWT_SECRET,
    // Evitar que o token seja infinito
    {
      expiresIn: "24h",
    }
  );
};


const isAuth=(req,res,next)=>{
  // pego o meu token do header
  const token=req.headers.authorization
  // console.log("TOKEN= ",token);
  if(token){
    // Tirar o que vem antes do token, no caso o Bearer com um espaço a direita,para manter somente o valor do TOKEN.
    const [,onlyToken]=token.split(' ')
    
    jwt.verify(onlyToken,config.JWT_SECRET,(err,decode)=>{
      if(err){
        res.status(401).send({msg:"Token inválido"})
      }
      // Incluí o user no req, posso pegar ele depois
      req.user=decode
      // console.log("REQ.USER.DECODE= ",req.user)
      next()
      return
    })
  }else{
    return res.status(401).send({msg:"Token não passado"})

  }
}

const isAdm=(req,res,next)=>{
  // console.log("ISADM TOKEN= ",req.user.isADM)
  // Se tiver o token e  valor for ADM, irá deixar passar
  if(req.user && req.user.isADM){
    return next()
  }
  // Caso não tiver o token e não for ADM, irá barrar
  return res.status(401).send({msg:"ADM Token não é válido"})
}
export { getToken,isAuth,isAdm };
