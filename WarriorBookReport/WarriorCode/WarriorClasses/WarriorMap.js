class WarriorMap {
  constructor(game) {
    this._game = game;
    this._data = this._loadMapData();
    this._path = document.getElementById('Warrior-Path');
  }
  _loadMapData(url='./../../WarriorData/Maps/TheDarkestHour.js') {
    const script = document.createElement("script");
    script.src = url;
    //document.head.appendChild(script);
    return getMapData();
  }
}
