import { Component } from '@angular/core';

type Skill = 'Listening' | 'Reading' | 'Writing' | 'Speaking';

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

  startDrag(index: number) {
    this.activeHandle = index;
  }

  onDrag(event: PointerEvent, bar: HTMLElement) {
    if (this.activeHandle === null) return;

    const rect = bar.getBoundingClientRect();
    const x = event.clientX - rect.left;
    let percent = (x / rect.width) * 100;

    percent = Math.max(0, Math.min(100, percent));

    const minGap = 5;

    const previous =
      this.activeHandle === 0 ? 0 : this.handles[this.activeHandle - 1] + minGap;

    const next =
      this.activeHandle === this.handles.length - 1
        ? 100
        : this.handles[this.activeHandle + 1] - minGap;

    percent = Math.max(previous, Math.min(next, percent));

    this.handles[this.activeHandle] = percent;
  }

  stopDrag() {
    this.activeHandle = null;
  }

  getPercentages() {
    return [
      this.handles[0],
      this.handles[1] - this.handles[0],
      this.handles[2] - this.handles[1],
      100 - this.handles[2],
    ].map(value => Math.round(value));
  }
}