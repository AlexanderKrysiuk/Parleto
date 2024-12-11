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

// Wywołanie funkcji
const results = checkExpensesBeforeFirstSunday(expenses);
console.log(results);
