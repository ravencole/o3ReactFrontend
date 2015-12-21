# React Express CRUD

##### Structure ---

Originally this was two repos (API in one, frontend in the other). I merged them because the deployment was intimidating me (never deployed a node app before this), but it was mostly super simple to set up and they could have easily stayed seperate. Really the only trouble with the deploy was some of the libraries I'm pulling in require a specific verison of Node, which is an easy fix, but was initially difficult to diagnose. 

###### Frontend - 
Frontend stack is React and Webpack. React has optional ES6 class syntax for its components, which is implemented in the app, but the classes are not auto bound so you end up with some ugly, overly-verbose seeming class constructors. Supposedly future releases of React will have auto-binding for classes. Other than that, the React portion of the app is business as usual. Webpack is used for bundling and hosting a small dev-server, which hot loads React components so no browser refresh is necessary to see changes, but more importantly you don't lose application state when the component re-rendered. Its magical enough that you can almost forget about the absolute head-ache that comes with getting Webpack configured correctly. 

###### Backend - 
Backend stack is Express, MongoDB, and several node libraries (JsonWebTokens, bcrypt, Mongoose, Chai, ect). Its a super typical API. All the routes are behind the Auth, with the exception of the signin route and an initial getter route that sets up the page. It mostly adheres to typical REST standards. 

##### API ---

The API is a pretty typical Express app. It uses the Mongoose ORM, bcrypt for password hashing, and JsonWebTokens for auth. There are two public routes: a login route, and a route that returns all the data to populate the Table. Everything else is behind the Auth. The Authentication works by just returning a JsonWebToken if the correct username and pass are entered, and the front-end has to send that token back as a header or in the body of the request if they want to see content behind the middleware. Beyond the middleware, there is a typical RESTish CRUD implementation. The Material and Siding routes are identical, other than the extra route that the Material module has for toggling the siding styles. 

The routes they have in common are: 

```javascript
post('/api/siding')... // new siding
delete('/api/siding/:id')... // delete siding
// material route mirrors the two above and also has
get('/api/material/:id') // which is used to toggle the styles associated with a particular material.
```
The toggle route is the only one that isn't completely normal REST business. The client supplies the ID of the Material and Siding that is to be toggled, seperated by a ':'. For example:
```javascript
let id = '876asdjfhkldsf7adf:dss6df8i374ryfd';
$.ajax({
        type: 'GET',
        url: `http://localhost:8080/api/material/${id}`,
        data: {token: localStorage.getItem('token')}
    }).fail(function(err) {
        console.error(err);
    }).done(function() {
        this.updateMaterials();
    }.bind(this));
```
The API will split the ID param into two variables: the former is the Material ID, the latter the Siding ID. The route callback confirms that both IDs exist in the database, then checks to see if the Siding ID is already attached to the Material. If it is, remove it. If it isn't, add it.

I spent a bunch of time trying to get Mongo to do normal Relational database patterns (many-to-many was exactly what I wanted). I ended up implementing a schema for the Material collection that works similarly to a many-to-many relationship, but it was before I had really dug into the project and worked with Mongo. I ended up running with it, but I've realized some less verbose ways of keeping the Materials and Sidings linked. 

The API has some endpoint testing, but I hit a wall when I started to try and mock the database so that the thing could really be tested well. It didn't seem like something to get hung up on, but it is something I care about learning ASAP. 

Other than that, Express and Mongo have been a blast. And not surprisingly the backend is super fast compared to the one I had going in Laravel.

##### Frontend ---
The front-end build process is all Webpack. It runs all the code through Babel and does some minification when the app goes into production mode. Webpack feels like a really incredible piece of development technology, but at the same time feels fickle and difficult when an error occurs. Docs are a little sparse, and there are a few places where you have to write redundant config settings that make the thing feel young. But once its going, its hard to imagine a better tool for developing with React, mostly due to the hot loader. You can get something similar with gulp, but the react-hot-loader for Webpack replaces and updates components inline without refreshing the page. This sounds similar to what other loaders do, but react-hot-loader does all of this without breaking the state of the current application, which honest to goodness seems like wizard tricks. 

This app doesn't leverage any kind of real Flux architecture, but it does utilize some of its main principles. There is only one stateful component in the application, App. That's also the only component that makes Ajax calls, handles events, or updates state. Everything else uses props that trickle down and sends events that bubble up. This means that we could make the rest of our components stateless functions, but on an app this size the performance gain isn't worth dealing with the React functional component syntax, which I don't love. Over-all, the thing is pretty modular. There is one really beefy component, the Table component, that could use some splitting into separate files. The only problem is that the sub components that it would be split into would sometimes have to return no jsx objects, such as if there are no materials in the database, which would cause the app to blow up. Where as if they aren't their own component, they can return nothing as long as they like. There is likely a work-around for this, but it isn't a big enough issue to worry about on this app. 

Again we have normal CRUD stuff on the front-end. The only interesting/could-use-a-decent-refactor thing is the way that the material and siding IDs are kept up with in the table. The table is populated by mapping over all of the Material documents in the database, and then checking what Sidings are associated with them. There is a map function inside a map function that is fine for this, but likely would be very cumbersome at scale. I've paired down the following snippet and added some psuedo-code:
```javascript
let renderMaterials = this.props.materials.sort((a, b) => a._id - b._id).map((material, index) => {
    // make an array of the styles associated with the material. There really isn't any reason
    // why this can't just come in as a flat array of IDs, rather than an array of objects as expressed in the Material schema,
    // but I realized that late in the game after I'd spent some time trying to make Mongo act like a 
    // relational database.
    let materialStyles =[];
    material.styles.map((style) => {
        materialStyles.push(style.id);
    });
    let sidingStyles = this.props.sidings.map((siding) => {
        if (materialStyles.indexOf(siding._id) >= 0) 
            return <td id={`${material._id}:${siding._id}`}> CHECKMARK </td>
        return <td id={`${material._id}:${siding._id}`}> NO CHECKMARK </td>
    });
});
```
I'm not really even too worried about this, but what I am worried about is the way the ID attribute is being used. Right now the ID attribute is formatted so that when this is sent to the App component to be submitted to the API, no formatting has to be done. Which is great! And because of the IDs are coming from the database, we won't ever have a repeated ID attribute. Also, great. What isn't great is that this isn't what ID attributes should be used for. I would love to cast this info into a less impactful attribute such as value or just a custom one, but that doesn't work in React for two reasons: 

1. React doesn't support custom HTML attributes. Try it and you've got hateful errors coming your way.

2. Because of the way React Synthetic Events work, you have a weird kind of access to the node that is emmiting the event. The event doesn't send all of the HTML attributes associated with the DOMNode, but it sends a few and one of them is the ID.

We could store the ID string in the value attribute, but if we do we have to reference the node by reaching into the DOM. Which React has utilities for, so great? Yes, but then we fire a DOM query after the user is already waiting for the page to update. After the other ways I've put performance concerns a little on the backend in this app, this might seem like a strange gripe. I guess I'm willing to let this slide becuase I don't want to touch the DOM when using React, and because I'm sure there's a better way to keep track of the IDs that I haven't found yet, which makes this implementation good for now. 

##### Bugs ---
There are only two bugs that I know about, but they are only kind of bugs. 

1. The click events in the settings panel are a little particular about how they are clicked. They never outright don't work, but they sometimes need a little jostling. This is because the "X" that represents the 'destoy this material or siding' button is made up of three divs. One is the container, and the other two are the structor of the "X". The click event fires on the container, but the "X" is above it so that will sometimes get in the way. I'm not sure how to deal with the problem outside of just using a PNG as the "X" and making that the click event. I've tried doubling up the clickevent on the container and on the divs above, but sometimes that emmits two events which is a worse problem. Its a bummer but seemed like something that could wait for the 1.0.1 release. 

2. This is one that really does feel bad that I don't even have a hacky solution to. The login in dialog box won't submit unless the user actually clicks the submit button. It will pretend to submit if the user is focused on one of the inputs and presses enter, but what actually happens is the form data just stays in the dialog box and the state resets like the login creditentials were accepted. Its werid because I can't locate where the event is firing from when this happens, and its stranger again because everything that is entered into the input fields isn't needed at the firing of the event, because its already in the application state! The only thing we actually use the emmited event for is preventing the default submit action. This is a tried and true React pattern that I've used successfully many times, so I imagine the issue is glaring and embarassing and I just don't know better. But lets hope that isn't the case.

That should be all the dirty laundry. Or at least we can hope, right?!

















