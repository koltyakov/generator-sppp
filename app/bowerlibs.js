var _ = require('lodash');

module.exports = (function() {
    var bowerlibs = [{
        name: 'SP PnP JS',
        value: 'sp-pnp-js',
        version: '*',
        priority: 1
    }, {
        name: 'React',
        value: 'react',
        version: '*',
        priority: 2
    }, {
        name: 'Knockout',
        value: 'react',
        version: '*'
    }, {
        name: 'jQuery (1.12.4)',
        value: 'jquery',
        version: '#1.12.4',
        priority: 3
    }, {
        name: 'lodash',
        value: 'lodash',
        version: '*'
    }, {
        name: 'Datatables',
        value: 'datatables',
        version: '*'
    }, {
        name: 'Moment.js',
        value: 'momentjs',
        version: '*'
    }, {
        name: 'FontAwesome',
        value: 'fontawesome',
        version: '*',
        priority: 4
    }, {
        name: 'Select2',
        value: 'select2',
        version: '*'
    }];
    return _.sortBy(bowerlibs, function(item) {
        return [item.priority || 900, item.name];
    });
})();