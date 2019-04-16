/*
function dynamicallyLoadScript(url) {
  const script = document.createElement("script");  // create a script DOM node
  script.src = url;  // set its src to the provided URL
  document.head.appendChild(script);  // add it to the end of the head section of the page (could change 'head' to 'body' to add it to the end of the body section instead)
  return script;
}
*/

class WarriorGame {
  constructor() {
    this._animationDuration = '6s';
    this.map = document.getElementById('Warrior-Map');
    this.trail = this.map.getElementsByTagName('path')[0];
    this.getTrailHead = (xy=null) => xy === null ? this.trail.getPointAtLength(0) : this.trail.getPointAtLength(0)[xy];
    this.getTrailId = () => this.trail.getAttribute('id');
    this.trailMotionPath = document.createElement('mpath');
    this.trailMotionPath.setAttribute('xlink:href', '#' + this.getTrailId());
    this.questions = Array();
    this.makeQuestions();
    this.getQuestion = (question_number) => this.questions[question_number];
    this._activeQuestion = 0;
    this.getActiveQuestion = () => this.getQuestion(this._activeQuestion);
    this.checkLastQuestion = () => this.getQuestion(this._activeQuestion - 1 < 0 ? this._activeQuestion.length - 1 : this._activeQuestion - 1);
    this.checkNextQuestion = () => this.getQuestion(this._activeQuestion + 1 >= this.questions.length ? 0 : this._activeQuestion + 1);
    this.getNextQuestion = () => this.getQuestion(this._activeQuestion + 1 >= this.questions.length ? this._activeQuestion -= this._activeQuestion : this._activeQuestion++);
    this.character = new WarriorCharacter('Firestar', this);
    this.setQuestion('The Darkest Hour: Warriors, Book 6', 'Book report by Eli Adams');


    this.loadElisScript('./elis_code/elis_javascript.js');
    this.setQuestion('End', 'End');
  }
  makeQuestions() {
    const qs = document.getElementsByClassName('question_block');
    for(let i = 0; i < qs.length; i++) {
      this.questions.push(new WarriorQuestion(qs[i], i, this));
    }
  }
  setQuestion(questionText, answerText) {
    this.getActiveQuestion().setQA(questionText, answerText);
    return this.getNextQuestion();
  }
  loadElisScript(url='./../_eli/elisJavascript.js') {
    this.elisScript = document.createElement("script");
    this.elisScript.src = url;
    document.head.appendChild(this.elisScript);
  }
}

class WarriorCharacter {
  constructor(character_name, warriorGame) {
    this.name = character_name;
    this.game = warriorGame;
    this.map = this.game.map;
    this.trail = this.game.trail;
    this.element = document.getElementById('character');
    this.setX = (x=null) => this.element.setAttribute('x', x === null ? this.game.getActiveQuestion().pathX() : x);
    this.setY = (y=null) => this.element.setAttribute('y', y === null ? this.game.getActiveQuestion().pathY() : y);
    this.setXY = (xy=null) => { this.setX(xy === null ? null : xy.x); this.setY(xy === null ? null : xy.y); }
    this.activeQuestion = () => this.game.getActiveQuestion();
    this.setPositionActive();
  }
  setPositionActive() {
    this.element.setAttribute('x', this.activeQuestion().pathX());
    this.element.setAttribute('y', this.activeQuestion().pathY());
    return this;
  }
  setMotionPath() {
    alert(this.game.getNextQuestion())
    return this.game.getNextQuestion()
    //this.element.appendChild(this.game.getNextQuestion().animateMotion);
  }
}

class WarriorQuestion {
  constructor(element, index, warriorGame) {
    this.element = element;
    this.index = index;
    this.game = warriorGame;
    this.trail = this.game.trail;
    this.pathX = () => this.element.x.baseVal.value;
    this.pathY = () => this.element.y.baseVal.value;
    this.getLength = () => this.element.getAttribute('length');
    this.moveMe();
    this.pathPosition = () => this.getLength() / this.trail.getTotalLength();
    if(this.index > 0){
      this.animateMotion = document.createElement('animateMotion');
      this.animateMotion.setAttribute('calcMode', 'linear');
      this.animateMotion.setAttribute('dur', this.game._animationDuration);
      this.animateMotion.setAttribute('repeatCount', 0);
      this.animateMotion.setAttribute('keyTimes', "0:1");
      this.animateMotion.setAttribute('keyPoints',  this.game.questions[index - 1] + ':' + this.pathPosition());
      this.animateMotion.appendChild(this.game.trailMotionPath);
    }

  }

  moveMe(length=null) {
    length = length || this.getLength();
    if(length !== null) {
      length = length > this.trail.getTotalLength() ? this.trail.getTotalLength() : length;
      this.element.setAttribute('x', this.trail.getPointAtLength(length).x);
      this.element.setAttribute('y', this.trail.getPointAtLength(length).y) ;
    }
    return this;
  }
  setQuestion(questionText) {
    this.question = questionText;
    return this;
  }
  setAnswer(answerText) {
    this.answer = answerText;
    return this;
  }
  setQA(questionText, answerText) {
    return this.setQuestion(questionText).setAnswer(answerText)
  }
}

w = new WarriorGame();

/*
<animateMotion calcMode="linear" dur="6s" repeatCount="0" keyTimes="0;1" keyPoints="0;0.5">
                  <mpath xlink:href="#Warrior-Trail"></mpath>
                </animateMotion>
 */