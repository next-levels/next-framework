export class SelectedOption {
  public Value: string;
  public PopulatedFrom: string;
  public Next: string;

  constructor(value: string, populatedFrom: string, next: string) {
    this.Value = value;
    this.PopulatedFrom = populatedFrom;
    this.Next = next;
  }
}
