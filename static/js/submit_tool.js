// static/js/submit_tool.js

document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("launchToolForm");

    form.addEventListener("submit", function (e) {
        e.preventDefault();

        const formData = new FormData(form);

        fetch("backend/save_tool.php", {
            method: "POST",
            body: formData,
        })
        .then((res) => res.json())
        .then((data) => {
            alert(data.message);
            if (data.success) {
                form.reset(); // clear the form
            }
        })
        .catch((err) => {
            alert("Hitilafu imetokea. Jaribu tena.");
            console.error(err);
        });
    });
});
