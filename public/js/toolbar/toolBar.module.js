/**
 * Created by bstenfors on 8/5/2015.
 */
'use strict'

import { ToolBarCtrl } from 'js/toolbar/toolBar.ctrl';
import { ToolBarSvc } from 'js/toolbar/toolBar.svc';

let toolBarModule = angular.module('app.toolBar', [])
    .factory('toolBarSvc', ToolBarSvc.factory)
    .controller('toolBarCtrl', ToolBarCtrl);

export default {toolBarModule};
