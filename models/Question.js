class Question {
    constructor(text, answers, correct_answer, test_id ) {
        this.text = text;
        this.answers = answers;
        this.correct_answer = correct_answer;
        this.test_id = test_id;        
    }
}

module.exports = Question; 