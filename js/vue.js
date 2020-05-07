
const CommonUtils = {
    getValue(expr, vm) {
        return expr.split('.').reduce((data, current) => {
            return data[current];
        }, vm.$data);
    },
    setValue(expr, vm, value) {
        expr.split('.').reduce((data, current, index, arr) => {
            if (arr.length - 1 === index) {
                data[current] = value;
            }
            return data[current];
        }, vm.$data);
    },
    update: {
        modelUpdate(node, value) {
            node.value = value;
        },
        textUpdate(node, value) {
            node.textContent = value;
        }
    },
    model(node, expr, vm) {
        const value = this.getValue(expr, vm);
        new Watcher(vm, expr, (newValue) => {
            this.update.modelUpdate(node, newValue);
        });
        this.update.modelUpdate(node, value);
        node.addEventListener('input', (e) => {
            const newValue = e.target.value;
            this.setValue(expr, vm, newValue);
        });
    },
    text(node, expr, vm) {
        const content = expr.replace(/\{\{(.+?)\}\}/g, (...args) => {
            new Watcher(vm, args[1], () => {
                this.update.textUpdate(node, this.getContent(vm, expr));
            });
            return this.getValue(args[1], vm);
        });
        this.update.textUpdate(node, content);
    },
    getContent(vm, expr) {
        return expr.replace(/\{\{(.+?)\}\}/g, (...args) => {
            return this.getValue(args[1], vm);
        });
    }
};

class Vue {
    constructor(options) {
        this.$el = options.el;
        this.$data = options.data;
        let computed = options.computed;

        if (this.$el) {
            // 劫持数据
            new Observe(this.$data);

            for (let key in computed) {
                Object.defineProperty(this.$data, key, {
                    get: () => {
                        return computed[key].call(this);
                    }
                })
            }

            this.proxyVm();

            // 编译模板
            new Compiler(this.$el, this);
        }
    }
    proxyVm() {
        for (let key in this.$data) {
            Object.defineProperty(this, key, {
                get() {
                    return this.$data[key];
                }
            })
        }
    }
}

class Compiler {
    constructor(el, vm) {
        this.el = this.isElementNode(el) ? el : document.querySelector(el);
        this.vm = vm;
        let fragment = this.node2fragment(this.el);
        // 编译模板
        this.compile(fragment);
        // 对fragment内部的内容进行替换再放回到el中
        this.el.appendChild(fragment);

    }
    isElementNode(node) {
        return node.nodeType === 1;
    }
    node2fragment(node) {
        let fragment = document.createDocumentFragment();
        while (node.firstChild) {
            fragment.appendChild(node.firstChild);
        }
        return fragment;
    }
    compile(node) {
        const childrens = [...node.childNodes];
        childrens.forEach(el => {
            if (this.isElementNode(el)) {
                this.compileElement(el);
                this.compile(el);
            } else {
                this.compileText(el);
            }
        });
    }
    compileElement(node) {
        const attrs = [...node.attributes];
        attrs.forEach(attr => {
            const { name, value } = attr;
            if (this.isDirective(name)) {
                const funcName = name.split('v-')[1];
                CommonUtils[funcName](node, value, this.vm);
            }
        });
    }
    compileText(node) {
        const text = node.textContent;
        if (/\{\{(.+?)\}\}/.test(text)) {
            CommonUtils.text(node, text, this.vm);
        }
    }
    isDirective(attrName) {
        return attrName.startsWith('v-');
    }
}


class Observe {
    constructor(data) {
        this.dep = new Dep();
        this.observe(data);
    }
    observe(data) {
        if (data && typeof data === 'object') {
            for (let key in data) {
                this.defineReactive(data, key, data[key]);
            }
        }
    }
    defineReactive(obj, key, value) {
        this.observe(value);
        Object.defineProperty(obj, key, {
            get: () => {
                // 由watcher触发的才添加
                Dep.target && this.dep.addSub(Dep.target)
                return value;
            },
            set: (newValue) => {
                if (newValue !== value) {
                    this.observe(newValue);
                    value = newValue;
                    this.dep.notify();
                }
            }
        })
    }
}

class Dep {
    constructor() {
        this.subs = [];
    }
    addSub(watcher) {
        this.subs.push(watcher);
    }
    notify() {
        this.subs.forEach(watcher => watcher.update());
    }
}

class Watcher {
    constructor(vm, expr, cb) {
        this.vm = vm;
        this.expr = expr;
        this.cb = cb;
        this.oldValue = this.get();
    }
    get() {
        // 标志这个get是watcher触发的
        Dep.target = this;
        let value = CommonUtils.getValue(this.expr, this.vm);
        Dep.target = null;
        return value;
    }
    update() {
        const newValue = CommonUtils.getValue(this.expr, this.vm);
        if (newValue !== this.oldValue) {
            this.cb(newValue);
        }
    }
}
