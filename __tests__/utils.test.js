const {
  formatDates,
  makeRefObj,
  formatComments,
} = require('../db/utils/utils');
const {
  forEach
} = require('../db/data/test-data/comments');
const articles = require('../db/data/development-data/articles');

describe('formatDates', () => {
  test('returns an array ', () => {
    expect(formatDates([])).toEqual([])
  });
  test('returns an array of one item in date format', () => {
    const dateToBeConverted = [{
      body: "Oh, I've got compassion!",
      belongs_to: "They're not exactly dogs, are they?",
      created_by: 'butter_bridge',
      votes: 16,
      created_at: 1511354163389,
    }];
    const output = formatDates(dateToBeConverted)
    expect(output[0].created_at).toBeInstanceOf(Date);
  });
  test('returns an array multiple items in date format', () => {
    const dateToBeConverted = [{
      body: "Oh, I've got compassion!",
      belongs_to: "They're not exactly dogs, are they?",
      created_by: 'butter_bridge',
      votes: 16,
      created_at: 1511354163389,
    }, {
      body: 'The beautiful.',
      belongs_to: 'Living in the shadow of a great man',
      created_by: 'butter_bridge',
      votes: 14,
      created_at: 1479818163389,
    }];
    const output = formatDates(dateToBeConverted)
    output.forEach((item) => {
      expect(item.created_at).toBeInstanceOf(Date);
    })
  });
  test('original array is not changed', () => {
    const dateToBeConverted = [{
      body: "Oh, I've got compassion!",
      belongs_to: "They're not exactly dogs, are they?",
      created_by: 'butter_bridge',
      votes: 16,
      created_at: 1511354163389,
    }];
    formatDates(dateToBeConverted);
    expect(dateToBeConverted).toEqual([{
      body: "Oh, I've got compassion!",
      belongs_to: "They're not exactly dogs, are they?",
      created_by: 'butter_bridge',
      votes: 16,
      created_at: 1511354163389,
    }])
  });

});



describe('makeRefObj', () => {
  test('returns an empty object, when passed an empty array', () => {
    const input = [];
    const actual = makeRefObj(input);
    const expected = {};
    expect(actual).toEqual(expected);
  });
  test('returns an object of title and id when passed an array of one article', () => {
    const input = [{
      article_id: 1,
      title: 'Living in the shadow of a great man',
      topic: 'mitch',
      author: 'butter_bridge',
      body: 'I find this existence challenging',
      created_at: 1542284514171,
      votes: 100,
    }]
    const actual = makeRefObj(input)
    const expected = {
      'Living in the shadow of a great man': 1
    }
    expect(actual).toEqual(expected)
  });
  test('returns an object of title and id when passed an array of articles', () => {
    const input = [{
        article_id: 1,
        title: 'Living in the shadow of a great man',
        topic: 'mitch',
        author: 'butter_bridge',
        body: 'I find this existence challenging',
        created_at: 1542284514171,
        votes: 100,
      },
      {
        article_id: 2,
        title: 'Sony Vaio; or, The Laptop',
        topic: 'mitch',
        author: 'icellusedkars',
        body: 'Call me',
        created_at: 1416140514171,
      }
    ]
    const actual = makeRefObj(input)
    const expected = {
      'Living in the shadow of a great man': 1,
      'Sony Vaio; or, The Laptop': 2
    }
    expect(actual).toEqual(expected)
  });
  test('original array is not changed', () => {
    const input = [{
      article_id: 1,
      title: 'Living in the shadow of a great man',
      topic: 'mitch',
      author: 'butter_bridge',
      body: 'I find this existence challenging',
      created_at: 1542284514171,
      votes: 100,
    }]
    makeRefObj(input);
    expect(input).toEqual([{
      article_id: 1,
      title: 'Living in the shadow of a great man',
      topic: 'mitch',
      author: 'butter_bridge',
      body: 'I find this existence challenging',
      created_at: 1542284514171,
      votes: 100,
    }])

  });
});

describe('formatComments', () => {
  test('returns an array', () => {
    const input = [];
    const actual = formatComments(input);
    const expected = [];
    expect(actual).toEqual(expected);
  });
  test('returns an array with one object with created_by and belongs_to and created_at updated', () => {
    const input = [{
      body: "Oh, I've got compassion running",
      belongs_to: "They're not exactly dogs, are they?",
      created_by: 'butter_bridge',
      votes: 16,
      created_at: 1511354163389
    }]
    const actual = formatComments(input);
    expect(actual[0].article_id).toEqual("They're not exactly dogs, are they?")
    expect(actual[0].author).toEqual('butter_bridge')
    expect(actual[0].created_at).toBeInstanceOf(Date)
  });
});


// [{
//   body: "Oh, I've got compassion running out of my nose, pal! I'm the Sultan of Sentiment!",
//   belongs_to: "They're not exactly dogs, are they?",
//   created_by: 'butter_bridge',
//   votes: 16,
//   created_at: 1511354163389,
// }]