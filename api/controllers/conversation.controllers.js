var mongoose      = require('mongoose');
var conversation  = mongoose.model('User');
var coment        = mongoose.model('Conversation');

module.exports.conversationGetAll = function(req, res){
    //console.log('Request by: ' + req.user);
    //console.log('GET the hotels');
    //console.log('req.query');

    var offset    = 0;
    var count     = 5;
    var maxCount  = 50;

    if (req.query && req.query.offset){
      offset = parseInt(req.query.offset, 10);
    }

    if (req.query && req.query.count){
      count = parseInt(req.query.count, 10);
    }

    if (isNaN(offset) || isNaN(count)) {
      res
        .status(400)
        .json({
          "message" : "If supplied in querystring, count and offset must both be numbers"
        });
        return;
    }

    if (count > maxCount){
      res
        .status(400)
        .json({
          "message" : "Count limit of " + maxCount + " exceeded"
        });
        return;
    }

    coment
      .find()
      .exec(function(err, debates){
        //console.log(err);
        //console.log(debates);
        if (err){
          console.log("Error finding debates");
          res
            .status(500)
            .json(err);
        } else {
          console.log("Found a debate ", debates.length);
          res
            .json(debates);
        }
      });

};

module.exports.addComent = function(req,res){
    console.log("Post new coment.");

    coment
      .create({
        subject   : req.body.subject,
        user      : req.body.user,
        coment    : req.body.coment,
        createdOn : req.body.createdOn
      }, function(err, coment){
        if (err) {
          console.log("Error creating coment");
          res
            .status(400)
            .json(err);
        } else {
          console.log("Coment Add.", coment);
          res
            .status(201)
            .json(coment);
        }
      });
};

module.exports.deleteComent = function(req,res){
  id = req.params.politicsId;
  console.log("ID from controller "+id);
  coment
    .findByIdAndRemove(id)
    .exec(function(err, result){
      console.log(err);
      console.log(result);
      if (err){
        console.log("Error deleting coment");
        res
          .status(500)
          .json(err);
      } else {
        console.log("Coment delete");
        res
          .json(result);
      }
    });
};