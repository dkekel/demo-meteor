import '../client/task/list';

Router.route('/', function () {
    this.render('main');
});

Router.route('/list', function () {
    this.render('list');
});