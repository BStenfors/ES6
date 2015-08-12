/**
 * Created by bstenfors on 8/5/2015.
 */
'use strict'

class SideNavCtrl {
    constructor (sideNavSvc, $state, $mdSidenav){
        this.sideNavSvc = sideNavSvc;
        this.$mdSidenav = $mdSidenav;
        this.$state = $state;
        this.menuItems = [];
        this.adminMenuItems = [];
        this.showSearch = false;
        this.init();
    }

    init(){

    }

    showView(state){
        console.log('Menu Item Click: ' + state);
        this.$state.go(state);
    }

    toggleSideNav(id){
        this.$mdSidenav(id).toggle();
    }
}

SideNavCtrl.$inject = ['sideNavSvc', '$state', '$mdSidenav'];

export { SideNavCtrl }