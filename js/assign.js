function mounted(){
    Ajax.get(url)
      .then((data) => {
        // 这样title是双向绑定的
        this.form = data;
        // 这样title也是双向绑定的
        this.form = Object.assign({}, this.form, data)
        // 这样title并不是双向绑定的
        this.form = Object.assign(this.form, data)
      })
}

// 因为Object.assign(this.form, newData)是在原对象(this.form)上修改的新的值，
console.log(1, '本地1')
console.log(5, '本地')