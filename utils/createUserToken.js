const createUserToken=(user)=>{
return {name:user.name,UserID:user.userId,role:user.role}
}
module.exports={
    createUserToken
}