export function validateMinLength(value: string) {
  return (
    value.replace(/\s+/g, "").length >= 3 ||
    "At least 3 non-whitespace characters required"
  )
}

export function normalizeQuery(query: string) {
  const lowerCaseWithoutAccents = query
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
  const normalizedQuery = lowerCaseWithoutAccents.split(" ").sort().join(" ")

  return normalizedQuery
}
