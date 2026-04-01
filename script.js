let listOfNumbers = [];
let stringOfNumbers; 
let newListOfNumbers = [];

submitButton.addEventListener("click", sortingFunction);

function sortingFunction() {
    let sortedList = myInput.value;

    listOfNumbers = sortedList.split(',');

    newListOfNumbers = [];

    listOfNumbers.forEach(element => {
        newListOfNumbers.push(Number(element));
    });

    let canvasToBeRemoved = document.getElementById("p5");

    if (canvasToBeRemoved.hasChildNodes() == true) {
        canvasToBeRemoved.removeChild(canvasToBeRemoved.lastChild);
    }
    
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

function insertionSort(array) {
    for (let i = 1; i < array.length; i++) {
        let keyToCompare = array[i];
        let j = i - 1;
        for (; j > -1 && array[j] > keyToCompare; j--) {
            array[j + 1] = array[j];
        }
        array[j + 1] = keyToCompare;
    }
    return array;
}

function bubbleSort(array) {
    for (let i = 0; i < array.length; i++) {
        for (let j = 0; j < array.length; j++) {
            let firstToBeCompared = array[j];
            let secondToBeCompared = array[j + 1];
            if (firstToBeCompared > secondToBeCompared) {
                array[j + 1] = firstToBeCompared;
                array[j] = secondToBeCompared;
            }
        }
    }
    return array;
}

function selectionSort(array) {
    let newArray = [];
    for (let i = array.length - 1; i >= 0; i--) {
        let smallestElementIndex = i;
        for (let j = 0; j < i; j++) {
            if (array[smallestElementIndex] > array[j]) {
                smallestElementIndex = j;
            }
        }
        newArray.push(array.splice(smallestElementIndex, 1)[0]);
    }
    return newArray;
}

function mergeSort(array) {
    let sorted = [];
    if (array.length > 1) {
        let arrayOne = mergeSort(array.slice(0, array.length/2));
        let arrayTwo = mergeSort(array.slice(array.length/2, array.length));
        let j = 0;
        let k = 0;
        for (let i = 0; i < arrayOne.length + arrayTwo.length; i++) {
            if (arrayOne[j] >= arrayTwo[k] || arrayOne[j] == undefined) {
                sorted.push(arrayTwo[k]);
                k++;
            } else if (arrayOne[j] < arrayTwo[k] || arrayTwo[k] == undefined) {
                sorted.push(arrayOne[j]);
                j++;
            }
        }
        return sorted;
    } else {
        return array;
    }
}

function boxCreation(array, length) {
    let smallestBox = document.getElementById("smallest-box");
    
    let id = document.getElementById("sortedLabel");

    if (smallestBox.childElementCount == 1) {
        for (let k = length - 1; k >= 0; k--) {
            let newBox = document.createElement("p");
            newBox.setAttribute("id", `${k}`);
            newBox.innerHTML = array[k].toString();
            id.after(newBox); 
        }
    } else {
        for (let k = smallestBox.childElementCount - 2; k >= 0; k--) {
            let toBeRemoved = document.getElementById(`${k}`);
            toBeRemoved.remove();
        }

        for (let k = length - 1; k >= 0; k--) {
            let newBox = document.createElement("p");
            newBox.setAttribute("id", `${k}`);
            newBox.innerHTML = array[k].toString();
            id.after(newBox); 
        }
    }
}

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

function getBaseLog(x, y) {
    return Math.log(y) / Math.log(x);
}