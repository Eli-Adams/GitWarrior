
class WarriorGame {
  constructor() {
    this._animationDuration = '6s';
    this.getElement = () => document.getElementById('Warrior-Map');
    this.element = this.getElement();
    this.getTrail = () => document.getElementsByTagName('path')[0];
    this.trail = this.getTrail();
    this.getTrailHead = (xy=null) => xy === null ? this.trail.getPointAtLength(0) : this.trail.getPointAtLength(0)[xy];
    this.getTrailId = () => this.trail.getAttribute('id');
    this.getAnimationMotionTemplate = () => document.getElementById("animateMotionTemplate");
    this.getMotionPathTemplate = () => document.getElementById('mpathTemplate');
    this.questions = Array();
    this.makeQuestions();
    this.getQuestion = (question_number) => this.questions[question_number];
    this._activeQuestion = 0;
    this.getActiveQuestion = () => this.getQuestion(this._activeQuestion);
    this.checkLastQuestion = () => this.getQuestion(this._activeQuestion - 1 < 0 ? this._activeQuestion.length - 1 : this._activeQuestion - 1);
    this.checkNextQuestion = () => this.getQuestion(this._activeQuestion + 1 >= this.questions.length ? 0 : this._activeQuestion + 1);
    this.getNextQuestion = () => this.getQuestion(this._activeQuestion + 1 >= this.questions.length ? this._activeQuestion -= this._activeQuestion : this._activeQuestion++);
    this.character = new WarriorCharacter('Firestar', this);
    this.loadElisScript('./elis_code/elis_javascript.js');
    this.setQA();
  }
  setQA() {
    document.getElementById('question').innerText = 'The Darkest Hour: Warriors, Book 6';
    document.getElementById('answer').innerText = 'A book report by Eli Adams';
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
    this.trail = this.game.trail;
    this.element = () => document.getElementById('character');
    this.setX = (x=null) => this.element().setAttribute('x', x === null ? this.game.getActiveQuestion().pathX() : x);
    this.setY = (y=null) => this.element().setAttribute('y', y === null ? this.game.getActiveQuestion().pathY() : y);
    this.setXY = (xy=null) => { this.setX(xy === null ? null : xy.x); this.setY(xy === null ? null : xy.y); }
    this.activeQuestion = () => this.game.getActiveQuestion();
    this._question = 0;
    this.setPositionActive();
    this.getNextQuestion = () => this.game.getQuestion(this._question + 1);
  }
  setPositionActive() {
    //this.element().setAttribute('x', this.activeQuestion().pathX());
    //this.element().setAttribute('y', this.activeQuestion().pathY());
    return this;
  }
  setMotionPath() {
    this.element().appendChild(this.getNextQuestion().animateMotion());
    return this;
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
  }
  getAnimateMotion() {
    animateMotion = this.game.getAnimationMotionTemplate().cloneNode(true);
    animateMotion.setAttribute('id', 'questionindex' + this.index + 'animateMotion');
    animateMotion.setAttribute('keyTimes', "0:1");
    animateMotion.setAttribute('keyPoints',  this.pathPosition() + ':' + this.game.questions[this.index + 1 > this.game.questions.length ?  this.index : this.index + 1]);
    return animateMotion;
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