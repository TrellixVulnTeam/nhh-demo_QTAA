const User = require('../../model/User')
const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const jwtUtil = require('../util/jwt')


class AuthController{

    //[GET] /auth/login
    login(req,res,next){
        res.render('auth/login')
    }

    //[POST] /auth/login
    authLogin(req,res,next){
        User.findOne({username: req.body.username})
            .then(async user=>{
                if (!user){
                    return res.render('auth/login',{errors: 'Tên đăng nhập không tồn tại', ms:'Đăng Nhập Thất Bại',error:true})
                }
                if (!bcrypt.compareSync(req.body.password,user.password)){
                        return res.render('auth/login',{errors: 'Mật khẩu không chính xác', ms:'Đăng Nhập Thất Bại',error:true})
                }
                const accessTokenSecret = process.env.secret
                const accessRefreshSecret = process.env.secretRefresh
                const refreshTokenLife = process.env.tokenRefreshLife
                const tokenLife = process.env.tokenLife

                const accessToken = await jwtUtil.generateToken({username: user.username}, accessTokenSecret, tokenLife)
                const refreshToken = await jwtUtil.generateToken({username: user.username}, accessRefreshSecret, refreshTokenLife)
                res.cookie('auth-token',accessToken,{signed: true})
                res.cookie('auth-refresh-token',refreshToken,{signed: true})
                res.redirect('/')
            })
            .catch(error=> {console.log(error)})
    }

    //[GET] /auth/signup
    signup(req,res,next){
        res.render('auth/signup')
    }

    //[POST] /auth/signup
    create(req,res,next){
        const errors = validationResult(req)
        if (!errors.isEmpty()){
        const msgErrors=errors.array().map(error=>error.msg)
            return res.render('auth/signup',{errors: msgErrors, ms:'Đăng ký thất bại',error:true}) 
        }
        User.create({
            username: req.body.username,
            password: bcrypt.hashSync(req.body.password,15),
            refreshToken: "",
            token: "",
        })
            .then(()=>res.render('auth/signup',{errors: '<a href="/auth/login">bấm vào đây để đăng nhập</a>', ms:'Đăng ký thành công',error:true}) )
            .catch(()=> res.render('auth/signup',{errors: 'tên đăng nhập đã tồn tại', ms:'Đăng ký thất bại',error:true})  )
                    
                
    }
}

module.exports = new AuthController