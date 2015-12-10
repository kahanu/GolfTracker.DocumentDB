
# GolfTracker.WebApi

Creates the kernel that will manage your application.


#### Returns

The created kernel.

Load your modules or register your services here!

| Name | Description |
| ---- | ----------- |
| kernel | *Ninject.IKernel*<br>The kernel. |
Starts the application

Stops the application.

Generates an URI-friendly ID for the . E.g. "Get-Values-id_name" instead of "GetValues/{id}?name={name}"

| Name | Description |
| ---- | ----------- |
| description | *System.Web.Http.Description.ApiDescription*<br>The . |


#### Returns

The ID as a string.


## Areas.HelpPage.Controllers.HelpController

The controller that will handle requests for the help page.


## Areas.HelpPage.HelpPageConfig

Use this class to customize the Help Page. For example you can set a custom to supply the documentation or you can provide the samples for the requests/responses.

Gets the model that represents an API displayed on the help page. The model is initialized on the first call and cached for subsequent calls.

| Name | Description |
| ---- | ----------- |
| config | *System.Web.Http.HttpConfiguration*<br>The . |
| apiDescriptionId | *System.String*<br>The ID. |


#### Returns

 An 

Gets the help page sample generator.

| Name | Description |
| ---- | ----------- |
| config | *System.Web.Http.HttpConfiguration*<br>The . |


#### Returns

The help page sample generator.

Gets the model description generator.

| Name | Description |
| ---- | ----------- |
| config | *System.Web.Http.HttpConfiguration*<br>The configuration. |


#### Returns

The 

Specifies the actual type of passed to the in an action. The help page will use this information to produce more accurate request samples.

| Name | Description |
| ---- | ----------- |
| config | *System.Web.Http.HttpConfiguration*<br>The . |
| type | *System.Type*<br>The type. |
| controllerName | *System.String*<br>Name of the controller. |
| actionName | *System.String*<br>Name of the action. |
Specifies the actual type of passed to the in an action. The help page will use this information to produce more accurate request samples.

| Name | Description |
| ---- | ----------- |
| config | *System.Web.Http.HttpConfiguration*<br>The . |
| type | *System.Type*<br>The type. |
| controllerName | *System.String*<br>Name of the controller. |
| actionName | *System.String*<br>Name of the action. |
| parameterNames | *System.String[]*<br>The parameter names. |
Specifies the actual type of returned as part of the in an action. The help page will use this information to produce more accurate response samples.

| Name | Description |
| ---- | ----------- |
| config | *System.Web.Http.HttpConfiguration*<br>The . |
| type | *System.Type*<br>The type. |
| controllerName | *System.String*<br>Name of the controller. |
| actionName | *System.String*<br>Name of the action. |
Specifies the actual type of returned as part of the in an action. The help page will use this information to produce more accurate response samples.

| Name | Description |
| ---- | ----------- |
| config | *System.Web.Http.HttpConfiguration*<br>The . |
| type | *System.Type*<br>The type. |
| controllerName | *System.String*<br>Name of the controller. |
| actionName | *System.String*<br>Name of the action. |
| parameterNames | *System.String[]*<br>The parameter names. |
Sets the documentation provider for help page.

| Name | Description |
| ---- | ----------- |
| config | *System.Web.Http.HttpConfiguration*<br>The . |
| documentationProvider | *System.Web.Http.Description.IDocumentationProvider*<br>The documentation provider. |
Sets the help page sample generator.

| Name | Description |
| ---- | ----------- |
| config | *System.Web.Http.HttpConfiguration*<br>The . |
| sampleGenerator | *GolfTracker.WebApi.Areas.HelpPage.HelpPageSampleGenerator*<br>The help page sample generator. |
Sets the sample directly for all actions with the specified media type.

| Name | Description |
| ---- | ----------- |
| config | *System.Web.Http.HttpConfiguration*<br>The . |
| sample | *System.Object*<br>The sample. |
| mediaType | *System.Net.Http.Headers.MediaTypeHeaderValue*<br>The media type. |
Sets the sample directly for all actions with the specified type and media type.

| Name | Description |
| ---- | ----------- |
| config | *System.Web.Http.HttpConfiguration*<br>The . |
| sample | *System.Object*<br>The sample. |
| mediaType | *System.Net.Http.Headers.MediaTypeHeaderValue*<br>The media type. |
| type | *System.Type*<br>The parameter type or return type of an action. |
Sets the objects that will be used by the formatters to produce sample requests/responses.

| Name | Description |
| ---- | ----------- |
| config | *System.Web.Http.HttpConfiguration*<br>The . |
| sampleObjects | *Unknown type*<br>The sample objects. |
Sets the sample request directly for the specified media type and action.

| Name | Description |
| ---- | ----------- |
| config | *System.Web.Http.HttpConfiguration*<br>The . |
| sample | *System.Object*<br>The sample request. |
| mediaType | *System.Net.Http.Headers.MediaTypeHeaderValue*<br>The media type. |
| controllerName | *System.String*<br>Name of the controller. |
| actionName | *System.String*<br>Name of the action. |
Sets the sample request directly for the specified media type and action with parameters.

| Name | Description |
| ---- | ----------- |
| config | *System.Web.Http.HttpConfiguration*<br>The . |
| sample | *System.Object*<br>The sample request. |
| mediaType | *System.Net.Http.Headers.MediaTypeHeaderValue*<br>The media type. |
| controllerName | *System.String*<br>Name of the controller. |
| actionName | *System.String*<br>Name of the action. |
| parameterNames | *System.String[]*<br>The parameter names. |
Sets the sample request directly for the specified media type of the action.

| Name | Description |
| ---- | ----------- |
| config | *System.Web.Http.HttpConfiguration*<br>The . |
| sample | *System.Object*<br>The sample response. |
| mediaType | *System.Net.Http.Headers.MediaTypeHeaderValue*<br>The media type. |
| controllerName | *System.String*<br>Name of the controller. |
| actionName | *System.String*<br>Name of the action. |
Sets the sample response directly for the specified media type of the action with specific parameters.

| Name | Description |
| ---- | ----------- |
| config | *System.Web.Http.HttpConfiguration*<br>The . |
| sample | *System.Object*<br>The sample response. |
| mediaType | *System.Net.Http.Headers.MediaTypeHeaderValue*<br>The media type. |
| controllerName | *System.String*<br>Name of the controller. |
| actionName | *System.String*<br>Name of the action. |
| parameterNames | *System.String[]*<br>The parameter names. |

## Areas.HelpPage.HelpPageSampleGenerator

This class will generate the samples for the help page.

Initializes a new instance of the class.

Gets the objects that are used directly as samples for certain actions.

Gets CLR types that are used as the content of or .

Search for samples that are provided directly through .

| Name | Description |
| ---- | ----------- |
| controllerName | *System.String*<br>Name of the controller. |
| actionName | *System.String*<br>Name of the action. |
| parameterNames | *System.Collections.Generic.IEnumerable{System.String}*<br>The parameter names. |
| type | *System.Type*<br>The CLR type. |
| formatter | *System.Net.Http.Formatting.MediaTypeFormatter*<br>The formatter. |
| mediaType | *System.Net.Http.Headers.MediaTypeHeaderValue*<br>The media type. |
| sampleDirection | *GolfTracker.WebApi.Areas.HelpPage.SampleDirection*<br>The value indicating whether the sample is for a request or for a response. |


#### Returns

The sample that matches the parameters.

Gets the request or response body samples.

| Name | Description |
| ---- | ----------- |
| api | *System.Web.Http.Description.ApiDescription*<br>The . |
| sampleDirection | *GolfTracker.WebApi.Areas.HelpPage.SampleDirection*<br>The value indicating whether the sample is for a request or for a response. |


#### Returns

The samples keyed by media type.

Gets the sample object that will be serialized by the formatters. First, it will look at the . If no sample object is found, it will try to create one using (which wraps an ) and other factories in .

| Name | Description |
| ---- | ----------- |
| type | *System.Type*<br>The type. |


#### Returns

The sample object.

Gets the request body samples for a given .

| Name | Description |
| ---- | ----------- |
| api | *System.Web.Http.Description.ApiDescription*<br>The . |


#### Returns

The samples keyed by media type.

Gets the response body samples for a given .

| Name | Description |
| ---- | ----------- |
| api | *System.Web.Http.Description.ApiDescription*<br>The . |


#### Returns

The samples keyed by media type.

Resolves the actual type of passed to the in an action.

| Name | Description |
| ---- | ----------- |
| api | *System.Web.Http.Description.ApiDescription*<br>The . |


#### Returns

The type.

Resolves the type of the action parameter or return value when or is used.

| Name | Description |
| ---- | ----------- |
| api | *System.Web.Http.Description.ApiDescription*<br>The . |
| controllerName | *System.String*<br>Name of the controller. |
| actionName | *System.String*<br>Name of the action. |
| parameterNames | *System.Collections.Generic.IEnumerable{System.String}*<br>The parameter names. |
| sampleDirection | *GolfTracker.WebApi.Areas.HelpPage.SampleDirection*<br>The value indicating whether the sample is for a request or a response. |
| formatters | *System.Collections.ObjectModel.Collection{System.Net.Http.Formatting.MediaTypeFormatter}@*<br>The formatters. |
Gets factories for the objects that the supported formatters will serialize as samples. Processed in order, stopping when the factory successfully returns a non- object.


#### Remarks

 Collection includes just initially. Use SampleObjectFactories.Insert(0, func) to provide an override and SampleObjectFactories.Add(func) to provide a fallback.

Gets the objects that are serialized as samples by the supported formatters.

Writes the sample object using formatter.

| Name | Description |
| ---- | ----------- |
| formatter | *System.Net.Http.Formatting.MediaTypeFormatter*<br>The formatter. |
| value | *System.Object*<br>The value. |
| type | *System.Type*<br>The type. |
| mediaType | *System.Net.Http.Headers.MediaTypeHeaderValue*<br>Type of the media. |


#### Returns




## Areas.HelpPage.HelpPageSampleKey

This is used to identify the place where the sample should be applied.

Creates a new based on , controller name, action name and parameter names.

| Name | Description |
| ---- | ----------- |
| sampleDirection | *GolfTracker.WebApi.Areas.HelpPage.SampleDirection*<br>The . |
| controllerName | *System.String*<br>Name of the controller. |
| actionName | *System.String*<br>Name of the action. |
| parameterNames | *System.Collections.Generic.IEnumerable{System.String}*<br>The parameter names. |
Creates a new based on media type.

| Name | Description |
| ---- | ----------- |
| mediaType | *System.Net.Http.Headers.MediaTypeHeaderValue*<br>The media type. |
Creates a new based on media type, , controller name, action name and parameter names.

| Name | Description |
| ---- | ----------- |
| mediaType | *System.Net.Http.Headers.MediaTypeHeaderValue*<br>The media type. |
| sampleDirection | *GolfTracker.WebApi.Areas.HelpPage.SampleDirection*<br>The . |
| controllerName | *System.String*<br>Name of the controller. |
| actionName | *System.String*<br>Name of the action. |
| parameterNames | *System.Collections.Generic.IEnumerable{System.String}*<br>The parameter names. |
Creates a new based on media type and CLR type.

| Name | Description |
| ---- | ----------- |
| mediaType | *System.Net.Http.Headers.MediaTypeHeaderValue*<br>The media type. |
| type | *System.Type*<br>The CLR type. |
Gets the name of the action.

Gets the name of the controller.

Gets the media type.

Gets the parameter names.

Gets the .


## Areas.HelpPage.ImageSample

This represents an image sample on the help page. There's a display template named ImageSample associated with this class.

Initializes a new instance of the class.

| Name | Description |
| ---- | ----------- |
| src | *System.String*<br>The URL of an image. |

## Areas.HelpPage.InvalidSample

This represents an invalid sample on the help page. There's a display template named InvalidSample associated with this class.


## Areas.HelpPage.ModelDescriptions.ModelDescription

Describes a type model.


## Areas.HelpPage.ModelDescriptions.ModelDescriptionGenerator

Generates model descriptions for given types.


## Areas.HelpPage.ModelDescriptions.ModelNameAttribute

Use this attribute to change the name of the generated for a type.


## Areas.HelpPage.Models.HelpPageApiModel

The model that represents an API displayed on the help page.

Initializes a new instance of the class.

Gets or sets the that describes the API.

Gets the error messages associated with this model.

Gets the request body parameter descriptions.

Gets or sets the documentation for the request.

Gets or sets the that describes the request body.

Gets or sets the that describes the resource.

Gets the resource property descriptions.

Gets the sample requests associated with the API.

Gets the sample responses associated with the API.

Gets or sets the collection that describes the URI parameters for the API.


## Areas.HelpPage.ObjectGenerator

This class will create an object of a given type and populate it with sample data.

Generates an object for a given type. The type needs to be public, have a public default constructor and settable public properties/fields. Currently it supports the following types: Simple types: , , , , , etc. Complex types: POCO types. Nullables: . Arrays: arrays of simple types or complex types. Key value pairs: Tuples: , , etc Dictionaries: or anything deriving from . Collections: , , , , , or anything deriving from or . Queryables: , .

| Name | Description |
| ---- | ----------- |
| type | *System.Type*<br>The type. |


#### Returns

An object of the given type.


## Areas.HelpPage.SampleDirection

Indicates whether the sample is used for request or response


## Areas.HelpPage.TextSample

This represents a preformatted text sample on the help page. There's a display template named TextSample associated with this class.


## Areas.HelpPage.XmlDocumentationProvider

A custom that reads the API documentation from an XML documentation file.

Initializes a new instance of the class.

| Name | Description |
| ---- | ----------- |
| documentPath | *System.String*<br>The physical path to XML document. |
This confirms the registration code for the new user.

| Name | Description |
| ---- | ----------- |
| userId | *System.String*<br>The UserId for the registering user. |
| code | *System.String*<br>The code used to validate the registration. |


#### Returns



Takes the email address which will send an email to the user with a link to the ResetPassword form.

| Name | Description |
| ---- | ----------- |
| model | *GolfTracker.WebApi.Models.ForgotPasswordViewModel*<br>With email address. |


#### Returns



Take the ResetPassword form data to reset the password.

| Name | Description |
| ---- | ----------- |
| model | *GolfTracker.WebApi.Models.ResetPasswordViewModel*<br> |


#### Returns

An HTTP Status code - 200 (OK) or 400 (Bad Request)


## Controllers.api.BaseController

This is the common base ApiController that concrete Api controllers that need CRUD operations should inherit.


## Entities.EntityBase

This is the base class that all root entity classes inherit. This will allow the type of entity to be passed in which is used for the Where predicate in the RepositoryBase class.

All root entities inherit this base class.

| Name | Description |
| ---- | ----------- |
| docType | *System.String*<br>The name of the type of entity (lowercase). |
This docType field will be used to organize the documents by "docType" in DocumentDB in a single-collection scenario. The docType is just the lowercase name of the derived class.

This is need for querying in the RepositoryBase. Used by DocumentDB.

Pass the lowercase string name of the class to the base class. This is used in the repository for storage and querying, to organize documents by this type name.

Pass the lowercase string name of the class to the base class. This is used in the repository for storage and querying, to organize documents by this type name.


## Entities.Golfers.Round

This describes a round of golf for the golfer.

The DocumentDB authorization key.

The base Url for the host website that is calling the WebApi service.

The comma-separated list of domains, with no trailing slash!

The name of the DocumentDB database.

The DocumentDB endpoint Uri.

The DocumentDB collection (name) for storing main set of documents. You can add additional settings using this template to pass them into new custom repositories. Simply add the corresponding field to the web.config or update in the Azure Portal's app settings. Alternatively, if you want to specify a collection name directly in the repository, you can do that by passing the string directly in quotes.

The DocumentDB collection to store User information.

This method is used for DateTime properties to convert the date to an Epoch date that can be used for DocumentDB range indexes. See this article for more information: http://azure.microsoft.com/blog/2014/11/19/working-with-dates-in-azure-documentdb-4/

| Name | Description |
| ---- | ----------- |
| date | *System.DateTime*<br>The incoming date to convert to epoch integer. |


#### Returns




## Models.DateEpoch

This is not used at the moment.


## Repositories.DocumentDbClient

This is the DocumentDB client class that the RepositoryBase class will inherit to consume the properties.


## Repositories.IGolfClubRepository

Custom members go in this interface.


## Repositories.IGolferRepository

Add custom members here.


## Repositories.RepositoryBase

All repository classes must inherit from this base class. This base class contains all the basic CRUD operations.

All Repository classes must inherit this base class.

| Name | Description |
| ---- | ----------- |
| type | *System.String*<br>The name of the entity (T), which is the same as the name passed into the model (lowercase). |
| dbName | *System.String*<br>The name of the database. |
| collectionName | *System.String*<br>The name of the collection. |
Get a list of T, with an optional predicate.

| Name | Description |
| ---- | ----------- |
| predicate | *Unknown type*<br>The linq expression Where clause. |


#### Returns

An IEnumerable of T.

