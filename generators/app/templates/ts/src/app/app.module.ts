/* eslint-disable */
// Generated on <%= date %>
import * as angular from 'angular';
import * as ngRoute from 'angular-route';

let app = angular.module('<%= name %>', [ngRoute]);

import routes from './app.routes';
app.config(routes);