/**
 * Created by bstenfors on 8/5/2015.
 */
'use strict'

class HomeCtrl {
    constructor (homeSvc, $mdSideNav){
        this.homeSvc = homeSvc;
        this.$mdSideNav = $mdSideNav;
        this.user = {};
        this.init();
    }

    initGrid(rowData){
        let columnDefs = [
            {headerName: '', width: 30, checkboxSelection: true, suppressSorting: true, suppressMenu: true},
            {headerName: "ID", field: "_id"},
            {headerName: "Name", field: "name"},
            {headerName: "Email", field: "email"}
        ];

        this.gridOptions = {
            columnDefs: columnDefs,
            dontUseScrolls: true // because so little data, no need to use scroll bars
        };

    }

    removeUser(){
        var self = this;
        var selectedNodes = this.gridOptions.api.getSelectedNodes();
        this.homeSvc.removeUser(selectedNodes).then(status =>{
           if(status.removed == 1){
               self.loadUsers();
           }
        });
    }

    addUser(homeData){
        var self = this;
        this.homeSvc.addUser(homeData.user).then(status =>{
            if(status.message === "User Created!"){
                self.user.name = '';
                self.user.email = '';
                self.loadUsers();
            }
        });
    }

    loadUsers(){
        var self = this;
        this.homeSvc.getUsers().then(users => {
            self.gridOptions.rowData = users;
            self.gridOptions.api.onNewRows();
        });
    }

    init(){
        this.initGrid(null);
        this.loadUsers();
    }
}

HomeCtrl.$inject = ['homeSvc', '$mdSideNav'];

export { HomeCtrl }