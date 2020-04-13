import IHand from "../models/IHand";

export default class Hand {
  private hand: IHand;

  constructor(Hand: IHand) {
    this.hand = Hand;
  }

  /**
   * Compare this hand with the hand given in parameter (1 if win, -1 if lost and 0 if equality)
   * @param hand
   * @return number
   */
  public compare(hand: IHand): number {
    if (this.hand.weakness) {
      if (this.hand.id === hand.id) {
        return 0;
      } else {
        const weakness = this.hand.weakness.find(
          (element) => element.id === hand.id
        );
        if (weakness) {
          return -1;
        } else {
          return 1;
        }
      }
    } else {
      throw new Error("Hand should have weakness");
    }
  }
}
