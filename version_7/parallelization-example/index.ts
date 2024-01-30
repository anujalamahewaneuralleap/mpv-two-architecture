// Example asynchronous functions that return promises
function asyncTask1(): Promise<string> {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve('Result of asyncTask1');
        }, 2000); // Simulating a delay of 2 seconds
    });
}

function asyncTask2(): Promise<number> {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(42);
        }, 1500); // Simulating a delay of 1.5 seconds
    });
}

function asyncTask3(): Promise<boolean> {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(true);
        }, 1000); // Simulating a delay of 1 second
    });
}

// Example usage of Promise.all() to execute tasks concurrently
async function executeParallelTasks() {
    try {
        // Execute multiple asynchronous tasks concurrently
        const [result1, result2, result3] = await Promise.all([
            asyncTask1(),
            asyncTask2(),
            asyncTask3()
        ]);

        // Log the results
        console.log('Result of asyncTask1:', result1);
        console.log('Result of asyncTask2:', result2);
        console.log('Result of asyncTask3:', result3);
    } catch (error) {
        console.error('Error occurred:', error);
    }
}

// Call the function to execute parallel tasks
executeParallelTasks();
