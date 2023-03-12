const createUserToken=(user)=>{
    
return {name:user.name,UserId:user._id,role:user.role,Email:user.email}
}
module.exports={
    createUserToken
}