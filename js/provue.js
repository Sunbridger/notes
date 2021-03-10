class Vue {
    constructor(propsObj) {
        this.age = propsObj.age;
    }
}
Vue.hh = '啊实打实';

const vm1 = new Vue({
    age: 12
});
console.log(vm1.constructor.hh);
const vm2 = new Vue({
    age: 32
});
