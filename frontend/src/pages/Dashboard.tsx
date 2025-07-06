import React, { useEffect, useState } from 'react';

const Dashboard = () => {
    const [deployments, setDeployments] = useState([]);

    useEffect(() => {
        const fetchDeployments = async () => {
            try {
                const response = await fetch('/api/deployments');
                const data = await response.json();
                setDeployments(data);
            } catch (error) {
                console.error('Error fetching deployment data:', error);
            }
        };

        fetchDeployments();
    }, []);

    return (
        <div>
            <h1>Dashboard</h1>
            <h2>Deployment Status</h2>
            <table>
                <thead>
                    <tr>
                        <th>Deployment ID</th>
                        <th>Status</th>
                        <th>Timestamp</th>
                    </tr>
                </thead>
                <tbody>
                    {deployments.map(deployment => (
                        <tr key={deployment.id}>
                            <td>{deployment.id}</td>
                            <td>{deployment.status}</td>
                            <td>{new Date(deployment.timestamp).toLocaleString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Dashboard;