const getBoostBarWidth = (boostAmount: number, maxWidth: number): number => {
  return (boostAmount / 100) * maxWidth
}

const getBoostBarCircumference = (boostAmount: number, maxCircumference: number): number => {
  return ((100 - boostAmount) / 100) * maxCircumference
}

export const BoostService = {
  getBoostBarCircumference,
  getBoostBarWidth
}
