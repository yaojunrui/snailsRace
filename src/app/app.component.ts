import { ChangeDetectorRef, Component, ElementRef, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatRadioModule } from '@angular/material/radio';
import { SnailComponent } from "./snail/snail.component";
import { FormsModule } from '@angular/forms';
import toastr from 'toastr';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [MatButtonModule, MatRadioModule, SnailComponent, FormsModule]
})
export class AppComponent {

  snails: string[] = ["1", "2", "3"]
  selectedSnail: string = '0'
  isStart: boolean = false
  raceFinished: boolean = false;
  raceLength: number = 0

  @ViewChild('raceEnd') raceEnd!: ElementRef
  @ViewChild('raceStart') raceStart!: ElementRef

  constructor(private cdr: ChangeDetectorRef) { }

  ngAfterViewInit() {
    console.log('app after view init');
    const rectEnd = this.raceEnd.nativeElement.getBoundingClientRect();
    const rectStart = this.raceStart.nativeElement.getBoundingClientRect();
    this.raceLength = rectEnd.left - rectStart.right;
    this.cdr.detectChanges()
    console.log(this.raceLength)
  }


  onSubmit() {
    if (this.selectedSnail == '0') {
      toastr.info("please select a snail")
    }
    else {
      console.log("start")
      this.isStart = true
      this.raceFinished = false; // 重置比赛结束标志
    }
  }

  onRaceDone(value: any) {
    if (this.raceFinished) {
      return; // 如果比赛已结束，不执行任何操作
    }

    console.log(value + " is done");
    this.isStart = false;
    this.raceFinished = true; // 标记比赛已结束

    if (value == this.selectedSnail) {
      toastr.success("You win");
    } else {
      toastr.error("You lose");
    }
  }
}
