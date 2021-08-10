const {check} = require('express-validator');

let validateRegisterUser = () => {
  return [ 
    check('username', 'nhập tài khoản tối thiểu 12 kí tự').isLength({ min: 12 }),
    check('password', 'nhập mật khẩu tối thiểu 8 kí tự').isLength({ min: 8 }),
    check('password').custom((value,{req})=>{
        if (value !== req.body.passwordCof){
            throw new Error('xác nhận mật khẩu không đúng')
        } else{
            return true
        }
    }) 
  ]; 
}

let validateLogin = () => {
  return [ 
    check('username', 'Invalid does not Empty').not().isEmpty(),
    check('password', 'password more than 6 degits').isLength({ min: 8 })
  ]; 
}

let validator = {
  validateRegisterUser: validateRegisterUser,
  validateLogin: validateLogin
};

module.exports = validator;