const createUserToken=(user)=>{
return {name:user.name,UserID:user._id,role:user.role}
}
module.exports={
    createUserToken
}