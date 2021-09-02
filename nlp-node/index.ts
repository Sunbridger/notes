const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');

const { containerBootstrap } = require('@nlpjs/core');
const { Nlp } = require('@nlpjs/nlp');
const { LangZh } = require('@nlpjs/lang-zh');
const ZH = 'zh';
let nlp = null;

const app = new Koa();
let route = new Router();




route.get('/search', async (ctx) => {

  const { keyword } = ctx.query;
  const answer = await getAnswerFromNLP(keyword);
  ctx.body = {
    data: answer
  };
});

route.post('/save', async (ctx) => {
  const { questions, answer, group } = ctx.request.body
  // 将数据保存于库里，
  // 数据进行分批学习
  questions?.forEach((question) => {
    addDocument({
      question,
      group
    });
  })
  
  addAnswer({
    answer,
    group
  });
  
  await nlp.train();

  ctx.body = {
    data: 'done'
  };

});

app.use(bodyParser());
app.use(route.routes());

app.listen(9890, async () => {
  await initNLP();
  await trainNLP();
  console.log(9890);
})

const initNLP = async () => {
  const container = await containerBootstrap();
  container.use(Nlp);
  container.use(LangZh);
  nlp = container.get('nlp');
  nlp.settings.autoSave = false;
  nlp.addLanguage(ZH);
};

const trainNLP = async () => {
  // start config of nlp
  addDocumentInit();
  addAnswerInit();
  await nlp.train();
};

const getAnswerFromNLP = async (keyword) => {
  const response = await nlp.process(ZH, keyword);
  return response.answer;
};


const addDocument = ({ question, group }) => {
  nlp.addDocument(ZH, question, group);
};

const addAnswer = ({ answer, group }) => {
  nlp.addAnswer(ZH, group, answer);
}

const addDocumentInit = () => {
  // Adds the utterances and intents for the NLP
  const arr = [
    {
      question: '你好',
      group: 'greetings'
    }, 
    {
      question: '早上好',
      group: 'greetings'
    }, 
    {
      question: '晚上好',
      group: 'greetings'
    }, 
    {
      question: '新人入职',
      group: 'new'
    }, 
    {
      question: '权限怎么开通',
      group: 'permi'
    }, 
    {
      question: '敦煌权限申请',
      group: 'permi'
    }, 
    {
      question: 'gitlab权限申请',
      group: 'permi'
    }
  ];
  // 优化为分片？
  arr.forEach(({ question, group }) => {
    addDocument({ question, group });
  });
};

const addAnswerInit = () => {
  // Train also the NLG
  const ansArr = [
    {
      answer: '你也好',
      group: 'greetings',
    },
    {
      answer: '好',
      group: 'greetings',
    },
    {
      answer: '权限问题找七彩',
      group: 'permi',
    },
    {
      answer: '入职问题找HR',
      group: 'new',
    },
  ];
  ansArr.forEach(({ answer, group }) => {
    addAnswer({ answer, group });
  });
};