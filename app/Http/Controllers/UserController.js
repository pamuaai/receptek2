'use strict'

const Validator = use('Validator')

const User = use('App/Model/User')

const Hash = use('Hash')

class UserController {

    * register (req, res){
        yield res.sendView('register')
    }

    * login(req, res){
        yield res.sendView('login')
    }

    * doRegister (req, res){
        //1. input adatok kinyerése
        const userData = req.all()
        
        //2. kinyert adatok validálása
        const rules ={
            'email': 'required|email',
            'name': 'required',
            'password': 'required|min:4',
            'password_again': 'required|same:password'
        }

        const validation = yield Validator.validateAll(userData, rules)
        
        if (validation.fails()) {
            yield req
                .without('password', 'password_again')
                .andWith({ errors: validation.messages() })
                .flash()

            res.redirect('/register')
            return
        }

        //3. business logic

        const user = new User
        user.username = userData.name
        user.email = userData.email
        user.password = yield Hash.make(userData.password)
        yield user.save()
        yield req.auth.login(user)

        //4. válasz generálása
        res.redirect('/')
    }

    * doLogin(req, res){
        //1. input adatok kinyerése
        const email = req.input('email')
        const password = req.input('password')

        //2. kinyert adatok validálása (ez most kimaradhat)
        //3. business logic
        const login = yield req.auth.attempt(email, password)
        //4.
        if(login){
            res.redirect('/')
        }else {
            yield req
                .with({ error: 'Rossz belépési adatok' })
                .flash()
            res.redirect('/login')

        }
        

    }

    * doLogout(req, res){
        //1.
        //2.
        //3.
        yield req.auth.logout()
        //4.
        res.redirect('/')
    }
    


}

module.exports = UserController
