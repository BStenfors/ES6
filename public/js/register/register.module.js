/**
 * Created by bstenfors on 8/5/2015.
 */
'use strict'

import { RegisterCtrl } from 'js/register/register.ctrl';
import { RegisterSvc } from 'js/register/register.svc';

let registerModule = angular.module('app.register', [])
    .factory('registerSvc', RegisterSvc.factory)
    .controller('registerCtrl', RegisterCtrl);

export default {registerModule};
