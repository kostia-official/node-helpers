module.exports = () => (err, req, res, next) => {
  if (!err) return next();
  if (!err.toJSON) return next(err);

  const error = err.toJSON();
  return res.status(error.code).send({ error });
};
