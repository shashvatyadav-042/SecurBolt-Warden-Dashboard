const express = require('express');
const mqtt = require('mqtt');
const app = express();

const client = mqtt.connect('mqtt://your-broker-address');

app.get('/api/status', (req, res) => {
    // In a real app, this data comes from MQTT subscriptions
    res.json({ battery: 88, voltage: 4.1, locked: true });
});

app.post('/api/toggle', (req, res) => {
    client.publish('securbolt/cmd', 'TOGGLE');
    res.sendStatus(200);
});

app.listen(5000, () => console.log("SecurBolt API Active"));
