

  /**
   * @description:  decodeURIComponentForSelf 容错处理，如果报错 ，返回原数据
   * @param {string} str
   * @return {string}
   */
  function decodeURIComponentForSelf (str){
    try {
      return decodeURIComponent(str)
    } catch (error) {
      return str
    }
  }

  /**
   *
   *
   * @name 获取url参数
   * @description 以对象的形式返回url中带入的参数
   * @param {string} [qs] - location.search 或者 href
   * @param {Object} [options]
   * @param {boolean} [options.isDecode=true] 是否对值进行解码，默认为true
   * @returns {object}
   */
  function getQueryParamObj(qs, options) {
    const { isDecode = true } = options || {};
    let querySearch = qs || "";
    if (!querySearch) {
      querySearch = window?.location?.href || "";
    }
    querySearch = querySearch.match(/^(.*)(\?.*)$/)?.[2] || querySearch || "";
    if (!querySearch) {
      return {};
    }
    const params = {};
    const re = /[?&]?([^=]+)=([^&]*)/g;
    let tokens;
    if (querySearch) {
      querySearch = querySearch.split("+").join(" ");

      while ((tokens = re.exec(querySearch))) {
        const key = isDecode ? decodeURIComponentForSelf(tokens[1]) : tokens[1];
        const value = isDecode ? decodeURIComponentForSelf(tokens[2]) : tokens[2];
        params[key] = value;
      }
    }
    return params;
  }

  /**
   *
   *
   * @name 获取指定的参数值
   * @description 从url带有的参数中，获取指定的参数值
   * @param {string} paramName  - 参数的名字
   * @param {string} [qs]  - location.search
   * @returns {string}
   */
  function getQueryParamByName(paramName, qs) {
    if (!paramName) {
      return "";
    }
    const queryObj = getQueryParamObj(qs);
    return queryObj?.[paramName] || "";
  }

  /**
   *
   *
   * @export
   * @param {ObjMap} paramObj 参数
   * @param {Object} [options]
   * @param {*} [options.isEncode=false] 是否对值进行编码，默认为fase
   * @returns {string}
   */
  function toQuerySearchStr(paramObj, options) {
    const {
      isEncode = false
    } = options || {};
    if (!paramObj) {
      return "";
    }
    const queryObj = Object.keys(paramObj).map((key) => {
      const value = isEncode ? decodeURIComponentForSelf(paramObj[key]) : paramObj[key];
      const keyValue = [key, value];
      return keyValue.join("=");
    });
    return queryObj.length ? `?${queryObj.join("&")}` : "";
  }

  /**
   *
   *
   * @export
   * @param {Object} paramObj 需要添加的参数，key：value
   * @param {Object} [options] 配置参数
   * @param {string} [options.url] 原url，不传则取 window.location.href
   * @param {boolean} [options.isEncode=true] isEncode 参数值是否需要进行编码，默认为true
   * @param {boolean} [options.isExtendPamams=true] 是否保留原query参数，默认为true
   * @returns {string} 拼接后的url
   */
  function appendQueryParams(paramObj, options) {
    const {
      // value 是否进行编码
      isEncode = true,
      isExtendPamams = true
    } = options||{};
    let url = options?.url || window?.location?.href || "";
    let newParamObj = {};
    if (isEncode) {
      Object.keys(paramObj).forEach((key) => {
        newParamObj[key] = encodeURIComponent(paramObj[key])
      })
    } else {
      newParamObj = paramObj
    }
    const queryString = toQuerySearchStr({
      ...isExtendPamams ? getQueryParamObj(url, { isDecode: false }) : {},
      ...newParamObj
    });
    return `${url.replace(/\?.*$/g, "")}${queryString}`;
  }



const url = appendQueryParams(
    {
        formPageCode: 'invitationToBidForPrequalification',
        annId: '1304245',
        districtId: '510199',
        annBigType: 2,
    },
    {
      url: 'https://middle.test.zcygov.cn/announcement-front/#/dynamic/detail?un=9',
      isEncode: false,
    }
);
console.log(url, '--un');
// window.location.href = url;
// ?formPageCode=invitationToBidForPrequalification&annId=1304245&districtId=510199&annBigType=2