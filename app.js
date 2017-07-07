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
			var html = _.isString(translations[engine.id]) ? translations[engine.id] : '';
			html = $(`<div>${html}</div>`);
			html.children('span[msg]').each(function() {
				$(this).addClass('label label-info');
			});

			engine.translated = $sce.trustAsHtml(html.html());
		});
	});
	// }}}

	$scope.clear = () => $scope.query = '';

	$scope.toggleExpandEngine = engine => engine.expanded = !engine.expanded;
});
