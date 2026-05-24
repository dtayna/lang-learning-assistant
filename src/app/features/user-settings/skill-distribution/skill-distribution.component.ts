import { Component } from '@angular/core';

type Skill = 'Listening' | 'Reading' | 'Writing' | 'Speaking';

const MIN_GAP = 5;

@Component({
  selector: 'app-skill-distribution',
  standalone: true,
  templateUrl: './skill-distribution.component.html',
  styleUrl: './skill-distribution.component.scss',
})
export class SkillDistributionComponent {
  handles = [25, 50, 75];

  skills: Skill[] = ['Listening', 'Reading', 'Writing', 'Speaking'];

  activeHandle: number | null = null;

  startDrag(handle: number) {
    this.activeHandle = handle;
  }

  stopDrag() {
    this.activeHandle = null;
  }

  onDrag(event: PointerEvent, bar: HTMLElement) {
    if (this.activeHandle === null) return;

    const {left, width} = bar.getBoundingClientRect(); 
    const pointerX = event.clientX;

    const x = this.getRelativeX(pointerX, left);
    const rawPercent = this.calculatePercentage(x, width)
    let percent = this.clamp(0, 100, rawPercent)

    const previous =
      this.activeHandle === 0 ? 0 : this.handles[this.activeHandle - 1] + MIN_GAP;

    const next =
      this.activeHandle === this.handles.length - 1
        ? 100
        : this.handles[this.activeHandle + 1] - MIN_GAP;

    percent = this.clamp(previous, next, percent);

    this.handles[this.activeHandle] = percent;
  }

  getPercentages() {
    return [
      this.handles[0],
      this.handles[1] - this.handles[0],
      this.handles[2] - this.handles[1],
      100 - this.handles[2],
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

  skillPercentages = {
    listening : 25,
    reading : 25,
    writing : 25,
    speaking : 25
  }
}