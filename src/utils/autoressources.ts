var fs = require('fs');

var mappings = [
    { action: 'index', verb: 'get' },
    { action: 'create', verb: 'put' },
    { action: 'show/:id', verb: 'get' },
    { action: 'update/:id', verb: 'post' },
    { action: 'destroy/:id', verb: 'delete' }
];

var maproute = function(app, name, route) {
    for (var i:number = 0; i < mappings.length; i++) {
        var mapping = mappings[i];
        let core:string = mapping.action.split('/:')[0];
        let params:string = mapping.action.split('/')[1];

        if (route[core] !== undefined) {
            var routename:string = mapping.action == 'index' ? '/' + name : mapping.action == 'create' ? '/' + name : '/' + name + '/' + params;
            app[mapping.verb](routename, route[core]);
        }
    }
}

exports.map = function(app, routeName:string) {
    var routeFile:string = process.cwd() + '/src/controllers/' + routeName + '.js';
    var route = require(routeFile);
    routeName = routeName.toLocaleLowerCase().split('controller').join("") + 's';
    maproute(app, routeName, route);
    return route;
}