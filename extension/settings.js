document.addEventListener("DOMContentLoaded", function () {
    // Retrieve the current keyboard shortcuts
    browser.commands.getAll().then(function (commands) {
        var shortcutList = document.getElementById("shortcut-list");

        // Display the current keyboard shortcuts
        commands.forEach(function (command) {
            var listItem = document.createElement("li");
            listItem.textContent = `${command.description}: ${command.shortcut}`;

            shortcutList.appendChild(listItem);
        });
    });
});
