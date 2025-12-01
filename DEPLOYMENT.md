// DEPLOYMENT.md - Production Deployment Guide

## Local Development

### Quick Start
```bash
cd erasure
npm install
npm start
```

Server: http://localhost:3000
Browser: Open in Chrome/Firefox (WebGL required)

### Development Mode with Hot Reload
```bash
npm run dev
```

### Build for Production
```bash
npm run build
```

---

## Deployment Options

### Option 1: Heroku (Simple, Free Tier Available)

```bash
# Install Heroku CLI
brew install heroku

# Login
heroku login

# Create app
heroku create erasure-experience

# Add Procfile
echo "web: node server.js" > Procfile

# Deploy
git push heroku main

# View logs
heroku logs --tail
```

**Pros:** Simple, free tier available, auto-scaling
**Cons:** Cold start issues, limited performance
**Cost:** $0-50/month

### Option 2: AWS EC2 (Recommended for Hackathon)

```bash
# Launch t3.medium instance (Ubuntu 22.04)
# Security Group: Allow ports 80, 443, 3000

# SSH into instance
ssh -i key.pem ubuntu@your-instance-ip

# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install PM2 (process manager)
sudo npm install -g pm2

# Clone repo
git clone <your-repo>
cd erasure

# Install dependencies
npm install

# Start with PM2
pm2 start server.js --name "erasure"
pm2 save
pm2 startup

# Install Nginx (reverse proxy)
sudo apt-get install -y nginx

# Configure Nginx
sudo nano /etc/nginx/sites-available/default
```

**Nginx Config:**
```nginx
upstream erasure {
  server localhost:3000;
}

server {
  listen 80;
  server_name your-domain.com;
  
  location / {
    proxy_pass http://erasure;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection 'upgrade';
    proxy_set_header Host $host;
  }
  
  location /socket.io {
    proxy_pass http://erasure;
    proxy_http_version 1.1;
    proxy_buffering off;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection "Upgrade";
  }
}
```

```bash
# Enable SSL with Let's Encrypt
sudo apt-get install -y certbot python3-certbot-nginx
sudo certbot --nginx -d your-domain.com
```

**Pros:** Full control, scalable, cost-effective
**Cons:** More setup, requires DevOps knowledge
**Cost:** $10-50/month

### Option 3: DigitalOcean App Platform (Best for Hackathons)

```bash
# 1. Push code to GitHub
git push origin main

# 2. Connect GitHub to DigitalOcean
# App Platform → New App → GitHub → erasure repo

# 3. Set environment variables in dashboard
PORT=3000
NODE_ENV=production

# 4. Deploy
# Click "Deploy" button

# Auto-deploys on every push to main
```

**Pros:** Simple deployment, generous free tier, GitHub integration
**Cons:** Vendor lock-in
**Cost:** $0-100/month

### Option 4: Docker + Any Cloud (Most Professional)

```dockerfile
# Dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .

EXPOSE 3000

CMD ["node", "server.js"]
```

```yaml
# docker-compose.yml
version: '3.8'
services:
  erasure:
    build: .
    ports:
      - "3000:3000"
    environment:
      - PORT=3000
      - NODE_ENV=production
    restart: unless-stopped
```

Deploy to: AWS ECS, Google Cloud Run, Azure Container Instances

```bash
# Build image
docker build -t erasure:latest .

# Test locally
docker-compose up

# Push to container registry
docker tag erasure:latest myrepo/erasure:latest
docker push myrepo/erasure:latest
```

---

## Performance Optimization

### Client-Side
```javascript
// index.html
<!-- Preload critical assets -->
<link rel="preload" href="three.min.js" as="script">
<link rel="preload" href="app.js" as="script">

<!-- Defer non-critical scripts -->
<script defer src="analytics.js"></script>

<!-- Enable compression -->
<!-- Server automatically gzips responses >1KB -->
```

### Server-Side
```javascript
// server.js - Add compression
import compression from 'compression';

app.use(compression());

// Enable HTTP caching
app.use((req, res, next) => {
  if (req.path.startsWith('/static')) {
    res.setHeader('Cache-Control', 'public, max-age=31536000');
  }
  next();
});

// Optimize Socket.io
io.engine.wsEngine = 'ws';
io.set('transports', ['websocket', 'polling']);
```

### Database (Firebase)
- Enable offline persistence
- Optimize query paths
- Set up read/write rules (security)

### CDN for Static Assets
```bash
# Use CloudFlare for free CDN
# Point your domain nameservers to CloudFlare
# All static assets cached globally
```

---

## Monitoring & Analytics

### Server Monitoring
```bash
# PM2 Monitor
pm2 web  # Dashboard at localhost:9615

# Or use New Relic
npm install newrelic
# Add to top of server.js:
require('newrelic');
```

### Log Aggregation
```javascript
// server.js - Send logs to cloud
const winston = require('winston');
const CloudWatchTransport = require('winston-cloudwatch');

winston.add(new CloudWatchTransport({
  logGroupName: '/erasure/production',
  logStreamName: 'app'
}));
```

### Real-Time Metrics
```javascript
// Track active readers
io.on('connection', (socket) => {
  console.log(`[${new Date().toISOString()}] Reader connected. Total: ${io.engine.clientsCount}`);
  metrics.recordReaderJoin();
});

socket.on('disconnect', () => {
  metrics.recordReaderLeave();
});
```

---

## Security Checklist

- [ ] HTTPS enabled (Let's Encrypt)
- [ ] Input validation on all routes
- [ ] CORS configured properly
- [ ] Rate limiting enabled
- [ ] SQL injection prevention (if using DB)
- [ ] XSS protection headers set
- [ ] CSRF tokens implemented
- [ ] Environment variables secured
- [ ] Dependencies updated (`npm audit`)
- [ ] No console.log() in production

```javascript
// Secure headers middleware
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

app.use(helmet());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});

app.use('/api/', limiter);
```

---

## Database Setup (Optional - Firebase)

```javascript
// server.js
import admin from 'firebase-admin';

admin.initializeApp({
  credential: admin.credential.cert(require('./serviceAccountKey.json')),
  databaseURL: 'https://your-project.firebaseio.com'
});

const db = admin.database();

// Store fragments
app.post('/api/fragments', (req, res) => {
  const { text, emotions } = req.body;
  db.ref('fragments').push({
    text,
    emotions,
    timestamp: admin.database.ServerValue.TIMESTAMP
  });
  res.json({ success: true });
});

// Retrieve generation stats
app.get('/api/story/generation', async (req, res) => {
  const snap = await db.ref('stats/generation').once('value');
  res.json(snap.val());
});
```

---

## Testing

### Unit Tests
```bash
npm install --save-dev jest

# jest.config.js
module.exports = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js']
};

# Run tests
npm test
```

### Manual Testing Checklist

**Act 1: Arrival**
- [ ] Dark void renders
- [ ] Book appears and pulses
- [ ] Webcam permission modal appears
- [ ] "Begin" button works

**Act 2: Reading**
- [ ] Superposed text appears shimmering
- [ ] Text drifts away from cursor
- [ ] Decay animation happens (10 sec)
- [ ] Emotions detected (if webcam enabled)
- [ ] Style transfer transitions smoothly
- [ ] Particles morph into shapes
- [ ] Music plays (ambient melody)
- [ ] Notifications appear randomly
- [ ] Scroll back shows glitch message

**Act 3: End**
- [ ] Text decays to black
- [ ] End modal appears
- [ ] "Remember" button glows

**Act 4: Upload**
- [ ] Upload consciousness modal appears
- [ ] Character ID generated
- [ ] Export button works
- [ ] 7 artifacts generated (simulate)

### Load Testing
```bash
npm install -g artillery

# artillery.yml
config:
  target: "http://localhost:3000"
  phases:
    - duration: 60
      arrivalRate: 10
      name: "Ramp up"
scenarios:
  - name: "ERASURE Experience"
    flow:
      - get:
          url: "/"
      - think: 5
      - get:
          url: "/api/readers/count"
      - ws:
          url: "ws://localhost:3000/socket.io"

# Run load test
artillery run artillery.yml
```

---

## Scaling Strategy

### Stage 1: Launch (1-100 users)
- Single server on DigitalOcean $12/mo
- No database needed (in-memory state)
- Direct Socket.io broadcasts

### Stage 2: Growth (100-1K users)
- AWS EC2 t3.medium (2 instances) + load balancer
- Firebase Realtime DB for persistence
- Redis adapter for Socket.io sync
- CloudFlare CDN

### Stage 3: Scale (1K-10K users)
- Kubernetes cluster (EKS/GKE)
- Sharded Socket.io (namespace per shard)
- Firebase + secondary DB (MongoDB)
- API Gateway + DDoS protection

### Stage 4: Enterprise (10K+ users)
- Global CDN edge locations
- Multi-region deployment
- Dedicated ML infrastructure (GPT-2 fine-tuning)
- Custom analytics platform

---

## Post-Launch Improvements

### Week 1-2
- [ ] Monitor error logs
- [ ] Gather user feedback
- [ ] Fix critical bugs
- [ ] Optimize performance

### Month 1
- [ ] Add real emotion detection (face-api.js integration)
- [ ] Implement Firebase persistence
- [ ] Add user authentication (optional)
- [ ] Create admin dashboard

### Month 2-3
- [ ] Deploy AI voice narration (ElevenLabs)
- [ ] Implement cloud GPU (Replicate) for style transfer
- [ ] Add NFT consciousness minting (optional)
- [ ] Launch mobile app version

---

## Troubleshooting Deployment

**WebSocket Connection Failed**
```
Cause: Nginx not configured for WebSocket
Fix: Add proxy_upgrade headers in Nginx config
```

**High Memory Usage**
```
Cause: Socket.io connections not cleaning up
Fix: Add connection timeout: io.set('disconnect delay', 30000)
```

**CORS Errors**
```javascript
// server.js
io.on('connection', (socket) => {
  socket.handshake.headers.origin; // Check origin
});

app.use(cors({
  origin: ['https://erasure.io', 'https://www.erasure.io'],
  credentials: true
}));
```

**Particles Not Rendering**
```
Cause: WebGL not supported or disabled
Fix: Detect WebGL: WebGL 2.0 context missing
    Fallback to canvas-based rendering
```

---

## Environment Variables

```bash
# .env.production
PORT=3000
NODE_ENV=production
FIREBASE_API_KEY=xxx
FIREBASE_PROJECT_ID=xxx
SOCKET_IO_MAX_CLIENTS=10000
COMPRESSION_LEVEL=9
LOG_LEVEL=info
ENABLE_ANALYTICS=true
```

---

## Disaster Recovery

**Backup Firebase Data**
```bash
firebase database:get / > backup.json

# Restore
firebase database:set / backup.json
```

**Database Replication**
```javascript
// Set up read replicas in different regions
// Ensures data availability if primary region fails
```

**Zero-Downtime Deployment**
```bash
# Blue-green deployment
# Deploy new version to new server
# Once verified, switch traffic via load balancer
# Old server stays running until timeout
```

---

**ERASURE is ready for launch. Good luck at the hackathon! 🌀**
