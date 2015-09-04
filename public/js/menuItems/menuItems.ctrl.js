/**
 * Created by bstenfors on 8/5/2015.
 */
'use strict'

class MenuItemsCtrl {
    constructor (menuItemsSvc, schoolSvc, $mdSidenav){
        this.menuItemsSvc = menuItemsSvc;
        this.$mdSidenav = $mdSidenav;
        this.schoolSvc = schoolSvc;
        this.tabs = [];
        this.init();
    }

    init(){
    }

    addMenuItem(item){
        var self = this;
        this.menuItemsSvc.addMenuItem(item).then(status =>{
            if(status.message === "Menu Item Created!"){
                console.log(status.message);
                //self.user.name = '';
                //self.user.email = '';
                //self.loadUsers();
            }
        });
    }
}

MenuItemsCtrl.$inject = ['menuItemsSvc', 'schoolSvc', '$mdSidenav'];

export { MenuItemsCtrl }