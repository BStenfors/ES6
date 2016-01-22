/**
 * Created by bstenfors on 8/5/2015.
 */
'use strict'

class HomeCtrl {
    constructor (homeSvc, sideNavSvc, $mdSidenav){
        this.homeSvc = homeSvc;
        this.sideNavSvc = sideNavSvc;
        this.$mdSidenav = $mdSidenav;
        this.user = {};
        this.init();
    }

    init(){
        this.initGrid(null);
        this.loadUsers();
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

    removeUser(){
        var self = this;
        var selectedNodes = this.gridOptions.api.getSelectedNodes();
        this.homeSvc.removeUser(selectedNodes).then(status =>{
           if(status.removed == 1){
               self.loadUsers();
           }
        });
    }

    toggleSideNav(id){
        $mdSidenav(id).toggle();
    }
}

HomeCtrl.$inject = ['homeSvc', 'sideNavSvc', '$mdSidenav'];

export { HomeCtrl }