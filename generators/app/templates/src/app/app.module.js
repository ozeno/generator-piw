// Generated on <%= date %>
/* eslint-disable */
import angular from 'angular'
import ngRoute from 'angular-route'

let app = angular.module('<%= name %>', [ngRoute])

import routes from './app.routes'
app.config(routes)