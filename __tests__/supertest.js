const request = require('supertest');
const fs = require('fs');
const path = require('path');

const server = 'http://localhost:3000';

describe('User route handling', () => {

});

describe('Media route handling', () => {
    describe('/api/media', () => {
        describe('GET', () => {
            it('Responds with status 200 and a json content type', (done) => {
                return request(server)
                    .get('/api/media/')
                    .expect('Content-Type', /application\/json/)
                    .expect(200, done)
                    
            })
            it('Responds with the users media', (done) =>{
                return request(server)
                    .get('/api/media?userId=608873f69c69b5d1cc6f4dfd')
                    .expect(200)
                    .expect((err, res) => {
                        console.log(res.locals)
                        if(!Array.isArray(res.locals.media)) throw new Error ('Needs to Be Array of Media')
                    })
            })
        })
        xdescribe('POST', () => {
            it('Responds with status 200 and a json content type', (done) => {
                return request(server)
                    .post('/api/media')
                    .send()
            })
        })
    })
});

// describe('Route integration', () => {
//   describe('/', () => {
//     describe('GET', () => {
//       it('responds with 200 status and text/html content type', () => {
//         return request(server)
//           .get('/')
//           .expect('Content-Type', /text\/html/)
//           .expect(200);
//       });
//     });
//   });
//   describe('/api/media', () => {
//     describe('GET', () => {
//       it('responds with 200 status and JSON', () => {
//         return request(server)
//           .get('/api/media')
//           .expect('Content-Type', /application\/json/)
//           .expect(200);
//       });
//     });
//   });
//   describe('Global Error Handling', () => {
//     describe('Wrong URL', () => {
//       it('respond with 404 status', () => {
//         return request(server).get('/blahblahblahwrongrequest').expect(404);
//       });
//     });
//   });
//   describe('Get Users', () => {
//     describe('Get Users', () => {
//       xit('responds with 200 and JSON', () => {
//         return request(server)
//           .get('/api/users')
//           .expect(200)
//           .expect('Content-Type', /application\/json/);
//       });
//     });
//   });
//   describe('Create User', () => {
//     describe('Create User', () => {
//       const User1 = [
//         {
//           userProfile: {
//             username: 'fal',
//             password: 'fal',
//             email: 'fal',
//             firstName: 'fal',
//             lastName: 'fal',
//           },
//           media: [],
//         },
//       ];

//       xit('responds with 200', () => {
//         return request(server)
//           .post('/api/users/create')
//           .json(User1)
//           .expect(200);
//       });
//     });
//   });
//   describe('AddMedia', () => {
//     describe('Add Media', () => {
//       const mediaEntry1 = [
//         {
//           title: 'Spiderman',
//           type: 'Movie',
//           currentStatus: 'Watched',
//         },
//       ];
//       xit('responds with 200', () => {
//         return request(server).post('/api/media').send(mediaEntry1).expect(200);
//       });
//     });
//   });
// });
