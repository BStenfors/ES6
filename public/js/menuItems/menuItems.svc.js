/**
 * Created by bstenfors on 8/5/2015.
 */
'use strict'

class MenuItemsSvc {
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

    addMenuItem(itm){
        let status = this.$http.post('/addMenuItem', itm).then(r => r.data);
        return status;
    }

    static factory($http){
        return new MenuItemsSvc($http);
    }
}

MenuItemsSvc.factory.$inject = ['$http'];

export {MenuItemsSvc}