/**
 * Created by bstenfors on 8/5/2015.
 */
'use strict'

class RegisterCtrl {
    constructor (registerSvc, $state){
        this.$state = $state;
        this.registerSvc = registerSvc;
        this.user = {};
        this.init();
    }

    init(){
    }

    createUser(userData){
        var self = this;
        this.registerSvc.registerUser(userData.user).then(status =>{
            if(status.message === "User Created!"){
                self.user.name = '';
                self.user.email = '';
            }
        });
    }
}

RegisterCtrl.$inject = ['registerSvc', '$state'];

export { RegisterCtrl }