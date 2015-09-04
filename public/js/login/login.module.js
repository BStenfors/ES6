/**
 * Created by bstenfors on 8/5/2015.
 */
'use strict'

import { LoginCtrl } from 'js/login/login.ctrl';
import { LoginSvc } from 'js/login/login.svc';

let loginModule = angular.module('app.login', [])
    .factory('loginSvc', LoginSvc.factory)
    .controller('loginCtrl', LoginCtrl);

export default {loginModule};
