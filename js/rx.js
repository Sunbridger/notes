const Rx = require('rxjs/Rx');

const foo = Rx.Observable.create(function (observer) {
    console.log('Hello');
    observer.next(42);
});

foo.subscribe(function (x) {
    console.log(x);
});
foo.subscribe(function (y) {
    console.log(y);
});