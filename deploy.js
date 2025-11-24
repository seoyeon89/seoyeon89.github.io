const ghpages = require("gh-pages");

ghpages.publish(
    "dist",
    {
        branch: "gh-pages",
        repo: "https://github.com/seoyeon89/seoyeon89.github.io.git",
        dotfiles: true
    },
    function (err) {
        if (err) {
            console.error("Deploy failed:", err);
        } else {
            console.log("Deploy complete!");
        }
    }
);
