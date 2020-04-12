export default interface IHand{
    id: number;
    label: string;
    imagePath: string;
    weakness?: IHand[];
}