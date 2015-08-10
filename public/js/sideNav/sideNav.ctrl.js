/**
 * Created by bstenfors on 8/5/2015.
 */
'use strict'

class SideNavCtrl {
    constructor (sideNavSvc, $mdSidenav){
        this.sideNavSvc = sideNavSvc;
        this.$mdSidenav = $mdSidenav;
        this.menuItems = [];
        this.adminMenuItems = [];
        this.init();
    }

    init(){
        this.menuItems = this.sideNavSvc.getMenuItems();
        this.adminMenuItems = this.sideNavSvc.getAdminMenuItems();
    }

    toggleSideNav(id){
        $mdSidenav(id).toggle();
    }
}

SideNavCtrl.$inject = ['sideNavSvc', '$mdSidenav'];

export { SideNavCtrl }