React and Express CRUD

The project was two seperate repos, but at the last minute I added the API folder to the front end hoping it would make deployment easier. It did, but having done it now it would be super simple to keep them seperate. 

The front-end runs on its own server and just Ajaxes to the backend whenever it needs something.

The backend is Express and Mongo. Auth is JsonWebTokens and Bcrypt. 

BUGS 

The login dialog box doesn't submit if you don't click the submit button (ie if you type in your email and password, then press enter). I think its an issue with the way React does onSubmit events. Next solution I'm going to try is to remove the submit button, which is an HTML button type="submit", and replace it with a div that has an onClick event. Found the bug during after deploy.

The Click events in the setting pane are kind of particular about how they are clicked. This should be an easy fix, but I put it on the back burner because i wanted to get the thing deployed. 

TESTS

The API has end-point testing, and the front-end hasn't been tested at all. I need to dive into the React testing addons and do component testing. This feels like the right scale of project to start on. 

The API needs the database to be mocked before it can have decent code coverage. 
