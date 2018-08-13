/* eslint-disable */
routes.$inject = ["$locationProvider", "$routeProvider"]
export default function routes ($locationProvider, $routeProvider) {
	$locationProvider.hashPrefix('!');

	$routeProvider
		.otherwise('/');
}
