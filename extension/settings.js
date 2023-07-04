document.addEventListener("DOMContentLoaded", function () {
    // Retrieve the last selected option from storage
    browser.storage.local.get("selectedOption").then(function (result) {
        let selectedOption = result.selectedOption || "tab";

        // Set the selected option based on the retrieved value
        let applyAllRadio = document.getElementById("apply-all");
        let applyTabRadio = document.getElementById("apply-tab");

        if (selectedOption === "all") {
            applyAllRadio.checked = true;
        } else {
            applyTabRadio.checked = true;
        }
    });

    // Store the user-selected option on change
    let applyAllRadio = document.getElementById("apply-all");
    let applyTabRadio = document.getElementById("apply-tab");

    applyAllRadio.addEventListener("change", function () {
        browser.storage.local.set({ selectedOption: "all" });
    });

    applyTabRadio.addEventListener("change", function () {
        browser.storage.local.set({ selectedOption: "tab" });
        browser.storage.local.remove('lastPlaybackRate') //potentially, keep that here, to prevent unintended behaviour, upon reselecting the "all" option
    });

    // Retrieve the current keyboard shortcuts
    browser.commands.getAll().then(function (commands) {
        let shortcutList = document.getElementById("shortcut-list");

        // Display the current keyboard shortcuts
        commands.forEach(function (command) {
            let listItem = document.createElement("li");
            listItem.textContent = `${command.description}: ${command.shortcut}`;

            shortcutList.appendChild(listItem);
        });
    });
});

document.getElementById('popupTitle').textContent = browser.i18n.getMessage('popupTitle');
document.getElementById('popupWarning').textContent = browser.i18n.getMessage('popupWarning');
document.getElementById('popup-apply-all-message').textContent = browser.i18n.getMessage('popup-apply-all-message');
document.getElementById('popup-apply-tab-message').textContent = browser.i18n.getMessage('popup-apply-tab-message');