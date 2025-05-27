function ready(callback) {
    if (document.readyState !== 'loading') {
        // If the DOM is already loaded, execute the callback immediately
        callback();
    } else {
        // Otherwise, wait for the DOM to fully load
        document.addEventListener('DOMContentLoaded', callback);
    }
}



// Example usage:
ready(() => {
    console.log("The DOM is fully loaded, and I am ready to go!");
    // Add your custom code here
});

function createAccountButton() {
    window.location.href = window.location.origin + "/create_account"
}