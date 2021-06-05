const $recordKeyStrokeButton = document.querySelector('#recordKeyStroke');
const $keyRecordInput = document.querySelector('#keyRecordInput');


$recordKeyStrokeButton.addEventListener('click', (e) => {
    e.preventDefault();
    // console.log('hello');
    document.addEventListener('keyup', (e) => {
        $keyRecordInput.value = e.key;
        $keyRecordInput.focus();
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            chrome.tabs.sendMessage(tabs[0].id, { key: e.code });
        });
    }, { once: true });
});