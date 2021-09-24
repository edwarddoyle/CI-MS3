## Testing

JavaScript function testing can be found in the [JavaScript Test Results Document](static/docs/FunctionTests.pdf). As most of the logic is handled by Jinja, the JavaScript codebase is very small.
As DRY functions are imported across the entire application - they are tested within the scope they are executed, ie. a enableButton() function is called in reports.js. Testing of this function was carried out within this scope and not where the function is declared

>The following devices / browsers were used by me for testing.
>
>* Desktop
>   * Firefox 91
>   * Chrome 94
>* Android
>   * Chrome 94
>   * Firefox 91
>* iOS
>   * Safari 15
>
>I also used [LambdaTest](https://www.lambdatest.com/) to simulate cross browser Testing
>

Testing was seperated into 3 categories; user testing, functional testing & performance testing

### USER TESTING

#### UX & Navigation

>* [Dead Link Checker](https://www.deadlinkchecker.com/) was used to check website links

| Success Criteria             | Test Method                                                                |Result  |Comment|Solution|
| ----------------- | ------------------------------------------------------------------ |--------|-------|--------|
| Wesbite is easy to navigate | Feedback - Client & Users |   PASS           | The clients wants to revisit some elements of the UI in future developments        |       |

An automated or paid user testing service to be considered for future releases

#### Responsiveness

>* [LambdaTest](https://www.lambdatest.com/) & [Google Mobile Friendly Test](https://search.google.com/test/mobile-friendly) were previously used for testing, unfortunatley both services were unable to test the site once hosted on Heroku. I could not find a simple solution to this (other than copying and pasting code snippets) - so I tested the site manually across multiple devices & browsers.

| Success Criteria             | Test Method                                                                |Result  |Comment|Solution|
| ----------------- | ------------------------------------------------------------------ |--------|-------|--------|
| Fully Responsive | Manual Browsing |   PASS           | This method of testing is unreliable and a remedy needs to be investigated       |       |

#### Accessibility

| Success Criteria            | Test Method                                                  | Result | Comment                                                      | Solution                                                     |
| --------------------------- | ------------------------------------------------------------ | ------ | ------------------------------------------------------------ | ------------------------------------------------------------ |
| Colour Contrast             | Colours checked on [Color a11y](https://color.a11y.com/Contrast/) | PASS   | CTA button contains contrast errors                | A new button style to be investigated,                                    |
| Overall accessibility tests | Tested on [Wave](https://wave.webaim.org/) Accessiblity testing |      PASS  |   Issues reported with aria descriptions                                                           |  Fixed by applying a11y solution found  [here](https://medium.com/@svinkle/why-let-someone-know-when-a-link-opens-a-new-window-8699d20ed3b1)                                                     |

#### Scope / Goals

| Success Criteria                                             | Test Method                                                  | Result | Comment                                                      | Solution |
| ------------------------------------------------------------ | ------------------------------------------------------------ | ------ | ------------------------------------------------------------ | -------- |
| Form controls: Required form controls in place               | Manual Testing                                               | PASS   | -                                                            | -        |
| Colour scheme matches client’s requirements                  | Client Testing                                               | PASS   | -                                                            | -        |
| The website language and message matches what the client requested | Client proof read the content                                | PASS   | -                                                            | -        |
| User stories fulfilled                                       | Family and friends visited the website and provided feedback. | PASS   | -                                                            | -        |
| Overall Client Satisfaction                                  | Client Feedback                                              | PASS   | The client is happy with the initial deployment and is waiting on feedback from users | -        |

#### Validation

| Success Criteria     | Test Method                                              | Result | Comment | Solution |
| -------------------- | -------------------------------------------------------- | ------ | ------- | -------- |
| HTML code validation | [W3C HTML Validator](https://validator.w3.org)           | PASS   | -       | -        |
| CSS code validation  | [W3C CSS Validator](https://jigsaw.w3.org/css-validator) | PASS   | -    |      |

>* Validation & Performance Testing is documented in the [Validation & Performance Test Results Document](static/docs/Validation.pdf)
>* Javascript Testing is documented in the [JavaScript Test Results Document](static/docs/FunctionTests.pdf)
>* Python Testing is documented in the [Python Test Results Document](static/docs/PythonFunctionTests.pdf)

### Functional Testing

#### Navbar

| Success Criteria                                    | Method                                                 | Result | Device           |
| --------------------------------------------------- | ------------------------------------------------------ | ------ | ---------------- |
| Navbar links navigate to the  relevant page  | Each link clicked                                      | PASS   | Desktop & Mobile |

#### Home Page

| Success Criteria                        | Method      | Result | Device           |
| --------------------------------------- | ----------- | ------ | ---------------- |
| Greeting is customised if returning user | Login & Navigate to home page | PASS   | Desktop & Mobile |

#### Events Page

| Success Criteria                        | Method            | Result | Device            |
| --------------------------------------- | ----------------- | ------ | ----------------- |
| No events image when no data | delete events from MongoDB      | PASS   | Desktop &  Mobile |
| Event cards expand and collapse         | Click event cards | PASS   | Desktop &  Mobile |

#### Report Page

| Success Criteria | Method | Result | Device |  
| ------------------------------------------------------------ | ------------------------------------------------------------ | ------ | ----------------- |
| Report pop displays  | cta button clicked                                           | PASS   | Desktop &  Mobile |
 | Browser requests location permission  | cta button clicked                                           | PASS   | Desktop &  Mobile |
| Users location displayed on map                                         | Location permission granted to browser                                           | PASS   | Desktop &  Mobile |
| Image button opens file browser on desktop & option of file browser or camera on mobile                                | image upload button clicked                                         | PASS   | Desktop &  Mobile |
| Images display in slider                                         | Tested uploading from file system on both desktop & mobile. Live captured images from camera                 | PASS      | Desktop & Mobile                |
| Report Sent to DB              | Check DB                    | PASS   | Desktop &  Mobile |
| Previous Reports should be displayed or no reports image if no reports posted previously            | Post a report to DB                    | PASS   | Desktop &  Mobile |

#### Contact Page

| Success Criteria | Method | Result | Device |  
| ------------------------------------------------------------ | ------------------------------------------------------------ | ------ | ----------------- |
| Social links open in new tab                                 | Social links clicked                                         | PASS   | Desktop &  Mobile |
| Contact Form Tests                                           | -                                                            | -      | -                 |
| Name field required; form should  issue warning              | Leave name field blank and click  submit                     | PASS   | Desktop &  Mobile |
| Email field required; form should  issue warning             | Leave email field blank and click  submit                    | PASS   | Desktop &  Mobile |
| Email must be in email format, ie.  Contain @ symbol and domain address | Enter email without @ symbol, Enter email with @ symbol without domain | PASS   | Desktop &  Mobile |                                     
| Email should Send on Submit | Check inbox| PASS   | Desktop &  Mobile |

#### Login / Register Page

| Success Criteria | Method | Result | Device |  
| ------------------------------------------------------------ | ------------------------------------------------------------ | ------ | ----------------- |
| Form Validation                                | Invalid inputs entered                                         | PASS   | Desktop &  Mobile |
| username field required - regular expression match ; form should  issue warning              | Leave username field blank / input short username and click  submit                     | PASS   | Desktop &  Mobile |
| Password field required - regular expression match ; form should  issue warning             | Leave password field blank / input invalid property and click  submit                    | PASS   | Desktop &  Mobile |
| Erorr message display if username not found / password incorrect  | input incorrect username / password | PASS   | Desktop &  Mobile |

### Performance Testing

>* Validation & Performance Testing is documented in the [Validation & Performance Test Results Document](static/docs/Validation.pdf)

The app responds well when opened, however the serving of the pages seems slower than normal. I investigated further and discovered that Heroku does not modify HTTP requests or responses. A third party add-on or a Gzip compression library would need to be used in future releases as Gzipping is considered the single most important performance enhancement for any website / app. As my knowledge of Python / Flask / Django increases I will hopefully be able to improve these minor speed issues and web serving issues. 

Another issue the website encountered is the serving of images in jpeg / png - I ussually webp my images and compress the ones I serve for legacy / less performant browsers. As I am using Cloudinary as a means to store user uploaded images, I will investigate further the use of their AI platform for optimizing and serving images.

Other than the issues listed, the app does work quite well as it stands.

