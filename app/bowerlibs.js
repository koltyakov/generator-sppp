var _ = require('lodash');

module.exports = (function() {
    var bowerlibs = [{
        name: 'SP PnP JS',
        value: 'sp-pnp-js',
        version: '^1.0.3',
        priority: 1
    }, {
        name: 'React',
        value: 'react',
        version: '^15.3.1',
        priority: 2
    }, {
        name: 'Knockout',
        value: 'react',
        version: '^3.4.0'
    }, {
        name: 'jQuery',
        value: 'jquery',
        version: '#1.12.4',
        priority: 3
    }, {
        name: 'lodash',
        value: 'lodash',
        version: '^4.15.0'
    }, {
        name: 'Datatables',
        value: 'datatables',
        version: '^1.10.12'
    }, {
        name: 'Moment.js',
        value: 'momentjs',
        version: '^2.14.1'
    }, {
        name: 'FontAwesome',
        value: 'fontawesome',
        version: '^4.6.3',
        priority: 4
    }, {
        name: 'Select2',
        value: 'select2',
        version: '^4.0.3'
    }];
    return _.sortBy(bowerlibs, function(item) {
        return [item.priority || 900, item.name];
    });
})();