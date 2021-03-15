exports.userSignupValidator =(req,res,next)=>{
    req.check('name','Le nom est requis').notEmpty()
    req.check('email',"L'email est requis et droit etre entre 3 et 32 caractere")
        .matches(/.+\@.+\..+/)
        .withMessage("L'email doit contenir @ et des caractere avant et apres le @")
        .isLength({min:4,max:32})
    req.check('password','Le mot de passe est requis').notEmpty()
        .isLength({min:6})
        .withMessage('Le mon de passe doit contenir au moins 6 caractere ')
        .matches(/\d/)
        .withMessage("Le mot de passe doit contenir un entier")

        const errors = req.validationErrors()
        if(errors){
            const firstError= errors.map(error => error.msg)[0]
            return res.status(400).json({error:firstError})
        }
        next()
}