// src/core/stepManager.ts

export interface StepTranslation {
  title: string;
  description: string;
}

export interface Step {
  selector: string;
  order: number;
  translations: Record<string, StepTranslation>; // key = "en" | "ta" | "hi"
}

export class StepManager {
  private steps: Step[];
  private currentIndex: number;

  constructor(steps: Step[]) {
    this.steps = steps.sort((a, b) => a.order - b.order);
    this.currentIndex = 0;
  }

  current(): Step {
    return this.steps[this.currentIndex];
  }

  next(): Step | null {
    if (this.currentIndex < this.steps.length - 1) {
      this.currentIndex++;
      return this.steps[this.currentIndex];
    }
    return null;
  }

  prev(): Step | null {
    if (this.currentIndex > 0) {
      this.currentIndex--;
      return this.steps[this.currentIndex];
    }
    return null;
  }

  reset(): void { this.currentIndex = 0; }
  isFirst(): boolean { return this.currentIndex === 0; }
  isLast(): boolean { return this.currentIndex === this.steps.length - 1; }
  currentNumber(): number { return this.currentIndex + 1; }
  totalSteps(): number { return this.steps.length; }
}
