SignSavvy 
===========================
Real-Time Translation of ASL

### Startup Guide
This is based off of [React Native's Expo Go Quickstart Tutorial](https://reactnative.dev/docs/environment-setup)
[Somewhat outdated video reference](https://www.youtube.com/watch?v=YysKbNk1tj0&t=370s) that I used - Note that your setup will be slightly different because you'll be pulling from git 

### Initial Bootstrapping 
* Open Mac Terminal
* Install node.js for Mac [here](https://nodejs.org/en/download)
* Open terminal - Move to desired root directory location (where you want the project to live)

### Dealing with Git
Run ```git clone https://github.com/sastec17/signsavvy.git ``` - Make sure you accept my repo invite ahead of time!
[More]([url](https://docs.github.com/en/repositories/creating-and-managing-repositories/cloning-a-repository)https://docs.github.com/en/repositories/creating-and-managing-repositories/cloning-a-repository) about cloning repos if this doesn't work

Open project in VSCode 
* Add Babel Javascript Extension
* Add React Native Tools Extension

Run ```git remote -v ``` in integrated terminal

Verify that it looks something like this:
```
origin	https://github.com/sastec17/signsavvy.git (fetch)
origin	https://github.com/sastec17/signsavvy.git (push)
```

### Get Expo Working 
* Install Expo Go onto your iPhone
* Run ```sudo npm install``` -  You may need to enter your computer's login password. This will setup initial dependencies for this project
* Run ```npx expo start```

At this point, a QR code should pop up. Scan it with your phone. 
This should open your expo go app and you'll be able to view any changes you make! 

Rememeber to make and push changes via git branch! We can merge into main via PR as we progress. 
