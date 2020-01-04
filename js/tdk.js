const formatParams = (params) => {
    const obj = {
        prepaidAmountName: '首付租金',
        installmentName: '月租'
    };
    for (let propName in params) {
        if (params[propName] === undefined || decodeURI(params[propName]) === '全部' || params[propName] === '') {
            params[propName] = '';
        } else {
            if (Object.keys(obj).includes(propName)) {
                params[propName] = obj[propName] + decodeURI(params[propName]);
            } else {
                params[propName] = decodeURI(params[propName]);
            }
        }
    }
    return params;
};

export default {
    setTDK: function({title, description, keywords}) {
        document.title = title;
        document.querySelector('meta[name="description"]').setAttribute('content', description);
        document.querySelector('meta[name="keywords"]').setAttribute('content', keywords);
    },
    setTDKForDetail: function(_modelName, used) {
        if (used) {
            this.setTDK({
                title: `${_modelName}二手车_弹个车官网`,
                description: `弹个车官网，提供最新的${_modelName}二手车信息，想要了解更多新车、二手车信息，请登录弹个车官网`,
                keywords: `${_modelName}、弹个车官网`
            });
        } else {
            this.setTDK({
                title: `${_modelName}_弹个车官网`,
                description: `弹个车官网，提供最新的${_modelName}出售信息，提新车、二手车就来弹个车，想了解更多请登录弹个车官网`,
                keywords: `${_modelName}、弹个车官网`
            });
        }
    },
    init: function({query, name}) {
        let {
            cityName,
            prepaidAmountName,
            installmentName,
            newPriceName,
            brandCodeName,
            carShapeCodeName,
            seriesCodeName,
            carAgeName,
            mileageName,
            colorName
        } = formatParams({
            cityName: '',
            prepaidAmountName: '',
            installmentName: '',
            newPriceName: '',
            brandCodeName: '',
            carShapeCodeName: '',
            seriesCodeName: '',
            carAgeName: '',
            mileageName: '',
            colorName: '',
            ...query
        });
        switch (name) {
            case 'index':
                this.setTDK({
                    title: `${cityName}新车|二手车交易_${cityName}弹个车官网`,
                    description: `${cityName}弹个车为您提供最新的新车、二手车交易信息,且为您提供“更低首付租金资金门槛、更低还款压力、更灵活分期”的“先租后买”弹性提车金融方案,让您的资金更加灵活.`,
                    keywords: `${cityName}新车、${cityName}二手车、${cityName}新车交易、${cityName}二手车交易、${cityName}弹个车官网`
                });
                break;
            case 'list':
                let list = `${cityName}${prepaidAmountName}${installmentName}${newPriceName}${brandCodeName}${carShapeCodeName}`;
                if (list) {
                    this.setTDK({
                        title: `${list}推荐|报价|图片_${cityName}弹个车官网`,
                        description: `${cityName}弹个车为您提供大量${prepaidAmountName}${installmentName}${brandCodeName}${carShapeCodeName}车辆信息,想了解更多${newPriceName}${brandCodeName}${carShapeCodeName}报价、图片等相关信息,请登录${cityName}弹个车官网`,
                        keywords: `${list}推荐、${list}报价、${list}图片、${cityName}弹个车官网`
                    });
                } else {
                    this.setTDK({
                        title: `新车车型|报价|图片_${cityName}弹个车官网`,
                        description: `${cityName}弹个车为您提供最新的新车车型、以及车型的报价及图片,想了解更多车型信息,请登录${cityName}弹个车官网.`,
                        keywords: `新车车型、车型报价、车型图片、${cityName}弹个车官网`
                    });
                }
                break;
            case 'used-list':
                let usedlist = `${carAgeName}${mileageName}${prepaidAmountName}${installmentName}${newPriceName}${colorName}${seriesCodeName}`;
                let flag2 = `${cityName}${usedlist}${brandCodeName}${carShapeCodeName}`;
                if (flag2) {
                    this.setTDK({
                        title: `${cityName}${usedlist}_${brandCodeName}${carShapeCodeName}二手车|报价|图片_${cityName}弹个车官网`,
                        description: `${cityName}弹个车为您提供大量${usedlist}二手车交易信息,想了解更多${brandCodeName}${carShapeCodeName}二手车报价、图片等相关信息,请登录${cityName}弹个车官网`,
                        keywords: `${flag2}二手车、${brandCodeName}${carShapeCodeName}二手车报价、${brandCodeName}${carShapeCodeName}二手车图片、${cityName}弹个车官网`
                    });
                } else {
                    this.setTDK({
                        title: `${cityName}二手车出售|交易_${cityName}弹个车官网`,
                        description: `${cityName}弹个车平台为您提供最新的二手车出售、二手车交易信息等相关信息,让您可以对比更多车型,选择您心仪的车型,想了解更多请登录${cityName}弹个车官网`,
                        keywords: `${cityName}二手车出售、${cityName}二手车交易、${cityName}弹个车官网`
                    })
                }
                break;
            case 'introduce':
                this.setTDK({
                    title: '新车|二手车交易_分期提车|评估_弹个车官网',
                    description: '弹个车,新车、二手车交易服务平台,且为您提供车辆评估、以及分期提车等相关问题，让您更方便快捷的提车，想了解更多请登录弹个车官网.',
                    keywords: '新车交易、二手车交易、分期提车、二手车评估、弹个车官网'
                });
                break;
            case 'questions':
                this.setTDK({
                    title: '弹弹问答_二手车过户|新车保养|提车流程_弹个车官网',
                    description: '弹个车,新车、二手车交易服务平台,且为您提供“车辆如何保养、过户以及购买流程等相关问题，让您更全面的了解您的爱车，想了解更多请登录弹个车官网.',
                    keywords: '二手车过户、二手车提车流程、新车提车流程、二手车保养、弹个车官网'
                });
                break;
            default:
                break;
        }
    }
};
