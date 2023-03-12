const CustomAPIError = require("../errors");
const checkPermissions=(bodyResource,requestedUserId)=>{
  if(bodyResource.role ==='admin') return ;
  if(bodyResource.UserId ===requestedUserId.toString()) return   
   throw new CustomAPIError.UnauthorizedError('Not authorized to access this route')
}
module.exports= checkPermissions
