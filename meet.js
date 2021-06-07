chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.key)
        localStorage.setItem('key', request.key);
    // console.log(request.key);
    // console.log('fetched', localStorage.getItem('key'));
}
);
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
let mute = false;
const muteButtonClickHandler = (e) => {
    e.preventDefault();
    if (mute == false) {
        document.querySelector('.muteIcon').style.display = 'none';
        document.querySelector('.unMuteIcon').style.display = 'block';
        document.querySelector('.muteButton').style['background-color'] = "#EA4335";
        mute = true;
    } else {
        document.querySelector('.muteIcon').style.display = 'block';
        document.querySelector('.unMuteIcon').style.display = 'none';
        document.querySelector('.muteButton').style['background-color'] = "#434649";
        mute = false;
    }
    chrome.runtime.sendMessage({ greeting: "hello" });
};
const addMuteButton = () => {
    const $muteButton = document.createElement('button');
    const muteIconUrl = chrome.runtime.getURL('muteIcon.png');
    const unMuteIconUrl = chrome.runtime.getURL('unMuteIcon.png');
    const muteIcon = document.createElement('img');
    muteIcon.classList = ['muteIcon'];
    muteIcon.src = muteIconUrl;
    const unMuteIcon = document.createElement('img');
    unMuteIcon.classList = ['unMuteIcon'];
    unMuteIcon.src = unMuteIconUrl;
    $muteButton.append(muteIcon);
    $muteButton.append(unMuteIcon);
    $muteButton.classList = ['muteButton'];
    // console.log(document.querySelector('.cZG6je'));
    $muteButton.addEventListener('click', (e) => { muteButtonClickHandler(e); });

    document.querySelector('.cZG6je').prepend($muteButton);
};

const waitForJoining = setInterval(() => {
    try {
        const $endCallButton = document.querySelector('[aria-label="Leave call"]');
        if ($endCallButton) {
            // console.log('Successfully Joined Meet');
            clearInterval(waitForJoining);
            addPushToTalk();
            addMuteButton();
        }

    } catch (err) {
        // console.log(err);
    }

}, 1000);

;

var port = chrome.runtime.connect({ name: "Google Meet" });
port.onMessage.addListener(function (msg) {
    if (msg.toggleMic === "Mute Google Meet Mic") {
        const $micButton = document.querySelectorAll('[role="button"][data-is-muted]')[0];
        $micButton.click();
    }
});

