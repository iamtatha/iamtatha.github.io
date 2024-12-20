// GitHub repo URL
const repoUrl = 'https://raw.githubusercontent.com/iamtatha/iamtatha.github.io/refs/heads/master/lcdb'; // Adjust URL to your repo
// const repoUrl = 'Users/tathagata.dey/Desktop/Code/My_Projects/github_db/'; // Adjust URL to your repo
// GitHub repo URL


// CSV file URLs
const questionUrl = `${repoUrl}/questions.csv`;
const tagUrl = `${repoUrl}/tag.csv`;




// Function to fetch companies and create company-specific URLs
async function loadCompanies() {
    const response = await fetch(`${repoUrl}/companies.csv`);
    const data = await response.text();
    const companies = data.split('\n').map(company => company.trim()).filter(company => company);

    const companySelect = document.getElementById('company');
    companySelect.innerHTML = '<option value="">Select Company</option>';

    // Populate the dropdown with company names
    companies.forEach(company => {
        const option = document.createElement('option');
        option.value = company;
        option.textContent = company;
        companySelect.appendChild(option);
    });

    // Dynamically generate URLs for each company
    const companyData = {};
    for (const company of companies) {
        companyData[company] = `${repoUrl}/companies/${company}.csv`;
    }

    return companyData;
}




// Function to fetch and parse CSV files
async function fetchCSV(url) {
    const response = await fetch(url);
    const text = await response.text();
    return text.trim().split('\n').slice(1).map(row => row.split(','));
}




// Function to filter and display questions
function filterQuestions(questions, companyData, tags) {
    const companyFilter = document.getElementById('company').value;
    const tagFilter = document.getElementById('tag').value;
    const difficultyFilter = document.getElementById('difficulty').value;

    const filtered = questions.filter(([qNo, name, difficulty, link, companies, questionTags]) => {
        // Split companies string into an array and check if the selected company is included
        const companiesArray = companies.split(';');

        // Check if the question matches the selected company
        const compMatch = !companyFilter || companiesArray.includes(companyFilter);

        // Check if the question matches the selected tag
        const tagMatch = !tagFilter || questionTags.includes(tagFilter);

        const difficultyMatch = !difficultyFilter || difficulty === difficultyFilter;

        return compMatch && tagMatch && difficultyMatch;
    });

    renderTable(filtered);
}








// Function to render table
function renderTable(data) {
    const tableBody = document.getElementById('table-body');
    tableBody.innerHTML = '';
    data.forEach(([qNo, name, difficulty, link, companies, tags]) => {
        tableBody.innerHTML += `
            <tr>
                <td>${qNo}</td>
                <td>${name}</td>
                <td>${difficulty}</td>
                <td><a href="${link}" target="_blank">Leetcode</a></td>
                <td>${companies}</td>
                <td>${tags}</td>
            </tr>
        `;
    });
}




// Main function to load and process CSV data
async function loadAndDisplayData() {
    const questions = await fetchCSV(questionUrl);
    const tagData = await fetchCSV(tagUrl);

    // Dynamically load companies and their CSV data
    const companyFiles = await loadCompanies();
    const companyData = {};

    for (const [company, url] of Object.entries(companyFiles)) {
        const data = await fetchCSV(url);
        companyData[company] = data.map(row => row[1]); // Assuming Question No is in the second column
    }

    // Map tags to question numbers
    const tags = tagData.reduce((acc, [tag, qNos]) => {
        qNos.split(';').forEach(qNo => {
            if (!acc[qNo]) acc[qNo] = [];
            acc[qNo].push(tag);
        });
        return acc;
    }, {});

    // Combine data for rendering
    const questionsWithMeta = questions.map(([qNo, name, difficulty, acceptance, link]) => [
        qNo,
        name,
        difficulty, 
        acceptance,
        link,
        Object.keys(companyData)
            .filter(company => companyData[company].includes(qNo))
            .join('; ') || '',
        tags[qNo]?.join('; ') || ''
    ]);

    // Initial render and setup filters
    renderTable(questionsWithMeta);

    document.getElementById('filter-button').onclick = () => filterQuestions(questionsWithMeta, companyData, tags);
    document.getElementById('reset-button').onclick = () => renderTable(questionsWithMeta);

    // Theme toggle button
    document.getElementById('theme-button').onclick = () => {
        const body = document.body;
        body.classList.toggle('dark');
        body.classList.toggle('light');
        const themeButton = document.getElementById('theme-button');
        themeButton.textContent = body.classList.contains('dark') ? 'Switch to Light Theme' : 'Switch to Dark Theme';
    };
}





// Load data on page load
loadAndDisplayData();



