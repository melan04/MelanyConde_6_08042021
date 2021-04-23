const Sauce = require('../models/Sauce');
const fs = require('fs');

exports.createSauce = (req, res, next) => {
  const sauceObject = JSON.parse(req.body.sauce);
  delete sauceObject._id;
  const sauce = new Sauce({
    ...sauceObject,
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  });
  sauce.save()
    .then(() => res.status(201).json({ message: 'Sauce enregistrée !' }))
    .catch(error => res.status(400).json({ error }));
};

exports.modifySauce = (req, res, next) => {
  const sauceObject = req.file ?
    {
      ...JSON.parse(req.body.sauce),
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : { ...req.body };
  Sauce.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Sauce modifiée !' }))
    .catch(error => res.status(400).json({ error }));
};

exports.deleteSauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id })
    .then(sauce => {
      const filename = sauce.imageUrl.split('/images/')[1];
      fs.unlink(`images/${filename}`, () => {
        Sauce.deleteOne({ _id: req.params.id })
          .then(() => res.status(200).json({ message: 'Sauce supprimée !' }))
          .catch(error => res.status(400).json({ error }));
      });
    })
    .catch(error => res.status(500).json({ error }));
};



exports.getOneSauce = (req, res, next) => {
  Sauce.findOne({
    _id: req.params.id
  }).then(
    (sauce) => {
      res.status(200).json(sauce);
    }
  ).catch(
    (error) => {
      res.status(404).json({
        error: error
      });
    }
  );
};

exports.getAllSauce = (req, res, next) => {
  Sauce.find()
    .then((sauce) => {
      res.status(200).json(sauce);
    }
    ).catch(
      (error) => {
        res.status(400).json({
          error: error
        });


      });
};

exports.modifyVoteSauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id })           // Récupérer les infos
    .then(sauce => {

      switch (req.body.like) {                // Selon la valeur récupérer

        case -1:                                                // si la personne dislike
          Sauce.updateOne({ _id: req.params.id }, {           // MAJ sauce
            $inc: { dislikes: 1 },                             // +1 dislike
            $push: { usersDisliked: req.body.userId },        // Ajout de l'utilisateur dans UserID
            _id: req.params.id
          })
            .then(() => res.status(201).json({ message: 'Dislike ajouté !' }))
            .catch(error => res.status(400).json({ error }))
          break;

        case 0:                                                                 // si l'user enleve son like ou dislike
          if (sauce.usersLiked.find(user => user === req.body.userId)) {      // si User trouvé dans tableau
            Sauce.updateOne({ _id: req.params.id }, {                      // MAJ sauce
              $inc: { likes: -1 },                                           // -1 dans like
              $pull: { usersLiked: req.body.userId },                       // on retire le userId dans le tableau des likes
              _id: req.params.id
            })
              .then(() => res.status(201).json({ message: 'Like retiré !' }))
              .catch(error => res.status(400).json({ error }))
          }
          if (sauce.usersDisliked.find(user => user === req.body.userId)) {   // si l'utilisateur est trouvé dans le tableau des dislike
            Sauce.updateOne({ _id: req.params.id }, {                      // MAJ sauce
              $inc: { dislikes: -1 },                                        // - 1 
              $pull: { usersDisliked: req.body.userId },                    // on retire le userId dans le tableau des utilisateurs - dislike la sauce
              _id: req.params.id
            })
              .then(() => res.status(201).json({ message: 'Dislike retiré !' }))
              .catch(error => res.status(400).json({ error }));
          }
          break;

        case 1:                                                                 // si l'utilisateur like la sauce
          Sauce.updateOne({ _id: req.params.id }, {                           // MAJ sauce
            $inc: { likes: 1 },                                               // +1 like
            $push: { usersLiked: req.body.userId },                          // on ajoute le userId dans le tableau des utilisateurs qui like la sauce
            _id: req.params.id
          })
            .then(() => res.status(201).json({ message: 'Like ajouté !' }))
            .catch(error => res.status(400).json({ error }));
          break;

        default:                                                                // si aucun des cas précédent n'est trouvé
          return res.status(500).json({ error });
      }
    })
    .catch(error => res.status(500).json({ error }))
};