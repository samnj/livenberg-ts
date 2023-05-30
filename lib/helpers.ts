export function validateMinLength(value: string) {
  return (
    value.replace(/\s+/g, "").length >= 3 ||
    "At least 3 non-whitespace characters required"
  )
}
