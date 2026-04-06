// List of variables. 
let listOfNumbers = [];
let stringOfNumbers; 
let newListOfNumbers = [];

// Add the event listener for the submit button. Everything happens after this button gets clicked. 
submitButton.addEventListener("click", sortingFunction);

// This is the function that gets called when the button gets clicked. 
/* 
Functionalities:
    1. Removes any existing visualisation blocks. 
    2. Reads input text field. 
    3. Turns that information into an array of numbers. 
    4. If the correct radio button is checked, run that sorting function, and the visualisation of that sorting function. 
*/
function sortingFunction() {
    // Remove any existing canvases. 
    let canvasToBeRemoved = document.getElementById("p5");
    if (canvasToBeRemoved.hasChildNodes() == true) {
        canvasToBeRemoved.removeChild(canvasToBeRemoved.lastChild);
    }

    //Read the value of the DOM object with ID "myInput". 
    let sortedList = myInput.value;

    // Split the user-entered string into an array of strings for numbers. 
    listOfNumbers = sortedList.split(',');

    // Reset the newListOfNumbers. 
    newListOfNumbers = [];

    // For each element in the array of strings, convert them to a number and push them to the new array. 
    listOfNumbers.forEach(element => {
        newListOfNumbers.push(Number(element));
    });

    if (document.getElementById("insertionSort").checked) {
        insertionSort(newListOfNumbers);   
        boxCreation(newListOfNumbers, newListOfNumbers.length);  

        new p5(insertionSortSketch);
    }

    if (document.getElementById("bubbleSort").checked) {
        bubbleSort(newListOfNumbers);
        boxCreation(newListOfNumbers, newListOfNumbers.length); 

        new p5(bubbleSortSketch);
    }

    if (document.getElementById("selectionSort").checked) {
        let sortedArray = selectionSort(newListOfNumbers);
        boxCreation(sortedArray, sortedArray.length);

        new p5(selectionSortSketch);
    }

    if (document.getElementById("mergeSort").checked) {
        let sortedArray = mergeSort(newListOfNumbers);
        boxCreation(sortedArray, sortedArray.length);

        new p5(mergeSortSketch);
    } 
    return;

}

// My own insertion sort implementation. 
function insertionSort(array) {
    // Loop through the input array. 
    for (let i = 1; i < array.length; i++) {

        // Let the element to sort start from the second element in the array (since i == 1). 
        let keyToSort = array[i];
        let j = i - 1;

        // Loop through everything through the left of the key to sort. I could have used a `while` loop, but I like `for` loops better. 
        // Stop looping when the key to sort is bigger than the j-element. 
        for (; j > -1 && array[j] > keyToSort; j--) {
            /* For every time the key to sort is smaller than the j-element, 
            shift the left element to the right by one. */
            array[j + 1] = array[j];
        }

        /* We are here when the j-element is smaller than the key to sort. So the key should go to the right of the j-element. 
        This is permitted because array[j + 1] and array[j + 2] are the same, and so one needs to be replaced anyways.
        If previous loop does not run (all the left elements are smaller than the key to sort), 
        then the element stays in place!  */
        array[j + 1] = keyToSort;
    }
    return array;
}

// My own bubble sort implementation. 
function bubbleSort(array) {
    /* Loop through the number of elements in the array
    Note that this doesn't have to be the case. 
    We can have a condition to break out of the loop, 
    which would make best case scenario into n instead of n^2. 
    Check time vs loop time */
    for (let i = 0; i < array.length; i++) {
        // Loop through the array
        for (let j = 0; j < array.length; j++) {

            let firstToBeCompared = array[j];
            let secondToBeCompared = array[j + 1];

            // Swap condition
            if (firstToBeCompared > secondToBeCompared) {
                array[j + 1] = firstToBeCompared;
                array[j] = secondToBeCompared;
            }
        }
    }
    return array;
}

// My own selection sort implementation. 
function selectionSort(array) {
    // Define the new array for the selected elements to go in. 
    let newArray = [];

    // Start from large loop
    for (let i = array.length - 1; i >= 0; i--) {
        // Set smallest element as the element of i. 
        let smallestElementIndex = i;

        // Loop upwards the length of the shortening array
        // We don't want unnecessary looping 
        for (let j = 0; j < i; j++) {
            // If there is a smaller element, make that index equal to smallestElementIndex. 
            if (array[smallestElementIndex] > array[j]) {
                smallestElementIndex = j;
            }
        }

        // After loop, remove smallest element from original array and add to new array. 
        newArray.push(array.splice(smallestElementIndex, 1)[0]);
    }
    return newArray;
}

// My own merge sort implementation. 
function mergeSort(array) {
    // Let the merged array == sorted. 
    let sorted = [];

    // Condition for split and merge. 
    if (array.length > 1) {
        // Define the sorted arrays. 
        let arrayOne = mergeSort(array.slice(0, array.length/2));
        let arrayTwo = mergeSort(array.slice(array.length/2, array.length));

        // Indicies for each of the sorted arrays. 
        let j = 0;
        let k = 0;

        // Loop through the amount of elements to be sorted. 
        for (let i = 0; i < arrayOne.length + arrayTwo.length; i++) {

            // Compare between the two sorted arrays to merge into one sorted array
            if (arrayOne[j] >= arrayTwo[k] || arrayOne[j] == undefined) {
                sorted.push(arrayTwo[k]);
                k++;
            } else if (arrayOne[j] < arrayTwo[k] || arrayTwo[k] == undefined) {
                sorted.push(arrayOne[j]);
                j++;
            }
        }

        // return to continue recursion
        return sorted;
    } else {
        // return for the bottom of recursion
        return array;
    }
}

// Displaying list of sorted numbers. Need to create boxes with each element in the sorted array. 
function boxCreation(array, length) {

    // Target the sorted list box
    let smallestBox = document.getElementById("smallest-box");
    
    // Set the sorted list label as an achor for the rest of the box creation. 
    let sortedLabel = document.getElementById("sorted-list-label");

    // If there is only the list label, then create.
    if (smallestBox.childElementCount == 1) {
        // Reverse loop because we want smallest element added at the end of the anchor
        for (let k = length - 1; k >= 0; k--) {
            let newBox = document.createElement("p");
            newBox.setAttribute("id", `${k}`);
            newBox.setAttribute("class", "text");
            newBox.innerHTML = array[k].toString();

            // Place after anchor
            sortedLabel.after(newBox); 
        }
    } else {
        // Remove existing boxes. 
        for (let k = smallestBox.childElementCount - 2; k >= 0; k--) {
            let toBeRemoved = document.getElementById(`${k}`);
            toBeRemoved.remove();
        }

        // Add new boxes again. Refresh. 
        for (let k = length - 1; k >= 0; k--) {
            let newBox = document.createElement("p");
            newBox.setAttribute("id", `${k}`);
            newBox.setAttribute("class", "text");
            newBox.innerHTML = array[k].toString();
            sortedLabel.after(newBox); 
        }
    }
}

// The visualisation for insertion sort. 
function insertionSortSketch(p) {
    let currentStep = 0;
    let sortedArray = insertionSort(newListOfNumbers);

    newListOfNumbers = [];

    listOfNumbers.forEach(element => {
        newListOfNumbers.push(Number(element));
    });
    
    p.setup = function() {
        let canvas = p.createCanvas(400, 400);
        canvas.parent("p5");
    }

    p.draw = function() {
        p.frameRate(1.5);
        p.background(255);
        p.rectMode(p.CENTER);
        p.translate(p.width/2, 20);
        p.strokeWeight(3);

        for (let i = 1; i < currentStep; i++) {
            let keyToCompare = newListOfNumbers[i];
            let j = i - 1;
            for (; j >= 0 && newListOfNumbers[j] > keyToCompare; j--) {
                newListOfNumbers[j + 1] = newListOfNumbers[j];
            }
            newListOfNumbers[j + 1] = keyToCompare;
        }

        for (let k = 0; k < newListOfNumbers.length; k++) {
            let smallest = sortedArray[0];
            let largest = sortedArray[sortedArray.length - 1];
            let mappedSize = p.map(newListOfNumbers[k], smallest, largest, 20, 280);
            let mappedQuantity = 330/(newListOfNumbers.length + 1);
            p.fill(0, mappedSize, k * mappedQuantity);
            p.rect(0, k * mappedQuantity + mappedQuantity, mappedSize, mappedQuantity, 3);
        }

        if (currentStep < newListOfNumbers.length) {
            currentStep++;
        } else {
            currentStep = 0;
            setTimeout(() => {p.remove()}, 2000);
        }
    }

}

// The visualisation for merge sort. 
function mergeSortSketch(p) {
    let currentStep = 0;

    newListOfNumbers = [];

    listOfNumbers.forEach(element => {
        newListOfNumbers.push(Number(element));
    });

    let mergeSorted = mergeSort(newListOfNumbers);

    newListOfNumbers = [];

    listOfNumbers.forEach(element => {
        newListOfNumbers.push(Number(element));
    });

    let splitArray = [];
    let newSplitArray = [];

    let sorted = [];

    let logCalc = 0;
    
    p.setup = function() {
        let canvas = p.createCanvas(400, 400);
        canvas.parent("p5");
    }

    p.draw = function() {
        p.frameRate(1);
        p.background(255);
        p.rectMode(p.CENTER);
        p.translate(p.width/2, 20);
        p.strokeWeight(3);

        let outerArrayA = 0;
        let outerArrayB = 1;
        let innerArrayA = 0;
        let innerArrayB = 0;


        if (currentStep == 0) {
            for (let i = 0; i < mergeSorted.length; i++) {
                splitArray.push([]);
                splitArray[i].push(newListOfNumbers[i]);

                let smallest = mergeSorted[0];
                let largest = mergeSorted[mergeSorted.length - 1];
                let mappedSize = p.map(newListOfNumbers[i], smallest, largest, 20, 280);
                let mappedQuantity = 330/(mergeSorted.length);
                p.fill(0, mappedSize, i * mappedQuantity);
                p.rect(0, i * mappedQuantity + mappedQuantity, mappedSize, mappedQuantity, 3);
            }

            logCalc = getBaseLog(2, splitArray.length);
            
        } else if (splitArray.length/2 + logCalc > currentStep > 0) {
            if (splitArray.length % 2 != 0) {
                splitArray.push([]);
            }

            for (let k = 0; k < mergeSorted.length; k++) {

                if ((splitArray[outerArrayA][innerArrayA] <= splitArray[outerArrayB][innerArrayB] || splitArray[outerArrayB][innerArrayB] == undefined)) {
                    sorted.push(splitArray[outerArrayA][innerArrayA]);
                    //alert(splitArray[outerArrayA][innerArrayA]);
                    innerArrayA++;
                } else {
                    sorted.push(splitArray[outerArrayB][innerArrayB]);
                    //alert(splitArray[outerArrayB][innerArrayB]);
                    innerArrayB++;
                }

                if ((splitArray[outerArrayA][innerArrayA] == undefined) && (splitArray[outerArrayB][innerArrayB] == undefined)) {
                    outerArrayA += 2;
                    outerArrayB += 2;
                    innerArrayA = 0;
                    innerArrayB = 0;
                    newSplitArray.push(sorted); 
                    sorted = [];
                } 
            }

            splitArray = newSplitArray;

            newSplitArray = []; 
            sorted = [];
            
            let resetStringArray = splitArray.join(",");
            let resetArray = resetStringArray.split(",");

            let smallest = mergeSorted[0];
            let largest = mergeSorted[mergeSorted.length - 1];


            for (let i = 0; i < mergeSorted.length; i++) {
                let mappedSize = p.map(resetArray[i], smallest, largest, 20, 280);
                let mappedQuantity = 330/(mergeSorted.length);
                p.fill(0, mappedSize, i * mappedQuantity);
                p.rect(0, i * mappedQuantity + mappedQuantity, mappedSize, mappedQuantity, 3);
            }
            

        } else {
            setTimeout(() => {p.remove()}, 2000);
        }

        currentStep++;
    }
}

// The visualisation for bubble sort. 
function bubbleSortSketch(p) {
    let currentStep = 0;
    let sortedArray = bubbleSort(newListOfNumbers);

    newListOfNumbers = [];

    listOfNumbers.forEach(element => {
        newListOfNumbers.push(Number(element));
    });

    let smallest = sortedArray[0];
    let largest = sortedArray[sortedArray.length - 1];
    
    p.setup = function() {
        let canvas = p.createCanvas(400, 400);
        canvas.parent("p5");
    }

    p.draw = function() {
        p.frameRate(3);
        p.background(255);
        p.rectMode(p.CENTER);
        p.translate(p.width/2, 20);
        p.strokeWeight(3);
        
         
        for (let j = 0; j < sortedArray.length; j++) {
            let firstToBeCompared = newListOfNumbers[j];
            let secondToBeCompared = newListOfNumbers[j + 1];
            if (firstToBeCompared > secondToBeCompared) {
                newListOfNumbers[j + 1] = firstToBeCompared;
                newListOfNumbers[j] = secondToBeCompared;
            }
        }

        for (let i = 0; i < sortedArray.length; i++) {
            let mappedSize = p.map(newListOfNumbers[i], smallest, largest, 20, 280);
            let mappedQuantity = 330/(sortedArray.length);
            p.fill(0, mappedSize, i * mappedQuantity);
            p.rect(0, i * mappedQuantity + mappedQuantity, mappedSize, mappedQuantity, 3);
        }

        if (sortedArray.length > currentStep > 0) {
            currentStep++;
        } else {
            setTimeout(() => {p.remove()}, 2000);
        }
          
    }
}

// The incomplete visualisation for selection sort. 
function selectionSortSketch(p) {
    newListOfNumbers = [];

    listOfNumbers.forEach(element => {
        newListOfNumbers.push(Number(element));
    });

    let sortedArray = selectionSort(newListOfNumbers);

    newListOfNumbers = [];

    listOfNumbers.forEach(element => {
        newListOfNumbers.push(Number(element));
    });

    let currentStep = newListOfNumbers.length - 1;
    let originalStep = 0;

    let smallest = sortedArray[0];
    let largest = sortedArray[sortedArray.length - 1];
    let newArray = [];

    p.setup = function() {
        let canvas = p.createCanvas(400, 400);
        canvas.parent("p5");
    }

    p.draw = function() {
        p.frameRate(1);
        p.background(255);
        p.rectMode(p.CENTER);
        p.translate(p.width/2, 20);
        p.strokeWeight(3);
        

        for (let i = newListOfNumbers.length - 1; i >= currentStep; i--) {
            let smallestElementIndex = i;
            for (let j = 0; j < i; j++) {
                if (newListOfNumbers[smallestElementIndex] > newListOfNumbers[j]) {
                    smallestElementIndex = j;
                }
            }
            newArray.push(newListOfNumbers.splice(smallestElementIndex, 1)[0]);
        }

        for (let i = 0; i < newArray.length; i++) {
            let mappedSize = p.map(newArray[i], smallest, largest, 20, 280);
            let mappedQuantity = 330/(newArray.length);
            p.fill(0, mappedSize, i * mappedQuantity);
            p.rect(0, i * mappedQuantity + mappedQuantity, mappedSize, mappedQuantity, 3);
        }

        currentStep--;

        if (currentStep <= -1) {
            setTimeout(() => {p.remove()}, 3000);
            noLoop();
        }
        
    }
}

// Log function. 
function getBaseLog(x, y) {
    return Math.log(y) / Math.log(x);
}