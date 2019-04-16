
function dynamicallyLoadScript(url) {
  const script = document.createElement("script");  // create a script DOM node
  script.src = url;  // set its src to the provided URL
  document.head.appendChild(script);  // add it to the end of the head section of the page (could change 'head' to 'body' to add it to the end of the body section instead)
  return script;
}

class WarriorMap {
  constructor() {
    this.map = document.getElementById('Warrior-Map');
    this.trail = document.getElementById('Warrior-Trail');
    this.questions = document.getElementsByClassName('question_block').forEach(q, i => new WarriorQuestion(q, i));
    this.question = (questionNumber) => this.questions[questionNumber];
    this._elisJavascript = dynamicallyLoadScript('./../_eli/elisJavascript.js');
  }

}

class WarriorQuestion {
  setQuestions() {

    const questions = Array();
    document.getElementsByClassName('question_block').forEach(
      (q, i) => questions.push(new WarriorQuestion(q, i))
    );
    return questions;
  }
  constructor(element, index) {
    this.element = element;
    this.index = index;

  }
}
