const { dialogType } = this.PaymentResponse;

const obj = {
    cardOpen: {
        columns: newsCardCol,
        dialogTitle: '消息卡片打开明细'
    },
    getPrivilege: {
        columns: getPrivilegeCol,
        dialogTitle: '权益明细...'
    },
    ...
};

this.setState(obj[dialogType]);
