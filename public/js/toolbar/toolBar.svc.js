/**
 * Created by bstenfors on 8/5/2015.
 */
'use strict'

class ToolBarSvc {
    constructor($http){
        this.$http = $http;
    }

    getMenuItems(){
        let menuItems = [
            {
                icon: '',
                title: 'Home'
            },
            {
                icon: '',
                title: 'Channel Guides'
            }
        ];

        return menuItems;
    }

    getAdminMenuItems(){
        let adminMenuItems = [
            {
                icon: '',
                title: 'Menu Items'
            },
            {
                icon: '',
                title: 'Schools'
            }
        ];

        return adminMenuItems;
    }

    static factory($http){
        return new SideNavSvc($http);
    }
}

ToolBarSvc.factory.$inject = ['$http'];

export {ToolBarSvc}