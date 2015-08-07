/**
 * Created by bstenfors on 8/5/2015.
 */
'use strict'

import { HomeCtrl } from 'js/home/home.ctrl';
import { HomeSvc } from 'js/home/home.svc';

let homeModule = angular.module('app.home', [])
    .factory('homeSvc', HomeSvc.factory)
    .controller('homeCtrl', HomeCtrl);

export default {homeModule};
