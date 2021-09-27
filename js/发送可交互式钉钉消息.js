import Util, * as $Util from '@alicloud/tea-util/dist/client';
import dingtalkim_1_0, * as $dingtalkim_1_0 from '"@alicloud/dingtalk/im_1_0';
import OpenApi, * as $OpenApi from '@alicloud/openapi-client';
// import * as $tea from '@alicloud/tea-typescript';

export default class Client {

  /**
   * 使用 Token 初始化账号Client
   * @return Client
   * @throws Exception
   */
  static createClient() {
    let config = new $OpenApi.Config({ });
    config.protocol = "https";
    config.regionId = "central";
    return new dingtalkim_1_0(config);
  }

  static async main(args) {
    let client = Client.createClient();
    let sendInteractiveCardHeaders = new $dingtalkim_1_0.SendInteractiveCardHeaders({ });
    sendInteractiveCardHeaders.xAcsDingtalkAccessToken = "6e42ad769e0835d28aa24358b38212b8";
    let atOpenIds = {
      key: "test",
    };
    let privateDataValueKeyCardMediaIdParamMap = {
      key: "test",
    };
    let privateDataValueKeyCardParamMap = {
      key: "test",
    };
    let privateDataValueKey = new $dingtalkim_1_0.PrivateDataValue({
      cardParamMap: privateDataValueKeyCardParamMap,
      cardMediaIdParamMap: privateDataValueKeyCardMediaIdParamMap,
    });
    let privateData = {
      privateDataValueKey: privateDataValueKey,
    };
    let cardDataCardMediaIdParamMap = {
      key: "test",
    };
    let cardDataCardParamMap = {
      key: "test",
    };
    let cardData = new $dingtalkim_1_0.SendInteractiveCardRequestCardData({
      cardParamMap: cardDataCardParamMap,
      cardMediaIdParamMap: cardDataCardMediaIdParamMap,
    });
    let sendInteractiveCardRequest = new $dingtalkim_1_0.SendInteractiveCardRequest({
      cardTemplateId: "609901c0-1c6c-4b63-9507-a00154c70781",
      receiverUserIdList: [
        "16146515078009539"
      ],
      // outTrackId: "trackId",
    //   robotCode: "robot",
      conversationType: 1,
      callbackRouteKey: "https://www.aaa.com",
      cardData: cardData,
      privateData: privateData,
      chatBotId: "123",
      userIdType: 1,
      atOpenIds: atOpenIds,
    });
    try {
      await client.sendInteractiveCardWithOptions(sendInteractiveCardRequest, sendInteractiveCardHeaders, new $Util.RuntimeOptions({ }));
    } catch (err) {
      if (!Util.empty(err.code) && !Util.empty(err.message)) {
        // err 中含有 code 和 message 属性，可帮助开发定位问题
      }

    }
  }

}

Client.main(process.argv.slice(2));