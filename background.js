

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