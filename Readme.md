# Client Setup        
**npm install**       
- Add Routing : **react-router-dom**     
- Add Youtube Videos : **react-youtube**     
- Generate Unique Hexadecimal id for Courses : **uniqid**     
- Add Richtext Editor for Course Description : **quill**     
- Convert video duration in hours-minutes-seconds : **humanize-duration**     
- Design Progress-bar : **rc-progress**     
- Add Routing **react-simple-star-rating**  

# Tailwind Setup      
- npm install tailwindcss @tailwindcss/vite

# Install Form    
- npm install @clerk/clerk-react

# ReUse After Cloning     
- npm install react-router-dom react-youtube uniqid quill humanize-duration rc-progress react-simple-star-rating      
- npm install    
- npm run dev
   
# For Push to the repository       
- git clone https://github.com/i-am-surovi/KnowSy-CSE470-Group-Project.git      
- cd KnowSy-CSE470-Group-Project

### First Create a Brunch 
- git checkout -b feature-name

### Then after working on codes     
- git add .      
- git commit -m "done something"      
- git fetch origin    
- git rebase origin/main       
- git push origin feature-name

### In-case of update any branch code  
- git checkout feature/feature-name       
- git add .         
- git commit -m "Updated something in the feature successfully"      
- git push origin feature/feature-name

# After Other's Update use this command       
- git fetch origin       
- git checkout main      
- git pull origin main

# After Merging code      
- git add .      
- git commit -m "done something"        
- git pull --rebase origin main      
- git push origin main

# In Case of facing problem       
- git remote -v    
- git fetch origin      
- git checkout main     
- git reset --hard origin/main
       