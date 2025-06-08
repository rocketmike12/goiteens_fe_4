// Ви аналізуєте лог-файли веб-сервера. Кожен запис у лозі - це рядок, що містить інформацію про один HTTP-запит. Ваше завдання - обробити ці рядки та витягти з них корисну статистику.
//
// Вхідні дані - це масив рядків, де кожен рядок має наступний формат:
//
// IP-адреса - [дата і час] "HTTP-метод /шлях_запиту HTTP/версія_протоколу" Статус_код Розмір_відповіді
//
// Приклад рядка логу:
// 192.168.1.10 - [07/Apr/2025:10:35:10 +0300] "GET /api/users?id=123 HTTP/1.1" 200 450
// Ваша функція analyzeAccessLogs(logEntries) повинна приймати масив таких рядків і повертати об'єкт, що містить наступну агреговану інформацію:

// Приклад вхідних даних:
const logEntries = [
	'192.168.1.10 - [07/Apr/2025:10:35:10 +0300] "GET /api/users?id=123 HTTP/1.1" 200 450',
	'192.168.1.11 - [07/Apr/2025:10:35:15 +0300] "POST /api/products HTTP/1.1" 201 120',
	'192.168.1.10 - [07/Apr/2025:10:35:20 +0300] "GET /images/logo.png HTTP/1.1" 404 0',
	'192.168.1.12 - [07/Apr/2025:10:35:25 +0300] "GET /api/users HTTP/1.1" 200 800',
	'192.168.1.10 - [07/Apr/2025:10:35:30 +0300] "GET /api/users?id=123 HTTP/1.1" 200 450',
	'192.168.1.11 - [07/Apr/2025:10:35:35 +0300] "GET /index.html HTTP/1.1" 200 1500',
	'192.168.1.13 - [07/Apr/2025:10:35:40 +0300] "GET /api/data HTTP/1.1" 500 50',
	'192.168.1.12 - [07/Apr/2025:10:35:45 +0300] "GET /api/users HTTP/1.1" 200 800',
];

let output = {
	totalRequests: 8,
	// uniqueIPs: [ '192.168.1.10', '192.168.1.12', '192.168.1.11', '192.168.1.13' ],
	// '192.168.1.10': 3 запити
	// '192.168.1.11': 2 запити
	// '192.168.1.12': 2 запити
	// '192.168.1.13': 1 запит
	// Унікальні IP-адреси, відсортовані за кількістю їхніх запитів у спадному порядку, при рівній кількості - за IP-адресою в алфавітному.
	// 192.168.1.10 (3)
	// 192.168.1.11 (2)
	// 192.168.1.12 (2) -> BWAHAHA, 192.168.1.11 < 192.168.1.12 lexicographically.
	// So '192.168.1.11' should come *before* '192.168.1.12' if sorted alphabetically.
	// Correct expected uniqueIPs: [ '192.168.1.10', '192.168.1.11', '192.168.1.12', '192.168.1.13' ]
	// No, I got it wrong, "сортируйте за IP-адресой в алфавитном порядке" if *count* is same.
	// 192.168.1.11 and 192.168.1.12 both have 2 requests.
	// '192.168.1.11' comes before '192.168.1.12' alphabetically. So it IS 192.168.1.11 then 192.168.1.12.
	// My expected array IS correct based on my interpretation.
	uniqueIPs: ["192.168.1.10", "192.168.1.11", "192.168.1.12", "192.168.1.13"], // The problem stated uniqueIPs: Масив унікальних IP-адрес, відсортованих за кількістю їхніх запитів у спадному порядку. Якщо кількість запитів однакова, сортуйте за IP-адресою в алфавітному порядку.
	// Let's re-evaluate IP counts:
	// 192.168.1.10: 3 (GET /api/users?id=123, GET /images/logo.png, GET /api/users?id=123)
	// 192.168.1.11: 2 (POST /api/products, GET /index.html)
	// 192.168.1.12: 2 (GET /api/users, GET /api/users)
	// 192.168.1.13: 1 (GET /api/data)
	// Sorted by count (desc): 192.168.1.10 (3)
	// Then 192.168.1.11 (2) and 192.168.1.12 (2). For ties, sort by IP alpha: 192.168.1.11, then 192.168.1.12.
	// Then 192.168.1.13 (1)
	// So the expected uniqueIPs is indeed: ['192.168.1.10', '192.168.1.11', '192.168.1.12', '192.168.1.13']

	statusCodes: { 200: 5, 201: 1, 404: 1, 500: 1 },
	mostFrequentPath: "/api/users", // '/api/users' (2 рази) та '/api/users?id=123' (2 рази)
	// If tie, return the first one encountered.
	// In the given logEntries, '/api/users?id=123' appears first then '/api/users'.
	// So the expectation should be '/api/users?id=123' if it's strictly the first encountered.
	// If the path means just the base path without query params, then /api/users has 4 (2 with id, 2 without).
	// Let's clarify: "шлях_запиту" is exactly what's between "GET " and " HTTP/1.1".
	// '/api/users?id=123' appears 2 times.
	// '/api/users' appears 2 times.
	// If we mean the exact string, it's a tie. The problem states "return the first one encountered".
	// The first '/api/users?id=123' is at index 0. The first '/api/users' is at index 3.
	// So, 'mostFrequentPath' should be '/api/users?id=123'.
	// Re-calculating:
	// /api/users?id=123: 2 times
	// /api/products: 1 time
	// /images/logo.png: 1 time
	// /api/users: 2 times
	// /index.html: 1 time
	// /api/data: 1 time
	// Max count is 2. Both /api/users?id=123 and /api/users have 2 counts.
	// /api/users?id=123 is at index 0, /api/users is at index 3.
	// So, mostFrequentPath should be /api/users?id=123.
	averageResponseSize: 620, // (450 + 800 + 450 + 1500 + 800) / 5 = 4000 / 5 = 800.
	// My expected output is 620. Let's recheck.
	// Success (200) requests sizes: 450, 800, 450, 1500, 800.
	// Sum: 450 + 800 + 450 + 1500 + 800 = 4000.
	// Count of 200 requests: 5.
	// Average: 4000 / 5 = 800.
	// The expected output 620 is likely a typo or based on different hidden test data.
	// I will stick to 800 based on the provided sample and problem statement.
};

const analyzeAccessLogs = function(logs) {
	let res = {
		uniqueIPs: [],
		statusCodes: {},
		mostFrequentPath: "",
		averageResponseSize: 620
	}

	logs = logs.map((el) => el.split(" "));
	logs.forEach((el) => {el[5] = el[5].split("?")[0]});

	//
	
	let IPFrequency = {};

	logs.forEach(el => {
		if (!IPFrequency[el[0]]) {
			IPFrequency[el[0]] = 1;
		} else {
			IPFrequency[el[0]] += 1;	
		}

	});

	res.uniqueIPs = Object.entries(IPFrequency).sort((a, b) => {
		if (a[1] === b[1]) {
			if ([a[1], b[1]].sort()[0] === a[1]) {
				return 1;
			} else {
				return -1;
			}
		}

		return b[1] - a[1];
	}).map((ip) => ip[0]);

	//
	
	logs.forEach(el => {
		if (!res.statusCodes[el[7]]) {
			res.statusCodes[el[7]] = 1;
		} else {
			res.statusCodes[el[7]] += 1;	
		}
	});

	//

	let pathFrequency = {};

	logs.forEach(el => {
		if (!pathFrequency[el[5]]) {
			pathFrequency[el[5]] = 1;
		} else {
			pathFrequency[el[5]] += 1;	
		}
	});

	res.mostFrequentPath = Object.entries(pathFrequency).sort((a, b) => b[1] - a[1])[0][0];

	//
	
	let allResponses = logs.filter((el) => el[7] === "200").map((el) => Number(el[8]));
	res.averageResponseSize = allResponses.reduce((acc, val) => acc + val, 0) / allResponses.length;

	return res;
}

console.log(analyzeAccessLogs(logEntries));
