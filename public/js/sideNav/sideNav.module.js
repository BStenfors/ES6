/**
 * Created by bstenfors on 8/5/2015.
 */
'use strict'

import { SideNavCtrl } from 'js/sideNav/sideNav.ctrl';
import { SideNavSvc } from 'js/sideNav/sideNav.svc';

let sideNavModule = angular.module('app.sideNav', [])
    .factory('sideNavSvc', SideNavSvc.factory)
    .controller('sideNavCtrl', SideNavCtrl);

export default {sideNavModule};
