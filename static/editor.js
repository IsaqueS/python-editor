// --- Mock User Data and Auth ---
// In a real application, you would fetch this from a cookie or an API
function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}

// async function fetchUserEmail() {
//     const userEmailSpan = document.getElementById('user-email');
//     const token = getCookie('token');

//     if (!token) {
//         window.location.href = '/login';
//         return;
//     }

//     // This is a placeholder. You would need to create an endpoint
//     // that takes a token and returns user information.
//     // For now, we'll just display a placeholder.
//     // Let's assume you have an endpoint like '/api/user_info'
//     try {
//         // You'll need to implement this endpoint in your Flask app
//         const response = await fetch('/api/user_info', {
//              headers: {
//                  'Authorization': `Bearer ${token}`
//              }
//         });
//         if (response.ok) {
//             const data = await response.json();
//             userEmailSpan.textContent = data.email;
//         } else {
//              userEmailSpan.textContent = "user@example.com";
//              console.error("Failed to fetch user info.");
//         }
//     } catch(e) {
//         console.error("Error fetching user email:", e);
//         userEmailSpan.textContent = "user@example.com";
//     }
// }

function logout() {
    // Clear the session token cookie
    document.cookie = 'token=; Max-Age=0; path=/;';
    window.location.href = '/';
}

// --- Editor Functionality ---

let fileCounter = 1;

document.getElementById('new-file-tab').addEventListener('click', () => {
    fileCounter++;
    const fileName = `new_file_${fileCounter}.py`;
    const tabId = `file-tab-${fileCounter}`;
    const contentId = `file-content-${fileCounter}`;

    // Create new tab button
    const newTab = document.createElement('li');
    newTab.className = 'nav-item';
    newTab.setAttribute('role', 'presentation');
    newTab.innerHTML = `
        <button class="nav-link" id="${tabId}" data-bs-toggle="tab" data-bs-target="#${contentId}" type="button" role="tab" aria-controls="${contentId}" aria-selected="false">
            ${fileName}
        </button>
    `;

    // Create new tab content
    const newContent = document.createElement('div');
    newContent.className = 'tab-pane fade';
    newContent.id = contentId;
    newContent.setAttribute('role', 'tabpanel');
    newContent.setAttribute('aria-labelledby', tabId);
    newContent.innerHTML = `<textarea class="form-control code-editor" rows="20"></textarea>`;

    // Add new tab and content to the DOM
    const fileTabs = document.getElementById('file-tabs');
    const newFileButton = document.getElementById('new-file-tab').parentElement;
    fileTabs.insertBefore(newTab, newFileButton);

    const tabContent = document.getElementById('file-tab-content');
    tabContent.appendChild(newContent);
});


function getActiveEditor() {
    const activeTab = document.querySelector('.tab-pane.active');
    if (activeTab) {
        return activeTab.querySelector('.code-editor');
    }
    return null;
}

async function runCode() {
    const editor = getActiveEditor();
    if (!editor) {
        alert("No active editor found!");
        return;
    }

    const code = editor.value;
    const outputConsole = document.getElementById('output-console');
    outputConsole.textContent = 'Running...\n';

    // In a real application, you would send this code to a backend service
    // that executes it securely. For this example, we will just simulate it.
    // For a Python project, you would need an API endpoint to run the code.
    try {
        // This is a placeholder for an API call to your Flask backend
        // For example:
        // const response = await fetch('/api/run_code', {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify({ code: code })
        // });
        // const result = await response.json();
        // outputConsole.textContent += result.output;

        // Mock output:
        setTimeout(() => {
            if (code.includes('print("Hello, World!")')) {
                 outputConsole.textContent += 'Hello, World!\n';
            } else {
                 outputConsole.textContent += 'Code executed (simulated).\n';
            }
        }, 500);

    } catch (error) {
        outputConsole.textContent += `Error: ${error.message}`;
    }
}


// // --- Initialization ---
// window.addEventListener('DOMContentLoaded', (event) => {
//     fetchUserEmail();
// });
