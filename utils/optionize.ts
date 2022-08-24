export default function optionize(options: string[]) {
  return options.map((o) => ({ text: o, value: o }));
}
