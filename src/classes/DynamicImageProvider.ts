export default abstract class DynamicImageProvider {
  public static get(name: string) {
    return require("../assets/images/" + name);
  }
}
