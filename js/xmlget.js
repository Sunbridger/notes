/**
 * The XMLHttpRequest type is natively supported in web browsers only.
 * It is not part of Node, but it can be installed as a package using npm.
 */

const xhr = new XMLHttpRequest();
xhr.open('GET', 'http://127.0.0.1:7001/testget?m=get哦哦哦', true);
xhr.send();
xhr.onreadystatechange = function (e) {
    if (xhr.readyState == 4 && xhr.status == 200) {
        console.log(xhr.responseText);
    }
};
