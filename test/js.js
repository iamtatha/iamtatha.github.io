// GitHub repo URL
const repoUrl = 'https://raw.githubusercontent.com/iamtatha/iamtatha.github.io/refs/heads/master/test'; // Adjust URL to your repo

// CSV file URLs
const questionUrl = `${repoUrl}/mock_qu.csv`;
const tagUrl = `${repoUrl}/tag.csv`;

// Company-specific CSV file URLs
const companyFiles = {
    Google: `${repoUrl}/google.csv`,
    Amazon: `${repoUrl}/amazon.csv`,
    Apple: `${repoUrl}/apple.csv`,
    Meta: `${repoUrl}/meta.csv`
};

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

    const filtered = questions.filter(([qNo, name, link, comp, t]) => {
        const compMatch = !companyFilter || (companyData[companyFilter]?.includes(qNo) ?? false);
        const tagMatch = !tagFilter || tags[qNo]?.includes(tagFilter);
        return compMatch && tagMatch;
    });

    renderTable(filtered);
}

// Function to render table
function renderTable(data) {
    const tableBody = document.getElementById('table-body');
    tableBody.innerHTML = '';
    data.forEach(([qNo, name, link, companies, tags]) => {
        tableBody.innerHTML += `
            <tr>
                <td>${qNo}</td>
                <td>${name}</td>
                <td><a href="${link}" target="_blank">Link</a></td>
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

    // Fetch each company's questions
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
    const questionsWithMeta = questions.map(([qNo, name, link]) => [
        qNo,
        name,
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
}

// Load data on page load
loadAndDisplayData();
