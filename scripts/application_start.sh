cd /home/ec2-user/teamup-app

# Stop the PM2 process
# pm2 stop nextjs-app
#
# # Pull the latest changes from your repository
# git checkout deploy
# git pull origin deploy
#
# # Install any new dependencies
npm i
#
# # Build the Next.js application
npm run build
#
# # Restart the Next.js application with PM2
pm2 restart theo
#