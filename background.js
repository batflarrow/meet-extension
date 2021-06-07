

// const sendMessage = (tab) => {
//     // console.log(tab)
//     let message={
//         txt:'hello'
//     }
//  chrome.tabs.sendMessage(tab.id,message)   
// }


// chrome.browserAction.onClicked.addListener(sendMessage)

chrome.runtime.onMessage.addListener(
    (request, sender, sendResponse) => {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            const tabId = tabs[0].id;
            chrome.tabs.get(tabId, async (tab) => {
                let muted = !tab.mutedInfo.muted;
                await chrome.tabs.update(tabId, { muted });
                // console.log(`Tab ${tab.id} is ${muted ? 'muted' : 'unmuted'}`);
            });
        });
    }

);
console.log(document);
// chrome.runtime.onConnect.addListener('keydown', () => {
//     console.log('key pressed');
// });
// chrome.run;
// chrome.runtime.getBackgroundPage((window) => {
//     console.log(window.document);
//     window.document.addEventListener('keydown', () => {
//         console.log('key pressed');
//     });
// });


// async function getCurrentTab() {
//     let queryOptions = { active: false, currentWindow: false };
//     let [tab] = await chrome.tabs.query(queryOptions);
// //     return tab;
// // }
// chrome.commands.onCommand.addListener(function (command) {
//     console.log('Command:', command);

//     // const tab = getCurrentTab();
//     // console.log(tab);
//     let queryOptions = { active: false, currentWindow: true };
//     chrome.tabs.query(queryOptions, (tabs) => {
//         console.log(tabs);
//     });

// });

// chrome.tabs.sendMessage(tab.id, { greeting: "hello" }, function (response) {
//     // innerText does not let the attacker inject HTML elements.
//     document.getElementById("resp").innerText = response.farewell;
// });

// keep a list of connected content scripts so that we can tell them to toggle mute
const ports = new Set();
chrome.commands.onCommand.addListener((command) => {
    if (command !== 'toggle-mic' || ports.size === 0) {
        return;
    }
    for (const port of ports) {
        port.postMessage({ toggleMic: "Mute Google Meet Mic" });
    }
});

chrome.runtime.onConnect.addListener(function (port) {
    console.assert(port.name == "Google Meet");
    // console.log('connect event fired');
    ports.add(port);
    port.onDisconnect.addListener((port) => {
        ports.delete(port);
        // console.log('port deleted');
    });
});