

class WarriorGame {


  constructor(gameName=null) {

    this._gameName =  gameName || 'Warriors Game';
    this._document = document;
    this._userCode =  Object();
    this._loadWarriorClasses(['WarriorGame', 'WarriorMap']);
    this._createClassObjects();
    //document.getElementById()
  }
  static _createElement(elementType, attributes, appendTo) {
    const element = document.createElement(elementType);
    Object.entries(attributes).forEach((k, v) => element[k] = v);
    element['appendTo'] = appendTo;
    return element;
  }
  _createClassObjects(classNames) {
    this._map = new WarriorMap(this);

  }

  _loadWarriorClasses(classNames) {
    classNames.forEach((c, i) => {
      //this._loadCode(i > 0 ? './WarriorCode/WarriorClasses/' + c + '.js' : false);
      this._loadStyle('./WarriorCode/WarriorStyles/' + c + '.css');
    });
  }

  _loadCode(url) {
    if(url !== false){
      const script = this._document.createElement("script");
      script.src = url;
      try {this._document.head.appendChild(script);} catch(e) {}
    }

  }

  _loadStyle(url) {
    const link = this._document.createElement('link');
    link.rel = 'stylesheet';
    link.type = 'text/css';
    link.href = url;
    this._document.head.appendChild(link);
    return this;
  }

  _storeUserCode(filename) {
    const element = this._document.createElement('script');
    element.src = filename;
    this._userCode[filename.split('.')[0]] = {
      'filename': filename,
      'url': './userCode/${filename}',
      'element': element
    };
    return this;
  }

  getGameName = () => this._gameName;
  addMyCode = (filename, userCodeObj=this._userCode) => this._storeUserCode(filename);

  startGame(){
    // Load user code
    this._userCode.forEach((scriptname, data) => {
      this._document.head.appendChild(data['element']);
    })
  }
}
/*
document.addEventListener("DOMContentLoaded", function() {
  const w = new WarriorGame();
});
*/