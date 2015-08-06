/**
 * Created by bstenfors on 8/5/2015.
 */
'use strict'

import { SchoolCtrl } from 'js/schools/school.ctrl';
import { SchoolSvc } from 'js/schools/school.svc';

let schoolModule = angular.module('app.school', [])
    .factory('schoolSvc', SchoolSvc.factory)
    .controller('schoolCtrl', SchoolCtrl);

export default {schoolModule};
