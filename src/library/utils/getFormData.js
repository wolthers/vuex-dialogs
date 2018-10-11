// Return an array like FormData.entries()
// Currently doesn't support textareas
export default function getFormData(formHTMLELement) {
  return [...formHTMLELement.elements].reduce(
    (acc, { disabled, name, type, checked, nodeName, value }) => {
      if (disabled || !name) {
        return acc;
      }
      const isInput = nodeName === "INPUT";
      const isTextInput =
        isInput &&
        [
          "text",
          "email",
          "number",
          "password",
          "hidden",
          "tel",
          "url",
          "search",
          "date",
          "color"
        ].indexOf(type) !== -1;
      const isCheckbox = isInput && type === "checkbox" && checked;
      const isRadio = isInput && type === "radio" && checked;
      const isSelect = nodeName === "SELECT";

      if (isTextInput || isRadio || isCheckbox || isSelect) {
        acc.push([name, value]);
      }
      return acc;
    },
    []
  );
}
