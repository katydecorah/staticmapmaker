const mapTypes = [
  { value: "Aerial", text: "Aerial" },
  { value: "AerialWithLabels", text: "Aerial with a road overlay" },
  {
    value: "AerialWithLabelsOnDemand",
    text: "Aerial imagery with on-demand road overlay.",
  },
  { value: "Streetside", text: "Street-level imagery" },
  { value: "BirdsEye", text: "Bird's Eye (oblique-angle) imagery." },
  {
    value: "BirdsEyeWithLabels",
    text: "Bird’s Eye (oblique-angle) imagery with a road overlay.",
  },
  { value: "Road", text: "Road: Roads without additional imagery" },
  {
    value: "OrdnanceSurvey",
    text: "Ordnance Survey imagery (London area only)",
  },
  {
    value: "CanvasDark",
    text: "Canvas Dark: A dark version of the road maps.",
  },
  {
    value: "CanvasLight",
    text: "Canvas Light: A lighter version of the road maps which also has some of the details such as hill shading disabled.",
  },
  {
    value: "CanvasGray",
    text: "Canvas Gray: A grayscale version of the road maps.",
  },
];

export default mapTypes;
