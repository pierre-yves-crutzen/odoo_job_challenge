
/*
Please note:
Read carefully the questions. Each word is important.
Feel free to add comments in your answers and read the documentation as you see fit.
Don't forget to mention the language you are using.
Do test your code!
Between parenthesis is the weigh of each question, the maximum score is 20
*/

// -----------------------------------------------------------------------------------------------------------------------------------------
/**
 * Test 1: (Javascript) (3/20)
 * Write a program that outputs sequentially the integers from 1 to 99 but on some conditions prints a string instead:
 * when the integer is a multiple of 3 print “Open” instead of the number,
 * when it is a multiple of 7 print “Source” instead of the number,
 * when it is a multiple of both 3 and 7 print “OpenSource” instead of the number.
 * */


var OutputSequence = {
    execute: function () {
        for (let i = 1; i <= 99; i++) { // sequentially loop on integers from 1 to 99 
            if ((i % 3 === 0) && (i % 7 === 0)) { // when integer is a multiple of both 3 and 7
                console.log('OpenSource');
            } else if (i % 3 === 0) { // when it is is a multiple of 3
                console.log('Open');
            } else if (i % 7 === 0) { // when it is a multiple of 7
                console.log('Source');
            } else {
                console.log(i);
            }
        }
    },
    test: function () {
        execute();
    }
}

// OutputSequence.execute();    // Uncomment to execute the progam
// OutputSequence.test();       // Uncomment to execute the tests

// -----------------------------------------------------------------------------------------------------------------------------------------
/**
 * Test 2: (Javascript) (3/20)
 * Solve the game "Guess a number", find a secret integer between 1 and 1000000
 * in less than 50 guesses. Write a function that solves the game and returns the
 * solution by using the function verify() which is defined with the following
 * specification:
 * function verify(guess: integer) -> integer
 * Argument:
 *      guess (integer) the number to verify
 * Returns:
 *      0 if the guess is the solution, your program won
 *      -1 if the solution is smaller than the guess parameter
 *      1  if the solution is bigger than the guess parameter
 * 
 * Warning: You are not allowed to call verify() more that 50 times or you loose.
 * */

var GuessANumber = {
    play: function (randomNumber) {
        if (!randomNumber) {
            randomNumber = Math.floor(Math.random() * 1000000);	// Random values if not any parameter
        };
        console.log('\nExpected number :', randomNumber);
        let won = false;										// False while well value not found
        let count = 1;											// Default counter value

        let min = 0;
        let max = 1000000;

        function calc(minimum, maximum) {
            if (min === 0 && max === 1) {						// Limit case
                return Math.floor((minimum + maximum) / 2);
            }
            return Math.round((minimum + maximum) / 2);			// Normal case
        }

        function guess(numToVerify) {
            let result;

            result = verify(numToVerify);
            if (result > 0) {
                max = calc(min, max);							// Calculates the max
            } else if (result < 0) {
                min = calc(min, max);							// Calculates the min
            } else {
                console.log('\nSuccess! number found after ', count, ' attempts.\n');
                console.log('-------------------------------------------\n');
                won = true;										// If value found
            }
        }

		// Used to verify 
        function verify(guess) {
            console.log('step number : ', count, '. tested number : ', guess);
            if (guess > randomNumber) {
                result = 1;										// -1 if the solution is smaller than the guess parameter
            } else if (guess < randomNumber) {
                result = -1;									// -1 if the solution is bigger than the guess parameter
            } else {
                result = 0;										// 0 if the guess is the solution, your program won
            }
            return result;
        }

        function executeGame() {
            while (count <= 50 && !won) {						// While counter < 50
                guess(calc(min, max));
                count++;
            }
            if (count >= 50) {
                console.log('\nOut of bound, you lost. You had to find :', randomNumber, '.');
                console.log('\nLast values saved : { min :', min, 'max :', max, '}');
                console.log('---------------------------------------------------\n');
            }
        }

        executeGame();
    },
    test: function () {
        console.log('Tests start.');
		valuesToTest = [
            -1, 0, 1, 2, 3, 112, 1313, 13564, 94856, 
            124531, 233419, 321654, 456789, 567894, 678945,         // Mocked values
            789456, 954321, 999998, 999999, 1000000, 1000001
        ];

        valuesToTest.map((e, i) => {
            console.log('Test ', i + 1, ':');
            this.play(e);											// Execute play method
        });
        console.log('All tests executed.');
    }
}

// GuessANumber.play();     // execute game
// GuessANumber.test();     // uncomment to execute tests


// -----------------------------------------------------------------------------------------------------------------------------------------
/**
 * Test 3: Javascript (3/20)
 * Write a function that takes a list of strings and returns the sum of the list items that represents an integer (skipping the other items)
 */


var IterativeListNumbers = {
    count: function (list) {
        const reducer = (accumulator, currentValue) => accumulator + currentValue; // Defines the reducer to calculate the sum
        let list2 = [];
        let sum;

        list.map(e => {									// Loop on the list
            if (Number.isInteger(parseInt(e))
                //  && typeof e === 'string'            //--> uncomment if only string should be accepted instead of integer
            ) {
                list2 = [...list2, parseInt(e)];		// Fills the array
            }
        });

        sum = list2.reduce(reducer);					// Calculates the sum
        console.log('Result = ', sum);
        return sum;

    },
    test: function () {
        const lists = [{
                handled: ['hello', 'spacecraft', 1, '1', 13, '4', '153', 'six'],
                expected: [1 + 4 + 153] // 172 // 158 if string verification is activated
            },
            {
                handled: [1, '1', 13, '4', '153'],
                expected: [1 + 4 + 153] // 172 // 158 if string verification is activated
            },
            {
                handled: ['1', '1', '13', '4', '153'],
                expected: [1 + 1 + 13 + 4 + 153] // 172
            }
        ];

        lists.map((r) => {								// Loop to map the arraylist
            console.log('Expected number = ', r.expected, ' : ');
            this.count(r.handled);
        });
    }
}

// IterativeListNumbers.test(); // uncomment to execute the tests


/*
Test 4: Javascript (1/20)
Write a recursive version of the previous function (or an iterative version if you already did a recursive version).
*/
var RecursiveListNumbers = {
    list2: list2 = [],
    count: function (list) {
        const reducer = (accumulator, currentValue) => accumulator + currentValue;	// Defines the reducer to calculate the sum
        let sum;
        let i = list.length;									// Gets the array size

        if (list.length > 0) {
            if (Number.isInteger(parseInt(list[i - 1]))			// 
                // && (typeof list[i-1] === 'string')           //--> uncomment if only string should be accepted instead of integer
            ) {
                list2 = [...list2, parseInt(list[i - 1])];		// Fills the list
            }
            i += 1;
            list.length -= 1;
            RecursiveListNumbers.count(list);					// Recursive call
        } else {
            sum = list2.reduce(reducer);						// Calculates the sum
            list2 = [];
            console.log('Result = ', sum);
            return sum;
        }
    },
    test: function () {
        const lists = [{
                handled: ['hello', 'spacecraft', 1, '1', 13, '4', '153', 'six'],
                expected: [1 + 4 + 153] // 172 // 158 if string verification is activated
            },
            {
                handled: [1, '1', 13, '4', '153'],
                expected: [1 + 4 + 153] // 172 // 158 if string verification is activated
            },
            {
                handled: ['1', '1', '13', '4', '153'],
                expected: [1 + 1 + 13 + 4 + 153] // 172
            }
        ];

        lists.map((r) => {										// Loop to map the arraylist
            console.log('Expected number = ', r.expected, ' : ');
            this.count(r.handled);
        });
    }
}

// RecursiveListNumbers.test(); // Uncomment to execute the tests


// -----------------------------------------------------------------------------------------------------------------------------------------
/*
Test 6: Any language (1/20)
Write a program to download the contents of http://www.sap.com/belgique/i.html (the SAP homepage for Belgium), 
and then save the contents of the page to a new local file, with all occurrences of "SAP" replaced by "Odoo".
*/

// Consult  folder "exercise 6".

// -----------------------------------------------------------------------------------------------------------------------------------------
/*
Test 7: Python (2/20)
You have a huge file named "data.bin" that does not fit in memory, code a program that deletes every 7th byte of it. 
truncate can be used to change its size.
*/

// Consult  folder "exercise 7".

// -----------------------------------------------------------------------------------------------------------------------------------------
/*
Test 8: Regular Expression (2/20)
Write a regular expression to match strings containing both "Odoo" and "#rules" in any order.
*/
const regex = /(Odoo|#rules)/gi							// Regex
regex.exec('Odoo#rules#Odoorules#rules');				// Cover every values

console.log('Odoo#rules#Odoorules'.match(regex));		// Tests the regex

// -----------------------------------------------------------------------------------------------------------------------------------------
/*
Test 9: Javascript (1/20)
Write a function that, when called, returns an array for which each element is a letter of the alphabet, from "A" to "Z" (exactly once, in order and upper case). 
Your code cannot contain the character ' (quote), " (double quote) or ` (back quote)
*/

function alphabet_order(str) {
    const regex = /[A-Z]/g;					// Regex A-Z
    return [...str.split([])				// Seperates each value
				.sort()						// Sort values asc
				.join([])					// Join values together
				.toUpperCase()				// Uppercase
	].filter((str) => str.match(regex));	// Filter each value to match the regex
}

console.log(alphabet_order("I am 1 developer. We are 2 developers."));	// Tests the regex

// -----------------------------------------------------------------------------------------------------------------------------------------
/*
Test 10: Unix (1/20)
Write a C program that roughly measures the overhead of a context switch between the kernel and userspace on a UNIX/Linux system (without using the pthread API).
Please indicate the assumptions your rough estimation is based on.
*/

// You can get a version in C++ in folder 'exercise 10'.
// I don't feel comfortable with this.
