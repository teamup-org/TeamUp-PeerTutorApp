cd /home/ec2-user/teamup-app/frontend

# # Install dependencies (if needed)
npm i
#
# # Build the Next.js application
npm run build
#
# # Start the Next.js application with PM2
pm2 start npm --name "theo" -- start
#