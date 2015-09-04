/**
 * Created by bstenfors on 8/5/2015.
 */
'use strict'

import { MenuItemsCtrl } from 'js/menuItems/menuItems.ctrl';
import { MenuItemsSvc } from 'js/menuItems/menuItems.svc';

let menuItemsModule = angular.module('app.menuItems', [])
    .factory('menuItemsSvc', MenuItemsSvc.factory)
    .controller('menuItemsCtrl', MenuItemsCtrl);

export default {menuItemsModule};
