# NTS Workout App

At its very simplest the main goal of project NTS is to provide a website and/or app that will help people track their workout routine. Ease of use is the theme of the project. It is our hope that the ease and accessibility of the project will aid in the promotion of self accountability and motivation by taking out the job of manually tracking your routine with excel or a similar tool.

## Deployed on AWS:

http://navy-titanium-santiago.s3-website-us-east-1.amazonaws.com/

## Development Blog:

https://medium.com/navytitaniumsantiago

## Features:

### Navigation:

![Image of the navigation in action](/ReadMeImages/navigation.gif)
* Fully functional navigation
* Mimics browser history with React State

### Editable Routine:

![Edit by dragging showcase](/ReadMeImages/dragging.gif)
* Edit routine by dragging any of the elements.
* The items drag and drop exactly where you intend them to

![Shortcuts showcase](/ReadMeImages/copydelete.gif)
* Delete or Duplicate any item by using keyboard shortcuts

## The Stack:

* FrontEnd:
  * React
  * React-Context
  * Typescript
  * Bootstrap

* Testing:
  * Jest
  * Enzyme
  * React-Testing-Library

* Deployment on AWS
  * AWS Code Pipeline for Production
  * AWS Cognito for identity management
  * AWS Lambda for backend needs
  * AWS S3 for hosting
  
* Tools:
  * Python generated apps to generate testing data(located one repository up)




