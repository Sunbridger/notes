function jsonp(url,jsonpcallback,success) {
  let script = document.createElement('script');
  script.src= url;
  script.type='text/javascript';
  window[jsonpcallback]=(data)=>{
    success&&success(data);
  }
}
jsonp('http://xxx', 'callback', function(value) {
  console.log(value)
})