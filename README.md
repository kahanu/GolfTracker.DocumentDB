# GolfTracker.DocumentDB
A sample application that uses AngularJS for the front-end client and Windows Azure DocumentDB in a WebApi 2 service as the RESTful backend.
I will be creating an article and possibly some videos describing how it works and why I chose to design the infrastructure this way.

For videos and articles on this project visit: [NoSql Central](http://www.nosqlcentral.net/Story/Search/videos)

##Important!##
It's important to open the project in Visual Studio 2013, Community (2015) or later **as Administrator!**  The WebApi project is currently set to create an IIS 8.x website, not IIS Express.  In order for Visual Studio to do it for you, you must run VS as Administrator.

## New GolfTracker - Angular 2 - 7/1/2016
This application is a port of the Angular 1/Azure DocumentDB application.  It is written using Angular 2 (RC 4) and currently can point to Azure DocumentDB or MongoDB endpoints.  Just add the Urls to these data stores.

This application focuses more on the implementation of Angular 2 than the NoSql data store.  It provides a good reference application to jump-start your Angular 2 project.

As of 7/22/2016 everything works, except there is no authentication/authorization provider written.  That is currently in the works.  Check back for updates.

Instructions and Setup can be found [here](https://github.com/kahanu/GolfTracker.DocumentDB/tree/master/GolfTracker.Angular2).

I hope this helps.

King Wilder