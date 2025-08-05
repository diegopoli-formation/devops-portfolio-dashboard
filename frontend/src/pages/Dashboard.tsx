import React from "react";
import styles from "../styles/Dashboard.module.css";

type Deployment = {
  id: string;
  status: string;
  timestamp: string;
};

// Hardcoded deployment data
const deploymentsData: Deployment[] = [
  {
    id: "deploy-001",
    status: "Success",
    timestamp: "2025-08-05T10:30:00Z"
  },
  {
    id: "deploy-002",
    status: "Success",
    timestamp: "2025-08-04T14:15:00Z"
  },
  {
    id: "deploy-003",
    status: "Failed",
    timestamp: "2025-08-03T09:45:00Z"
  },
  {
    id: "deploy-004",
    status: "Success",
    timestamp: "2025-08-02T16:20:00Z"
  },
  {
    id: "deploy-005",
    status: "Success",
    timestamp: "2025-08-01T11:10:00Z"
  }
];

const Dashboard = () => {
  return (
    <div className={styles.container}>
      <h1>Dashboard</h1>
      <div className={styles.card}>
        <h2>Deployment Status</h2>
        <div className={styles['table-responsive']}>
          <table>
            <thead>
              <tr>
                <th>Deployment ID</th>
                <th>Status</th>
                <th>Timestamp</th>
              </tr>
            </thead>
            <tbody>
              {deploymentsData.map((deployment) => (
                <tr key={deployment.id}>
                  <td>{deployment.id}</td>
                  <td>
                    <span className={`${styles['status-badge']} ${styles[deployment.status.toLowerCase()]}`}>
                      {deployment.status}
                    </span>
                  </td>
                  <td>{new Date(deployment.timestamp).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
