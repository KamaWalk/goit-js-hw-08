import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const video = document.querySelector('#vimeo-player');
const player = new Player(video);
const localStorageKey = 'videoplayer-current-time';

try {
  player.setCurrentTime(JSON.parse(localStorage.getItem(localStorageKey)));
} catch {
  player.setCurrentTime(0);
}

const setTime = function (currentTime) {
  const secondsStamp = currentTime.seconds;
  localStorage.setItem(localStorageKey, secondsStamp);
  console.log(secondsStamp);
};
player.on('timeupdate', throttle(setTime, 1000));
