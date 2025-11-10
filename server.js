const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from both `public` (if present) and repository root.
// This ensures `index.html` in the repo root is served even if `public/` exists
// but doesn't contain an index.html.
const publicDir = path.join(__dirname, 'public');
if (fs.existsSync(publicDir)) app.use(express.static(publicDir));
app.use(express.static(__dirname));

// For logging/diagnostics choose the directory that will be preferred for index
const serveDir = fs.existsSync(publicDir) ? publicDir : __dirname;

// Fallback to index.html (prefer public/index.html if present, otherwise root index.html)
app.get('*', (req, res) => {
  const publicIndex = path.join(publicDir, 'index.html');
  const rootIndex = path.join(__dirname, 'index.html');
  if (fs.existsSync(publicIndex)) return res.sendFile(publicIndex);
  if (fs.existsSync(rootIndex)) return res.sendFile(rootIndex);
  res.status(404).send('index.html not found');
});

app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT} serving ${serveDir}`);
});
