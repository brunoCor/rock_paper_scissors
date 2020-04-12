import IHand from "../models/IHand";

export default abstract class AbstractConstants {
  public static getHands(): IHand[] {
    return [
      {
        id: 0,
        label: "Rocks",
        imagePath: "rock.png",
        weakness: [{ id: 1, label: "Paper", imagePath: "paper.png" }],
      },
      {
        id: 1,
        label: "Paper",
        imagePath: "paper.png",
        weakness: [{ id: 2, label: "Scissors", imagePath: "scissors.png" }],
      },
      {
        id: 2,
        label: "Scissors",
        imagePath: "scissors.png",
        weakness: [{ id: 0, label: "Rocks", imagePath: "rock.png" }],
      },
    ];
  }
}
