var app = angular.module("app", [
	'ngPolyglot',
]);

app.controller("polyglotExampleCtrl", function($sce, $scope, Polyglot) {
	$scope.query = '';
	$scope.engines = _.map(Polyglot.engines, (engine, id) => { engine.id = id; return engine });

	// .example / .showExample() {{{
	$scope.example = null;

	$scope.showExample = function() {
		var lastTitle = $scope.example ? $scope.example.title : null;
		do {
			$scope.example = _.sample(Polyglot.examples);
		} while ($scope.example.title == lastTitle);
		$scope.query = $scope.example.query + '';
	};
	// }}}

	// Query watcher + refresher {{{
	$scope.$watchGroup(['query', 'options.groupLines', 'options.groupLinesAlways', 'options.preserveNewLines', 'options.replaceWildcards'], function() {
		var translations = Polyglot.translateAll($scope.query, $scope.options);
		$scope.engines.forEach(engine => {
			engine.translated = _.isString(translations[engine.id]) ? $sce.trustAsHtml(translations[engine.id]) : '';
		});
	});
	// }}}

	$scope.clear = () => $scope.query = '';

	$scope.toggleExpandEngine = engine => engine.expanded = !engine.expanded;
});
