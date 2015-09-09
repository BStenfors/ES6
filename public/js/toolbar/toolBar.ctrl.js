/**
 * Created by bstenfors on 8/5/2015.
 */
'use strict'

class ToolBarCtrl {
    constructor (toolBarSvc, schoolSvc, $mdSidenav, $mdDialog){
        //this.$mdOpenMenu = $mdOpenMenu;
        this.$mdDialog = $mdDialog;
        this.toolBarSvc = toolBarSvc;
        this.$mdSidenav = $mdSidenav;
        this.schoolSvc = schoolSvc;
        this.tabs = [];
        //this.originatorEv = null;
        this.init();
    }

    getTabs(){
        this.schoolTabs = this.schoolSvc.getSchools();
    }

    init(){
        //this.menuItems = this.sideNavSvc.getMenuItems();
        //this.adminMenuItems = this.sideNavSvc.getAdminMenuItems();
        //this.getTabs();
    }


    openMenu() {
        //this.originatorEv;
        //this.$mdOpenMenu();
        alert('opening menu');
    };

    toggleSideNav(id){
        this.$mdSidenav(id).toggle();
    }

    onConferenceChanged(confId){
        this.schoolSvc.setSelectedConferenceId(confId);
    }
}

ToolBarCtrl.$inject = ['toolBarSvc', 'schoolSvc', '$mdSidenav', '$mdDialog'];

export { ToolBarCtrl }