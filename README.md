#### Track driving history and calculate average speed.

### Assumptions

- Trips with less than 5mph or greater than 100mph is considered as invalid Trip.
- Times are assumed to be in particular format (hours:minutes) or else the trip is considered invalid.
- The start time will always be before the end time.
- Each Driver command should have `Driver` and `Driver name` separated by space.
- Each Trip command should be a space delimited with the following fields: the command `Trip`, `driver name`, `start time`, `stop time`, `miles driven`. 
- Both Commands should contains all possible data for processing or else the commands are skipped.
- The code will process an single input text file. You need to provide `file name` given on the command line.

### Approach

- The program begins its execution from `main.js` which acts like a API which further calls the `processData.js` that acts like a model (which does all the processing of the data).
- The program reads the input file (txt file) stored in `inputFiles` folder. The filename needs to be provided in the command line while executing the program. Also program can execute single file at a time. 
- The program is divided in small functions so that its easy to read and debug.
- I came up with the idea to store the DriverName and its corresponding trip info together in a HashMap in order for easy retrival.
- I am also maintaing a `running total` of miles driven and time taken for each trip.
- The advantage of this approach is as follows:
    - With HashMap retrival of data is eash, consider if you have large data set, if we maintain a array we would have to traverse through each record to find    a particular entry.
    - By maintaing a `running total` only single object is stored against each driver and we don't need to have nested loops to calculate the average speed      and total miles for each driver. 
    - This keeps the time complexity of program to O(n).
- The disadvantage of this approach:
    - As I am not maintaining Drivers trip history I cannot use it for analytics or creating graphs.
- Also I am calclulating speed per trip, which helps me discard trips whose speed is less than 5 Mph or greater than 100 Mph.
- I am also storing all the constants in `appConstants.js` that way I don't have to hardcode any values. I just need to change it in one place and it will be reflected throughout the program.
- I am using `try` and `catch` block to handle error during program executions. If any error occurs the program is terminated and appropriate error object is displayed in the terminal.
- If no error occurs expected output will be printed in the terminal. ***Note there might be a situation when the program runs successfully with no errors but if all the commands are invalid no output will be printed as all the commands may get ignored***

### Testing

- I have used Jest library for writing the test cases for unit test.
- The test cases considered are as follows:
    - Test inputs with valid `Drivers` and `Trip` commands.
    - Test input with no Driver commands.
    - Test input with no Trip commands.
    - Test when empty input file is provided.
    - Test valid trip with low speed (speed < 5 MPH).
    - Test valid trip with High speed (speed > 100 MPH).
    
### Comments

- The program is written JavaScript, I have 2 years of experience working with JavaScript frameworks like ReactJs and NodeJs. 
- I have tried Jest for the first time and felt comfortable using it.
- I enjoyed solving this problem as a complete project than doing it as a competitive coding challenge.
- Built with Visual studio code IDE

#### Steps to run the program:

$ cd TrackDrivers
$ npm install
$ node main.js (Input filePath)
**Example** $ node main.js ./inputFiles/input1.txt

#### Steps to run the tests:

$ cd TrackDrivers
$ npm test
    