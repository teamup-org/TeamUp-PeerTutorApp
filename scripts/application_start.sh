#!/bin/bash

cd /home/ec2-user/teamup-app/frontend

# # Install dependencies (if needed)
sudo npm i
#
# # Build the Next.js application
sudo npm run build
#
# # Start the Next.js application with PM2
sudo pm2 delete all

sudo pm2 start npm --name "theo" -- start
#