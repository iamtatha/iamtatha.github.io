document.addEventListener('DOMContentLoaded', async () => {
    const plansList = document.getElementById('plans-list');
    const csvUrl = 'plans.csv'; // Replace with your actual GitHub CSV URL

    try {
        const response = await fetch(csvUrl);
        const csvData = await response.text();
        const plans = parseCSV(csvData);

        plans.forEach(plan => {
            const listItem = document.createElement('li');
            listItem.textContent = `${plan.Date}: ${plan.Destination} (${plan.Description})`;
            plansList.appendChild(listItem);
        });
    } catch (error) {
        plansList.innerHTML = '<li>Error fetching travel plans. Please try again later.</li>';
        console.error('Error fetching CSV:', error);
    }
});

function parseCSV(csvText) {
    const lines = csvText.split('\n').filter(line => line.trim());
    const [header, ...rows] = lines.map(line => line.split(','));
    return rows.map(row => Object.fromEntries(header.map((h, i) => [h, row[i]])));
}
