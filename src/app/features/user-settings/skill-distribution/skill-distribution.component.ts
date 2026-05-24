import { Component, signal } from '@angular/core';

type Skill = 'Listening' | 'Reading' | 'Writing' | 'Speaking';

const MIN_GAP = 5;

@Component({
  selector: 'app-skill-distribution',
  standalone: true,
  templateUrl: './skill-distribution.component.html',
  styleUrl: './skill-distribution.component.scss',
})
export class SkillDistributionComponent {

  handles = signal([25, 50, 75]);
  activeHandle = signal<number | null>(null);

  readonly skills: Skill[] = ['Listening', 'Reading', 'Writing', 'Speaking'];


  startDrag(handle: number) {
    this.activeHandle.set(handle);
  }

  stopDrag() {
    this.activeHandle.set(null);
  }

  onDrag(event: PointerEvent, bar: HTMLElement) {
    const handles = this.handles();
    const activeHandle = this.activeHandle();

    if (activeHandle === null) return;

    const {left, width} = bar.getBoundingClientRect(); 
    const pointerX = event.clientX;

    const x = this.getRelativeX(pointerX, left);
    const rawPercent = this.calculatePercentage(x, width)
    let percent = this.clamp(0, 100, rawPercent)

    const previous =
    activeHandle === 0 ? 0 : handles[activeHandle - 1] + MIN_GAP;

    const next =
    activeHandle === handles.length - 1
        ? 100
        : handles[activeHandle + 1] - MIN_GAP;

    percent = this.clamp(previous, next, percent);

    this.handles.update(handles => 
      handles.map((handle, index) => 
        index === activeHandle ?
        percent :
        handle));
  }

  getPercentages() {
    return [
      this.handles()[0],
      this.handles()[1] - this.handles()[0],
      this.handles()[2] - this.handles()[1],
      100 - this.handles()[2],
    ].map(value => Math.round(value));
  }

  private getRelativeX(pointerX: number, start: number) : number {
    return pointerX - start;
  }

  private calculatePercentage(part: number, whole: number) : number {
    return (part / whole) * 100;
  }

  private clamp(min: number, max: number, value: number) : number {
    return Math.max(min, Math.min(max, value))
  }

}