/* eslint-disable */
export default function routes ($locationProvider, $routeProvider) {
	'ngInject';
	$locationProvider.hashPrefix('!');

	$routeProvider
		.otherwise('/');
}
