function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

controls.map(
  ({
    include,
    id,
    label,
    model,
    options,
    popover,
    min,
    max,
    disabled,
    type,
    placeholder,
  }) => {
    console.log(
      `<${capitalizeFirstLetter(
        include
      )} id="${id}" label="${label}" value="${model}" options="${options}" popover="${popover}"  min="${min}" placeholder="${placeholder}" max="${max}" disabled="${disabled}" type="${type}" />`
    );
  }
);
