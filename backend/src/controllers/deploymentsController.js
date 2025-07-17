const deployments = [
  {
    id: 1,
    name: "Deployment 1",
    status: "Success",
    timestamp: "2023-10-01T12:00:00Z",
  },
  {
    id: 2,
    name: "Deployment 2",
    status: "Failed",
    timestamp: "2023-10-02T14:30:00Z",
  },
  {
    id: 3,
    name: "Deployment 3",
    status: "In Progress",
    timestamp: "2023-10-03T09:15:00Z",
  },
];

exports.getDeployments = (req, res) => {
  res.json(deployments);
};
