export function getOperation(req, res) {
  res.status(200).json({ message: 'You used the get http endpoint!' });
}

export function postOperation(req, res) {
  res.status(200).json({ message: 'You used the post http endpoint!' });
}

export function deleteOperation(req, res) {
  res.status(200).json({ message: 'You used the delete http endpoint!' });
}

export function patchOperation(req, res) {
  res.status(200).json({ message: 'You used the patch http endpoint!' });
}
