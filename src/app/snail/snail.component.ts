import { ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'app-snail',
  standalone: true,
  imports: [],
  templateUrl: './snail.component.html',
  styleUrl: './snail.component.css'
})
export class SnailComponent {
  @Input()
  name = '1'

  width: number = 30


  private _isStart: boolean = false;
  public get isStart(): boolean {
    return this._isStart;
  }

  @Input()
  public set isStart(value: boolean) {
    this._isStart = value;
    if (this.isStart) {
      this.x = 0
      this.race()
    } else {
      console.log("done")
    }
  }

  private _x: number = 0;
  public get x(): number {
    return this._x;
  }
  @Input()
  public set x(value: number) {
    this._x = value;
  }

  @Input()
  raceLength: number = 0

  @Output() isDone: EventEmitter<any> = new EventEmitter<any>

  @ViewChild('root', { static: false }) rootDiv!: ElementRef;
  constructor(private cdr: ChangeDetectorRef, private el: ElementRef) { }

  ngAfterViewInit() {
    console.log('snail init')
    this.width = this.rootDiv.nativeElement.clientWidth
  }

  private getRandint(max: number, min: number) {
    var Range = max - min;
    var Rand = Math.random(); //获取[0-1）的随机数
    return (min + Rand * Range); //放大取整
  }

  private race() {
    if (!this.isStart) {
      console.log("not start")
    }
    else {
      setTimeout(() => {
        this.x += this.getRandint(10, 0)
        if (this.x + this.width >= this.raceLength) {
          this.x = this.raceLength - this.width
          this.isDone.emit(this.name)
        }
        this.race()
      }, 10);
    }
  }
}
