const app = require("./app");
const request = require("supertest");
const knex = require("./db/connection");



describe('app', () => {
  beforeEach(() => {
    return knex.seed.run();
  });
  afterAll(() => {
    return knex.destroy();
  })
  describe('/api', () => {
    test('All:404 - Non existant path', () => {
      return request(app)
        .get('/api/topicsss')
        .expect(404)
        .then((res) => {
          expect(res.body.msg).toBe('Path not found, try again.');
        });
    });

    describe('/topics', () => {
      test('GET 200 - repsonds with an array of the topics', () => {
        return request(app)
          .get('/api/topics')
          .expect(200)
          .then(({
            body
          }) => {
            expect(body).toEqual(
              expect.objectContaining({
                topics: expect.arrayContaining([
                  expect.objectContaining({
                    slug: expect.any(String),
                    description: expect.any(String)
                  })
                ])
              })
            )
          })
      });
    });

    describe('/users/:username', () => {
      test('GET 200 - reponds with an array of the given user', () => {
        return request(app)
          .get('/api/users/butter_bridge')
          .expect(200)
          .then(({
            body
          }) => {
            expect(body).toEqual(
              expect.objectContaining({
                user: expect.arrayContaining([
                  expect.objectContaining({
                    username: expect.any(String),
                    avatar_url: expect.any(String),
                    name: expect.any(String)
                  })
                ])
              })
            )
          })

      });
      test('GET 404 - responds with error when given a valid but non-existant ID ', () => {
        return request(app)
          .get('/api/users/PhilTheGreatest')
          .expect(404)
          .then(({
            body
          }) => {
            expect(body.msg).toBe("No user found!")
          })
      });
    });

    describe('/articles', () => {
      describe('/articles/:article_id', () => {
        test('GET 200 - reponds with an array of the given article', () => {
          return request(app)
            .get('/api/articles/1')
            .expect(200)
            .then(({
              body
            }) => {
              expect(body).toEqual(
                expect.objectContaining({
                  article: expect.arrayContaining([
                    expect.objectContaining({
                      author: expect.any(String),
                      title: expect.any(String),
                      article_id: expect.any(Number),
                      body: expect.any(String),
                      topic: expect.any(String),
                      created_at: expect.any(String),
                      votes: expect.any(Number),
                      comment_count: expect.any(Number),
                    })
                  ])
                })
              )
            })

        });
        test('GET 404 - responds with error when given a valid but non-existant ID', () => {
          return request(app)
            .get('/api/articles/9999')
            .expect(404)
            .then(({
              body
            }) => {
              expect(body.msg).toBe("No article found!")
            })
        });
        test('PATCH 200 - responds with the updated article', () => {
          return request(app)
            .patch('/api/articles/1')
            .send({
              inc_votes: 100
            })
            .expect(200)
            .then(({
              body
            }) => {
              expect(body.article[0].votes).toBe(200)
              expect(body).toEqual(
                expect.objectContaining({
                  article: expect.arrayContaining([
                    expect.objectContaining({
                      author: expect.any(String),
                      title: expect.any(String),
                      article_id: expect.any(Number),
                      body: expect.any(String),
                      topic: expect.any(String),
                      created_at: expect.any(String),
                      votes: expect.any(Number)
                    })
                  ])
                })
              )
            })
        });
        test('PATCH 404 - responds with error when given a valid but non-existant ID', () => {
          return request(app)
            .patch('/api/articles/99999')
            .send({
              inc_votes: 100
            })
            .expect(404)
            .then(({
              body
            }) => {
              expect(body.msg).toBe("No article found!")
            })
        });
        test('PATCH 400 - responds with error when given an incorrect input', () => {
          return request(app)
            .patch('/api/articles/1')
            .send({
              inc_votes: "dave"
            })
            .expect(400)
            .then(({
              body
            }) => {
              expect(body.msg).toBe("Bad Request!!")
            })
        });

        describe('/articles/:article_id/comments', () => {
          test('POST 201 - responds with newly added comment', () => {
            const newComment = {
              username: "lurker",
              body: "This is a new comment added"
            }
            const expected = {
              comment: ["This is a new comment added"]
            }
            return request(app)
              .post('/api/articles/1/comments')
              .send(newComment)
              .expect(201)
              .then(({
                body
              }) => {
                expect(body).toEqual(expected)
              })
          });
          test('POST 404 - responds with error when given a valid but non-existant ID', () => {
            const newComment = {
              username: "lurker",
              body: "This is a new comment added"
            }
            return request(app)
              .post('/api/articles/9999/comments')
              .send(newComment)
              .expect(404)
              .then(({
                body
              }) => {
                expect(body.msg).toBe("Not found!")
              })
          });
          test('POST 400 - responds with error when given an incorrect input', () => {
            const newComment = {
              username: "lurker",
              simon: "This is a new comment added"
            }
            return request(app)
              .post('/api/articles/1/comments')
              .send(newComment)
              .expect(400)
              .then(({
                body
              }) => {
                expect(body.msg).toBe("Bad Request!!")
              })
          });
          test('POST 400 - responds with error when given user that doesnt exist', () => {
            const newComment = {
              username: "Phil",
              body: "This is a new comment added"
            }
            return request(app)
              .post('/api/articles/1/comments')
              .send(newComment)
              .expect(404)
              .then(({
                body
              }) => {
                expect(body.msg).toBe("Not found!")
              })
          });
          test('GET 200 - responds with an array of comments for the given article ID', () => {
            return request(app)
              .get('/api/articles/1/comments')
              .expect(200)
              .then(({
                body
              }) => {
                expect(body).toEqual(
                  expect.objectContaining({
                    comments: expect.arrayContaining([
                      expect.objectContaining({
                        comment_id: expect.any(Number),
                        votes: expect.any(Number),
                        created_at: expect.any(String),
                        author: expect.any(String),
                        body: expect.any(String)
                      })
                    ])
                  })
                )
              })
          });
          test('GET 404 - responds with an error when given a valid but non-existant ID', () => {
            return request(app)
              .get('/api/articles/9999/comments')
              .expect(404)
              .then(({
                body
              }) => {
                expect(body.msg).toBe('Not found!')
              })
          });
          test('GET 404 - responds with an error when given a valid ID but no comments are found', () => {
            return request(app)
              .get('/api/articles/2/comments')
              .expect(404)
              .then(({
                body
              }) => {
                expect(body.msg).toBe('Not found!')
              })
          });
          test('GET 200 - responds with array of comments for the article ID sorted by specified column', () => {
            return request(app)
              .get('/api/articles/1/comments?sort_by=votes')
              .expect(200)
              .then(({
                body
              }) => {
                expect(body.comments).toBeSortedBy("votes", {
                  descending: true,
                  coerce: true
                })
              })
          });
          test('GET 200 - responds with array of comments for the article ID sorted by default created_at', () => {
            return request(app)
              .get('/api/articles/1/comments')
              .expect(200)
              .then(({
                body
              }) => {
                expect(body.comments).toBeSortedBy("created_at", {
                  descending: true,
                  coerce: true
                })
              })
          });
          test('GET 200 - responds with array of comments for the article ID ordered by specified order', () => {
            return request(app)
              .get('/api/articles/1/comments?order=asc')
              .expect(200)
              .then(({
                body
              }) => {
                expect(body.comments).toBeSortedBy("created_at", {
                  descending: false,
                  coerce: true
                })
              })
          });
          test('GET 200 - responds with array of comments for the article ID ordered by default desc', () => {
            return request(app)
              .get('/api/articles/1/comments')
              .expect(200)
              .then(({
                body
              }) => {
                expect(body.comments).toBeSortedBy("created_at", {
                  descending: true,
                  coerce: true
                })
              })
          });




        });
      });
    });
  });
});