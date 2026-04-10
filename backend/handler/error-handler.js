function errorHandler(error, req, res, next) {
  if (res.headersSent) {
    return next(error);
  }

  res.status(error.statusCode || 500);

  res.json({ message: error.message || 'Une erreur inconnue est survenue !!' });
}
export default errorHandler;
