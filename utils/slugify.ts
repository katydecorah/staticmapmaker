export default function slugify(string: string) {
  return string.split(" ").join("-").toLowerCase();
}
