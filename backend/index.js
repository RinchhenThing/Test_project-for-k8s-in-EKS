const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.get('/api/hello', (req, res) => {
  res.send(`Hello from backend (pod: ${process.env.HOSTNAME || 'unknown'})`);
});

// Serve static frontend when mounted in same image (optional)
app.use('/', express.static('/usr/share/nginx/html'));

app.listen(port, () => console.log(`backend listening on ${port}`));
