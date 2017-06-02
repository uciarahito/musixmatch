const express = require('express')
const router = express.Router()
let userController = require('../controllers/userController')
let helpers = require('../helpers/helpers')
let unirest = require('unirest')

// NOTE: user
router.post('/signUp', userController.signUp)
router.post('/signIn', userController.signIn)
router.post('/signInFB', userController.signInFB)
router.get('/allUsers', userController.getAllUsers)
router.get('/detailUser/:id', userController.getUserById)
router.put('/editUser/:id', userController.editUser)  // password harus disertakan
router.delete('/deleteUser/:id', userController.deleteUserById)

router.post('/matcher', function(req, res, next) {
  let artist = req.body.artist
  let track = req.body.track
  unirest.get("https://musixmatchcom-musixmatch.p.mashape.com/wsr/1.1/matcher.track.get?f_has_lyrics=1&q_artist="+artist+"&q_track="+track+"")
  .header("X-Mashape-Key", "QGOXQtQCgkmshQZ216bcDj8RaRX4p1yguhIjsn88GLh3e3Iybw")
  .header("Accept", "application/json")
  .end(function (result) {
    console.log(result);
    // console.log(result.status, result.headers, result.body);
    if (result.body != undefined) {
      var data = JSON.parse(result.body)
      // console.log(result);
      console.log('--------------------------');
      console.log(data.track_name);
      console.log(data.artist_name);
      console.log(data.album_name);
      console.log('--------------------------');
        let track_id = req.body.track_id
        unirest.get("https://musixmatchcom-musixmatch.p.mashape.com/wsr/1.1/track.lyrics.get?track_id="+data.track_id.toString()+"")
        .header("X-Mashape-Key", "QGOXQtQCgkmshQZ216bcDj8RaRX4p1yguhIjsn88GLh3e3Iybw")
        .header("Accept", "application/json")
        .end(function (lyric) {
          if (lyric) {
            var data2 = JSON.parse(lyric.body)
            // console.log(typeof data);
            // console.log(typeof data.lyrics_body);
            // console.log(data.lyrics_body);
            var str = data2.lyrics_body.split('*******')
            console.log(str[0]);
            var obj = {
              track_name: data.track_name,
              artist_name: data.artist_name,
              album_name: data.album_name,
              lyrics_body: str[0]
            }
            console.log(obj);
            res.send(str[0].split('\n'));
          } else {
            res.status(404).send({
              err: 404,
              msg: 'Lyric not found'
            })
          }
        });
    } else {
      res.status(404).send({
        err: 404,
        msg: 'Lyric not found'
      })
    }
  });
});

module.exports = router