exports.getOperation = (req, res) => {
  res.status(200).json({ message: "You used the get http endpoint!" });
};

exports.postOperation = (req, res) => {
  res.status(200).json({ message: "You used the post http endpoint!" });
};

exports.deleteOperation = (req, res) => {
  res.status(200).json({ message: "You used the delete http endpoint!" });
};

exports.patchOperation = (req, res) => {
  res.status(200).json({ message: "You used the patch http endpoint!" });
};
