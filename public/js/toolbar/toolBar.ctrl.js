/**
 * Created by bstenfors on 8/5/2015.
 */
'use strict'

class ToolBarCtrl {
    constructor (toolBarSvc, schoolsSvc, $mdSidenav){
        this.toolBarSvc = toolBarSvc;
        this.$mdSidenav = $mdSidenav;
        this.tabs = [];
        this.init();
    }

    getTabs(){
        this.schoolTabs = this.schoolSvc.getSchools();
    }

    init(){
        //this.menuItems = this.sideNavSvc.getMenuItems();
        //this.adminMenuItems = this.sideNavSvc.getAdminMenuItems();
        this.getTabs();
    }

    toggleSideNav(id){
        $mdSidenav(id).toggle();
    }
}

ToolBarCtrl.$inject = ['toolBarSvc', 'schoolsSvc', '$mdSidenav'];

export { ToolBarCtrl }