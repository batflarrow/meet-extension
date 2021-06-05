chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    localStorage.setItem('key', request.key);
    // console.log(request.key);
    // console.log('fetched', localStorage.getItem('key'));
}
);
console.log('hello');
let isPressed = false;
const pushToTalkMicHandlerKeyDown = (e, $micButton) => {
    if (!isPressed) {
        isPressed = true;
        if (e.code === localStorage.getItem('key')) {
            $micButton.click();
        }
    }
};
const pushToTalkMicHandlerKeyUp = (e, $micButton) => {
    if (e.code === localStorage.getItem('key')) {
        const muteMic = setInterval(() => {
            if ($micButton.dataset.isMuted === 'false') {
                $micButton.click();
            }
            else {
                isPressed = false;
                clearInterval(muteMic);
            };
        }, 100);
    }
};
const addPushToTalk = () => {
    const $micButton = document.querySelectorAll('[role="button"][data-is-muted]')[0];
    document.addEventListener('keydown', (e) => pushToTalkMicHandlerKeyDown(e, $micButton));
    document.addEventListener('keyup', (e) => pushToTalkMicHandlerKeyUp(e, $micButton));
};

const addMuteButton = () => {
    const $muteBtton = document.createElement('button');
    console.log($muteBtton);
    $muteBtton.innerHTML = "Mute";
    $muteBtton.classList = ['myButton'];
    console.log(document.querySelector('.cZG6je'));
    document.querySelector('.cZG6je').prepend($muteBtton);
};

const waitForJoining = setInterval(() => {
    try {
        const $endCallButton = document.querySelector('[aria-label="Leave call"]');
        if ($endCallButton) {
            console.log('Successfully Joined Meet');
            clearInterval(waitForJoining);
            addPushToTalk();
            addMuteButton();
        }

    } catch (err) {
        console.log(err);
    }

}, 1000);


