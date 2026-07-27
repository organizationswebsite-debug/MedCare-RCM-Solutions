# MedCare RCM Solutions — Next.js 14 Website

## Setup
1. npm install
2. Add your Gmail credentials to .env.local
3. npm run dev

## Gmail App Password Setup
1. Google Account → Security → 2-Step Verification (enable)
2. Search "App passwords" → Generate for "MedCare RCM"
3. Paste 16-digit code into GMAIL_PASS in .env.local

## Deploy to Hostinger
1. npm run build
2. Upload: .next/ + public/ + package.json + next.config.js + .env.local
3. Hostinger: Select Node.js hosting, set start command to: npm start

## After Going Live
1. Go to search.google.com/search-console
2. Add your domain → verify
3. Submit sitemap: https://yourdomain.com/sitemap.xml
4. Create Google Business Profile: business.google.com
