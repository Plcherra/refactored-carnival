const API_KEY = "VF.DM.6755293d4c417aab5a71cfd4.kCBxTlEqYBJpKFZy";

const interact = (request) => {
    const username = document.getElementById("name").value;
    return fetch(`https://general-runtime.voiceflow.com/state/user/${encodeURI(username)}/interact`, {
        method: "POST",
        headers: { Authorization: API_KEY, "Content-Type": "application/json" },
        body: JSON.stringify({ request }),
    })
    .then((res) => res.json())
    .then((trace) => {
        const root = document.getElementById("root");
        trace.forEach((item) => {
            if (item.type === "speak" || item.type === "text") {
                root.innerHTML += `<li>${item.payload.message}</li>`;
            }
        });
    });
};

document.getElementById("send-datetime").addEventListener("click", () => {
    const datetime = document.getElementById("datetime").value;
    if (!datetime) {
        alert("Please select a date and time.");
        return;
    }
    interact({ type: "text", payload: `Selected date and time: ${datetime}` });
});
