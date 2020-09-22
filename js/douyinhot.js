const axios = require('axios');

axios.get('https://api3-normal-c-lf.amemv.com/aweme/v1/hot/search/list/').then((res) => {
    const arr = res.data.data.word_list;
    const mapobj = arr.map((el) => {
        return {
            word: el.word,
            pic_url: el.word_cover.url_list[0],
            video_url: el.word_cover.url_list[1]
        }
    });
    console.log(mapobj);

})
/**
 * 数据结构
 * {
    label: 0,
    hot_value: 8293333,
    challenge_id: '',
    position: 1,
    video_count: 5,
    can_extend_detail: true,
    related_words: null,
    word: '黄子韬父亲去世',
    group_id: '6870321907965138189',
    word_type: 1,
    sentence_id: '121330',
    event_time: 1599801192,
    word_cover: {
      uri: 'tos-cn-p-0015/c6faf18a75e341f8b0e536fa60d2fc96',
      url_list: [Array]
    }
  }
 */
