const orentations = {vertical: 0, horizontal: 1};
const platforms = {yandex: 0, vkplay: 1, gamepush: 2};

const myOrentation = orentations.vertical;
const platform = platforms.gamepush;
const gameViewport = [900,1600];

const mainLoader = new GameLoader();

mainLoader.reslist.push('textures/back.png');

var reslist_audios = [
	"lose.wav","b.ogg",'s.ogg'
];

mainLoader.AddTexArr('exp/e',22);
mainLoader.AddTexArr('f/',9)

document.addEventListener('DOMContentLoaded', function() {
	mainLoader.ready = Init;
	mainLoader.download();
});

const gameid = 33453;
