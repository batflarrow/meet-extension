const $recordKeyStrokeButton = document.querySelector('#recordKeyStroke');
const $keyRecordInput = document.querySelector('#keyRecordInput');
// window.onload(() => {
window.onload = () => {
    console.log('hello', Math.random());
    console.log(localStorage.getItem('key'));
    $keyRecordInput.value = localStorage.getItem('key') ? localStorage.getItem('key') : 'No Hotkey Set';

};



$recordKeyStrokeButton.addEventListener('click', (e) => {
    e.preventDefault();
    // console.log('hello');
    document.addEventListener('keyup', (e) => {
        $keyRecordInput.value = e.key;
        $keyRecordInput.focus();
        localStorage.setItem('key', e.key);
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            chrome.tabs.sendMessage(tabs[0].id, { key: e.code });
        });
    }, { once: true });
});