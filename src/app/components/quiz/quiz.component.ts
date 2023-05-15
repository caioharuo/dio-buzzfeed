import { Component, OnInit } from '@angular/core';
import { Question } from 'src/app/models/question';
import quizQuestions from '../../../assets/data/quizz_questions.json';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css'],
})
export class QuizComponent implements OnInit {
  title: string = '';

  questions: Question[] = [];
  questionSelected?: Question;

  answers: string[] = [];
  answerSelected: string = '';

  questionIndex: number = 0;
  questionMaxIndex: number = 0;

  finished: boolean = false;

  ngOnInit(): void {
    if (quizQuestions) {
      this.finished = false;
      this.title = quizQuestions.title;

      this.questions = quizQuestions.questions;
      this.questionSelected = this.questions[this.questionIndex];

      this.questionMaxIndex = this.questions.length;
    }
  }

  playerChoose(value: string) {
    this.answers.push(value);
    this.nextStep();
  }

  nextStep() {
    this.questionIndex++;

    if (this.questionMaxIndex > this.questionIndex) {
      this.questionSelected = this.questions[this.questionIndex];
    } else {
      const finalAnswer: string = this.checkResult(this.answers);
      this.finished = true;
      this.answerSelected =
        quizQuestions.results[
          finalAnswer as keyof typeof quizQuestions.results
        ];
    }
  }

  checkResult(answers: string[]) {
    const result = answers.reduce((prev, curr, index, arr) => {
      return arr.filter((item) => item === prev).length >
        arr.filter((item) => item === curr).length
        ? curr
        : prev;
    });

    return result;
  }
}
