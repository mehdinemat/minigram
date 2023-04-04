 const valid = (data)=>{
    const err = {}
    const {fullname , username , email , password , confirmpassword } = data

    if(!fullname){
        err.fullname = 'لطفا نام کامل خود را وارد کنید.'
    }else if(fullname > 25){
        err.fullname = "نام کامل باید کمتر از 25 کاراکتر باشد ."
    }

    if(!username){
        err.username = "لطفا نام کاربری خود را وارد کنید. "
    }else if(username.replace(/ /g,'').length >25){
        err.username = "نام کاربری باید کمتر از 25 کاراکتر باشد"
    }
    if(!email){
        err.email = 'لطفا ایمیل را وارد کنید. '
    }else if (!validateEmail){
        err.email = 'ایمیل وارد شده اشتباست.'
    }
    
    if(!password) {
        err.password = "لطفا رمز عبور خود را وارد کنید."
    }else if(password.length < 6){
        err.password = "رمز عبور نباید کمتر از 6 کاراکتر باشد ."
    }

    if(password !== confirmpassword) {
        console.log(password , confirmpassword)
        err.confirmpassword = "رمز عبور با تکرار رمز عبور یکسان نیست."
    }
    console.log(err)
    return {
        errMsg:err,
        errLength:Object.keys(err).length
    }


}

function validateEmail (email){
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email)
}


export default  valid