const expenses = {
    "2023-01": {
        "01": {
            "food": [ 22.11, 43, 11.72, 2.2, 36.29, 2.5, 19 ],
            "fuel": [ 210.22 ]
        },
        "09": {
            "food": [ 11.9 ],
            "fuel": [ 190.22 ]
        }
    },
    "2023-03": {
        "07": {
            "food": [ 20, 11.9, 30.20, 11.9 ]
        },
        "04": {
            "food": [ 10.20, 11.50, 2.5 ],
            "fuel": []
        }
    },
    "2023-04": {}
};

// Funkcja obliczająca medianę z posortowanej funkcji
function calculateMedianFromSortedArray(arr) {
    const n = arr.length;
    if (n === 0) return null;
    if (n % 2 === 1) {
        return arr[Math.floor(n / 2)];
    } else {
        return (arr[n / 2 - 1] + arr[n / 2]) / 2;
    }
}

// Funkcja sprawdzająca, czy dany dzień jest przed pierwszą niedzielą w miesiącu
function isBeforeFirstSunday(year, month, day) {
    // Ustalamy datę 1 dnia w miesiącu
    const firstDayOfMonth = new Date(year, month - 1, 1);
    
    // Sprawdzamy, jaki dzień tygodnia wypada na 1 dzień miesiąca (0 to niedziela, 1 to poniedziałek, itd.)
    const firstSundayOffset = (7 - firstDayOfMonth.getDay()) % 7;

    // Obliczamy datę pierwszej niedzieli w miesiącu
    const firstSunday = new Date(year, month - 1, 1 + firstSundayOffset);

    // Ustalamy datę podanego dnia
    const currentDay = new Date(year, month - 1, day);

    // Porównujemy daty
    return currentDay <= firstSunday;
}

// Funkcja iterująca po expenses i zwracająca tablicę wydatków przed pierwszą niedzielą
function getExpensesBeforeFirstSunday(expenses) {
    const allExpenses = [];

    for (const yearMonth in expenses) {
        const [year, month] = yearMonth.split("-").map(Number);
        
        for (const day in expenses[yearMonth]) {
            const isBefore = isBeforeFirstSunday(year, month, Number(day));
            
            // Jeśli dzień jest przed pierwszą niedzielą, dodajemy wydatki do tablicy
            if (isBefore) {
                const dayExpenses = expenses[yearMonth][day];
                for (const category in dayExpenses) {
                    allExpenses.push(...dayExpenses[category]);
                }
            }
        }
    }

    return allExpenses;
}

// Funkcja iterująca po expenses i zwracająca informację o dniu
function checkExpensesBeforeFirstSunday(expenses) {
    const results = {};

    for (const yearMonth in expenses) {
        const [year, month] = yearMonth.split("-").map(Number);
        
        for (const day in expenses[yearMonth]) {
            const isBefore = isBeforeFirstSunday(year, month, Number(day));
            results[`${yearMonth}-${day}`] = isBefore;
        }
    }

    return results;
}

function solution1(expenses) {
    let result = [];

    // Iterowanie przez każdy rok i miesiąc
    for (const yearMonth in expenses) {
        const [year, month] = yearMonth.split("-").map(Number);

        // Iterowanie przez dni w danym miesiącu
        for (const day in expenses[yearMonth]) {
            const isBefore = isBeforeFirstSunday(year, month, Number(day));

            // Jeśli dzień jest przed pierwszą niedzielą, dodajemy wydatki do tablicy
            if (isBefore) {
                const dayExpenses = expenses[yearMonth][day];
                
                // Iterowanie przez kategorie wydatków w danym dniu
                for (const category in dayExpenses) {
                    result.push(...dayExpenses[category]);
                }
            }
        }
    }

    // Niezoptymalizowane sortowanie bąbelkowe
    for (let i = 0; i < result.length; i++) {
        for (let j = 0; j < result.length - i - 1; j++) {
            if (result[j] > result[j + 1]) {
                // Zamiana miejscami
                const temp = result[j];
                result[j] = result[j + 1];
                result[j + 1] = temp;
            }
        }
    }

    return calculateMedianFromSortedArray(result);
}

function solution2(expenses) {
    let result = [];

    // Iterowanie przez każdy rok i miesiąc
    for (const yearMonth in expenses) {
        const [year, month] = yearMonth.split("-").map(Number);

        // Iterowanie przez dni w danym miesiącu
        for (const day in expenses[yearMonth]) {
            const isBefore = isBeforeFirstSunday(year, month, Number(day));

            // Jeśli dzień jest przed pierwszą niedzielą, dodajemy wydatki do tablicy
            if (isBefore) {
                const dayExpenses = expenses[yearMonth][day];
                
                // Iterowanie przez kategorie wydatków w danym dniu
                for (const category in dayExpenses) {
                    result.push(...dayExpenses[category]);
                }
            }
        }
    }

    // Zoptymalizowane sortowanie za pomocą wbudowanej metody sort()
    result.sort((a, b) => a - b);

    return calculateMedianFromSortedArray(result);
}


// Wywołanie funkcji
const results = checkExpensesBeforeFirstSunday(expenses);
console.log(results);
const allExpensesBeforeFirstSunday = getExpensesBeforeFirstSunday(expenses);
console.log(allExpensesBeforeFirstSunday);
const solution1result = solution1(expenses);
console.log("SOLUTION1:",solution1result);
const solution2result = solution2(expenses);
console.log("SOLUTION2:",solution2result)
