#parseQueue

You will build a queue app similar to the one we use during class. We'll use a Parse backend.

## Resources

* [Parse API Documentation](https://www.parse.com/docs/rest)

CRUD operations in Parse: 

#### POST: [https://parse.com/docs/rest#objects-creating](https://parse.com/docs/rest#objects-creating)
#### GET: [https://parse.com/docs/rest#objects-retrieving](https://parse.com/docs/rest#objects-retrieving)
#### PUT: [https://parse.com/docs/rest#objects-updating](https://parse.com/docs/rest#objects-updating)
#### DELETE: [https://parse.com/docs/rest#objects-deleting](https://parse.com/docs/rest#objects-deleting)

*Review of angular promises used in services:*
- A Deferred variable for your promises
- An $http request:
    - The *method* of the request
    - The data object you're passing in (if applicable)
    - the URL of the request
- Resolve/reject the promise based on the $http response
- Return the promise object

## Prep

Go ahead and sign up for an account at Parse: http://parse.com

Then once logged into Parse, create a new app. After the app is created you will be shown your API keys. Don't leave that page until you have set up your keys. 

Throughout this project, don't hesitate to check out the [Parse API documentation](https://www.parse.com/docs/rest). Being able to get answers from someone's documentation is an important skill. 

We'll create a file in your js folder called 'defaultHeaders.js'. This will allow us to inject Parse-specific headers into our Angular app.

````javascript
var app = angular.module('parseQ');

app.factory('httpRequestInterceptor', function () {
	return {
		request: function (config) {
			config.headers = {'X-Parse-Application-Id': 'INSERT-YOUR-APPLICATION-ID', 'X-Parse-REST-API-Key': 'INSERT-YOUR-REST-API-KEY'};
			return config;
		}
	};
});
````


Parse is a great RESTful API. We'll use it to make 4 HTTP requests with AgularJS:

* GET - retrieve data
* POST - create data
* PUT - edit data
* DELETE - delete data

## Step 1 - Set Up Application

The first thing we need to do is create and link all of our files. The AngularJS CDN is already loaded into the app, no need to look for outside code.

* Create MainController.js in the controllers folder and link it in the index
* Create parseService.js in the *services* folder and link it in the index
* Link the main.css file in the index
* Link the app.js file in the index

We next want to ensure angular is working correctly, first connect your view and controller: 

* Create your angular module and palce it in all of your JavaScript files. remember: var app = angular.module('parseQ', [])
* Place the ng-app into your index
* Create your MainController and place it in your index using ng-controller

Then, create a test:

* In your MainController create a $scope.test object and give it a value.
* Call the $scope.test object in view to ensure it's pulling the value from the controller.

## Step 2 - Creating Questions

We will begin by making it possible to create questions, primarily because this is the most important feature of our queue. 

Let's start with our service as it will be where our data begins and ends. 

* Go to your parse service and create a POST method, that takes in a question as a parameter. *Don't hesitate to refer to past apps you've built as a reference.*

After creating our POST request, we need to head over to the controller so that our users can create data on their own from the view.

* In the controller create a `postData` function. This function will take in our question from the view and pass it into the service.

Now that our service is opening a connection from our app to Parse, and our controller is ready to take data in from the view and pass it to the service, we need to get our view set up.

In the index file we need:

- An input field that takes in the actual question (ng-model)
- A button that submits our question into postData function in our controller (ng-click)

Once everything is in place, we should be able to ask a question from our browser and then see that question in our Parse dashboard.

## Step 3 - Retrieving Questions

Once we are able to save our questions to our Parse database we will want to retrieve those questions so that we can see them in our view!

Let's start:

- Create a getData function in your service
- Then create a getParseData function in your controller, which will import the getData function from your service

The getParseData will be an important function through our app. We will need to call it everytime we do anything else. This ensures that everytime our app changes we see those changes.

Add the getParseData function to our postData function within our controller, so that as we add a new question it calls the data.

Now at the bottom of our getParseData function let's add a console.log that will show us the data it retrieves.

If we enter a question we should see an array of objects in our console.

Now you can show your in your view:

- ng-repeat through the array showing the 'text' of each question
- Make sure that now when you add a new question it shows up instantly in the list of questions.

If everything is working it's time to move into editing our questions!

## Step 4 - Editing Questions

Once we have a list of students asking questions in the queue, we need to be able to escalate those questions to show which ones are being handled.

We should have created our postData function in our service that takes in a question. In the data section of that $http request, we said: data: {text: question}. Now we want to add another key-value pair to the questions so that they have not only a text attribute, but also a status attribute.

Let's do that by just creating a default status of 'red'. We will say new questions have the status of 'red', while questions that are 'being helped' will have a status of 'yellow'.

This will make it easy for our filters to know where to show new and old questions.

Now that each question will have a default status of 'red', we need to make a way to change that status.

- Create a updateData function in our service. It will be similar to the postData however this time we will be using 'PUT'
- To updated an object you will need to target it by the objects Id, passing it in as a url parameter.
- Create a changeStatus function in the controller that takes in the updateData function from the service.
- In your index create a button within your ng-repeat that runs the changeStatus function. This button should change the questions status from 'red' to 'yellow'
- Add a filter to the original ng-repeat so that it only shows objects with the status of red
- Create a new ng-repeat that filters out only the objects with the status of yellow

Now we should be able to create a new question, watch it show up in the new question list, then move it to the 'being helped' or yellow list.

## Step 5 - Delete Questions

Once we have answered someones question, we want to remove it from the list. We could easily do this by changing the status from yellow to something other than red and yellow. Then it wouldn't show up on any of the ng-repeats, but instead we are actually going to delete our questions from Parse.

- Create a function on our service called deteleData. This function is similar to our get data function, but it targets a single object via it's objectID and uses the delete method.
- Then create a function in the controller that pulls the detele function from the service.
- Then in the ng-repeat that shows yellow questions create a button that calls the delete function from the controller.

Now we should be able to delete our questions once they have been answered!

Wowee!
